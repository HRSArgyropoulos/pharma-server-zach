const router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  // get param keys from request
  const { page, size } = req.query;
  // fetch data
  try {
    const response = await axios.get(
      `${process.env.PHARMA_DATA_URL}/terms`,
      {
        params: {
          page: page,
          size: size,
        },
      }
    );
    const termsData = response.data._embedded.terms;
    return res.status(200).json(termsData);
  } catch (err) {
    return res
      .status(400)
      .json({ error: err.message });
  }
});

module.exports = router;
