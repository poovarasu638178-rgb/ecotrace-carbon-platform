const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf-8');
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let scripts = [];
while ((match = scriptRegex.exec(content)) !== null) {
  if (match[1].trim()) scripts.push(match[1]);
}
fs.writeFileSync('app.js', scripts.join('\n\n'));
console.log('Extracted', scripts.length, 'scripts, total length:', scripts.join('\n\n').length);
