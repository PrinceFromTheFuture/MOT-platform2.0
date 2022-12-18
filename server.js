const express = require('express') // allow this server to use express
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express() //calls app express as a function
const allActionsRoute = require('./routes/allActions')//allows the app to use allActions.js rout thew defining a new contstent
const EditRouter = require('./routes/EditRouter')
const allActionsCollection = require('./models/actionModel')
const budgetCollection = require('./models/budgetsModel')
const balanceCollection = require('./models/balanceModel')



const DbURI = 'mongodb+srv://VisualStudioMongoDB-User:vkhElMbH0jhNdxXm@cluster1.zzgjrpk.mongodb.net/MOTcollection-test?retryWrites=true&w=majority';
mongoose.connect(DbURI, {useNewUrlParser: true, UseUnifiedTopology: true, })
.then((result) => 
app.listen(8080),
console.log('Connceted to Db')
)
.catch((err) => console.log(err));



app.set('view engine', 'ejs')// setting up a view engine

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {

    const CurrentBalance = await balanceCollection.findById('639caf675aaac8bfb3fdfe7c')
    const CurrentBudget = await budgetCollection.findById('63986e926bcd1bcfef2cbd0c')
    
    res.render('home', {CurrentBalance: CurrentBalance, CurrentBudget: CurrentBudget}) // the first vairable is the exported one to the home.ejs and the other reffers to the temp arry
 
})

app.use('/Actions', allActionsRoute) // uses the allActions.js route and defining a location to this route threw: /actions


app.use('/View', EditRouter) // uses the allActions.js route and defining a location to this route threw: /actions





  

    