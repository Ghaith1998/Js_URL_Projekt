const express = require ("express")
const app = express()

app.listen(3000)

app.get("/",(req,res) => {
    console.log("User Entered the page")
    res.send("Wellcome to my Website")
})