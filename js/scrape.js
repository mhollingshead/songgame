var data_obj;
var tit = [];
var art = [];

/* Scrape html from lyric page */
var cors_api_url = 'https://cors-anywhere.herokuapp.com/';

function doCORSRequest(options) {
  var x = new XMLHttpRequest();

  x.open(options.method, cors_api_url + options.url);
  x.send();

  x.onload = x.onerror = function() {
    formatLyrics(x.responseText);
  };
}

function scrapeLyrics() {
    var title = document.getElementById("title").value.replaceAll(" ", "-").toLowerCase();
    var artist = document.getElementById("artist").value.replaceAll(" ", "-").toLowerCase();
    var urlField = 'https://www.metrolyrics.com/' + title + '-lyrics-' + artist + '.html';

    console.log(urlField);

    if (document.getElementById("start_button").classList.contains("noclick")) {
      return;
    }

    doCORSRequest({
      method: 'GET',
      url: urlField,
    });
  }

/* Take the lyric text from the html and get official Title & Artist */
function formatLyrics(data) {
  var lyrics = [];
  var error = false;
  data_obj = data;

  for (var i = 0; i < data_obj.length; i++) {
    // Scrape lyrics
    if (checkPhrase(i, "<p class='verse'>")) {
      i += 17;
      while (!checkPhrase(i, "</p>")) {
        if(checkPhrase(i, "<br>")) {
          i += 4;
        }
        lyrics.push(data_obj[i]);
        i++;
      }
    }
    if (checkPhrase(i, "<h1>")) {
      i += 4;
      //Scrape artist
      while (!checkPhrase(i, ' - ')) {
        art.push(data_obj[i]);
        i++;
      }
      i += 3;
      //Scrape song
      while (!checkPhrase(i, ' Lyrics')) {
        tit.push(data_obj[i]);
        i++;
      }
    }
    //Check for 404 error
    if (checkPhrase(i, 'content="404 Not Found"')) {
      console.log(404);
      document.getElementById("error1").style.display = "block";
      error = true;
      break;
    }
  }

  /* Build song object and start the game cycle */
  var lyr = "";
  for (var k = 0; k < lyrics.length; k++) {
    lyr += lyrics[k];
  }
  var tits = "";
  for (var k = 0; k < tit.length; k++) {
    tits += tit[k];
  }
  var arts = "";
  for (var k = 0; k < art.length; k++) {
    arts += art[k];
  }

  if (!error) {
    song_result = {'title': tits, 'artist': arts, 'lyrics': lyr};

    transition();
    slideTwo();
    getLetters();
  }
}

/* Check for a given series of characters in a document */
function checkPhrase(cur, phrase) {
  var count = 0;
  for (var i = 0; i < phrase.length; i++) {
    if (!(data_obj[cur+i] === phrase[i])) {
      return false;
    }
  }
  return true;
}
