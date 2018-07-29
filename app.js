// < !--adding click events to all buttons-- >
var searchArray = ["Donald Duck",
    "Doraemon",
    "ET",
    "Finding Nemo",
    "Frozen Elsa",
    "Gollum",
    "Mickey",
    "Moana",
    "Popeye",
    "PowerPuff Girls",
    "Tangled",
    "Yoda"];

$(document).ready(function () {
    createButtons();
    createButtonEvent();
    createSubmitEvent();
});

function createButtons() {
    for (var i = 0; i < searchArray.length; i++) {
        var searchStr = searchArray[i];
        var buttonObj = createButton(searchStr);
        $("#buttonList").append(buttonObj);
    }
}

function createButton(searchStr){
    var buttonObj = $("<button>");
    buttonObj.attr("data-cartoon", searchStr);
    buttonObj.attr("class", "charTag ml-2");
    buttonObj.text(searchStr);
    return buttonObj;
}

function createButtonEvent() {
    $("button.charTag").on("click", function () {
        // < !--storing the data - cartoon property to var topics from button -->
        var topics = $(this).attr("data-cartoon");
        //   < !--creating query url using data - cartoon-- >
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topics 
        + "&api_key=H890Ab3kCNkRDJwCvYtH8GKQRqikBdHZ&limit=10";

        // < !--requesting ajax with qURL here-- >
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // < !--responsing here-- >
            .then(function (response) {
                console.log(queryURL);
                console.log(response);

                //  storing ajax reponse in a var

                var result = (response.data);
                $("#giftastic").empty();

                // looping her for displaying gifs by appending

                for (i = 1; i <= 10; i++) {

                    // here we creating a new div and storing in var

                    var cartoonDiv = $("<div>");
                    cartoonDiv.attr("class", "col");

                    // creating p and rating tag

                    var p = $("<p>").text("Rating: " + result[i].rating);

                    // her we creating image div and storing in new var...

                    var cartoonImage = $("<img>");

                    //  setting source image attribute to cartoon image by array index

                    cartoonImage.attr("src", result[i].images.fixed_height_still.url);
                    cartoonImage.attr("data-still", result[i].images.fixed_height_still.url);
                    cartoonImage.attr("data-animate", result[i].images.fixed_height.url)
                    cartoonImage.attr("state", "still");

                    // here we appending images to the images to cartoonDiv
                    (cartoonDiv).append(p);
                    (cartoonDiv).append(cartoonImage);
                    addClickEventToImage(cartoonImage);
                    $("#giftastic").prepend(cartoonDiv);
                }

            });

    });
}

function addClickEventToImage(cartoonImage) {
    cartoonImage.on("click", function () {
        var state = cartoonImage.attr("state");

        if (state === "still") {
            var stillSource = cartoonImage.attr("data-animate");
            cartoonImage.attr("src", stillSource);
            cartoonImage.attr("state", "animate");
        } else {
            var animateSource = cartoonImage.attr("data-still");
            cartoonImage.attr("src", animateSource);
            cartoonImage.attr("state", "still");
        }

    });
}

function createSubmitEvent(){
    $("#submitSearch").submit(function(event ){
        var searchStr = $("input:text").val();
        console.log("Test :" + searchStr);
        searchArray.push(searchStr);
        
        var buttonObj = createButton(searchStr);
        $("#buttonList").append(buttonObj);
        createButtonEvent();
        event.preventDefault(); 
    });
}
