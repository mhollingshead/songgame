/* Transition between slides */
function transition() {
  slide1 = document.getElementById("slide" + cur_slide);
  cur_slide++;
  slide2 = document.getElementById("slide" + cur_slide);

  if (slide1.classList.contains("in")) {
    slide1.classList.remove("in");
  }

  slide1.classList.add("out");
  slide2.classList.remove("hidden");
  slide2.classList.add("in");
  changeTitles();

  setTimeout(function(){
    slide1.classList.add("hidden");
    slide1.classList.remove("out");
  }, 2000);
}

function changeTitles() {
  document.getElementById("songTitle").innerHTML = song_result.title;
  document.getElementById("songArtist").innerHTML = song_result.artist;
  document.getElementById("songTitle1").innerHTML = song_result.title;
  document.getElementById("songArtist1").innerHTML = song_result.artist;
  document.getElementById("songTitle2").innerHTML = song_result.title;
  document.getElementById("songArtist2").innerHTML = song_result.artist;
  
}

/* Insure both Title and Artist inputs have values */
function checkForStart() {
  if (document.getElementById("start_button").classList.contains('noclick')) {
    document.getElementById("start_button").classList.remove('noclick');
  }
  if (document.getElementById("title").value === "" || document.getElementById("artist").value === "") {
    document.getElementById("start_button").classList.add('noclick');
  }
}

/* Switch difficulty and recalculate letters when mug clicked */
function changeDifficulty(level) {
  cur_letter = "-";
  for (var j = 0; j < document.getElementsByClassName('mug').length; j++) {
    if (!document.getElementsByClassName('mug')[j].classList.contains('bw')) {
      document.getElementsByClassName('mug')[j].classList.add('bw');
    }
  }
  for (var i = 0; i <= level; i++) {
    document.getElementsByClassName('mug')[i].classList.remove('bw');
  }
  difficulty = level + 1;
  getLetters();
}

/* Display available letters depending on the selected difficulty */
function getLetters() {
  scores = [];
  lyrics = song_result.lyrics;

  for (var i = 0; i < letters.length; i++) {
    count = 0;
    for (var j = 0; j < song_lyrics.length; j++) {
      if (letters[i] === song_lyrics[j]) {
        count++;
      }
    }
    var calc = (count/song_lyrics.length)*100;
    var tmp = {};
    tmp.letter = letters[i];
    tmp.count = count;
    tmp.score = calc;
    scores.push(tmp);
  }

  var area = document.getElementById("letters");
  area.innerHTML = "";

  if (difficulty === 1) {
    for (var k = 0; k < scores.length; k++) {
      if (scores[k].score > 0 && scores[k].score < 1) {
        createDiv(scores[k].letter);
      }
      document.getElementById("sips").innerHTML = "1 to " + (Math.floor(0.01*song_lyrics.length)) + " sips";
    }
  }
  else if (difficulty === 2) {
    for (var k = 0; k < scores.length; k++) {
      if (scores[k].score >= 1 && scores[k].score < 2) {
        createDiv(scores[k].letter);
      }
    }
    document.getElementById("sips").innerHTML = (Math.ceil(0.01*song_lyrics.length)) + " to " + (Math.floor(0.02*song_lyrics.length)) + " sips";
  }
  else if (difficulty === 3) {
    for (var k = 0; k < scores.length; k++) {
      if (scores[k].score >= 2 && scores[k].score < 3) {
        createDiv(scores[k].letter);
      }
    }
    document.getElementById("sips").innerHTML = (Math.ceil(0.02*song_lyrics.length)) + " to " + (Math.floor(0.03*song_lyrics.length)) + " sips";
  }
  else if (difficulty === 4) {
    for (var k = 0; k < scores.length; k++) {
      if (scores[k].score >= 3 && scores[k].score < 4) {
        createDiv(scores[k].letter);
      }
    }
    document.getElementById("sips").innerHTML = (Math.ceil(0.03*song_lyrics.length)) + " to " + (Math.floor(0.04*song_lyrics.length)) + " sips";
  }
  else {
    for (var k = 0; k < scores.length; k++) {
      if (scores[k].score >= 4) {
        createDiv(scores[k].letter);
      }
    }
    document.getElementById("sips").innerHTML = (Math.ceil(0.04*song_lyrics.length)) + "+ sips";
  }

  if (document.getElementById("letters").innerHTML === "") {
    document.getElementById("letters").innerHTML = "<i>No letters available</i>"
  }
}

/* Create divs for letter displays */
function createDiv(letter) {
  var area = document.getElementById("letters");
  var div = document.createElement('div');
  var text= document.createTextNode(letter);

  div.appendChild(text);
  div.classList.add('letter');
  div.setAttribute( "onclick", "javascript: select(this);" );
  area.appendChild(div);
}

/* Select a letter */
function select(el) {
  if (document.getElementsByClassName('selected')[0]) {
    document.getElementsByClassName('selected')[0].classList.remove('selected');
  }
  el.classList.add('selected');
  cur_letter = el.innerHTML;
}

/* Increment sip counter */
function sip() {
  cur_sips++;

  if (cur_sips === 1) {
    document.getElementById("grammar").innerHTML = "sip";
  }
  else {
    document.getElementById("grammar").innerHTML = "sips";
  }
  document.getElementById("sip_count").innerHTML = cur_sips;
}
