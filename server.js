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

//Create new pokemon route
app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
});

// Post new pokemon route
app.post("/pokemon", (req, res) => {
    const newPokemon = {
        name: req.body.name,
        type: req.body.type,
        img: req.body.img,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        }
    }
    pokemon.push(newPokemon);
  
    // redirect back to index page
    res.redirect("/pokemon");
});

// edit route
app.get("/pokemon/:id/edit", (req, res) => {
    
    res.render("edit.ejs", {
      pokemon: pokemon[req.params.id],
      index: req.params.id
    })
    
});
  
app.put("/pokemon/:id", (req, res) => {
    const updatedPoke = {
        name: req.body.name,
        type: req.body.type,
        img: req.body.img,
        stats: {
            hp: req.body.hp,
            attack: req.body.attack,
            defense: req.body.defense
        }
    }
    pokemon[req.params.id] = updatedPoke
  
    res.redirect("/pokemon")
  })

// Show page for rendered pokemon
app.get("/pokemon/:index", (req, res) => {

    res.render("show.ejs", {
      pokemon: pokemon[req.params.index],
      index: req.params.index
    });
  });

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});