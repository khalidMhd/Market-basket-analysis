const express = require('express')
const router = express.Router()
const { FPGrowth, Itemset } = require('node-fpgrowth');


router.get('/fpgrowth', async (req, res, next) => {
  const dataset = require('../dataset/json/july-oct')
  // Execute Apriori with a minimum support of 40%.
  var fpgrowth = new FPGrowth(.001);

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
  await fpgrowth.on('data', function (itemset) {
    // Do something with the frequent itemset.
    var support = itemset.support;
    var items = itemset.items;
    // console.log(`Itemset { ${items.join(',')} } is frequent and have a support of ${support}`);
  });

  fpgrowth.exec(maxArr)
    .then(async function (itemsets) {
      // Returns an array representing the frequent itemsets.
      var frequentItemsets = itemsets.items;
      var totalFrequentItemsets = itemsets.length
      console.log(totalFrequentItemsets);
      // return item greate than one
      const filterRecord = await itemsets.filter((data) => {
        return data.items.length > 1
      })

      return res.json({totalFrequentItemsets,"frequentItemsets":filterRecord})
      // return res.json({ totalFrequentItemsets, itemsets})
    });
})

router.get('/kaggle', async (req, res, next) => {
  const transactions = require('../dataset/json/kaggle')
  var fpgrowthData = new FPGrowth(.0001);

  fpgrowthData.exec(transactions)
    .then(async function (itemsets) {
      // Returns an array representing the frequent itemsets.
      var frequentItemsets = itemsets.items;
      var totalFrequentItemsets = itemsets.length

      // return item greate than one
      const filterRecord = await itemsets.filter((data) => {
        return data.items.length > 1
      })

      return res.json(filterRecord)
      // return res.json({ totalFrequentItemsets, itemsets})
    });
})

router.post('/test', async (req, res, next) => {
  const transactions = req.body
  var fpgrowthData = new FPGrowth(.0001);

  fpgrowthData.exec(transactions)
    .then(async function (itemsets) {
      // Returns an array representing the frequent itemsets.
      var frequentItemsets = itemsets.items;
      var totalFrequentItemsets = itemsets.length

      // return item greate than one
      const filterRecord = await itemsets.filter((data) => {
        return data.support > 1 && data.items.length > 1
      })

      console.log(filterRecord.map(data => data.support))

      // return res.json(filterRecord.map(data => data.items.join(",")))
      return res.json(filterRecord)
    });
})


module.exports = router
