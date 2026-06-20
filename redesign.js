const fs = require('fs');

// 1. Rename EcoTrace to EcotraceX
const filesToRename = ['index.html', 'app_new.js', 'README.md', 'style.css'];
filesToRename.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/EcoTrace/g, 'EcotraceX');
        content = content.replace(/ecotrace/g, 'ecotracex');
        fs.writeFileSync(file, content);
    }
});

// 2. Add Favicon to index.html
let html = fs.readFileSync('index.html', 'utf8');
if (!html.includes('favicon.png')) {
    html = html.replace('</head>', '  <link rel="icon" type="image/png" href="favicon.png">\n</head>');
    fs.writeFileSync('index.html', html);
}

// 3. Update CSS with UI/UX Pro Max colors
let css = fs.readFileSync('style.css', 'utf8');
// Replace standard colors with the Pro Max palette
css = css.replace(/--primary-color:.*?;/g, '--primary-color: #22C55E;');
css = css.replace(/--secondary-color:.*?;/g, '--secondary-color: #1E293B;');
css = css.replace(/--bg-color:.*?;/g, '--bg-color: #020617;');
css = css.replace(/--text-color:.*?;/g, '--text-color: #F8FAFC;');
css = css.replace(/--card-bg:.*?;/g, '--card-bg: #0F172A;');
css = css.replace(/background-color:\s*#ffffff/g, 'background-color: #0F172A');
css = css.replace(/background:\s*#ffffff/g, 'background: #0F172A');
css = css.replace(/color:\s*#333333/g, 'color: #F8FAFC');
css = css.replace(/font-family:.*?;/gi, "font-family: 'Fira Sans', sans-serif;");

// Inject Fira Sans font import if not present
if (!css.includes('Fira+Sans')) {
    css = `@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Fira+Sans:wght@300;400;500;600;700&display=swap');\n` + css;
}

fs.writeFileSync('style.css', css);
console.log('Redesign and rename applied.');
