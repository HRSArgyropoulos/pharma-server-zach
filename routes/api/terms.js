const router = require('express').Router();
const {
  paginatedTerms,
} = require('../../database/actions/terms');

router.get('/getTerms', async (req, res) => {
  // get param keys from request
  const { from, size } = req.query;

  // send params to pagination to return docs
  paginatedTerms(+from, +size)
    .then((docs) => {
      return res.status(200).json(docs);
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
