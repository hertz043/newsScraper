$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {

        let articleDiv = $("<div class='articleDiv'>");
            articleDiv.append("<a href='"+data[i].link+"'><h3>"+data[i].title+"</h3></a>");
            articleDiv.append("<p>"+data[i].summary+"</p>");
            articleDiv.append("<button class='commentButton' data-id='"+data[i]._id+"'>Comments</button>");

        $("#articleField").append(articleDiv);
    }
  });
  
  
  $(document).on("click", ".commentButton", function() {
    // $("#comments").empty();
    var thisId = $(this).attr("data-id");

    let commentDiv = $("<div class='commentDiv'>")
        commentDiv.append("<input id='titleinput' name='title' >")
        commentDiv.append("<textarea id='bodyinput' name='body'></textarea>");
        commentDiv.append("<button data-id='" + data._id + "' id='saveComment'>Submit Comment</button>");
  
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function(data) {
        console.log(data);
 

        if (data.comment) {
            data.comment.forEach( () => {
                commentDiv.append("<p>"+data.comment.username+"</p>");
                commentDiv.append("<p>"+data.comment.body+"</p>");
                commentDiv.append("<hr>");
            });
        };
        
        //need to attach this div somewhere.
      });
  });
  

  $(document).on("click", "#submitComment", function() {
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        username: $("#usernameinput").val(),
        body: $("#bodyinput").val()
      }
    })
      .then(function(data) {
        console.log(data);
        $("#comments").empty();
      });
  
    $("#usernameinput").val("");
    $("#bodyinput").val("");
  });
  