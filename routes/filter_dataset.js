const express = require('express')
const router = express.Router()
var parser = new (require('simple-excel-to-json').XlsParser)();
var multer = require('multer')

// file uplaid middleware
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/uploads')
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname + "_" + Date.now())
  }
})

var upload = multer({
  storage: storage,
})

// excel convert to json
// filter document by Receipt id
router.post('/filter/dataset', upload.single('file'), async (req, res, next) => {
  if (req.file !== undefined) {

    var doc = parser.parseXls2Json(req.file.path);
    if (doc[0]) {
      var output = [];
      var finalArray = [];

      await doc[0].forEach((item) => {
        var existing = output.filter(function (v, i) {
          return v.Receipt === item.Receipt;
        });
        if (existing.length) {
          var existingIndex = output.indexOf(existing[0]);
          output[existingIndex].Product_Name = output[existingIndex].Product_Name.concat(item.Product_Name);
          output[existingIndex].Product_Code = output[existingIndex].Product_Code.concat(item.Product_Code);
        } else {
          item.Product_Name = [item.Product_Name];
          item.Product_Code = [item.Product_Code];
          return output.push(item);
        }
      })

      await output.map((data) => finalArray.push({ "Receipt": data.Receipt, "Product_Code": data.Product_Code, "Product_Name": data.Product_Name }))
      // return item greate than one
      const maxArr = await finalArray.filter((data) => {
        return data.length > 1
      })
      return res.json(finalArray)
      // return res.json(output.map((data) => [ data.Product_Name, data.Product_Code]))
    } else {
      return res.json({ error: "something went wrong!" })
    }
  } else {
    res.json({ error: "Upload the file!" })
  }
})

// excel convert to json
// filter document by Receipt id
router.get("/filter/dataset", async (req, res) => {
  var doc = parser.parseXls2Json('./dataset/excel/test.xls');
  if (doc[0]) {
    var output = [];
    var finalArray = [];

    await doc[0].forEach((item) => {
      var existing = output.filter(function (v, i) {
        return v.Receipt === item.Receipt;
      });
      if (existing.length) {
        var existingIndex = output.indexOf(existing[0]);
        output[existingIndex].Product_Name = output[existingIndex].Product_Name.concat(item.Product_Name);
        output[existingIndex].Product_Code = output[existingIndex].Product_Code.concat(item.Product_Code);
      } else {
        item.Product_Name = [item.Product_Name];
        item.Product_Code = [item.Product_Code];
        return output.push(item);
      }
    })

    const maxArr = await output.filter((data, index, array) => {
      return data.Product_Name.length > 1
    })

    await maxArr.map((data) => finalArray.push({ "Receipt": data.Receipt, "Product_Code": data.Product_Code, "Product_Name": data.Product_Name }))

    return res.json(finalArray)
    // return res.json(output.map((data) => [ data.Product_Name, data.Product_Code]))
  } else {
    return res.json({ error: "something went wrong!" })
  }
})

router.get("/convert/json", async (req, res) => {
  const dataset = require('../dataset/json/mar-jul')
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
  res.json(maxArr)
})

module.exports = router
