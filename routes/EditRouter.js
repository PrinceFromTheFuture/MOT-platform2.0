const express = require('express')
const { findById } = require('./../models/actionModel')
const router = express.Router()
const allActionsCollection = require('./../models/actionModel')
const mongoose = require("mongoose");


router.get('/Edit/:id', async (req, res) => { 

  const id = mongoose.Types.ObjectId(req.params.id.trim()) // solution to the id problem
  const CurrentActionAccess = await allActionsCollection.findById(id)

  
  let date = CurrentActionAccess.dateTime
  const year = date.getUTCFullYear() 
  let month = date.getMonth() +1 ;
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()

  let monthFixer = ''
  let dayFixer = ''
  let hourFixer = ''
  let minuteFixer = ''

  if (month < 10){
    monthFixer = '0'
  }
  if (day < 10){
    dayFixer = '0'
  }
  if (hour < 10){
    hourFixer = '0'
  }
  if (minute < 10){
    minuteFixer = '0'
  }  


  let typeIncome
  let typeOutcome

  if (CurrentActionAccess.type == 'outcome'){
    typeOutcome = 'checked'
  }else{
    typeIncome = 'checked'
  }

  switch(CurrentActionAccess.MethodsOfPayment){

    case 'Peper Debit': {var peperDebitPayment = 'checked'; break;}
    case 'OneZero Debit': {var oneZeroDebitPayment = 'checked'; break;}
    case 'Cash': {var cashPayment = 'checked'; break;}
  }

  switch(CurrentActionAccess.budget){

    case 'Clothing': {var ClothingTypeBudget = 'checked'; break;}
    case 'Transportation': {var TransportationTypeBudget = 'checked'; break;}
    case 'Spendings': {var SpendingsTypeBudget = 'checked'; break;}
    case 'Enrichment': {var EnrichmentTypeBudget = 'checked'; break;}
    case 'Gifts': {var GiftsTypeBudget = 'checked'; break;}
    case 'UWFE': {var UWFETypeBudget = 'checked'; break;}
    case 'Savings': {var SavingsBudget = 'checked'; break;}
  }

  const fifieldsArray = [{
    dateTimeShow : (` ${year}-${monthFixer}${month}-${dayFixer}${day}T${hourFixer}${hour}:${minuteFixer}${minute} `),
    typeOutcome,
    typeIncome,

    peperDebitPayment,
    oneZeroDebitPayment,
    cashPayment,

    ClothingTypeBudget,
    TransportationTypeBudget,
    SpendingsTypeBudget,
    EnrichmentTypeBudget,
    GiftsTypeBudget,
    UWFETypeBudget,
    SavingsBudget

 }]

//console.log(fifieldsArray)
  res.render('ActionsPages/editAction', {CurrentAction: CurrentActionAccess, fifieldsArray: fifieldsArray  })

})




module.exports = router


