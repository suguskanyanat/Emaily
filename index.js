const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({ bye: 'buddy' });
}); //route handler

const PORT = process.env.PORT || 5001; //if there isn't env vari defined by host, go assign vari to port 5001 (default)
app.listen(PORT); //Express tells node to listen to traffic coming on port 5001
