const express = require('express');
const app = express();
const router = express.Router()
const mongoose = require('mongoose')
const db = require('./config/keys')
var cors = require('cors')
const path = require('path');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const PORT =process.env.PORT || 5000
const dotenv = require('dotenv').config();


app.use(express.static(path.resolve('../server')));
app.use(cors())
app.use(express.json()) 

app.use('/api', require('./routes/app'))
app.use('/api', require('./routes/filter_dataset'))
app.use('/api', require('./routes/apriori'))
app.use('/api', require('./routes/fpgrowth'))
//client
app.use('/api', require('./routes/client/auth'))
app.use('/api', require('./routes/client/requestPremium'))
app.use('/api', require('./routes/client/messages'))
app.use('/api', require('./routes/client/user'))
//admin
app.use('/api/admin', require('./routes/admin/auth'))
app.use('/api/admin', require('./routes/admin/requestPremium'))
app.use('/api/admin', require('./routes/admin/user'))
app.use('/api/admin', require('./routes/admin/message'))

app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if(process.env.NODE_ENV=='production'){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
    });
}

app.listen(PORT,()=>{
    console.log('Port is running on PORT: ' , PORT)
})