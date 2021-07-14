const { initTerms } = require('../../services/terms');
const {
  insertTerms,
  countTerms,
} = require('../../database/actions/terms');

const createDbTerms = () => {
  countTerms().then((count) => {
    // if terms exist in db return message
    if (count)
      return console.log(
        `Database already has ${count} docs`
      );

    // if db is empty, fetch terms
    initTerms().then(async ({ data }) => {
      const terms = data._embedded.terms;
      // map terms as ui requested
      const termsData = terms.map((term) => ({
        key: term.obo_id,
        label: term.label,
        synonyms: term.synonyms
          ? term.synonyms.join(', ')
          : '-',
        obo_id: term.obo_id,
        term_editor: term.annotation['term editor']
          ? term.annotation['term editor'].join(', ')
          : '-',
        has_children: term.has_children,
      }));

      // insert all mapped terms into the DB
      insertTerms(termsData);
    });
  });
};

module.exports = { createDbTerms };
