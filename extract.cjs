const fs = require('fs');
const content = fs.readFileSync('C:/Users/vasuk/.gemini/antigravity/brain/b8e6a8bb-312a-42b8-98e0-9839f1e0e57e/.system_generated/steps/905/content.md', 'utf8');
const matches = content.match(/"([^"]{50,})"/g);
if(matches) {
    matches.forEach(m => {
        if(!m.includes('<') && !m.includes('{') && !m.includes('function') && !m.includes('gstatic') && !m.includes('google')) {
            console.log(m.substring(0, 300));
        }
    });
}
