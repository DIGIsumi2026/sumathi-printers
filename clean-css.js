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


for (const cls of targetClasses) {
 
  const blockRegex = new RegExp(`(\\.${cls}\\s*\\{[^}]*?\\})`, 'gs');
  
  css = css.replace(blockRegex, (match) => {
    
    let newBlock = match
      .replace(/^\s*margin\s*:.*?;?$/gm, '')
      .replace(/^\s*font-size\s*:.*?;?$/gm, '')
      .replace(/^\s*line-height\s*:.*?;?$/gm, '')
      .replace(/^\s*letter-spacing\s*:.*?;?$/gm, '')
      .replace(/^\s*font-weight\s*:.*?;?$/gm, '');
   
    return newBlock;
  });
}

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
