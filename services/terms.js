const axios = require('axios');

// fetch terms from api
const initTerms = async () => {
  return axios.get(process.env.API_URI);
};

module.exports = { initTerms };
