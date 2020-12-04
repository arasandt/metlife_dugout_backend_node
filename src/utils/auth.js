const UserProfile = require("../api/userprofile/userprofileModel")
const jwt = require('jsonwebtoken')
const config = require('../config')

const newToken = userprofile => {
  return jwt.sign({ id: userprofile.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

const auth = async (req, res, next) => {
  // console.log("inside auth")
  let token = ""
  try {
    token = req.header('Authorization').replace('Bearer ', '');
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate'}); 
  }

  let payload
  try {
    payload = await verifyToken(token)
  } catch (e) {
    return res.status(401).send({ error: 'Invalid authentication #1' })
  }

  if (payload.id != req.query.id) {
    return res.status(401).send({ error: 'Invalid authentication #1' })
  }

  const userprofile = await UserProfile.findOne({id: payload.id})
    .select('-password')
    .lean()
    .exec()

  if (!userprofile) {
    return res.status(401).send({ error: 'Invalid authentication #2' })
  }

  req.userprofile = userprofile

  next();

};

const signIn = async (req, res) => {
  if (!req.body.id || !req.body.password) {
    return res.status(400).send({ message: 'Require id and password' })
  }
  const invalid = { message: 'Invalid id/password combination' }
  try {
    const userprofile = await UserProfile.findOne({ id: req.body.id })
      .select('id password')
      .exec()
    if (!userprofile) {
      return res.status(401).send(invalid)
    }
    const match = await userprofile.checkPassword(req.body.password)
    if (!match) {
      return res.status(401).send(invalid)
    }
    const token = newToken(userprofile)
    await UserProfile.findOneAndUpdate({ id: req.body.id }, {token})
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    res.status(500).send({ error: 'Invalid authentication #2' })
  }
}

const signUp = async (req, res) => {
  // console.log("inside signup")
  try {
    const userprofile = await UserProfile.create(req.body)
    const token = newToken(userprofile)
    await UserProfile.findOneAndUpdate({ id: req.body.id }, {token})
    return res.status(201).send({ token })
  } catch (e) {
    return res.status(500).send({ message: 'ID already exists' })
  }
}

module.exports = { auth, signIn, signUp };
