const UserProfile = require('./userprofileModel')
const crudControllers = require('../../utils/crud')

// const me = (req, res) => {
//   res.status(200).json({ data: req.user })
// }

// const updateMe = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.user._id, req.body, {
//       new: true
//     })
//       .lean()
//       .exec()

//     res.status(200).json({ data: user })
//   } catch (e) {
//     console.error(e)
//     res.status(400).end()
//   }
// }
// const me = (req, res) => { res.status(200).json({ msg: "Hello" }) }
// const updateMe = (req, res) => { res.status(200).json({ msg: "Hello" }) }

// const addMe = (req, res) => crudControllers(User).createOne

// const addMe = (req, res) => {
//   console.log("inside add me")
//   res.status(201).send()
// }
// console.log("usercontroller.js : ",typeof crudControllers)
// console.log("usercontroller.js : ",typeof User)

// const getOne = (model = User) => async (req, res) => {
// const getOne = (model) => async (req, res) => {
//     try {
//         const doc = await model
//             .findOne({_id: "5fbe0f7e98f8c64071e56b3b" })
//             // .lean()
//             .exec()

//         if (!doc) {
//             return res.status(400).end()
//         }

//         res.status(200).json({ data: doc })
//     } catch (e) {
//         console.error(e)
//         res.status(400).end()
//     }
// }


// const crudControllers = model => ({
//     getOne: getOne(model),
//     // createOne: createOne
//     // removeOne: removeOne(model),
//     // updateOne: updateOne(model),
//     // getMany: getMany(model),
// })

module.exports = { controllers: crudControllers(UserProfile), 
                     }