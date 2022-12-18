const express = require('express')
const { findById } = require('./../models/actionModel')
const router = express.Router()
const mongoose = require("mongoose");
const saveActionAndRedirect = require('../Functions/saveActionAndRedirect')
const allActionsCollection = require('./../models/actionModel')
const budgetCollection = require('./../models/budgetsModel')
const balanceCollection = require('./../models/balanceModel')


router.get('/EditBudgets', async (req, res) => { // delete button
  
  let CurrentBudget = await budgetCollection.findByIdAndUpdate('63986e926bcd1bcfef2cbd0c')

    
    res.render('editBudgets', {CurrentBudget: CurrentBudget}) // the first vairable is the exported one to the home.ejs and the other reffers to the temp arry

})

router.post('/EditBudgetPost', async (req, res) => { 
  
  let CurrentBudget = await budgetCollection.findByIdAndUpdate('63986e926bcd1bcfef2cbd0c')
 
  CurrentBudget.Clothing = req.body.Clothing
  CurrentBudget.Transportation = req.body.Transportation
  CurrentBudget.Spendings = req.body.Spendings
  CurrentBudget.Enrichment = req.body.Enrichment
  CurrentBudget.Gifts = req.body.Gifts
  CurrentBudget.UWFE = req.body.UWFE
  CurrentBudget.Savings = req.body.Savings


  try {
    CurrentBudget = await CurrentBudget.save()
    console.log(CurrentBudget)
 

     }catch (e) {
     console.log(e)
   }
    
    res.redirect('/') // the first vairable is the exported one to the home.ejs and the other reffers to the temp arry
  
  
})





router.get('/allActions', async (req, res) => {

  const tempActionsArray = await allActionsCollection.find().sort({
  createdAt: 'desc'}).limit()// needs action in modfication stage

  res.render('ActionsPages/allActions', {tempActions: tempActionsArray}) // the first vairable is the exported one to the home.ejs and the other reffers to the temp arry

})

router.get('/EditBalances', async (req, res) => { // delete button
  
  let CurrentBalance = await balanceCollection.findByIdAndUpdate('639caf675aaac8bfb3fdfe7c')

    
    res.render('editBalance', {CurrentBalance: CurrentBalance}) // the first vairable is the exported one to the home.ejs and the other reffers to the temp arry
  
    
})

router.post('/EditBalancePost', async (req, res) => { 
  
  let CurrentBalance = await balanceCollection.findByIdAndUpdate('639caf675aaac8bfb3fdfe7c')
 
  CurrentBalance.oneZeroBank = req.body.OneZeroBalance
  CurrentBalance.pepperBank = req.body.PepperBalance
  CurrentBalance.cash = req.body.CashBalance

  try {
    CurrentBalance = await CurrentBalance.save()
    console.log(CurrentBalance)
 

     }catch (e) {
     console.log(e)
   }
    
    res.redirect('/') // the first vairable is the exported one to the home.ejs and the other reffers to the temp arry
  
  
})




router.get('/new', async (req, res) => { //new action page

  const fifieldsArray = [{
    dateTimeShow: '0000-00-00T00:00:00',
    typeOutcome: '',
    typeIncome: '',
    peperDebitPayment: '',
    oneZeroDebitPayment: '',
    cashPayment: '',
    ClothingTypeBudget: '' ,
    TransportationTypeBudget: '',
    SpendingsTypeBudget: '',
    EnrichmentTypeBudget: '',
    GiftsTypeBudget: '',
    UWFETypeBudget: '',
    SavingsBudget: ''
 }]

  res.render('ActionsPages/newAction', {CurrentAction: new allActionsCollection(), fifieldsArray:fifieldsArray })//renders the page: newAction.ejs

})


router.post('/',async (req, res, next) => {  // save action


  const typeBudget = req.body.budget
  const typeBalance = req.body.MethodsOfPayment
  const newAmount = req.body.amount
  const actionType = req.body.type

  if(actionType == 'outcome'){ // the following code reducing the the item price from the matching budget
    
    

    let CurrentBudget = await budgetCollection.findByIdAndUpdate('63986e926bcd1bcfef2cbd0c');

      switch(typeBudget){
            
          case 'Clothing': CurrentBudget.Clothing -= Number(newAmount); break;
          case 'Transportation': CurrentBudget.Transportation -= Number(newAmount); break;
          case 'Spendings': CurrentBudget.Spendings -= Number(newAmount); break;
          case 'Enrichment': CurrentBudget.Enrichment -= Number(newAmount); break;
          case 'Gifts': CurrentBudget.Gifts -= Number(newAmount); break;
          case 'UWFE': CurrentBudget.UWFE -= Number(newAmount); break;
          case 'Savings': CurrentBudget.Savings -= Number(newAmount); break;

       }
    
       try {
        CurrentBudget = await CurrentBudget.save()
        console.log(CurrentBudget)
     
   
         }catch (e) {
         console.log(e)
       }
       

  let CurrentBalance = await balanceCollection.findByIdAndUpdate('639caf675aaac8bfb3fdfe7c');
  {
   switch(typeBalance){

    case 'Cash': CurrentBalance.cash -= Number(newAmount); break;
    case 'OneZero Debit': CurrentBalance.oneZeroBank -= Number(newAmount); break;
    case 'Peper Debit': CurrentBalance.pepperBank -= Number(newAmount); break;
  }

  }
   try {
   CurrentBalance = await CurrentBalance.save()
   console.log(CurrentBalance)

    }catch (e) {
    console.log(e)
    }

 } else if(actionType == 'income'){

  let CurrentBudget = await budgetCollection.findByIdAndUpdate('63986e926bcd1bcfef2cbd0c');

  CurrentBudget.Clothing += Number(newAmount) * 0.04
  CurrentBudget.Transportation += Number(newAmount) * 0.03
  CurrentBudget.Spendings += Number(newAmount) * 0.1
  CurrentBudget.Enrichment += Number(newAmount) * 0.2
  CurrentBudget.Gifts += Number(newAmount) * 0.03
  CurrentBudget.UWFE += Number(newAmount) * 0.05
  CurrentBudget.Savings += Number(newAmount) * 0.550



  try {
    CurrentBudget = await CurrentBudget.save()
    console.log(CurrentBudget)
 
     }catch (e) {
     console.log(e)
     }

     let CurrentBalance = await balanceCollection.findByIdAndUpdate('639caf675aaac8bfb3fdfe7c');
     {
      switch(typeBalance){
   
       case 'Cash': CurrentBalance.cash += Number(newAmount); break;
       case 'OneZero Debit': CurrentBalance.oneZeroBank += Number(newAmount); break;
       case 'Peper Debit': CurrentBalance.pepperBank += Number(newAmount); break;
     }
   
     }
      try {
      CurrentBalance = await CurrentBalance.save()
      console.log(CurrentBalance)
   
       }catch (e) {
       console.log(e)
       }

 } else console.log('new Action modification failed successfuly')

 req.CurrentAction = new allActionsCollection()

    next()

}, saveActionAndRedirect('newAction'))



