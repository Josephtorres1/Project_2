// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      res.json({
        username: req.user.username,
        email: req.user.email,
        id: req.user.id,
      });
    }
  });
  // This is where we will start trying to create API routes for our inventory items
  //
  //
  //
  //
  app.get("/api/pantry", (req, res) => {
    db.Inventory2.findAll({}).then((dbInventory) => {
      res.json(dbInventory);
    });
  });

  app.post("/api/pantry", (req, res) => {
    db.Inventory2.create({
      text: req.body.text,
      quantity: req.body.quantity,
      expiration: req.body.expiration,
    }).then((dbInventory) => {
      res.json(dbInventory);
    });
  });

  app.get("/api/pantry/:id", (req, res) => {
    db.Inventory2.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbInventory) => {
      res.json(dbInventory);
    });
  });

  app.delete("/api/pantry/:id", (req, res) => {
    db.Inventory2.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbInventory) => {
      res.json(dbInventory);
    });
  });

  app.get("/api/recipeIngredients", (req, res) => {
    db.RecipeIngredients.findAll({}).then((dbIngredients) => {
      res.json(dbIngredients);
    });
  });

  app.post("/api/recipeIngredients", (req, res) => {
    db.RecipeIngredients.create({
      text: req.body.text,
    }).then((dbIngredients) => {
      res.json(dbIngredients);
    });
  });

  app.get("/api/recipeIngredients/:id", (req, res) => {
    db.RecipeIngredients.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbIngredients) => {
      res.json(dbIngredients);
    });
  });

  app.delete("/api/recipeIngredients/:id", (req, res) => {
    db.RecipeIngredients.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbIngredients) => {
      res.json(dbIngredients);
    });
  });

  app.get("/api/favoriteRecipes", (req, res) => {});

  app.post("/api/favoriteRecipes", (req, res) => {});

  app.get("/api/favoriteRecipe/:id", (req, res) => {});

  app.delete("/api/favoriteRecipe/:id", (req, res) => {});
};
