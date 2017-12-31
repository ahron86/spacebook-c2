//new comment for the another-branch
var posts = [];
var id = 0;

$('.add-post').on('click', function() {
    var text = $('#post-name').val();
    var idNum = id;
    id++;

    var post = {text: text, id: idNum, comments:[]};
    posts.push(post);
    renderPost();
})

//click for comments
$('.posts').on('click', '.comment-btn', function(){
  var commentText = $(this).prev().val(); // comment input val
  var postId = $(this).parent().closest(".post").data().id;//use to relate to the posts div
  
  //adding those values to an array
  for(var i = 0; i < posts.length; i ++){
    if(posts[i].id === postId){
       posts[i].comments.push(commentText);
       }
  }

renderPost();
  
});

function renderPost() {
    $('.posts').empty();
    
    for (var i = 0; i < posts.length; i++) {
        var commentEl = "";
        for (var j = 0; i < posts[i].comments.length; j++) {
            commentEl += '<li>' + posts[i].comments[j] + '</li>'
        }
        var postEl = '<div class="post" data-id="' + posts[i].id + '">' +
        '<button type="button" class="remove">REMOVE</button>' + posts[i].text + 
        '<form class="commentForm">comment: ' + 
            '<input type="text" id="comment" class="form-control" placeholder="Add a comment..." >username: ' + 
            '<input type="text" id="userName" class="form-control" placeholder="User name" >' + 
            '<button class="btn btn-primary comment-btn" type="button">Comment</button>' +
        '</form>' +
        '<ul class="comments">' + commentEl + '</ul></div>'
        $('.posts').append(postEl);
    }
}

$('.posts').on("click", ".remove", function () {
    var itemDelete = $(this).children().children();
    for (var i = 0; i < posts.length; i++) {
        if (itemDelete == posts[i].id) {
            posts.splice(i, 1);
            renderPost();
        }
    }
});




function clearList() {
    $('.posts').empty();
}

// printar till skärmen genom loopa efter att tagit bort all data från tidigare lista 
function renderPost() {
    clearList();
    var comments = "";
    for (var i = 0; i < posts.length; i++) {
        for (var j = 0; j < posts[i].comments.length; j++){
            //add each comment text from the comments array to the comments var
            comments = posts[i].comments;
        }
        $('.posts').append('<div class="post" data-id="' + posts[i].id + '">' +
            '<button type="button" class="remove">REMOVE</button>' + posts[i].text + 
            '<form class="commentForm">comment: ' + 
                '<input type="text" id="comment" class="form-control" placeholder="Add a comment..." >username: ' + 
                '<input type="text" id="userName" class="form-control" placeholder="User name" >' + 
                '<button class="btn btn-primary add-comment" type="button">Comment</button>' +
            '</form>' +
            '<div class="comments">' + comments +'</div>' +
        '</div>')
    }
}

//ta bort post
$('body').on("click", ".remove", function () {
    var itemDelete = $(this).parent().data().id;
    for (var i = 0; i < posts.length; i++) {
        if (itemDelete == posts[i].id) {
            posts.splice(i, 1);
            renderPost();
        }
    }
});
