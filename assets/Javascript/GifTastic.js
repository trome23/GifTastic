
//  South park characters array
    
var spArray = ["Mr. Garrison", "Kyle Broflovski", "Stan Marsh", "Kenny McCormick", "Eric Cartman", "Mr. Slave", "Randy Marsh", "Butters Stotch", "Tweek Tweak", "Token Black", "Towelie", "Mr. Hankey", "Ike Broflovski", "Chef", "Canadians"];

// Create a function that formats the name expected by the Giphy API
// (dashes instead of spaces, no dots, and all lower case)
var formatName = function (charName) {
  // Remove dots (e.g. Mr.), replace spaces with dashes, then lowercase names
  return charName = charName.replace('.', '').replace(' ', '-').toLowerCase();
}

// The parent div in which I want to append the buttons
var buttonParent = $('#buttons-list');
// Array that renders a new button to the page based on what the user types in input box 
var render = function () {
    // Loop through the character array, generate a button and append it to the parent
    for (let i = 0; i < spArray.length; i++) {
        var character = spArray[i];
        var myButton = '<button data-search="' + formatName(character) + '">' + character + '</button>';
        buttonParent.append(myButton);
    }
    attachLoadGifHandler();
}

// Function to submit the new button
$('#item-search').submit(function () {
    // Clear out all of the buttons
    buttonParent.empty();
    // Push the data entered into the form into our names array
    spArray.push($('#searchBar').val()); 
    // Re render the buttons
    render();
    return false;
})

//function to add gifs to new button generated from submit bar and pre-existing buttons on the page
var attachLoadGifHandler = function () {
    // On click event to display 10 gifs relating to the word on the button
    $("button").on("click", function() {
        var x = $(this).data("search");
        console.log(x);

        var queryURL = "https://api.giphy.com/v1/gifs/search?&q=south%20park%20" + x + "&api_key=1bNGrlJ2oTvuncnETFmqLXNtUA7R8kr2&limit=10"; 
        console.log(queryURL);
    // Using ajax to access the GIPHY API
    // AJAX request     
        $.ajax({url:queryURL, method:'GET'})
            .done(function(response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++){
                var tempVar = $("<img>");
                    tempVar.addClass("addGif");
                    tempVar.attr("src", response.data[i].images.fixed_width.url);
                    tempVar.attr("data-still", response.data[i].images.fixed_width_still.url);
                    tempVar.attr("data-animate", response.data[i].images.fixed_width.url);
                    tempVar.attr("data-state", "animate");

                $("#spGifs").prepend("<p>Rating: " + response.data[i].rating + "</p>");
                $("#spGifs").prepend(tempVar);
            }
            
        })

    })

}

$(document).on("click", ".addGif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

// Now I will need to call it so that it renders when the page is first loaded
render();

    
   
