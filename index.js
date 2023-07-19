const express = require('express')
const app = express()

const bodyparser = require('body-parser')
const path = require('path');
const db = require('./util/database')
var methodOverride = require('method-override');

// flash message dependencies
const session = require('express-session');
const flash = require('connect-flash')

    // config session
    app.use(
        session({
          secret: 'secret',
          resave: false,
          saveUninitialized: true,
          cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
          },
        })
      );
    //   setup flash message
    app.use(flash())


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: false}))

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory (optional but recommended)
app.set('views', path.join(__dirname, 'views'));

/*
    basicamente é pra sua api ser acessível e poder se modificada de outro host.
*/
app.get('/', (req,res,next) =>{
    // https://www.freecodecamp.org/portuguese/news/o-cabecalho-access-control-allow-origin-explicado-com-um-exemplo-de-cors/
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
    next()
})

 

// ? render Users page
app.get('/', (req,res,next) =>{
   res.redirect('/users',)
})
// ? render New Users page
app.get('/register', (req,res,next) =>{
    let msg = req.flash('registered')
    res.render('register', {page_name: 'register', msg})
})

// CRUD ROUTES
app.use('/users', require('./routes/users'))


// error handling
app.use((error,req,res,next) => {
    console.log(error);
    const status = error.statuscode || 500
    const message = error.message
    res.status(status).json({message: message})
})


// sync database
db
    .sync()
    .then(result => {
        console.log('database connected');
        app.listen(2020)
    })
    .catch(err => {
        console.log(err);
    } )