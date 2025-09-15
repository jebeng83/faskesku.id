const fs = require('fs');
const path = require('path');

// Function to fix conflicts in a single file
function fixConflictsInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let hasConflicts = false;
        
        // Check if file has conflicts
        if (content.includes('<<<<<<<') || content.includes('=======') || content.includes('>>>>>>>')) {
            hasConflicts = true;
            console.log(`Fixing conflicts in: ${filePath}`);
            
            // Split content by conflict markers
            const lines = content.split('\n');
            const fixedLines = [];
            let inConflict = false;
            let inKohsunSection = false;
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                
                if (line.includes('<<<<<<<')) {
                    inConflict = true;
                    inKohsunSection = false;
                    continue; // Skip the conflict marker
                }
                
                if (line.includes('=======')) {
                    inKohsunSection = true;
                    continue; // Skip the separator
                }
                
                if (line.includes('>>>>>>>')) {
                    inConflict = false;
                    inKohsunSection = false;
                    continue; // Skip the end marker
                }
                
                // Only keep lines from kohsun section or non-conflict lines
                if (!inConflict || inKohsunSection) {
                    fixedLines.push(line);
                }
            }
            
            // Join lines and clean up extra empty lines
            content = fixedLines.join('\n');
            
            // Remove excessive empty lines (more than 2 consecutive)
            content = content.replace(/\n{3,}/g, '\n\n');
            
            // Write the fixed content back
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✓ Fixed conflicts in: ${filePath}`);
        }
        
        return hasConflicts;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
        return false;
    }
}

// Function to recursively find and fix conflicts in all JS/TS files
function fixAllConflicts(dir) {
    const resourcesDir = path.join(dir, 'resources', 'js');
    let totalFixed = 0;
    
    if (!fs.existsSync(resourcesDir)) {
        console.log('Resources JS directory not found:', resourcesDir);
        return;
    }
    
    console.log('Scanning resources/js directory:', resourcesDir);
    
    function processDirectory(currentDir) {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
            const fullPath = path.join(currentDir, item);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                processDirectory(fullPath);
            } else if (item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.js') || item.endsWith('.jsx')) {
                if (fixConflictsInFile(fullPath)) {
                    totalFixed++;
                }
            }
        }
    }
    
    console.log('Starting to fix all conflicts...');
    processDirectory(resourcesDir);
    console.log(`\n✓ Fixed conflicts in ${totalFixed} files`);
}

// Run the script
const projectRoot = process.cwd();
console.log('Project root:', projectRoot);
fixAllConflicts(projectRoot);
console.log('\nConflict fixing completed!');