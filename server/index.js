// to use router with our production code
const path = require('path');

const express = require('express')
require('dotenv').config()
const app = express()
const massive = require('massive')
const session = require('express-session')
const { SESSION_SECRET, SERVER_PORT, CONNECTION_STRING } = process.env
const controller = require('./controller')

app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // keep session for one weeknpm 
    }
}))

massive(CONNECTION_STRING)
.then(database => {
    app.set('db', database)
    console.log(`DATABASE: Connected`)
    app.listen(SERVER_PORT, () => {
        console.log(`SERVER: ${SERVER_PORT}`)
    })
})

// // for production build
// // point your server to your front end static files. This tells express to look for a build folder. 
// // The __dirname variable tells it to start at the current file where Node is running (i.e., your server file), 
// // and /../build tells it to then go up one file and into a build folder. 
// app.use( express.static( `${__dirname}/../build` ) );


//ENDPOINTS

// // auth
app.post('/auth/register', controller.register) 
app.post('/auth/login', controller.login)
app.get('/auth/logout', controller.logout)
app.get('/auth/continue-session', controller.continueSession)


// // items
app.post('/api/user-data', controller.getUserData)
// app.post('/api/items', controller.getUserItems)
app.post('/api/add-item', controller.addItem) 
app.put('/api/edit-item', controller.editItem)
app.post('/api/delete', controller.deleteItem) 

// //lists
// app.post('/api/lists', controller.getUserLists) //Dont think this is needed anymore
// app.put('/api/edit-list', controller.editList)
// app.post('/api/delete-list', controller.deleteList)
// app.post('/api/add-list', controller.addList)
// app.post('/api/add-list-item', controller.addListItem)
// app.post('/api/remove-list-item', controller.removeListItem)

// //Trips
// app.post('/api/add-trip', controller.addTrip)
// app.post('/api/delete-trip', controller.deleteTrip)
// app.put('/api/edit-trip', controller.editTrip)
// app.post('/api/add-trip-list', controller.addTripList)
// app.post('/api/delete-trip-list', controller.deleteTripList)

// app.post('/api/list-items', controller.getListItems)

// // for production build
// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// });