const router = require('express').Router();
const {
  getTermsValidation,
  createTermValidation,
} = require('../../validation/terms');
const {
  paginatedTerms,
  exactCountTerms,
  createNewTerm,
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

const createTerm = async (req, res, next) => {
  const termData = req.body;

  createNewTerm(termData)
    .then((doc) => res.status(200).json({ term: doc }))
    .catch((err) => next(err));
};

router.get('/getTerms', getTermsValidation, paginateTerms);
router.post('/createTerm', createTermValidation, createTerm);

module.exports = router;
