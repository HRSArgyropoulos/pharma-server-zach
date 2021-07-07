const router = require('express').Router();
const { initTerms } = require('../../services/terms');
const {
  insertTerms,
  countTerms,
} = require('../../database/actions/terms');

router.get('/getTerms', async (req, res) => {
  // check if DB is empty
  countTerms().then((count) => {
    console.log(count);
    if (count)
      return res
        .status(200)
        .json({ status: 'DB has terms', count });
    else {
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
        const termsInsertion = await insertTerms(
          termsData
        ); // wait for insertion status to send back the response
        if (termsInsertion.error)
          return res.status(400).json(termsInsertion);
        res.status(200).json({
          message: 'Terms successfully saved in DB',
          docs: termsData,
        });
      });
    }
  });
  // fetch data from api
});

module.exports = router;
