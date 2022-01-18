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

app.use(express.static(path.resolve('../server')));
app.use(cors())
app.use(express.json()) 

app.use('/api', require('./routes/app'))
app.use('/api', require('./routes/filter_dataset'))
app.use('/api', require('./routes/apriori'))
app.use('/api', require('./routes/fpgrowth'))

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