const TermsSchema = require('../models/terms');

// Insert All Terms into DB
const insertTerms = async (terms) => {
  try {
    for (const term of terms) {
      await TermsSchema.create(term);
    }
    console.log('Terms successfully saved in DB');
    return { error: false };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

// Get count of all documents in DB
const countTerms = async () => {
  return TermsSchema.estimatedDocumentCount();
};

module.exports = { insertTerms, countTerms };
