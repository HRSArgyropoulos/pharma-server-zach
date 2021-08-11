const TermsSchema = require('../models/terms');

// Update Term based on request body
const updateTerm = async (termId, termData) => {
  // update term
  const query = { key: termId };
  return TermsSchema.findOneAndUpdate(query, termData, {
    /* return the new form of doc (after the update has been applied) */
    new: true,
    /* ensures values passed to our model constructor that were not specified in our schema do not get saved to the db */
    strict: true,
  });
};

// Delete Term from database
const deleteTerm = async (termId) => {
  // find term and delete
  return TermsSchema.findOneAndDelete(
    { key: termId },
    {
      strict: true,
    }
  );
};

module.exports = { updateTerm, deleteTerm };
