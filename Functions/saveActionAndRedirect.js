function saveActionAndRedirect(path){

    return async (req, res) =>{
      
      
      let CurrentAction = req.CurrentAction
  
        CurrentAction.title = req.body.title
        CurrentAction.description = req.body.description
        CurrentAction.dateTime = req.body.dateTime
        CurrentAction.amount = req.body.amount
        CurrentAction.type = req.body.type
        CurrentAction.MethodsOfPayment = req.body.MethodsOfPayment
        CurrentAction.budget = req.body.budget
     
    try {
      CurrentAction = await CurrentAction.save()
      res.redirect(`/Actions/${CurrentAction.id}`) 
      console.log(CurrentAction.dateTime)
    
    }catch (e) {
      res.render(`ActionsPages/${path}`, {CurrentAction:CurrentAction} )
      console.log(e)
    }
    }
  
    
  }

  module.exports = saveActionAndRedirect;