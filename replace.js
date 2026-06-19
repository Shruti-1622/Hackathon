const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('HackHub')) {
    const newContent = content.replace(/HackHub/g, 'HackVerse');
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory() && !['.git', 'node_modules', 'assets', '.gemini'].includes(file)) {
      walk(filePath);
    } else if (stat.isFile() && (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css'))) {
      replaceInFile(filePath);
    }
  }
}

walk('.');
console.log('All HackHub mentions replaced with HackVerse!');
