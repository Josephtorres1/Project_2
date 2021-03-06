$(document).ready(() => {
  const newPantryInput = $("#pantryItemInput");
  const pantryContainer = $(".pantry-container");
  const recipeContainer = $(".recipeInventory-container");
  const cardDeck = $(".card-deck");
  // Calling function to retrieve items in api/pantry
  getInventory();
  getRecipeList();
  // On submit we insert list item
  $(document).on("submit", "#pantry-form", insertItem);
  $(document).on("click", "#pantryItemDelete", deletePantryItem);
  $(document).on("click", "#recipeItemDelete", deleteRecipeItem);
  $(document).on("click", "button.complete", insertRecipeItem);
  $(document).on("click", ".addToFavorites", addtoFavorites);

  let pantry = [];
  let recipeIngredients = [];
  let inventoryItem;

  function insertItem(event) {
    event.preventDefault();
    inventoryItem = {
      text: newPantryInput.val().trim(),
    };
    $.post("/api/pantry", inventoryItem, getInventory);
    newPantryInput.val("");
  }

  function insertRecipeItem() {
    let recipeItem = {
      text: $(this).parent("#listText").text(),
    };
    recipeItem.text = recipeItem.text.slice(6, -19);
    $.post("/api/recipeIngredients", recipeItem, getRecipeList);
  }

  function initializeRows() {
    pantryContainer.empty();
    const rowsToAdd = [];
    for (let i = 0; i < pantry.length; i++) {
      rowsToAdd.push(createNewRow(pantry[i]));
    }
    pantryContainer.prepend(rowsToAdd);
  }

  function initializeRecipeRows() {
    recipeContainer.empty();
    const rowsToAdd = [];
    for (let i = 0; i < recipeIngredients.length; i++) {
      rowsToAdd.push(createNewRecipeRow(recipeIngredients[i]));
    }
    recipeContainer.prepend(rowsToAdd);
  }

  function getInventory() {
    $.get("/api/pantry", (data) => {
      pantry = data;
      initializeRows();
    });
  }

  function getRecipeList() {
    $.get("/api/recipeIngredients", (data) => {
      recipeIngredients = data;
      initializeRecipeRows();
    });
  }

  function deletePantryItem(event) {
    event.stopPropagation();
    const id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/pantry/" + id,
    }).then(getInventory);
  }

  function deleteRecipeItem(event) {
    event.stopPropagation();
    const id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/recipeIngredients/" + id,
    }).then(getRecipeList);
  }

  function createNewRow(inventoryItem) {
    const $newInputRow = $(
      [
        "<li id='listText' class='list-group-item todo-item'>",
        "Item: ",
        inventoryItem.text,
        "<button id='pantryItemDelete' class='delete btn btn-danger'>Remove</button>",
        "<button class='complete btn btn-primary'>Add to recipe</button>",
        "</li>",
      ].join("")
    );

    $newInputRow.find("button.complete").data("id", inventoryItem.text);
    $newInputRow.find("button.delete").data("id", inventoryItem.id);
    return $newInputRow;
  }

  function createNewRecipeRow(recipeItem) {
    const $newInputRow = $(
      [
        "<li class='recipeList-group-item recipeList-item'>",
        "<span id='recipeItem'> Item: ",
        recipeItem.text,
        "</span>",
        "<button id='recipeItemDelete' class='delete btn btn-danger'>Remove</button>",
        "</li>",
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", recipeItem.id);
    return $newInputRow;
  }

  function addtoFavorites() {
    const favoriteRecipe = {
      title: $(this).parent().find(".card-title").text(),
      url: $(this).parent().find(".card-text").text(),
      imgUrl: $(this).data("id"),
    };
    $.post("/api/favoriteRecipes", favoriteRecipe);
  }

  $("#exampleSubmit").click(() => {
    function declareIngredient1() {
      if (recipeIngredients[0] === undefined) {
        return "";
      } else {
        return recipeIngredients[0].text;
      }
    }

    function declareIngredient2() {
      if (recipeIngredients[1] === undefined) {
        return "";
      } else {
        return recipeIngredients[1].text;
      }
    }

    function declareIngredient3() {
      if (recipeIngredients[2] === undefined) {
        return "";
      } else {
        return recipeIngredients[2].text;
      }
    }

    function getRecipeList() {
      $.get("/api/recipeIngredients", (data) => {
        recipeIngredients = data;
        console.log(recipeIngredients);
      });
    }

    getRecipeList();

    const ingredient1 = declareIngredient1();
    const ingredient2 = declareIngredient2();
    const ingredient3 = declareIngredient3();

    const apiID = "613de366";
    const apiKey = "d7b048cb96c5addf0f22f91ffb7205e4";
    function buildUrl() {
      if (ingredient1 && ingredient2 && ingredient3) {
        return `https://api.edamam.com/search?q=${ingredient1}+${ingredient2}+${ingredient3}&app_id=${apiID}&app_key=${apiKey}&from=0&to=10&calories=300-1500`;
      } else if (ingredient1 && ingredient2) {
        return `https://api.edamam.com/search?q=${ingredient1}+${ingredient2}&app_id=${apiID}&app_key=${apiKey}&from=0&to=10&calories=300-1500`;
      } else {
        return edamamQueryUrl;
      }
    }
    const edamamQueryUrl = `https://api.edamam.com/search?q=${ingredient1}&app_id=${apiID}&app_key=${apiKey}&from=0&to=10&calories=300-1500`;

    function createNewCard(providedRecipe) {
      const $newCard = $(
        [
          "<div class='card'>",
          "<img class='card-img-top' src='",
          providedRecipe.imgUrl,
          "' alt='Card image cap'/>",
          "<div class='card-body'>",
          "<h5 class='card-title'>",
          providedRecipe.title,
          "</h5>",
          "<hr />",
          "<a class='card-text' href='",
          providedRecipe.url,
          "'>",
          providedRecipe.url,
          "</a>",
          "<hr />",
          "<button id='" +
            providedRecipe.imgUrl +
            "' class='addToFavorites'>Add to favorites</button>",
          "</div>",
          "</div>",
        ].join("")
      );
      $newCard.find("button.addToFavorites").data("id", providedRecipe.imgUrl);
      $newCard.find("button.addToFavorites").data("name", providedRecipe.title);
      $newCard.find("button.addToFavorites").data("value", providedRecipe.url);

      return $newCard;
    }
    function initializeRecipes(providedRecipe) {
      const cardsToAdd = [];
      cardsToAdd.push(createNewCard(providedRecipe));
      cardDeck.prepend(cardsToAdd);
    }

    $.ajax({
      url: buildUrl(),
      method: "GET",
      success: function (data) {
        const providedRecipe1 = {
          title: data.hits[0].recipe.label,
          url: data.hits[0].recipe.url,
          imgUrl: data.hits[0].recipe.image,
        };

        const providedRecipe2 = {
          title: data.hits[1].recipe.label,
          url: data.hits[1].recipe.url,
          imgUrl: data.hits[1].recipe.image,
        };

        const providedRecipe3 = {
          title: data.hits[2].recipe.label,
          url: data.hits[2].recipe.url,
          imgUrl: data.hits[2].recipe.image,
        };

        cardDeck.empty();

        initializeRecipes(providedRecipe1);
        initializeRecipes(providedRecipe2);
        initializeRecipes(providedRecipe3);

        console.log(data);
      },
    });
  });
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.username);
  });
});
