const router = require('express').Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  // get param keys from request
  const { from, size } = req.query;
  // validation
  // check if param keys are integers
  if (
    !Number.isInteger(+from) ||
    !Number.isInteger(+size)
  ) {
    return res
      .status(400)
      .json({ error: 'Invalid Parameters' });
  }
  // fetch data
  try {
    const response = await axios.get(
      `${process.env.PHARMA_DATA_URL}/terms`,
      {
        params: {
          page: from,
          size: size,
        },
        timeout: 10000,
      }
    );
    const termsData = response.data._embedded.terms;
    const responseData = termsData.map((term) => {
      return {
        key: term.obo_id,
        label: term.label,
        synonyms: term.synonyms
          ? term.synonyms.join(', ')
          : '-',
        obo_id: term.obo_id,
        term_editor: term.annotation['term editor']
          ? term.annotation['term editor'].join(', ')
          : '-',
        has_children: term.has_children,
      };
    });
    return res.status(200).json({
      terms: [...responseData],
      count: size,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
