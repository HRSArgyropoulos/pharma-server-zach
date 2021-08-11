const router = require('express').Router();
const { updateTermValidation } = require('../../validation/term');
const {
  updateTerm,
  deleteTerm,
} = require('../../database/actions/term');

const updateTermInDb = async (req, res, next) => {
  // get id from path (remove first char '/' )
  const termId = req.path.slice(1);

  updateTerm(termId, req.body)
    .then((termDoc) => {
      // term was not found
      if (!termDoc)
        throw {
          statusCode: 404,
          errorMessage: 'Undefined term',
        };

      // term was found and successfully updated
      return res.status(200).json({ term: termDoc });
    })
    .catch((err) => next(err));
};

const deleteTermFromDb = async (req, res, next) => {
  // get id from path
  const termId = req.path.slice(1);

  // delete term
  deleteTerm(termId)
    .then((term) => {
      // term not found
      if (!term)
        throw {
          statusCode: 404,
          errorMessage: 'Undefined Term',
        };

      // term found and deleted
      return res.status(200).json({ term });
    })
    .catch((err) => next(err));
};

router.put('/:id', updateTermValidation, updateTermInDb);
router.delete('/:id', deleteTermFromDb);

module.exports = router;
