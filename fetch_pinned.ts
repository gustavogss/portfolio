import https from 'https';

const req = https.request('https://github.com/gustavogss', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    const matches = [...body.matchAll(/href="\/gustavogss\/([^"]+)"/g)];
    const items = [...new Set(matches.map(m => m[1]))];
    console.log("ALL_HREFS:", items.filter(i => !i.includes('?')));
  });
});
req.end();
