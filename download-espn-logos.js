const axios = require('axios');
const fs = require('fs');
const path = require('path');

const LEAGUES = [
  {
    name: 'NBA',
    url: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams',
  },
  {
    name: 'NFL',
    url: 'https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams',
  },
  {
    name: 'NCAA Division 1',
    url: 'https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams',
  },
];

function slugify(name) {
  return (name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function downloadImage(url, filepath) {
  const writer = fs.createWriteStream(filepath);
  const response = await axios({ url, method: 'GET', responseType: 'stream' });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function downloadESPNLogos() {
  for (const league of LEAGUES) {
    console.log(`Fetching teams for ${league.name}...`);
    try {
      const { data } = await axios.get(league.url);
      const teams = data.sports[0].leagues[0].teams;
      if (!teams || !teams.length) {
        console.warn(`No teams found for ${league.name}`);
        continue;
      }
      for (const t of teams) {
        const team = t.team;
        const logoUrl = team.logos && team.logos[0] && team.logos[0].href;
        if (!logoUrl) continue;
        const filename = `${slugify(team.displayName)}.png`;
        const dir = path.join(__dirname, 'src/assets/img/teams');
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        const filepath = path.join(dir, filename);
        try {
          await downloadImage(logoUrl, filepath);
          console.log(`Downloaded: ${filename}`);
        } catch (err) {
          console.error(`Failed: ${filename}`, err.message);
        }
      }
    } catch (err) {
      console.error(`Failed to fetch teams for ${league.name}:`, err.message);
    }
  }
}

downloadESPNLogos();

