var buttonData = ['Arnold Schwarzenegger', 'Chuck Norris', 'Will Ferrell',
              'The Rock'];

function populateButtons(){
  for (var k = 0; k < buttonData.length; k++){
    var gifBtn = $("<button class='gif-buttons'>");
    $(gifBtn).attr("data-person",buttonData[k]);
    $(gifBtn).text(buttonData[k]);
    $("#buttons").append(gifBtn);
    console.log(gifBtn.attr("data-person"));

  }

};

  populateButtons();


$("#search-button").click(function(event){
          $("#gifs-appear-here").empty();
          event.preventDefault();
          buttonData.push($(".form-control").val());
          $("#buttons").empty();
          populateButtons();
    });


$(document).on("click", ".gif-buttons", function() {

      $("#gifs-appear-here").empty();
      var person = $(this).attr("data-person");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating.toUpperCase());

            var personImage = $("<img>");
            personImage.attr("id","gif- " + (i + 1));
            //Set state to still
            var state = personImage.attr("data-state", "still");
            //Declare the still and animated images and assign them to respective attributes
            personImage.attr("data-still", results[i].images.fixed_height_still.url);
            personImage.attr("data-animate", results[i].images.fixed_height.url);
            personImage.attr("src", results[i].images.fixed_height_still.url);
            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

          $("#gifs-appear-here").prepend(gifDiv);
          };

    });


});

$('body').on('click','img', function(event){
                if ($(this).attr("data-state") === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                };
            });



