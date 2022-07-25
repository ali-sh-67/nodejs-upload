const express=require('express');
const config = require('./config');
const app = express();
const methodOverride=require('method-override');
global.config = require('./config');

const userRouter=require('./routes/user')

app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');
app.use(methodOverride('method'));

app.get('/',(req,res)=>{
    res.render('index')
})
app.use('/user', userRouter);




app.listen(config.port,()=>console.log(`server run on port ${config.port}`));