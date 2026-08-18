const fs = require('fs');
const content = fs.readFileSync('C:/Users/vasuk/.gemini/antigravity/brain/b8e6a8bb-312a-42b8-98e0-9839f1e0e57e/.system_generated/steps/905/content.md', 'utf8');

const regex = /"([^"]{50,})"/g;
let match;
while ((match = regex.exec(content)) !== null) {
  const m = match[1];
  if (!m.includes('<') && !m.includes('{') && !m.includes('function') && !m.includes('gstatic') && !m.includes('google') && !m.includes('\\u') && !m.includes('http')) {
    console.log('MATCH:', m.substring(0, 300));
  }
}
