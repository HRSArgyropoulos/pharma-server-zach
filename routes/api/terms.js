const router = require('express').Router();
const { getTermsValidation } = require('../../validation/terms');
const {
  paginatedTerms,
  exactCountTerms,
} = require('../../database/actions/terms');

const paginateTerms = async (req, res, next) => {
  // get param keys from request
  const { from, size } = req.query;

  // send params to pagination to return docs
  paginatedTerms(+from, +size)
    .then(async (docs) => {
      const count = await exactCountTerms();
      return res.status(200).json({ terms: docs, count });
    })
    .catch((err) => {
      next({
        statusCode: 400,
        errorMessage: err,
      });
    });
};

router.get('/getTerms', getTermsValidation, paginateTerms);

module.exports = router;
