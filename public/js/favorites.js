$(document).ready(() => {
  const cardDeck = $(".card-deck");
  $(document).on("click", ".deleteBtn", deleteFavoritesItem);

  let favoriteRecipes = [];

  function createNewCard(favoriteRecipe) {
    const $newCard = $(
      [
        "<div class='card'>",
        "<img class='card-img-top' src='",
        favoriteRecipe.imgUrl,
        "' alt='Card image cap'/>",
        "<div class='card-body'>",
        "<h5 class=''card-title>",
        favoriteRecipe.title,
        "</h5>",
        "<hr />",
        "<a class='card-text' href='",
        favoriteRecipe.url,
        "'>",
        favoriteRecipe.url,
        "</a>",
        "<hr />",
        "<button class='deleteBtn'>Remove</button>",
        "</div>",
        "</div>",
      ].join("")
    );
    $newCard.find("button.deleteBtn").data("id", favoriteRecipe.id);
    return $newCard;
  }

  function initializeFavoriteRecipes() {
    cardDeck.empty();
    const cardsToAdd = [];
    for (let i = 0; i < favoriteRecipes.length; i++) {
      cardsToAdd.push(createNewCard(favoriteRecipes[i]));
    }
    cardDeck.prepend(cardsToAdd);
  }

  function getFavoriteList() {
    $.get("/api/favoriteRecipes", (data) => {
      favoriteRecipes = data;
      initializeFavoriteRecipes();
      console.log(favoriteRecipes);
    });
  }

  function deleteFavoritesItem(event) {
    event.stopPropagation();
    const id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/favoriteRecipes/" + id,
    }).then(getFavoriteList);
  }

  getFavoriteList();
});
