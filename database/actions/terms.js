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

// Insert One Document into DB
const insertTerm = async (term) => {
  const newTerm = new TermsSchema(term);
  return newTerm.save();
};

// Check if term exists
const termExists = async (id) => {
  return await TermsSchema.findOne({ key: id }).exec();
};

// Create Term and Save in DB
const createNewTerm = async (term) => {
  // check if term already exists
  if (await termExists(term.key))
    throw {
      statusCode: 400,
      errorMessage: 'Term with that code already exists',
    };

  // insert term in DB
  return await insertTerm(term)
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      throw {
        statusCode: 400,
        errorMessage: err,
      };
    });
};

// Get (approximate) count of all documents in DB
const countTerms = async () => {
  return TermsSchema.estimatedDocumentCount();
};

// Return some terms from db for pagination requests
// (hide _id and __v)
const paginatedTerms = async (page, size) => {
  return TermsSchema.find({}, { _id: 0, __v: 0 })
    .skip((page - 1) * size)
    .limit(size)
    .exec();
};

// Count all documents (exact)
const exactCountTerms = async () => {
  return await TermsSchema.countDocuments();
};

module.exports = {
  insertTerms,
  createNewTerm,
  countTerms,
  paginatedTerms,
  exactCountTerms,
};
