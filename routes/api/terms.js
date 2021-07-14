const router = require('express').Router();
const {
  paginatedTerms,
  exactCountTerms,
} = require('../../database/actions/terms');

router.get('/getTerms', async (req, res) => {
  // get param keys from request
  const { from, size } = req.query;

  // send params to pagination to return docs
  paginatedTerms(+from, +size)
    .then(async (docs) => {
      const count = await exactCountTerms();
      return res
        .status(200)
        .json({ terms: docs, count });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(401)
        .send(
          '$ref: "#/components/responses/UnauthorizedError"'
        );
    });
});

module.exports = router;
