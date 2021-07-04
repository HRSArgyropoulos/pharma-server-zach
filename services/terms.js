const axios = require('axios');

// fetch terms from api
const initTerms = async ({ page = 1, size = 10 }) => {
  return axios.get(
    `${process.env.PHARMA_DATA_URL}/terms`,
    {
      params: {
        page,
        size,
      },
    }
  );
};

module.exports = { initTerms };
