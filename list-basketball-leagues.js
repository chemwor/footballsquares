const axios = require('axios');

const API_KEY = '123';

async function listBasketballLeagues() {
  const url = `https://www.thesportsdb.com/api/v1/json/${API_KEY}/all_leagues.php`;
  const { data } = await axios.get(url);
  console.log('Raw API response:', JSON.stringify(data, null, 2)); // Debug print
  if (!data.leagues) {
    console.error('No leagues found in API response.');
    return;
  }
  const basketballLeagues = data.leagues.filter(l => l.strSport === 'Basketball');
  basketballLeagues.forEach(l => {
    console.log(`${l.strLeague} (${l.strCountry || 'N/A'}): idLeague=${l.idLeague}`);
  });
}

listBasketballLeagues();
