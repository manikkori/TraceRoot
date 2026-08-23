import simpleGit from "simple-git";
import fs from "fs/promises";
import path from "path";

export async function cloneRepository(repoUrl, targetDir) {
    const git = simpleGit();
    
    try {
        await git.clone(repoUrl, targetDir, ['--depth', '1']);
        return true;
    } catch (error) {
        throw new Error(`Failed to clone repository: ${error.message}`);
    }
}

export async function getFileTree(dirPath) {
    const fileTree = [];

    async function walk(currentPath) {
        const entries = await fs.readdir(currentPath, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentPath, entry.name);
            const relativePath = path.relative(dirPath, fullPath);

            if (entry.name === '.git' || entry.name === 'node_modules') {
                continue;
            }

            if (entry.isDirectory()) {
                await walk(fullPath);
            } else {
                fileTree.push(relativePath.replace(/\\/g, "/"));
            }
        }
    }

    await walk(dirPath);
    return fileTree;
}

export async function readFileContent(dirPath, filePath) {
    const fullPath = path.join(dirPath, filePath);
    
    try {
        const stat = await fs.stat(fullPath);
        if (stat.size > 100000) { 
            return "[File too large to read automatically. Exceeds 100KB limit.]";
        }

        const content = await fs.readFile(fullPath, "utf-8");
        
        const lines = content.split('\n');
        if (lines.length > 2000) {
            return content.substring(0, 50000) + "\n\n[...File truncated due to size limit...]";
        }

        return content;
    } catch (error) {
        throw new Error(`Failed to read file ${filePath}: ${error.message}`);
    }
}