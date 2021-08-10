const router = require('express').Router();
const { updateTermValidation } = require('../../validation/term');
const { updateTerm } = require('../../database/actions/term');

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
      return res.status(200).json({ key: termDoc.key });
    })
    .catch((err) => next(err));
};

router.put('/:id', updateTermValidation, updateTermInDb);

module.exports = router;
