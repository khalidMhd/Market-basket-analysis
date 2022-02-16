const express = require('express')
const router = express.Router()
const fs = require('fs');
var multer = require('multer')
var parser = new (require('simple-excel-to-json').XlsParser)();
const { FPGrowth, Itemset } = require('node-fpgrowth');
const loginRequire = require('../middleware/requireLogin');
const userIdFromJWT = require('../middleware/userIdJWT');
const userModel = require('../models/user')
const fileModel = require('../models/file')

// file uplaid middleware
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/uploads')
  },

  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1]

    cb(null, `${file.originalname}_${Date.now()}`)
  }
})

var upload = multer({
  storage: storage,
})

const filterDatasetExcel = async (file) => {
  var output = [];
  var finalArray = [];
  var removeDuplicate = []
  var fpgrowth = new FPGrowth(.001);

  try {
    var doc = await parser.parseXls2Json(file)
  } catch (err) {
    return message = { status: 422, message: "Invalid File!" }
  }

  if (doc[0][0].Product_Name !== undefined && doc[0][0].Receipt !== undefined) {

    //filter dataset
    await doc[0].forEach((item) => {
      //merge product code and product name of same receitp
      var existing = output.filter(function (v, i) {
        return v.Receipt === item.Receipt;
      });

      if (existing.length) {
        var existingIndex = output.indexOf(existing[0]);
        output[existingIndex].Product_Name = output[existingIndex].Product_Name.concat(item.Product_Name);
        // output[existingIndex].Product_Code = output[existingIndex].Product_Code.concat(item.Product_Code);
      } else {
        item.Product_Name = [item.Product_Name];
        // item.Product_Code = [item.Product_Code];
        return output.push(item);
      }
    })
    // get receipt id and product name
    await output.map((data) => finalArray.push({ "Receipt": data.Receipt, "Product_Name": data.Product_Name }))

    // remove dublicate
    for (let i = 0; i < finalArray.length; i++) {
      await removeDuplicate.push(finalArray[i].Product_Name.filter(function (value, index, array) {
        return array.indexOf(value) === index;
      }))
    }

    // return item greate than one
    const maxArr = await removeDuplicate.filter((data) => {
      return data.length > 1
    })

    // apply fg growth
    const itemsets = await fpgrowth.exec(maxArr)

    // return item greate than one
    const filterRecord = await itemsets.filter((data) => {
      return data.items.length > 1
    })

    var totalFrequentItemsets = await filterRecord.length
    const freqSet = { status: 200, message: "Frequent itemsets found", totalFrequentItemsets, "frequentItemsets": filterRecord }
    // console.log(freqSet);
    return freqSet

  } else {
    return message = { status: 422, message: "Invalid File Headers Name." }
  }

}

const filterDatasetJson = async (file) => {
  var transactions = []
  var removeDuplicate = []
  var fpgrowth = new FPGrowth(.001);

  try {
    var dataset = JSON.parse(fs.readFileSync(file, 'utf8'));

  } catch (err) {
    return message = { status: 422, message: "Invalid File!" }
  }

  if (dataset[0].Product_Name !== undefined && dataset[0].Receipt !== undefined) {
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

    // apply fg growth
    const itemsets = await fpgrowth.exec(maxArr)

    // return item greate than one
    const filterRecord = await itemsets.filter((data) => {
      return data.items.length > 1
    })

    var totalFrequentItemsets = await filterRecord.length
    const freqSet = { status: 200, message: "Frequent itemsets found", totalFrequentItemsets, "frequentItemsets": filterRecord }
    // console.log(freqSet);
    return freqSet

  } else {
    return message = { status: 422, message: "Invalid File Headers Name." }
  }

}

