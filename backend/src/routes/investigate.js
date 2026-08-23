import express from "express";
import { parseErrorLog } from "../services/logParser.js";
import { createTempDir, cleanupTempDir } from "../utils/tempDir.js";
import { cloneRepository } from "../services/gitService.js";
import { runInvestigationLoop } from "../services/agentLoop.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { errorLog, repoUrl } = req.body;

  if (!errorLog || !repoUrl) {
    return res
      .status(400)
      .json({ error: "Missing errorLog or repoUrl in request body." });
  }

  let tempDir = null;

  try {
    const startTime = Date.now();

    const initialFiles = parseErrorLog(errorLog);

    if (initialFiles.length === 0) {
      return res
        .status(400)
        .json({
          error: "Could not extract any valid file paths from the error log.",
        });
    }

    tempDir = await createTempDir();

    await cloneRepository(repoUrl, tempDir);

    const investigationResult = await runInvestigationLoop(
      errorLog,
      initialFiles,
      tempDir,
    );

    const investigationTimeMs = Date.now() - startTime;

    res.json({
      ...investigationResult,
      investigationTimeMs,
    });
  } catch (error) {
    console.error("[Investigation API Error]:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred." });
  } finally {
    if (tempDir) {
      await cleanupTempDir(tempDir);
    }
  }
});

export default router;
