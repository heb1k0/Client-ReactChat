const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});


app.use('/', express.static('public'));
app.get('*', function (req, res) {
  res.sendFile('index.html', {
    root: 'public',
  });
});


app.listen(3000, async() => {

    console.log("Server Running");

});
  

