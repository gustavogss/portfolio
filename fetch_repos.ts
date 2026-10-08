import https from 'https';

const repos = ['task-manager', 'listadecompras', 'delivery', 'todolist-react', 'osint-toolkit', 'finexyia'];
const promises = repos.map(repo => {
  return new Promise((resolve) => {
    https.request(`https://api.github.com/repos/gustavogss/${repo}`, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    }).end();
  });
});

Promise.all(promises).then(results => {
  console.log(JSON.stringify(results.map((r:any) => ({
    name: r.name,
    description: r.description,
    topics: r.topics,
    language: r.language,
    url: r.html_url
  })), null, 2));
});
