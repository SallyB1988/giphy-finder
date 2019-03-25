class GiphyItem {
  constructor (still, animated, rating) {
    this.still = still;
    this.animated = animated;
    this.rating = rating;
  }
}

// ===== array to hold giphy objects ==================================

var data = [];
var giphyTopics = ["happy", "funny", "scared"];


// ===== Variables ====================================
var quantity = 10;
var rating = 'PG';
const $buttonDiv = $(".button-div");
const $giphyDisplay = $(".giphy-display");

window.onload = function() {
  renderTopicButtons();
}

  function showGiphys() {
    var selectedTopic = $(this).attr("value");
    getAPIdata(selectedTopic);
  }

const renderTopicButtons = () => {
  $buttonDiv.empty();
  giphyTopics.forEach((t) => {
    $tButton = $("<button>");
    $tButton.addClass("topic-button");
    $tButton.attr("value", t);
    $tButton.attr("type", "button");
    $tButton.text(t);
    $buttonDiv.append($tButton);
  })
}

/**
 * Makes Ajax call to trivia database API to gather information for questions.
 * @param {*} t 
 */
  const getAPIdata = (search) => {
    var queryURL;
    queryURL = `https://api.giphy.com/v1/gifs/search?api_key=fvrL5QJ7azyECt0FyII5urXZmu2G3iay&q=${search}&limit=${quantity}&offset=0&rating=${rating}&lang=en`
    
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(resp) { 
      $giphyDisplay.empty();
      resp.data.forEach((o) => {
          var still = o.images.fixed_height_still.url;  // still image
          var animated = o.images.fixed_height.url;       // animated image
          var rating = o.rating ; // rating
          singleGiphyDisplay(still, animated, rating);
      })
    });
  }
  
  const singleGiphyDisplay = (s, a, r) => {
    $giphyBox = $("<div>");
    $giphyBox.addClass("col-xs-12 col-sm-12 col-md-6 col-lg-4 px-0 giphy-box");
    var imageString = `<img src="${s}" data-still="${s}" data-animate="${a}" data-state="still" class="gif"></img>`;
    $giphyBox.append(`<h3 class="py-2 rating" >rating:  ${r}</h3>`);
    $gifBox = $("<div>");
    $gifBox.addClass("gif-box");
    $giphyBox.append($gifBox);
    $gifBox.append(imageString)
    $giphyDisplay.append($giphyBox);
  }

  $("#add-topic").on("click", (e) => {
    e.preventDefault();
    var subject = $("#topic-input").val().trim();
    console.log(subject);
    if (subject !== "" && !giphyTopics.includes(subject)) {
      giphyTopics.push(subject);
      renderTopicButtons();
    }
    $("#topic-input").val('');    // clear input field
  })
  
  $(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    var animate = $(this).attr("data-animate");
    var still = $(this).attr("data-still");

    if (state === 'still') {
      $(this).attr("src", animate)
      $(this).attr("data-state", animate)
    } else {
      $(this).attr("src", still)
      $(this).attr("data-state", still)
    }
  })

  $(document).on("click", ".topic-button", showGiphys);