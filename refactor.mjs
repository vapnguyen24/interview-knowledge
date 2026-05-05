import fs from 'fs/promises';
import path from 'path';

const TECH_STACK_DIR = './js/projects/tech-stack';

async function refactor() {
  const files = await fs.readdir(TECH_STACK_DIR);
  
  for (const file of files) {
    if (!file.endsWith('.js')) continue;
    
    // We only process flat files, not directories or index.js
    const filePath = path.join(TECH_STACK_DIR, file);
    const stat = await fs.stat(filePath);
    if (!stat.isFile()) continue;
    
    const stackName = file.replace('.js', '');
    const stackDir = path.join(TECH_STACK_DIR, stackName);
    
    console.log(`Processing ${file}...`);
    
    // Read the original file
    let content = await fs.readFile(filePath, 'utf-8');
    
    // Create folder
    await fs.mkdir(stackDir, { recursive: true });
    
    // Attempt rudimentary split or just move it for now? 
    // The user wants: basic, medium, advanced and 1 data file.
    // This requires parsing the JS.
  }
}

refactor().catch(console.error);
