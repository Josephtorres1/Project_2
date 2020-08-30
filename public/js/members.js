$(document).ready(() => {
  const $newInventoryInput = $("input.new-item");
  const $todoContainer = $(".todo-container");
  // Calling function to retrieve items in api/pantry
  getInventory();
  // On submit we insert list item
  $(document).on("submit", "#inventory-form", insertItem);
  $(document).on("click", "button.delete", deleteTodo);

  function insertItem(event) {
    event.preventDefault();
    const inventoryItem = {
      text: $newInventoryInput.val().trim(),
    };
    console.log(inventoryItem);
    $.post("/api/pantry", inventoryItem, getInventory);
    $newInventoryInput.val("");
  }

  let pantry = [];

  function initializeRows() {
    $todoContainer.empty();
    const rowsToAdd = [];
    for (let i = 0; i < pantry.length; i++) {
      rowsToAdd.push(createNewRow(pantry[i]));
    }
    $todoContainer.prepend(rowsToAdd);
  }

  function getInventory() {
    $.get("/api/pantry", (data) => {
      pantry = data;
      initializeRows();
    });
  }

  function deleteTodo(event) {
    event.stopPropagation();
    const id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/pantry/" + id,
    }).then(getInventory);
  }

  function createNewRow(inventoryItem) {
    const $newInputRow = $(
      [
        "<li class='list-group-item todo-item'>",
        "<span>",
        inventoryItem.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>",
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", inventoryItem.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("todo", inventoryItem);
    return $newInputRow;
  }
  //
  //
  //
  //
  $("#exampleSubmit").click(() => {
    const ingredient1 = $("#ingredient1").val().trim();
    const ingredient2 = $("#ingredient2").val().trim();
    const ingredient3 = $("#ingredient3").val().trim();

    const apiID = "613de366";
    const apiKey = "d7b048cb96c5addf0f22f91ffb7205e4";
    const edamamQueryUrl = `https://api.edamam.com/search?q=${ingredient1}+${ingredient2}+${ingredient3}&app_id=${apiID}&app_key=${apiKey}&from=0&to=10&calories=300-1500`;
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
