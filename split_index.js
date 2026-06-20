const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf-8');

const styleMatch = content.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
const scriptMatch = content.match(/<script[^>]*>([\s\S]*?)<\/script>/i);

if (styleMatch) fs.writeFileSync('style.css', styleMatch[1]);
if (scriptMatch) fs.writeFileSync('script.js', scriptMatch[1]);

const html = content.replace(/<style[^>]*>[\s\S]*?<\/style>/i, '<link rel="stylesheet" href="style.css">')
                    .replace(/<script[^>]*>[\s\S]*?<\/script>/i, '<script src="script.js"></script>');
fs.writeFileSync('index_clean.html', html);
console.log('Split complete.');
