import { groqModel } from "./groqClient.js";
import { readFileContent, getFileTree } from "./gitService.js";

const SYSTEM_PROMPT = `You are a Senior Site Reliability Engineer (SRE) investigating a production incident. 
You are given an error log and access to source files from the affected repository. 
Determine the root cause and, if you don't have enough information yet, specify exactly which additional files you need.

Based on what you have, either:
(a) diagnose the root cause with high confidence, or
(b) request specific additional files if the current context is insufficient.

Respond ONLY with valid JSON. Do not include markdown formatting like \`\`\`json.
{
  "needsMoreFiles": true | false,
  "filesToRead": ["path/to/file.js", "path/to/another.js"],
  "rootCause": "string or null if needsMoreFiles is true",
  "explanation": "string or null",
  "suggestedFix": "string or null"
}`;

export async function runInvestigationLoop(errorLog, initialFiles, repoDir) {
  const MAX_ITERATIONS = 3;
  let iterationCount = 0;
  const filesExamined = new Set();
  const fileContentsReadSoFar = {};

  let fileTree = [];
  try {
    fileTree = await getFileTree(repoDir);
  } catch (e) {
    console.error("Warning: Could not read file tree", e);
  }

  const filesToReadQueue = [...initialFiles.map((f) => f.filePath)];

  while (iterationCount < MAX_ITERATIONS) {
    iterationCount++;
    console.log(
      `[Agent] Iteration ${iterationCount} starting... Queue size: ${filesToReadQueue.length}`,
    );

    for (const filePath of filesToReadQueue) {
      if (!filesExamined.has(filePath)) {
        try {
          const content = await readFileContent(repoDir, filePath);
          fileContentsReadSoFar[filePath] = content;
          filesExamined.add(filePath);
        } catch (error) {
          fileContentsReadSoFar[filePath] =
            `[ERROR READING FILE]: ${error.message}`;
          filesExamined.add(filePath);
        }
      }
    }

    filesToReadQueue.length = 0;

    let formattedContents = "";
    for (const [path, content] of Object.entries(fileContentsReadSoFar)) {
      formattedContents += `\n--- File: ${path} ---\n${content}\n`;
    }

    const prompt = `
USER REQUEST:
Error log:
${errorLog}

Repository file tree (partial):
${fileTree.slice(0, 50).join("\n")} 

Files read so far:
${formattedContents}
`;

    try {
      const response = await groqModel.invoke([
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ]);

      let jsonResponse;
      try {
        let cleanResponse = response.content.trim();
        if (cleanResponse.startsWith("```json")) {
          cleanResponse = cleanResponse
            .replace(/^```json\n?/, "")
            .replace(/\n?```$/, "");
        } else if (cleanResponse.startsWith("```")) {
          cleanResponse = cleanResponse
            .replace(/^```\n?/, "")
            .replace(/\n?```$/, "");
        }
        jsonResponse = JSON.parse(cleanResponse);
      } catch (e) {
        throw new Error(
          "AI did not return valid JSON. Raw response: " + response.content,
        );
      }

      if (
        jsonResponse.needsMoreFiles &&
        jsonResponse.filesToRead &&
        jsonResponse.filesToRead.length > 0
      ) {
        const newFiles = jsonResponse.filesToRead.filter(
          (f) => !filesExamined.has(f),
        );
        if (newFiles.length > 0) {
          filesToReadQueue.push(...newFiles);
          console.log(`[Agent] Requesting more files: ${newFiles.join(", ")}`);
          continue;
        } else {
          console.log(
            "[Agent] AI requested files we already read or empty array. Breaking to avoid infinite loop.",
          );
          return formatFinalResponse(
            jsonResponse,
            filesExamined,
            iterationCount,
          );
        }
      } else {
        console.log("[Agent] AI has reached a conclusion.");
        return formatFinalResponse(jsonResponse, filesExamined, iterationCount);
      }
    } catch (error) {
      throw new Error(
        `Agent loop failed on iteration ${iterationCount}: ${error.message}`,
      );
    }
  }

  return {
    rootCause: "Investigation timed out.",
    explanation: `The agent reached the maximum limit of ${MAX_ITERATIONS} iterations without a conclusive diagnosis.`,
    suggestedFix:
      "Consider manually reviewing the files examined or providing a more specific error log.",
    filesExamined: Array.from(filesExamined),
    iterations: iterationCount,
  };
}

function formatFinalResponse(jsonResponse, filesExamined, iterationCount) {
  return {
    rootCause: jsonResponse.rootCause || "Inconclusive",
    explanation: jsonResponse.explanation || "No explanation provided.",
    suggestedFix: jsonResponse.suggestedFix || "No fix suggested.",
    filesExamined: Array.from(filesExamined),
    iterations: iterationCount,
  };
}
