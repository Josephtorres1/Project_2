$(document).ready(() => {
  const cardOneTitle = $(".cardOne-title");
  const cardTwoTitle = $(".cardTwo-title");
  const cardThreeTitle = $(".cardThree-title");
  const cardFourTitle = $(".cardFour-title");
  const cardFiveTitle = $(".cardFive-title");
  const cardSixTitle = $(".cardSix-title");

  const cardOneImg = $("#cardOneImage");
  const cardTwoImg = $("#cardTwoImage");
  const cardThreeImg = $("#cardThreeImage");
  const cardFourImg = $("#cardFourImage");
  const cardFiveImg = $("#cardFiveImage");
  const cardSixImg = $("#cardSixImage");

  const cardOneText = $(".cardOne-text");
  const cardTwoText = $(".cardTwo-text");
  const cardThreeText = $(".cardThree-text");
  const cardFourText = $(".cardFour-text");
  const cardFiveText = $(".cardFive-text");
  const cardSixText = $(".cardSix-text");

  function getRandomProtein() {
    const proteinList = ["chicken", "beef", "pork", "shrimp", "lamb", "turkey"];
    const randomProtein =
      proteinList[Math.floor(Math.random() * proteinList.length)];
    return randomProtein;
  }

  function getRandomVegetable() {
    const vegetableList = ["broccoli", "carrot", "onion", "tomato", "garlic"];
    const randomVegetable =
      vegetableList[Math.floor(Math.random() * vegetableList.length)];
    return randomVegetable;
  }

  function getRandomGrain() {
    const grainList = ["rice", "brown rice", "quinoa", "penne", "spaghetti"];
    const randomGrain = grainList[Math.floor(Math.random() * grainList.length)];
    return randomGrain;
  }

  const ingredient1 = getRandomProtein();
  const ingredient2 = getRandomVegetable();
  const ingredient3 = getRandomGrain();

  const apiID = "613de366";
  const apiKey = "d7b048cb96c5addf0f22f91ffb7205e4";
  const edamamQueryUrl = `https://api.edamam.com/search?q=${ingredient1}+${ingredient2}+${ingredient3}&app_id=${apiID}&app_key=${apiKey}&from=0&to=6&calories=300-1500`;

  $.ajax({
    url: edamamQueryUrl,
    method: "GET",
    success: function (data) {
      if ((data.more = false)) {
        return;
      }
      console.log(data);
      cardOneTitle.text(data.hits[0].recipe.label);
      cardOneImg.attr("src", data.hits[0].recipe.image);
      cardOneText.text(data.hits[0].recipe.url);
      cardOneText.attr("href", data.hits[0].recipe.url);

      cardTwoTitle.text(data.hits[1].recipe.label);
      cardTwoImg.attr("src", data.hits[1].recipe.image);
      cardTwoText.text(data.hits[1].recipe.url);
      cardTwoText.attr("href", data.hits[1].recipe.url);

      cardThreeTitle.text(data.hits[2].recipe.label);
      cardThreeImg.attr("src", data.hits[2].recipe.image);
      cardThreeText.text(data.hits[2].recipe.url);
      cardThreeText.attr("href", data.hits[2].recipe.url);

      cardFourTitle.text(data.hits[3].recipe.label);
      cardFourImg.attr("src", data.hits[3].recipe.image);
      cardFourText.text(data.hits[3].recipe.url);
      cardFourText.attr("href", data.hits[3].recipe.url);

      cardFiveTitle.text(data.hits[4].recipe.label);
      cardFiveImg.attr("src", data.hits[4].recipe.image);
      cardFiveText.text(data.hits[4].recipe.url);
      cardFiveText.attr("href", data.hits[4].recipe.url);

      cardSixTitle.text(data.hits[5].recipe.label);
      cardSixImg.attr("src", data.hits[5].recipe.image);
      cardSixText.text(data.hits[5].recipe.url);
      cardSixText.attr("href", data.hits[5].recipe.url);
    },
  });
});
