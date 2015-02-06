var LIBRARY = [
  {title: 'C Major Scale', notes: 'A B C D E F G' },
  {title: 'Chromatic Scale', notes: 'A A# B C C# D D# E F F# G G#' },
  {title: 'Random Song', notes: 'A B*2 C D A*4 D E*2 F A B A A*2' },
  {title: 'Adup Licate', notes: 'A B*2 C D A*4 D E*2 F A B A A*2' },
  {title: 'Yankee Doodle', notes: 'C F*4 C F*4 B C D A*2 B*2 A B*2 C' },
  {title: 'Descending Notes', notes: 'G F E D C B A G F E D C B A' },
  {title: 'SANDSTORM', notes: 'E*2 E*2 E*2 E*2 E*4 E*2 E*2 E*2 E*2 E*2 E*2 F*2 F*2 F*2 F*2 F*2 F*2 F*2 E E E E E E E F E E E E E*2 E*2 E*2 E*2 E*2 E*2 E*2 E*2 F*2 E*2 E*2 E*2 E*2 E*4 E*2 E*2 E*2 E*2 E*2 E*2 F*2 '},
  {title: 'Jason', notes: 'E*1*1 E*1*1 E*1*2 E*1*1 E*1*1 E*1*2 E*1*1 G*1*1 C*1*1 D*1*1 E*1*4 F*1*1 F*1*1 F*1*1 F*1*1 F*1*1 E*1*1 E*1*2 E*1*1 D*1*1 D*1*1 E*1*1 D*1*2 G*1*3' },
  {title: 'Jingle Bells', notes: 'E*1 E*1 E*2 E*1 E*1 E*2 E*1 G*1 C*1 D*1 E*4 F*1 F*1 F*1 F*1 F*1 E*1 E*2 E*1 D*1 D*1 E*1 D*2 G*3' }


];

var BPM = 800;


// Add a song with the given title and notes to the library.
var addSongToLibrary = function(title, notes) {
  $('#library-list').append("<li>" +
                                "<i class='fa fa-bars'></i>" +
                                "<i class='fa fa-trash'></i>" +
                                "<span class='title'>" + title + "</span>" +
                                "<div class='notes'>" + notes + "</div>" +
                              "</li>");
};


// Add all LIBRARY songs to the library.
var initializeLibrary = function() {
  for(var i=0; i < LIBRARY.length; i+=1) {
    addSongToLibrary(LIBRARY[i].title, LIBRARY[i].notes);
  }
};


// Play all songs in the playlist.
var playAll = function() {
  if ($('#playlist-list li'.length == 0)){
    $('#play-button').toggleClass("shake");
  }
     $('h1').toggleClass('dance');

  // Grab the top song in the queue, parse its notes and play them.
  // Then recurse until there are no more songs left in the queue.
  //
  var playNext = function() {
    var songItem = $('#playlist-list li:first-child');

    if (songItem.length == 0) {
      // No more songs.
      $('h1').toggleClass('dance');

      // Re-enable the play button.
      $('#play-button').attr('disabled', false).text('Play All');

      // Fade out the message.
      $('#message').fadeOut();
      return;
    }

    var title = songItem.find('.title').text();
    var notes = songItem.find('.notes').text();
    var song = parseSong(notes);

    $('#message').html("Now playing: <strong>" + title + "</strong>").show();

    playSong(song, BPM, function() {
      songItem.remove();
      $('#library-list').append(songItem);
      playNext();
    });
  };

  // Disable the play button to start.
  $('#play-button').attr('disabled', true).text('Playing');

  playNext();
}


$(document).ready(function() {

  // Initialize the library with some songs.
  initializeLibrary();

  // Play all songs in the playlist when the "play" button is clicked.
  $('#play-button').on('click', playAll);


  // Add Your Code Here.

  $( "li" ).disableSelection();

  $('ul').on('dblclick','li', function(){
    $(this).find('.notes').slideToggle(300);
  });

  $('#message').fadeIn(800)


    setTimeout(function(){$('#message').fadeOut(800)}, 3000)


      $(function() {
    $( "#playlist-list, #library-list" ).sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
  });

  
 $('input[type="text"]').on('keyup', function(){
         var search = $(this).val();
         $('.ui-sortable-handle').hide()
         $('.ui-sortable-handle:contains(' + search + ')').fadeIn();
       });


 


});