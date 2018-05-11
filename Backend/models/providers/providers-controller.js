const ProvidersDAO = require('./providers-dao')
const mongoose = require('../../config/connection')

//Save Provider function with Async Await
exports.saveProvider = async (req, res, next) => {
  try{

      let body = req.body
      let newProvider = new ProvidersDAO(body).save(function(err, provider){
        console.log(provider)
        if(provider) return res.status(200).json({msg : 'Provider correctly saved', provider : provider})
        else return res.status(404).json({msg : "No se guardó el documento"})
      })
  }catch(e){
    console.log(e)
    return res.status(500).json({msg: 'Sorry. This is a Server Error. We are fixing it the most quickly we can', error : e})
  }
};

//Get All Providers function with Async Await
exports.getAll = async (req, res, next) => {
  try {
    let providers = await ProvidersDAO.getAll()
    if (!providers) res.status(404).json({msg: "Doesn't exists Providers records."})
    else res.send(providers)
  } catch (e) {
    console.log(e)
    res.status(500).json({msg: 'Sorry. This is a Server Error. We are fixing it the most quickly we can', error : e})
  }
}

//Get one Provider by Id, function with Async Await
exports.getById = async (req, res, next) => {
  try{
    let id = req.params.id
    let provider = await ProvidersDAO.getById(id)
    if (!provider) res.status(404).json({msg: "Doesn't exist Provider record with this id."})
    else res.send(provider)

  }catch(e){
    res.status(500).json({msg: 'Sorry. This is a Server Error. We are fixing it the most quickly we can', error : e})
  }
}

//Update Provider function with Async Await
exports.updateProvider = async (req, res, next) => {
  try{

      let id = req.params.id
      let body = req.body
      let provider = await ProvidersDAO.getById(id)
      if(!provider) return res.status(404).json({msg: "Doesn't exist Provider record with this id"})
      let providerToUpdate = await ProvidersDAO.updateProvider(id, body)
      return res.status(200).json({msg: "Provider correctly updated"})

  }catch(e){
    console.log(e)
    return res.status(500).json({msg: "Sorry. This is a Server Error. We are fixing it the most quickly we can", error : e})
  }
};

//Delete Provider function with Async Await
exports.deleteProvider = async (req, res, next) => {
  try{
      let id = req.params.id
      let provider = await ProvidersDAO.getById({ _id: id})
      if(!provider) return res.status(404).json({msg: "Doesn't exist Provider record with this id."})
      let prov_delete = await ProvidersDAO.deleteProvider(id)
      return res.status(200).json({msg: "Resource was deleted correctly"})

  }catch(e){
    console.log(e);
    return res.status(500).json({msg: "Sorry. This is a Server Error. We are fixing it the most quickly we can", error : e})
  }
};
