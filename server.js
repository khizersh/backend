// Server creating stuff


const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
app.listen(5000 , () => console.log(`server is running on ${PORT}`));


// creating apis stuff

app.get('/' , (req , res) => res.send('Api is running....'));