router.post('/fp-growth-excel', loginRequire, upload.single('file'), async (req, res, next) => {

  const { type, support } = req.body

  //file size 12643778
  const fileSize = await parseInt(req.headers['content-length']);

  if (req.file !== undefined && type) {

    const userId = await userIdFromJWT(req.headers.authorization)
    const userData = await userModel.findOne({ _id: userId?._id, accStatus: true, isVerified: true })
    const userFileData = await fileModel.find({ user: userId?._id })

    if (!userData) {
      return res.status(422).json({ message: "Invalid user!" })
    }
    if (userData?.isPremium && userData) {

      await filterDatasetExcel(req.file.path).then(data => {

        if (data.status !== 200) {
          return res.status(422).json({ message: data?.message })
        } else {
          const fileModelDetails = new fileModel({
            user: userData?._id,
            file: req.file.path,
            type: type
          })

          fileModelDetails.save().then((result) => {
            return res.status(200).json(data)
          }).catch((err) => {
            res.status(422).json({ message: "Something went wrong!" })
          });
        }

      }).catch(err => {
        return res.status(422).json({ message: err })
      })

    } else {
      if (userFileData?.length < 3) {
        if (fileSize < 12643778) {

          await filterDatasetExcel(req.file.path).then(data => {

            if (data.status !== 200) {
              return res.status(422).json({ message: data?.message })
            } else {
              const fileModelDetails = new fileModel({
                user: userData?._id,
                file: req.file.path,
                type: type
              })

              fileModelDetails.save().then((result) => {
                return res.status(200).json(data)
              }).catch((err) => {
                res.status(422).json({ message: "Something went wrong!" })
              });
            }

          }).catch(err => {
            return res.status(422).json({ message: err })
          })

        } else {
          return res.status(422).json({ message: "File size exceeds the limit of 12 mb. Update to premium for larger files." })
        }
      } else {
        return res.status(422).json({ message: "Your account free limit has been reached. Update to premium." })
      }

    }

  } else {
    return res.status(422).json({ message: "Fill all the fields!" })
  }
})

router.post('/fp-growth-json', loginRequire, upload.single('file'), async (req, res, next) => {

  const { type, support } = req.body

  //file size 12643778
  const fileSize = await parseInt(req.headers['content-length']);

  if (req.file !== undefined && type) {
    const pathfilter = req.file.path.split('\\').slice(0).join('/');
  
    const userId = await userIdFromJWT(req.headers.authorization)
    const userData = await userModel.findOne({ _id: userId?._id, accStatus: true, isVerified: true })
    const userFileData = await fileModel.find({ user: userId?._id })

    if (!userData) {
      return res.status(422).json({ message: "Invalid user!" })
    }
    if (userData?.isPremium && userData) {

      await filterDatasetJson(pathfilter).then(data => {

        if (data.status !== 200) {
          return res.status(422).json({ message: data?.message })
        } else {
          const fileModelDetails = new fileModel({
            user: userData?._id,
            file: req.file.path,
            type: type
          })

          fileModelDetails.save().then((result) => {
            return res.status(200).json(data)
          }).catch((err) => {
            res.status(422).json({ message: "Something went wrong!" })
          });
        }

      }).catch(err => {
        return res.status(422).json({ message: err })
      })

    } else {
      if (userFileData?.length < 3) {
        if (fileSize < 12643778) {

          await filterDatasetJson(pathfilter).then(data => {

            if (data.status !== 200) {
              return res.status(422).json({ message: data?.message })
            } else {
              const fileModelDetails = new fileModel({
                user: userData?._id,
                file: req.file.path,
                type: type
              })

              fileModelDetails.save().then((result) => {
                return res.status(200).json(data)
              }).catch((err) => {
                res.status(422).json({ message: "Something went wrong!" })
              });
            }

          }).catch(err => {
            return res.status(422).json({ message: err })
          })

        } else {
          return res.status(422).json({ message: "File size exceeds the limit of 12 mb. Update to premium for larger files." })
        }
      } else {
        return res.status(422).json({ message: "Your account free limit has been reached. Update to premium." })
      }

    }

  } else {
    return res.status(422).json({ message: "Fill all the fields!" })
  }
})

router.get('/fp-growth-json', async (req, res, next) => {

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

  fpgrowth.exec(maxArr).then(async function (itemsets) {
    // Returns an array representing the frequent itemsets.
    var frequentItemsets = itemsets.items;
    // return item greate than one
    const filterRecord = await itemsets.filter((data) => {
      return data.items.length > 1
    })

    var totalFrequentItemsets = filterRecord.length

    return res.json({ totalFrequentItemsets, "frequentItemsets": filterRecord })
    // return res.json({ totalFrequentItemsets, itemsets})
  });
})

router.get('/kaggle', async (req, res, next) => {
  const transactions = require('../dataset/json/kaggle')
  var fpgrowthData = new FPGrowth(.01);

  fpgrowthData.exec(transactions)
    .then(async function (itemsets) {
      // Returns an array representing the frequent itemsets.
      var frequentItemsets = itemsets.items;
      var totalFrequentItemsets = itemsets.length

      // return item greate than one
      const filterRecord = await itemsets.filter((data) => {
        return data.items.length > 1
      })

      // return res.json(filterRecord)
      return res.json({ totalFrequentItemsets, itemsets })
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

      // return res.json(filterRecord.map(data => data.items.join(",")))
      return res.json(filterRecord)
    });
})


module.exports = router
