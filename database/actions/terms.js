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

// Get (approximate) count of all documents in DB
const countTerms = async () => {
  return TermsSchema.estimatedDocumentCount();
};

// Return some terms from db for pagination requests
const paginatedTerms = async (page, size) => {
  return await TermsSchema.find({})
    .skip(page * size)
    .limit(size)
    .exec();
};

module.exports = {
  insertTerms,
  countTerms,
  paginatedTerms,
};
