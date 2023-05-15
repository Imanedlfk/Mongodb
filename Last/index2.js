const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://mongo:27017/formCollection', {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});
const weather = new MongoClient('mongodb://mongo:27017/dbform', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/submit', async function (req, res) {
  const data = req.body;
  console.log(data);
 
  try {
    await weather.connect();
    console.log('Connected to MongoDB server');
    
    const collection = weather.db("dbform").collection("formCollection");
    collection.insertOne(data, (err, result) => {
      if (err) throw err;
      console.log("Data inserted!");
      
      weather.close();
    })
    res.send('Data inserted!');
    // Your MongoDB operations go here
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
})

const port = 3400;
app.listen(port, () => console.log(`App running on port ${port}`));
