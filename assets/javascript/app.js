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

window.onload = function() {
  initialButtons();
  setupbuttons();
  // getAPIdata();
};

const initialButtons = () => {
  giphyTopics.forEach((t) => {
    addTopicButton(t);
  })
}

const addTopicButton = (topic) => {
  $tButton = $("<button>");
  $tButton.addClass("topic-button");
  $tButton.attr("value", topic);
  $tButton.attr("type", "button");
  $tButton.text(topic);
  $buttonDiv.append($tButton);
}

/**
 * Makes Ajax call to trivia database API to gather information for questions.
 * @param {*} t 
 */
  const getAPIdata = () => {
    var queryURL;
    var search = 'happy';
    queryURL = `https://api.giphy.com/v1/gifs/search?api_key=fvrL5QJ7azyECt0FyII5urXZmu2G3iay&q=${search}&limit=${quantity}&offset=0&rating=${rating}&lang=en`
    
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(resp) { 
      // Set # of giphy images 
      
      resp.data.forEach((o) => {
        data.push(new GiphyItem(
          o.images.fixed_height_still.url,  // still image
          o.images.fixed_height.url,        // animated image
          o.rating  // rating
        ));
      })
    })
  }
  
  const setupbuttons = () => {

    $("button").on("click", function() {
      console.log(this.value);
    })

  }
  