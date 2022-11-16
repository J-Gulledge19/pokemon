require("dotenv").config()
const express = require('express'); 
const pokemon = require("./models/pokemon"); 
const methodOverride = require("method-override") 

const app = express();

app.use(express.urlencoded({extended: true})) 
app.use(methodOverride("_method"))
app.use("/static", express.static("public")) 

app.get("/", (req, res) => res.redirect("/pokemon"))

// HOME ROUTE
app.get('/pokemon', (req, res) => {
  
    res.render(
        'index.ejs',
        {
            pokemon:pokemon
        }
        
    );
});

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});