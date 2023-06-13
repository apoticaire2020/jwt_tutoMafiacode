const express = require('express');
const morgan = require('morgan');
const createErrors = require('http-errors');
require('dotenv').config();
require('./helpers/init_mongoDb') ;

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

const authRoute = require('./Routes/auth.route');


app.get('/' , async ( req , res) => { res.send("salam express"); }); 
app.use('/auth', authRoute)

app.use(async (req, res , next) => {
    next(createErrors.NotFound('this routes does not exist'))
 })

 app.use((err , req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status : err.status || 500,
            message : err.message 
        }
    })
 } );


 const PORT = process.env.PORT || 3000;


app.listen(PORT , () => { console.log('listening on port ' + PORT); });