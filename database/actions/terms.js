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
// (hide _id and __v)
const paginatedTerms = async (page, size) => {
  return await TermsSchema.find({}, { _id: 0, __v: 0 })
    .skip(page * size)
    .limit(size)
    .exec();
};

// Count all documents (exact)
const exactCountTerms = async () => {
  return await TermsSchema.countDocuments();
};

module.exports = {
  insertTerms,
  countTerms,
  paginatedTerms,
  exactCountTerms,
};
