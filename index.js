
  function findBannedPhrases(text, bannedPhrases) {
  const foundPhrases = [];

  bannedPhrases.forEach(bannedPhrase => {
    if (text.toLowerCase().includes(bannedPhrase.toLowerCase())) {
      foundPhrases.push(bannedPhrase);
    }
  });

  return foundPhrases;
}

function checkBannedPhrases(event) {
  event.preventDefault();

  const textInput = document.getElementById('text-input');
  const bannedWordsInput = document.getElementById('banned-words-input');
  const resultDiv = document.getElementById('result');

  const text = textInput.value;
  let bannedPhrases = bannedWordsInput.value.split('*');
  const foundPhrases = findBannedPhrases(text, bannedPhrases);

  // Create a copy of the text with the banned phrases highlighted
  let highlightedText = text;
  foundPhrases.forEach(bannedPhrase => {
    highlightedText = highlightedText.replace(new RegExp(bannedPhrase, 'gi'), '<mark>$&</mark>');
  });

  // Display the banned phrases and the highlighted text on the screen
  resultDiv.innerHTML = '';
  if (foundPhrases.length === 1) {
    resultDiv.innerHTML += '<h2>Your text contains the banned phrase:</h2>';
    resultDiv.innerHTML += `<h3>${foundPhrases.join(', ')}</h3><br>`;
  } else if (foundPhrases.length > 1) {
    resultDiv.innerHTML += `<h2>Your text contains ${foundPhrases.length} banned phrases:</h2>`;
    foundPhrases.forEach(bannedPhrase => {
      resultDiv.innerHTML += `<h3>${bannedPhrase}</h3>`;
    });
    resultDiv.innerHTML += '<br>';
  } else {
    resultDiv.innerHTML += '<h2 style="color:green;"> Your text does not contain any banned phrases.</h2><br>';
  }

  const textDiv = document.createElement('div');
  textDiv.innerHTML = highlightedText;
  if (foundPhrases.length === 0) {
    textDiv.style.display = "none";
  }
  resultDiv.appendChild(textDiv);
}

