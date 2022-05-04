const express = require('express');
var cors = require('cors');
const session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
const cookieParser = require("cookie-parser");

const app = express();
const port = 8080;
app.use(cors())
app.use(express.static("./public"))

app.use(express.json())
app.use(cookieParser());




app.use(express.static('resume_files'))
app.use('/api/v1/routes',require('./routes/routes'))
// app.use('/api/v1/routes',require('./routes/routes'))


// app.use('/api/notes',require('./routes/notes'))
app.listen(port,()=>{

    console.log(`Example app listing at http://localhost:${port}`);
})