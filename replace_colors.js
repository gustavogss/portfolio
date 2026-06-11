const fs = require('fs');
const path = './src/components/BlogPostSection.tsx';

let content = fs.readFileSync(path, 'utf8');

// Replacements
content = content.replace(/bg-slate-950\/80/g, 'bg-black/80');
content = content.replace(/bg-slate-900/g, 'bg-bg-main');
content = content.replace(/from-slate-900 via-slate-900\/40/g, 'from-bg-main via-bg-main/40');
content = content.replace(/bg-slate-800\/50/g, 'bg-bg-card/50');
content = content.replace(/bg-slate-800\/30/g, 'bg-bg-card/30');
content = content.replace(/hover:bg-slate-800/g, 'hover:bg-bg-card-hover');
content = content.replace(/bg-slate-800/g, 'bg-bg-card');

content = content.replace(/border-slate-800/g, 'border-border-color');
content = content.replace(/border-slate-700\/50/g, 'border-border-color/50');
content = content.replace(/border-slate-700/g, 'border-border-color');

content = content.replace(/text-slate-200/g, 'text-text-main');
content = content.replace(/text-slate-300/g, 'text-text-main');
content = content.replace(/text-slate-400/g, 'text-text-muted');

// Careful with text-white
content = content.replace(/text-center text-white py-12/g, 'text-center text-text-main py-12');
content = content.replace(/text-white leading-tight/g, 'text-text-main leading-tight');
content = content.replace(/text-white font-bold/g, 'text-text-main font-bold');
content = content.replace(/text-white mt-12/g, 'text-text-main mt-12');
content = content.replace(/text-white mb-6/g, 'text-text-main mb-6');
content = content.replace(/text-white mb-2/g, 'text-text-main mb-2');
content = content.replace(/strong className="text-white"/g, 'strong className="text-text-main"');
content = content.replace(/bg-\[#212121\] border border-slate-700 rounded-lg text-white/g, 'bg-bg-card border border-border-color rounded-lg text-text-main');

// Fix border-white/10
content = content.replace(/border-white\/10/g, 'border-border-color');

fs.writeFileSync(path, content, 'utf8');
console.log('Replaced successfully');
