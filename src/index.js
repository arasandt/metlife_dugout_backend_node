const app = require("./server")
const config = require("./config")
const { connect } = require('./utils/db')
const port = config.port

const start = async () => {
    try {
        await connect()
        app.listen(port, () => { 
            console.log(`Connected to DB. REST API available on port ${port}`) 
            // app.emit("appStarted")
        })
        
    } catch (err) {
        console.log(err)
    }
}

start()

module.exports = app

//sudo kill -9 $(sudo lsof -t -i:3000)
// git reset --hard <commit-hash>
// git push -f origin master