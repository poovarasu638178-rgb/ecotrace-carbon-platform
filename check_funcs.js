const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');
const lines = content.split('\n');
let inFunc = false;
let funcStart = 0;
let over15 = 0;
for(let i=0; i<lines.length; i++) {
  if (lines[i].match(/function\s+\w+|=>|{\s*$/) && !inFunc) {
     inFunc = true;
     funcStart = i;
  }
  if (inFunc && lines[i].match(/^.*}.*$/)) { // naive approach
     if (i - funcStart > 15) over15++;
     inFunc = false;
  }
}
console.log('Functions over 15 lines roughly:', over15);
