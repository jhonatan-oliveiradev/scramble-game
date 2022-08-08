const wordText = document.querySelector(".word"),
	hintText = document.querySelector(".hint span"),
	timeText = document.querySelector(".time b"),
	inputField = document.querySelector("input"),
	refreshBtn = document.querySelector(".refresh-word"),
	checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = (maxTime) => {
	clearInterval(timer); // clearing timer
	timer = setInterval(() => {
		if (maxTime > 0) {
			maxTime--; // decrementing maxTime
			return (timeText.innerText = maxTime);
		}
		clearInterval(timer);
		alert(
			`Acabou o tempo! ${correctWord.toUpperCase()} era a resposta correta!`
		); // if time is off
		initGame(); // restarting game
	}, 1000);
};

const initGame = () => {
	initTimer(30); // initializing timer
	let randomObj = words[Math.floor(Math.random() * words.length)]; // getting random object from words array
	let wordArray = randomObj.word.split(""); // splitting each letter of random word
	for (let i = wordArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1)); // getting random number
		// shuffling and swiping wordArray letters randomly
		[wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
	}
	wordText.innerText = wordArray.join(""); //passing shuffled word to wordText element
	hintText.innerText = randomObj.hint; //passing hint to hintText element
	correctWord = randomObj.word.toLowerCase(); //passing correct word to correctWord
	inputField.value = ""; // clearing input field
	inputField.setAttribute("maxlength", correctWord.length); // setting maxlength of input field to correct word length
};

initGame();

const checkWord = () => {
	let userWord = inputField.value.toLocaleLowerCase(); // getting user value
	if (!userWord) return alert("Por favor, digite uma palavra."); // checking if user entered a word
	if (userWord !== correctWord)
		return alert(`Ops! ${userWord} não é a palavra correta!`); // checking if user word is correct
	alert(`Parabéns! ${userWord.toUpperCase()} é a palavra correta!`); // if user word is correct
	initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
