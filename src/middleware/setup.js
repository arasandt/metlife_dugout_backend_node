const { urlencoded, json } = require("body-parser")
const morgan = require("morgan")

module.exports = (app) => {
    app.use(morgan("dev"))
    app.use(urlencoded({ extended: true }))
    app.use(json())
}

