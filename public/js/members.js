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
    newPantryInputQuantity.val("");
  }

  function insertRecipeItem() {
    const recipeItem = {
      text: $(this).document.getElementById("#recipeReference").innerText,
    };
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
        "<li class='list-group-item todo-item'>",
        "<span> Item: ",
        "<span id='recipeReference'>",
        inventoryItem.text,
        "</span>",
        "</span>",
        "<button id='pantryItemDelete' class='delete btn btn-danger'>Remove</button>",
        "<button class='complete btn btn-primary'>Add to recipe</button>",
        "</li>",
      ].join("")
    );

    $newInputRow.find("button.complete").data("id", inventoryItem.id);
    $newInputRow.find("button.delete").data("id", inventoryItem.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("todo", inventoryItem);
    return $newInputRow;
  }

  function createNewRecipeRow(recipeItem) {
    console.log(recipeItem);
    const $newInputRow = $(
      [
        "<li class='recipeList-group-item recipeList-item'>",
        "<span id='recipeItem'> Item: ",
        recipeItem.text,
        "</span>",
        "<button id='recipeItemDelete' class='delete btn btn-danger'>x</button>",
        "</li>",
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", recipeItem.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("recipeIngredient", recipeItem.text);
    return $newInputRow;
  }

  $("#exampleSubmit").click(() => {
    let ingredient1 = $("#recipeItem").text();
    ingredient1 = ingredient1.slice(7);
    // let ingredient2 = $("recipeItem").text();
    // ingredient2 = ingredient2.slice(7);
    // const ingredient2 = $("#ingredient2").val().trim();
    // const ingredient3 = $("#ingredient3").val().trim();

    const apiID = "613de366";
    const apiKey = "d7b048cb96c5addf0f22f91ffb7205e4";
    const edamamQueryUrl = `https://api.edamam.com/search?q=${ingredient1}&app_id=${apiID}&app_key=${apiKey}&from=0&to=10&calories=300-1500`;

    function createNewCard(providedRecipe) {
      const $newCard = $(
        [
          "<div class='card'>",
          "<img class='card-img-top' src='",
          providedRecipe.imgUrl,
          "' alt='Card image cap'/>",
          "<div class='card-body'>",
          "<h5 class=''card-title>",
          providedRecipe.title,
          "</h5>",
          "<hr />",
          "<a class='card-text' href='",
          providedRecipe.url,
          "'>",
          providedRecipe.url,
          "</a>",
          "<hr />",
          "<button class='addToFavorites'>Add to favorites</button>",
          "</div>",
          "</div>",
        ].join("")
      );
      $newCard.find("button.addToFavorites").data("id", providedRecipe.id);

      return $newCard;
    }
    function initializeFavoriteRecipes(providedRecipe) {
      const cardsToAdd = [];
      cardsToAdd.push(createNewCard(providedRecipe));
      cardDeck.prepend(cardsToAdd);
    }

    $.ajax({
      url: edamamQueryUrl,
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

        initializeFavoriteRecipes(providedRecipe1);
        initializeFavoriteRecipes(providedRecipe2);
        initializeFavoriteRecipes(providedRecipe3);

        console.log(data);
        console.log(data.hits.length);
        console.log(data.hits[0].recipe.label);
      },
    });
  });
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.username);
  });
});
