// const words = ["Angoissant","Araignees","Effrayant","Deguisements","Fantastique","Gothique","Malefique"];
// let chosenWord = "";
// let guessedLetters = [];
// let attempts = 0;
// const maxAttempts = 5;

// function startGame() {
//     chosenWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
//     guessedLetters = [];
//     attempts = 0

//     document.getElementById("message-container").style.display = "none";
//     resetHangman()
//     displayWord()
//     generateKeyboard()
//     document.addEventListener("keydown", handleKeyboardInput)
// }

// function resetHangman() {
//     for (let i = 1; i <= maxAttempts.length; i++) {
//         document.getElementById("part" + i).style.visibility = "visible"; 
//     }   
// }

// function displayWord() {
//     const wordDisplay = document.getElementById("word-game");
//     wordDisplay.innerHTML = chosenWord.split("").map(letter => (guessedLetters.includes(letter) ? letter : "_")).join(" ");   
// }

// function generateKeyboard() {
//     const keyboard = document.getElementById("keyboard")
//     keyboard.innerHTML = "";
//     for (let i = 65; i < 90; i++) {
//         const btn= document.createElement("button");
//         btn.textContent = String.fromCharCode(i);
//         btn.addEventListener("click", () => handleGuess (btn.textContent));
//         keyboard.appendChild(btn);
//     }
// }

// function handleGuess() {
//     if (!guessedLetters.includes(letter) && chosenWord.includes(letter)) {
//         guessedLetters.push(letter);
//     }else{
//         attempts++
//         hideHangmanPart(attempts);
//     }
//     displayWord()
//     checkGame()
// }

// function hideHangmanPart() {
//     if (attempts <= maxAttempts) {
//         document.getElementById("part" + attempts).style.visibility = "hidden"        
//     }
// }

// function handleKeyboardInput(event) {
//     const letter = event.key.toUpperCase();
//     if (letter.match(/[A-Z]/) && !guessedLetters.includes(letter)) {
//         handleGuess(letter)
//     }
// }

// function checkGame() {
//     if (chosenWord.split("").every(letter => guessedLetters.includes(letter))) {
//         endGame("félicitaion")
        
//     }else{
//         endGame("Dommage")
//     }  
// }

// function endGame(message) {
//     document.removeEventListener("keydown", handleKeyboardInput);
//     document.getElementById("message").textContent = message;
//     document.getElementById("message-container").style.display = "block";   
// }

// window.onload = startGame


const words = ["Angoissant","Araignees","Effrayant","Deguisements","Fantastique","Gothique","Malefique"];
let chosenWord, guessedLetters, mistakes, maxMistakes = 6;

const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const wordDisplay = document.getElementById("word-game");
const messageDisplay = document.getElementById("message");
const letterButtons = document.getElementById("letter-buttons");

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

function startGame() {
  chosenWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  mistakes = 0;
  
  wordDisplay.innerHTML = "_ ".repeat(chosenWord.length);
  resetHangman();
  messageDisplay.textContent = "";
  restartButton.style.display = "none";
  letterButtons.innerHTML = "";

  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(65 + i);
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => guessLetter(letter));
    letterButtons.appendChild(button);
  }
  
  startButton.style.display = "none";
  document.getElementById("game").style.display = "block";
}

function guessLetter(letter) {
    letter = letter.toLowerCase();

    if (guessedLetters.includes(letter) || mistakes >= maxMistakes) return;
    
    guessedLetters.push(letter);
    let updateWord = "";
    let correctGuess = false;

    for (constchar of chosenWord) {
        if (guessedLetters.includes(char)) {
            updateWord += char + ""
        }else{
            updateWord += "_";
        }
    }

    wordDisplay.innerHTML = updateWord.trim();

    if (chosenWord.includes(letter)) {
        correctGuess = true
    }else{
        mistakes++
        updateHangman()
    }
    checkGame();

}    

function updateHangman() {
    if (mistakes <= maxMistakes) {
        document.getElementById("piece-" + mistakes).style.display = "block";  
    }
}

function resetHangman() {
    for (let i = 1; i < maxMistakes.length; i++) {
        document.getElementById("piece-" + i).style.display = "none";        
    }   
}

function checkGame() {
    if (mistakes >= maxMistakes) {
        messageDisplay.textContent = "Dommage, tu as perdu !"
    }else if (!wordDisplay.innerHTML.includes("_")){
        messageDisplay.textContent = "Féliciation, vous avez gagné !"
        endGame()
    }  
}

function endGame() {
    restartButton.style.display = "inline-block";
    letterButtons.innerHTML = ""
}