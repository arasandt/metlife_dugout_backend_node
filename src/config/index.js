const { merge } = require('lodash')
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 3000,
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '1d'
  },
  dbUrl: "testdburl"
}

let envConfig = {}

switch (env) {
  case 'dev':
  case 'development':
    envConfig = require('./dev.env')
    break
  case 'test':
  case 'testing':
    envConfig = require('./testing.env')
    break
  default:
    envConfig = require('./dev.env')
}

const config = merge(baseConfig, envConfig) 
console.log("Running in environment :", config.env.toUpperCase())
module.exports = config
