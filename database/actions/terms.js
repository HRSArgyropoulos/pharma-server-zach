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

module.exports = { insertTerms };
