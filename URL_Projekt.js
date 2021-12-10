const express = require ("express")
const app = express()
app.use(express.urlencoded({extended : false}))


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
    res.send("<h1>Wellcome to our Company</h1> " + " \n" + `Listening on port ${port}`)
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


app.get("/api/addUser", (req, res) => {                 //addUser Seite get()
    res.send(
        `
        <h1>hallo pleasse enter your name</h1>
        <form action="/api/result" method="POST">
            <input type= "text" name ="name">
            <button>Submit</button>
            </form>

        `
    )
})


app.post("/api/result", (req, res) => {             // Das neue User Dataien nachdem addUser
    const newUser = {
        id : Company.length + 1,
        name : req.body.name
    }
    Company.push(newUser)
    res.send(newUser)
})


const port = process.env.PORT || 3000;              // Das Port einsetzen entweder automatisch oder auf 3000
app.listen(port, () => `Listening on port ${port}`)