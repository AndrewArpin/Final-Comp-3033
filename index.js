const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('get');
});

app.post('/', (req, res) => {
    res.send('post')
});

app.listen(port, () => {
    console.log(`Trump API is running at port http://localhost:${port}`)
});