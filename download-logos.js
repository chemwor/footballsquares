const axios = require('axios');
const fs = require('fs');
const path = require('path');

// TheSportsDB league IDs for NBA, NFL, NCAA Division 1 (replace with correct IDs)
const leagues = [
  { name: 'NBA', id: '4396' }, // NBA (Basketball)
  { name: 'NFL', id: '4391' }, // NFL (Football)
  { name: 'NCAA Division 1', id: '4419' } // NCAA Men's Basketball Division 1
];

const API_KEY = '123'; // Updated to use the free API key provided by the user

const getTeamsUrl = (leagueId) =>
  `https://www.thesportsdb.com/api/v1/json/${API_KEY}/lookup_all_teams.php?id=${leagueId}`;

const getLogoUrl = (team) =>
  team.strTeamBadge || team.strTeamLogo || team.strTeamJersey || team.strTeamFanart1;

const slugify = (name) =>
  (name || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

const downloadImage = async (url, filepath) => {
  const writer = fs.createWriteStream(filepath);
  const response = await axios({ url, method: 'GET', responseType: 'stream' });
  response.data.pipe(writer);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};

const downloadLogos = async () => {
  for (const league of leagues) {
    console.log(`Fetching teams for ${league.name}...`);
    try {
      const { data } = await axios.get(getTeamsUrl(league.id));
      // Debug: print the raw response for the first league
      if (league.name === 'NBA') {
        console.log('Raw API response for NBA:', JSON.stringify(data, null, 2));
      }
      const teams = data.teams || [];
      if (!teams.length) {
        console.warn(`No teams found for ${league.name} (id: ${league.id})`);
        continue;
      }
      for (const team of teams) {
        const logoUrl = getLogoUrl(team);
        if (!logoUrl) continue;
        const filename = `${slugify(team.strTeam)}.png`;
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
};

downloadLogos();
