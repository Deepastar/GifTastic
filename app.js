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
    buttonObj.attr("class", "ml-2 mt-2 text-info");
    buttonObj.text(searchStr);
    return buttonObj;
}

function createButtonEvent() {
    $("button").on("click", function () {
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

                // looping here for displaying gifs for 10 counts

                for (i = 0; i < 10; i++) {

                    // here we creating a new div and storing in var

                    var cartoonDiv = $("<div>");

                    //  setting col attribute
                    cartoonDiv.attr("class", "col text-light");

                    // creating p and rating tag

                    var p = $("<p>").text("Rating: " + result[i].rating);

                    // her we creating image div and storing in new var...

                    var cartoonImage = $("<img>");

                    //  setting source image attribute to cartoon image by array index
                    cartoonImage.attr("src", result[i].images.fixed_height_still.url);
                    cartoonImage.attr("data-still", result[i].images.fixed_height_still.url);
                    cartoonImage.attr("data-animate", result[i].images.fixed_height.url)
                    cartoonImage.attr("state", "still");
                    
                    //Creating download button
                    // var downloadLnk = $("<a>");
                    // downloadLnk.attr("href", result[i].images.fixed_height.url);
                    // var downUrl = result[i].images.fixed_height.url;
                    // var filename = downUrl.substring(downUrl.lastIndexOf('/')+1);
                    // downloadLnk.attr("download", filename);
                    // downloadLnk.text("Download");

                    // here we appending into cartoonDiv with ptag(rating)  and images
                    (cartoonDiv).append(cartoonImage);
                    (cartoonDiv).append(p);
                    // (cartoonDiv).append(downloadLnk);
                    
                    

                    
                    // here we craeting evevt called addClickEventToImage and prepanding the images to display according
                    addClickEventToImage(cartoonImage);
                    $("#giftastic").prepend(cartoonDiv);
                }

            });

    });
}

function addClickEventToImage(cartoonImage) {
    cartoonImage.on("click", function () {

        // craetinng var to store the state of cartoonImage 
        var state = cartoonImage.attr("state");

        // doing if else condiion here to animate or to be still

        if (state === "still") {
            var animatedSource = cartoonImage.attr("data-animate");
            cartoonImage.attr("src", animatedSource);
            cartoonImage.attr("state", "animate");
        } else {
            var stillSource = cartoonImage.attr("data-still");
            cartoonImage.attr("src", stillSource);
            cartoonImage.attr("state", "still");
        }

    });
}
    //    writing function event for submit button
function createSubmitEvent(){
    $("#submitSearch").submit(function(event ){

        // setting variable to store the input value
        var searchStr = $("input:text").val();
        console.log("Test :" + searchStr);
        //  here pushing var into the array 
        searchArray.push(searchStr);
        // creating var to button obj to store the array value
        var buttonObj = createButton(searchStr);
        // here we appending button to button list
        $("#buttonList").append(buttonObj);
        // creating button event 
        createButtonEvent();
        // finally have to cancel the default action of button
        event.preventDefault(); 
    });
}
