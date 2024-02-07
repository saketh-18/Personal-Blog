import express from "express";
import bp from "body-parser";
import pkg from "path";
const { dirname } = pkg;
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

let heading;
let body;
let footer;

let storage = [];

app.set('view engine', 'ejs'); 

app.use(bp.urlencoded({extended : true}));

// setting public as folder to store static files
app.use(express.static('public'));

// landing on home page
app.get("/" , (req , res) => {
    res.sendFile(__dirname + "/index.html");
})

// write page
app.get("/write" , (req , res) => {
    res.sendFile(__dirname + "/write.html");
})

// passing data from write page to view page and redirecting to view page
app.post("/submit" , (req , res) => {
    heading = req.body["title"];
    body = req.body["article"];
    footer = req.body["remarks"];
    res.render("view.ejs" , {heading : heading , article : body , remarks : footer});
    res.redirect("/view");
    res.render("/edit.ejs" , {heading : heading , article : body , remarks : footer})
    storage.push({heading , article , remarks})
    console.log(storage);
})

// manually navigating view page 
app.get("/view" , (req , res) => {
    res.render("view.ejs" , {heading : heading , article : body , remarks : footer});
})

// getting edit page with values in write and view pages
app.get("/edit" , (req , res) => {
    res.render("edit.ejs" , {heading : heading , article : body , remarks : footer})
})

// redirecting from view page to edit page
app.get("/editNow" , (req , res) => {
    res.redirect("/edit");
})


// submtting the edited version
app.post("/submit-edited" , (req , res) => {
    heading = req.body["title"];
    body = req.body["article"];
    footer = req.body["remarks"];
    res.render("view.ejs" , {heading : heading , article : body , remarks : footer});
})

// an option to delete text
app.get("/delete" , (req ,  res) =>{ 
    heading ="";
    body = "";
    footer = "";
    res.render("view.ejs" , {heading : "article deleted ! " , article : body , remarks : footer});
    res.redirect("/view");
})


//listening on port 

app.listen(3000 , (req, res) => {
    console.log("succesfully running on port 3000");
})

// differently linking css in html pages when using public folder
// using ejs engine to render ejs pages
// using public folder to store static files
// name value is used in first parameter of app.post/get , req.body have input values of forms in the form of an array