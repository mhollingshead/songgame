/* Global Variables */
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var scores = [];
var song_lyrics = [];
var song_result;

/* Game Settings */
var difficulty = 2;
var cur_letter = "-";

/* Gameplay Variables */
var cur_sips = 0;
var cur_slide = 1;

/* Copy letters to the lyric array */
function slideTwo() {
  document.getElementById("songTitle").innerHTML = song_result.title;
  document.getElementById("songArtist").innerHTML = song_result.artist;

  var lyrics = [];
  for (var i = 0; i < song_result.lyrics.length; i++) {
    if (song_result.lyrics[i] === "[") {
      while (song_result.lyrics[i] != "]") {
        i++;
      }
      i++;
    }
    if (song_result.lyrics[i] != ' ' && song_result.lyrics[i] != ',' && song_result.lyrics[i] != "'" && song_result.lyrics[i] != '"' && song_result.lyrics[i] != '-' && song_result.lyrics[i] != '–' && song_result.lyrics[i] != ';' && song_result.lyrics[i] != ':' && song_result.lyrics[i] != '?' && song_result.lyrics[i] != '↵') {
      lyrics.push(song_result.lyrics[i].toUpperCase());
    }
  }
  song_lyrics = lyrics;
}

function playGame() {
  if (cur_letter === "-") {
    document.getElementById("error").style.display = "block";
  }
  else {
    transition();
    document.getElementById("songTitle1").innerHTML = song_result.title;
    document.getElementById("songArtist1").innerHTML = song_result.artist;
    document.getElementById("letter_disp").innerHTML = cur_letter;
    cur_sips = 0;
  }
}

/* Finish game and calculate score */
function endGame() {
  transition();

  document.getElementById("songTitle2").innerHTML = song_result.title;
  document.getElementById("songArtist2").innerHTML = song_result.artist;
  var game_letter;

  for (var i = 0; i < scores.length; i++) {
    if (cur_letter === scores[i].letter) {
      game_letter = scores[i];
    }
  }

  score = Math.floor((cur_sips/game_letter.count)*100);

  document.getElementById("your_score").innerHTML = score+"%";
  document.getElementById("sipped").innerHTML = cur_sips;
  document.getElementById("real_sips").innerHTML = game_letter.count;
  document.getElementById("percent_off").innerHTML = (score - 100) + "%";

  var sc = document.getElementById("your_score");
  var sps = document.getElementById("sipped");
  var po = document.getElementById("percent_off");

  if (score < 65) {
    sc.style.color = "#ff4060";
    sps.style.color = "#ff4060";
    po.style.color = "#ff4060";
  }
  else if (score < 90) {
    sc.style.color = "#f2b600";
    sps.style.color = "#f2b600";
    po.style.color = "#f2b600";
  }
  else if (score < 105) {
    sc.style.color = "#1fcf2e";
    sps.style.color = "#1fcf2e";
    po.style.color = "#1fcf2e";
  }
  else {
    sc.style.color = "#ff4060";
    sps.style.color = "#ff4060";
    po.style.color = "#ff4060";
  }
}
