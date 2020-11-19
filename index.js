const express = require('express');
const app = express();
const port = 3000;
var path = __dirname + '/views/'; 

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.send('get');
   // console.log(`Trump API is running at port`);

    res.render(path + 'index')
});

app.post('/', (req, res) => {
    res.send('post')
});

app.listen(port, () => {
    console.log(`Trump API is running at port http://localhost:${port}`);
});
