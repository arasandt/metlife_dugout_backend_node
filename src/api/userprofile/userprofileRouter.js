const { Router } = require('express')
const { controllers } = require('./userprofileController')
// const { auth }  = require('../../utils/auth');

const router = Router()

router
  .route('/')
  .get(controllers.getOne)
  // .post(controllers.createOne)
  .delete(controllers.removeOne)
  .put(controllers.updateOne)

module.exports = router