router.put('/:id',async (req, res, next) => {  // update action

  const id = mongoose.Types.ObjectId(req.params.id.trim())
  req.CurrentAction = await allActionsCollection.findById(id)

  
  const newAmount = req.body.amount // the following code reducing the the item price from the matching budget and refunding the old budget from the old matching price
  const newTypeBudget = req.body.budget
  const newTypeBalance = req.body.MethodsOfPayment

  if(req.CurrentAction.type == 'outcome'){
    
    const oldTypeBudget = req.CurrentAction.budget
    const oldAmount = req.CurrentAction.amount
    const oldTypeBalance = req.CurrentAction.MethodsOfPayment



    let CurrentBudget = await budgetCollection.findByIdAndUpdate('63986e926bcd1bcfef2cbd0c');

      switch(oldTypeBudget){
            
          case 'Clothing': CurrentBudget.Clothing += Number(oldAmount); break;
          case 'Transportation': CurrentBudget.Transportation += Number(oldAmount); break;
          case 'Spendings': CurrentBudget.Spendings += Number(oldAmount); break;
          case 'Enrichment': CurrentBudget.Enrichment += Number(oldAmount); break;
          case 'Gifts': CurrentBudget.Gifts += Number(oldAmount); break;
          case 'UWFE': CurrentBudget.UWFE += Number(oldAmount); break;
          case 'Savings': CurrentBudget.Savings += Number(oldAmount); break;

       }
       switch(newTypeBudget){
            
        case 'Clothing': CurrentBudget.Clothing -= Number(newAmount); break;
        case 'Transportation': CurrentBudget.Transportation -= Number(newAmount); break;
        case 'Spendings': CurrentBudget.Spendings -= Number(newAmount); break;
        case 'Enrichment': CurrentBudget.Enrichment -= Number(newAmount); break;
        case 'Gifts': CurrentBudget.Gifts -= Number(newAmount); break;
        case 'UWFE': CurrentBudget.UWFE -= Number(newAmount); break;
        case 'Savings': CurrentBudget.Savings -= Number(newAmount); break;

     }
    
       try {
        CurrentBudget = await CurrentBudget.save()
        console.log(CurrentBudget)
     
   
         }catch (e) {
         console.log(e)
       }

       let CurrentBalance = await balanceCollection.findByIdAndUpdate('639caf675aaac8bfb3fdfe7c');
       {
        switch(oldTypeBalance){
     
          case 'Cash': CurrentBalance.cash += Number(oldAmount); break;
          case 'OneZero Debit': CurrentBalance.oneZeroBank += Number(oldAmount); break;
          case 'Peper Debit': CurrentBalance.pepperBank += Number(oldAmount); break;
        }

        switch(newTypeBalance){
     
         case 'Cash': CurrentBalance.cash -= Number(newAmount); break;
         case 'OneZero Debit': CurrentBalance.oneZeroBank -= Number(newAmount); break;
         case 'Peper Debit': CurrentBalance.pepperBank -= Number(newAmount); break;
       }
     
       }
        try {
          CurrentBalance = await CurrentBalance.save()
        console.log(CurrentBalance)
     
         }catch (e) {
         console.log(e)
         }
         
  }
  
  
  
 
  next()
 
 }, saveActionAndRedirect('Edit'))

 



router.get('/:id', async (req, res) => { // view button


  const id = mongoose.Types.ObjectId(req.params.id.trim()) // solution to the id problem
  const CurrentActionAccess = await allActionsCollection.findById(id)

  if(CurrentActionAccess == null) res.redirect('/')

  res.render('ActionsPages/showAction', {CurrentAction: CurrentActionAccess,})

})



router.delete('/:id', async (req, res) => { // delete button
  
  try {

    const id = mongoose.Types.ObjectId(req.params.id.trim()) // solution to the id problem
    await allActionsCollection.findByIdAndDelete(id)
    res.redirect('allActions') 
  
  }catch (e) {
    res.redirect('/')
    console.log(e)
  }
  
})






module.exports = router


