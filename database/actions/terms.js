const TermsSchema = require('../models/terms');

// Insert All Terms into DB
const insertTerms = async (terms) => {
  TermsSchema.insertMany(terms, (err, docs) => {
    if (err) return console.error(err);
    return console.log(
      `${docs.length} terms successfully saved in DB`
    );
  });
};

// Get count of all documents in DB
const countTerms = async () => {
  return TermsSchema.estimatedDocumentCount();
};

module.exports = {
  insertTerms,
  countTerms,
};
