const TermsSchema = require('../models/terms');

// Insert All Terms into DB
const insertTerms = async (terms) => {
  let count = 0;
  try {
    for (const term of terms) {
      await TermsSchema.create(term);
      count++;
    }
    return { error: false, count };
  } catch (error) {
    console.error(error);
    return { error, count };
  }
};

// Get count of all documents in DB
const countTerms = async () => {
  return TermsSchema.estimatedDocumentCount();
};

module.exports = {
  insertTerms,
  countTerms,
};
