const express = require("express");
const app = express();
const { resolve } = require("path");
const port = process.env.PORT || 3001;

app.use('/', express.static(resolve(__dirname, './build')));

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
});