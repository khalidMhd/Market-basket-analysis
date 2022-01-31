const mongoose = require('mongoose');
mongoose.connect('mongodb://khalid:khalid21@drustdaam-shard-00-00.dxviv.mongodb.net:27017,drustdaam-shard-00-01.dxviv.mongodb.net:27017,drustdaam-shard-00-02.dxviv.mongodb.net:27017/fyp?ssl=true&replicaSet=atlas-qjn1rx-shard-0&authSource=admin&retryWrites=true&w=majority',
{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
console.log("Database Connected")
});
module.exports = db