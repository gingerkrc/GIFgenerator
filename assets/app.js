      // Array of button topics
var topics = ["Cat", "Dog", "Kid", "Grandma", "Mom", "Dad", "Cake", "Wedding"];

function generateFail() {

var fail = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
fail + " fail" + "&api_key=qX6Q3JmmRYZaFDobSTnJ5wS44rETsldc&limit=10";


$.ajax({
  url: queryURL,
  method: "GET"
})
  .then(function(response) { // data is known as "response"
    var results = response.data;
    console.log(response);

    for (var i = 0; i < results.length; i++) { // Goes through data we got back and adds them to page
      var failDiv = $("<div>"); //creates div container

    // Creates p tag for rating and adds text to it
    var rating = results[i].rating; 
    var p = $("<p>").text("Rating: " + rating); 

    var failImage = $("<img>");
    failImage.attr("src", results[i].images.fixed_height_still.url);
    failImage.attr("data-still", results[i].images.fixed_height_still.url);
    failImage.attr("data-animate", results[i].images.fixed_height.url);
    failImage.attr("data-state", "still");
    failImage.addClass('failImage');

    failDiv.prepend(p);

    failDiv.prepend(failImage);
    $("#gifs").prepend(failDiv);
    }

    $(".failImage").on("click", function() {
      var state = $(this).attr("data-state");
      console.log(state);

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  });  
}

function createButtons() {

      $("#btns").empty();

      for(var i = 0; i < topics.length; i++) {

      // dynamicaly generates buttons for each movie in the array
        var failAdd = $("<button>");
        failAdd.addClass("fail");
        failAdd.attr("data-name", topics[i]);
        failAdd.text(topics[i]);
        $("#btns").append(failAdd);
      }
    }

  
  $("#add-fail").on("click", function(event){
      event.preventDefault();

      var fail = $("#fail-input").val().trim();
      topics.push(fail);
      createButtons();
    });
    $(document).on("click", ".fail", generateFail);

    createButtons();
