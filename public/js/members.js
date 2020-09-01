$(document).ready(() => {
  const newPantryInput = $("#pantryItemInput");
  const newPantryInputQuantity = $("#pantryItemInputQuantity");
  const newPantryInputExpiration = $("#pantryItemInputExpiration");
  const pantryContainer = $(".todo-container");
  const recipeContainer = $(".recipeInventory-container");
  // Calling function to retrieve items in api/pantry
  getInventory();
  getRecipeList();
  // On submit we insert list item
  $(document).on("submit", "#inventory-form", insertItem);
  $(document).on("click", "#pantryItemDelete", deletePantryItem);
  $(document).on("click", "#recipeItemDelete", deleteRecipeItem);
  $(document).on("click", "button.complete", insertRecipeItem);

  let pantry = [];
  let recipeIngredients = [];

  function insertItem(event) {
    event.preventDefault();
    const inventoryItem = {
      text: newPantryInput.val().trim(),
      quantity: parseInt(newPantryInputQuantity.val()),
      expiration: newPantryInputExpiration[0].value,
    };
    $.post("/api/pantry", inventoryItem, getInventory);
    newPantryInput.val("");
    newPantryInputQuantity.val("");
    newPantryInputExpiration.val("");
  }

  function insertRecipeItem() {
    const recipeItem = {
      text: document.getElementById("recipeReference").innerHTML,
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
        "<span> | Quantity: ",
        inventoryItem.quantity,
        "</span>",
        "<span> | Expiration: ",
        inventoryItem.expiration.slice(0, 10),
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button id='pantryItemDelete' class='delete btn btn-danger'>x</button>",
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

    // function createURL() {
    //   if (ingredient1 && !null) {
    //     edamamQueryUrl =
    //     return;
    //   }
    // }

    $.ajax({
      url: edamamQueryUrl,
      method: "GET",
      success: function (data) {
        console.log(data);
        console.log(data.hits[0].recipe.label);
        console.log(data.hits[1].recipe.label);
        console.log(data.hits[2].recipe.label);
        console.log(data.hits[3].recipe.label);
        console.log(data.hits[4].recipe.label);
      },
    });
  });
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.username);
  });
});
