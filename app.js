
      // Initial array of giphs
      var giphs = ["Django Unchained", "Inglorious Bastards", "Pulp Fiction", "Kill Bill", "Django Unchained"];
    var offset = 0;
     
      function renderButtons(array) {

       for (var i = 0; i < giphs.length; i++) {
         var button = $("<button>");
         button.attr('id',"giph" + i);
         button.addClass('button');
         button.attr('value', array[i]);
         button.text(array[i]);
         $("#giphs-view").append(button);

         
       }

      }

      // This function handles events where one button is clicked
      $("#add-giph").on("click", function() {

        event.preventDefault();
        
        var giphInput = $("#giph-input").val();
        console.log(giphInput);
        giphs.push(giphInput);

        $("#giphs-view").empty();

        renderButtons(giphs);
        
      });

      function getGiph(giph, limit) {
        
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + giph + "&limit=" + limit + "&offset=" + offset;

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          var data = response;
        //   $("#giphInfo").prepend("<p>" + JSON.stringify(data) + "</p>");
        console.log(data);
           
        
        var gifVault = $('<div id="gifVault"> class="clearfix"');
            for (var i = 0; i < data.data.length; i++) {
        var container = $('<div class="gifs">');
        var rating = $("<h2>");
        rating.addClass('rating');
        rating.text(data.data[i].rating);
        container.append(rating);

        var poster = $("<img>");
        poster.addClass('poster');
        poster.attr('src', data.data[i].images.original_still.url);
        poster.attr('data-still', data.data[i].images.original_still.url);
        poster.attr('data-animate', data.data[i].images.original.url);
        poster.attr('data-state', "still");
        container.append(poster);
        console.log(data.data[i].images.original);
        gifVault.append(container);
            }
        $("#giphInfo").prepend(gifVault);
        });

      }

      $("#giphs-view").on("click",".button", function() {
          
        event.preventDefault();
        
        console.log(this);
        var giph = this.value
        var limit = $('#giph-ammount')[0].value
        console.log(giph);
        console.log(limit);
        getGiph(giph, limit);
        
      });

      $("#giphInfo").on("click", ".poster", function() {
        
        var state = $(this).attr("data-state");
     
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
    });
      // Calling the renderButtons function to display the initial list of giphs
      renderButtons(giphs);
    