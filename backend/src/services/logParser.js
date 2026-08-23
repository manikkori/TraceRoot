export function parseErrorLog(errorLog) {
    if (!errorLog || typeof errorLog !== "string") {
        return [];
    }

    const candidateFiles = [];
    const seenPaths = new Set();
    const stackTraceRegex = /(?:at\s+.*?\s*\(?|File\s+["']|^Error:.*?|\s+at\s+)([\w\/\.\-]+\.[a-zA-Z0-9]+)(?:[:",]\s*(?:line\s*)?(\d+))?/gm;

    let match;
    while ((match = stackTraceRegex.exec(errorLog)) !== null) {
        let rawPath = match[1];
        const lineNumber = match[2] || null;

        rawPath = rawPath.replace(/\\/g, "/");

        if (
            rawPath.includes("node_modules") ||
            rawPath.startsWith("node:") ||
            rawPath.startsWith("internal/") ||
            rawPath.endsWith(".json")
        ) {
            continue;
        }

        const cleanPath = normalizeRelativePath(rawPath);

        if (cleanPath && !seenPaths.has(cleanPath)) {
            seenPaths.add(cleanPath);
            candidateFiles.push({ filePath: cleanPath, lineNumber });
        }
    }

    return candidateFiles;
}

function normalizeRelativePath(fullPath) {
    const parts = fullPath.split("/");
    const commonRoots = ["src", "app", "server", "backend", "routes", "controllers", "services", "utils", "models", "lib"];

    for (let i = 0; i < parts.length; i++) {
        if (commonRoots.includes(parts[i])) {
            return parts.slice(i).join("/");
        }
    }

    return parts.slice(-2).join("/");
}