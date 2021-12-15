const express = require ("express")
const res = require("express/lib/response")
const app = express()

// Das gehört zum Path teil unten
const path = require("path")

// so dass ich auf req von der Seite zu greiffen kann
app.use(express.urlencoded({extended : false}))

/**
 In den nächsten drei zeilen werden wir eine Seite zurück liefern. 
 Dafür müssen wir das folgende Code schreiben 
 */
app.set("view engine", "ejs") // Definieren wir den Viewer
app.set("views",path.join(__dirname, "views"))  //Das Path des viewses ordner (views)



const Company = [
    {id : 1, name: "Max"},
    {id : 2, name: "Johan"},
    {id : 3, name: "Nino"},
    {id : 4, name: "Moh"},
    {id : 5, name: "Luca"},
    {id : 6, name: "David"},
    {id : 7, name: "Lois"},
]

app.get("/",(req,res) => {              // Begrüßung Seite
    console.log("User is online")
    res.render("home",{port})       
})


// app.get("/api/myUsers/:id", (req, res) => {          // User mit bestimmten ID zeigen 
//     if(req.params.id >= Company.length){
//         res.send(res.status(404).send("This User is undefined"))
//     }else {res.send(Company[req.params.id])}
// })


app.get("/api/myUsers/:id", (req, res) => {             // User mit bestimmten ID zeigen (2)
    const com = Company.find(emp => emp.id === parseInt(req.params.id))
    if (!com) {res.status(404).send("The User is not definde")}
    else {res.send(com)}
})


function getStatus (req, res, next) {       // Middleware function
    usOnline = true
    if (usOnline === true){
        next()
    }else {res.send("you are not online")}

}

app.get("/api/addUser",getStatus, (req, res) => {                 //addUser Seite get()
    res.render("addUserPage")                                   // mit render liefern wir eine Site zurück
})


app.post("/api/result", (req, res) => {             // zeigen Das neue User Dataien nachdem addUser
    
    const newUser = {
        id : Company.length + 1,
        name : req.body.name
    }
    if (newUser.name.length <= 3){
        res.send("The name is too short")
    }else {
        Company.push(newUser)
        res.send(newUser)
    }

})

app.get("/api/allUsers", (req, res) => {
    res.send(Company)
})

const port = process.env.PORT || 3000;              // Das Port einsetzen entweder automatisch oder auf 3000
app.listen(port, () => `Listening on port ${port}`)

// Test1