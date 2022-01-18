const express = require('express')
const router = express.Router()
const { Apriori, Itemset, IAprioriResults } = require('node-apriori');

router.get('/apriori', async (req, res, next) => {
  const dataset = require('../dataset/json/july-oct')

  // Execute Apriori with a minimum support of 40%.
  var apriori = new Apriori(.001);
  var transactions = []
  var removeDuplicate = []

  //return transactions product name
  await dataset.map((data) => transactions.push(data.Product_Name))

  // remove duplicate items in same transactions
  for (let i = 0; i < transactions.length; i++) {
    await removeDuplicate.push(transactions[i].filter(function (value, index, array) {
      return array.indexOf(value) === index;
    }))
  }

  // return item greate than one
  const maxArr = await removeDuplicate.filter((data) => {
    return data.length > 1
  })

  // Returns itemsets 'as soon as possible' through events.
  await apriori.on('data', (itemset) => {
    // Do something with the frequent itemset.
    var support = itemset.support;
    var items = itemset.items;
    // console.log(`Itemset { ${items.join(', ')} } is frequent and have a support of ${support}`);
  });

  await apriori.exec(maxArr)
    .then(async (result) => {
      // Returns both the collection of frequent itemsets and execution time in millisecond.
      var frequentItemsets = result.itemsets;
      var totalFrequentItemsets = result.itemsets.length;
      var executionTime = result.executionTime + " ms";

      // return item greate than one
      const filterRecord = await frequentItemsets.filter((data) => {
        return data.items.length > 1
      })

      // return res.status(200).json(filterRecord)

      return res.json({ totalFrequentItemsets, executionTime, "frequentItemsets": filterRecord });
    });

})

module.exports = router
