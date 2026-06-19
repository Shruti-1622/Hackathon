const fs = require('fs');
const path = require('path');

const replacement = `<img src="assets/avatar/yes.webp" alt="HackVerse Logo" class="nav-logo-img">
<span class="nav-logo-text">Hack<span class="text-accent">Verse</span></span>`;

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Regex to match <span class="logo-bracket">{</span>HackVerse<span class="logo-bracket">}</span>
  // with possible whitespace or newlines.
  const regex = /<span class="logo-bracket">\{<\/span>\s*HackVerse\s*<span class="logo-bracket">\}<\/span>/g;
  
  if (regex.test(content)) {
    content = content.replace(regex, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
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
    } else if (stat.isFile() && file.endsWith('.html')) {
      replaceInFile(filePath);
    }
  }
}

walk('.');
console.log('Logo replaced successfully!');
