// Server creating stuff

const express = require('express');
const app = express();
const connectDb = require('./config/db');
const PORT = process.env.PORT || 5000;

// connect to database
connectDb();
app.listen(5000 , () => console.log(`server is running on ${PORT}`));
app.use(express.json({extended: false}))
// test api
app.get('/' , (req , res) => res.send('Api is running....'));



// Routing here , here we define request path and to send which controller (User.js , auth.js)

app.use('/api/user' , require('./routes/api/user'));
app.use('/api/profile' , require('./routes/api/profile'));
app.use('/api/posts' , require('./routes/api/posts'));
app.use('/api/auth' , require('./routes/api/auth'));


