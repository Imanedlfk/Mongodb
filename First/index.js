//Ici, nous importons le module express pour utiliser le framework Express.
const express = require('express');
//Nous importons le module body-parser pour parser les données transmises dans les requêtes HTTP.
const bodyParser = require('body-parser');
const request = require('request');
//app.use(bodyParser.urlencoded({ extended: true }));
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Formulaire.html');
});

app.post('/submit', (req, res) => {

  const formData = req.body;
  console.log();
    request.post('http://servercontainer:3400/submit', { form: formData }, (err, response, body) => {
    if (err) {
      console.error(err);
      res.send('Error submitting form');
    } else {
      console.log(body);
      res.send(body);
    }
  });
});
app.listen(5057, () => {
  console.log('Server started on port 3000');
});