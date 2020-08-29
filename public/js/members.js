$(document).ready(() => {
  $("#exampleSubmit").click(() => {
    const ingredient1 = $("#ingredient1").val().trim();
    const ingredient2 = $("#ingredient2").val().trim();
    const apiID = "613de366";
    const apiKey = "d7b048cb96c5addf0f22f91ffb7205e4";
    const edamamQueryUrl = `https://api.edamam.com/search?q=${ingredient1}+${ingredient2}+${ingredient3}&app_id=${apiID}&app_key=${apiKey}&from=0&to=10&calories=591-722`;
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
    $(".member-name").text(data.email);
  });
});
