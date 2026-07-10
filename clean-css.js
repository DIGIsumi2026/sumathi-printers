const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'frontend', 'src', 'App.css');
let css = fs.readFileSync(cssPath, 'utf8');

const targetClasses = [
  'sp-hero-title',
  'sp-about-video-title',
  'sp-home-services-title',
  'sp-home-projects-title',
  'sp-technology-title',
  'sp-home-clients-title',
  'sp-services-grid-title'
];

// Regex to find a CSS block for a given class, allowing for media queries
// We will simply find any occurrence of `.class-name { ... }` and remove the typography properties
// Since this is a simple script, we'll iterate and replace.

for (const cls of targetClasses) {
  // Find `.class-name { ... }` or `  .class-name { ... }`
  const blockRegex = new RegExp(`(\\.${cls}\\s*\\{[^}]*?\\})`, 'gs');
  
  css = css.replace(blockRegex, (match) => {
    // Inside the block, strip specific properties
    let newBlock = match
      .replace(/^\s*margin\s*:.*?;?$/gm, '')
      .replace(/^\s*font-size\s*:.*?;?$/gm, '')
      .replace(/^\s*line-height\s*:.*?;?$/gm, '')
      .replace(/^\s*letter-spacing\s*:.*?;?$/gm, '')
      .replace(/^\s*font-weight\s*:.*?;?$/gm, '');
    
    // If the block is now empty (e.g. `  .cls {\n  }`), we could remove it entirely,
    // but just leaving it empty is safer and won't hurt.
    return newBlock;
  });
}

// Special case for reveal-title which might be like `.reveal-title span, .reveal-title { ... }`
const revealTitleRegex = new RegExp(`(\\.reveal-title\\s*(?:,\\s*\\S+\\s*)?\\{[^}]*?\\})`, 'gs');
css = css.replace(revealTitleRegex, (match) => {
  let newBlock = match
      .replace(/^\s*margin\s*:.*?;?$/gm, '')
      .replace(/^\s*font-size\s*:.*?;?$/gm, '')
      .replace(/^\s*line-height\s*:.*?;?$/gm, '')
      .replace(/^\s*letter-spacing\s*:.*?;?$/gm, '')
      .replace(/^\s*font-weight\s*:.*?;?$/gm, '');
  return newBlock;
});

fs.writeFileSync(cssPath, css, 'utf8');
console.log('CSS cleaned up successfully.');
