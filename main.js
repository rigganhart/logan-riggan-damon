$(document).ready(function() {
  chatPage.init();
})

var chatPage = {
    Name: prompt("Enter User name"),
    url: 'http://tiny-tiny.herokuapp.com/collections/damonrigganloganchat',
    chats:[],
    init: function () {
    setInterval(function(){
      chatPage.styling();
    },10000);
      chatPage.events();
    },
    styling: function(){
      chatPage.getChat();
    },
    events: function(){

//POST a chat
$('button[type="post"]').on('click', function(event){
  event.preventDefault();
  var newMsg = {
    user: chatPage.Name,
    content: $('input[name="chatbox"]').val(),
  };
  console.log(newMsg);

  $('.chatlog ul').append(`<li> <a href="#> <h2 class=${newMsg.user}>${newMsg.user}</h2><h3>${newMsg.content}</h3> </a></li>`);
    chatPage.reverseChat();


  $.ajax({
    url: 'http://tiny-tiny.herokuapp.com/collections/damonrigganloganchat',
    method: "POST",
    data: newMsg,
    success: function(data) {
      console.log("ItWorks", data);
      $('.chatbox ul').append(`<li> <a href="#> <h2 class=${newMsg.user}>${newMsg.user}</h2><h3>${newMsg.content}</h3> </a></li>`);
    },
    error: function(err) {
      console.error("WTF",err);
    }
  })
  $('.message').val("");

})
//end of POST

//find delete item
$(document).on('click', 'a',function(event){
  event.preventDefault();
    console.log($(this));
      var msgId = $(this).parent().data('id');
      console.log(msgId);
      chatPage.deleteChat(msgId);
      $(this).remove();
  })



},
// end of events


getChat: function () {
  $.ajax({
    url: 'http://tiny-tiny.herokuapp.com/collections/damonrigganloganchat',
    method: "GET",
    success: function(data) {
      console.log("we got something", data);
      $('.chatlog ul').html("");
      data.forEach(function(chats) {
      $('ul').append(`<li data-id=${chats._id}> <a href="#"> <h2 class=${chats.user}><p>${chats.user}</p></h2><h3>${chats.content}</h3> </a></li>`);
      console.log(chats.user);
    });
      chatPage.reverseChat();
    },
    error: function(err) {
      console.error("WTF",err);
      }
    })
  },

deleteChat: function (msgId) {
  var deleteUrl = chatPage.url + "/" + msgId;
  $.ajax({
    url: deleteUrl,
    method:"DELETE",
    success: function(data) {
      console.log("IT IS GONE",data);
      chatPage.getChat();
    },
    error: function(err) {
      console.error("you blew it", err);
      }
    })},
reverseChat: function () {
  event.preventDefault();
    var list = $('ul');
    var listItems = list.children('li');
    list.append(listItems.get().reverse());
  },
UserId: function() {
  var list = $('ul');
  var listItems= list.children('li');
  console.log($('ul').children('li'));

    }
  }

//end of chatPage
