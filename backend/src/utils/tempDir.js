import fs from "fs/promises";
import path from "path";
import os from "os";

// creates a unique  temporary directory  for cloning repo...

export async function createTempDir(){

    const prefix = path.join(os.tmpdir(), "traceroot-");
    const dirPath = await fs.mkdtemp(prefix);
    return dirPath;

}

//deletes the temporary directory and all files..

export async function cleanupTempDir(dirPath){

    if(!dirPath) return;
    try {
        
        await fs.rm(dirPath, {recursive:true, force:true});

    } catch (error) {
        console.error(`[CleanUp warning]: failed to delete ${dirPath}`, error.message);
    }

}