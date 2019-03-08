$(document).ready(function() {

	//Displays currently being used Info
	var currentQ;		

    //Score Count
	var correctAnswer;	
	var wrongAnswer;	
    var unanswered;		
    
    //Used as a boolean true or false
	var answered; 		
	
	//Timer				
	var seconds;		
    var time;			
    
	// User input
	var userChoice;		

	var text = {
		correct: "YAY!! Correct! Good Job!",
		incorrect: "Awwww, wrong answer, you'll get it next time..",
		noTime: "Wa Wa Wa You are out of time, you've got to be quicker than that!",
        done: "That wasn't to bad now was it?",
	};

	var triviaQuestions = [
		{	
			question: "What Pokemon does Pikachu evolve into?",
			choices: ["Jolteon", "Electivire", "Meowstic", "Raichu", "Thunderbolt"],
			correct: 3,
			answerText: "Pikachu can’t evolve unless it is given a thunder stone. Ash actually has the stone with him, but there are some possible reasons that he is not evolving Pikachu.",
            image: "assets/images/Pikachu.png",
        },

		{
			question: "What's the most effective Poke Ball in the game?",
			choices: ["Great Ball", "Ultra Ball", "Master Ball", "Timer Ball", "Golden Ball"],
			correct: 2,
			answerText: "A Poké Ball (Japanese: モンスターボール Monster Ball) is a type of item that is critical to a Trainer's quest, used for catching and storing Pokémon.",
            image: "assets/images/Pokeballs.png",
        },

		{
			question: "How many Gym Badges must a trainer collect before challenging the Elite Four?",
			choices: ["6 Badges", "7 Badges", "8 Badges", "9 Badges", "10 Badges"],
			correct: 2,
			answerText: "A Badge (Japanese: バッジ Badge) is an item which denotes a Pokémon Trainer as having defeated a Gym Leader. Trainers need to collect a certain number of Gym Badges in order to qualify for a region's Pokémon League.",
            image: "assets/images/GymBadges.png",
        },

		{
			question: "What's the device trainers use to keep a record of their Pokemon encounters?",
			choices: ["Pokedex", "Pokephone", "Pokefinder", "Pokefinder", "Pokepedia"],
			correct: 0,
			answerText: "The Pokédex (ポケモン図鑑 Pokemon Zukan) is an electronic device designed to catalogue and provide information regarding the various species of Pokémon featured in the Pokémon video game, anime and manga series.",
            image: "assets/images/Pokedex.png",
        },
		{
			question: "If you need to buy supplies in the Pokemon world, where do you go?",
			choices: ["Pokemon Center", "Pokemart", "Gym", "Poke Dep", "Pokesco"],
			correct: 1,
			answerText: "Pokémarts are shops in PWO where players may purchase items. Pokémarts can be found in almost every city, and they can be identified with their blue roof.",
            image: "assets/images/Pokemart.png",
        },
		{
			question: "If you need to revive your fainted Pokemon to full health, where do you go?",
			choices: ["Mount Fujii", "E.R", "GYM", "Pokemon Mansion", "Pokemon Center"],
			correct: 4,
			answerText: "A Pokémon Center (Japanese: ポケモンセンター Pokémon Center), also shortened to PMC in Pokémon Sun and Moon or Pokécen or Pokésen (Japanese: ポケセン) in Japan, is a type of building that provides regulatory services for Pokémon Trainers.",
            image: "assets/images/PokemonCenter.png",
        },
		{
			question: "What are the three types of starter Pokemon?",
			choices: ["Psychic, Fighting, and Ghost", "Grass, Fire, and Water", "Electric, Ground, and Poison", "Dragon, Flying, and Normal", "Rock, Steel, and Dark"],
			correct: 1,
			answerText: "At the beginning of their quest, Trainers are given a starter Pokémon (Japanese: はじめてのポケモン Beginning Pokémon or 最初のポケモン first Pokémon; known as 御三家 the big three among Japanese fans). This Pokémon will be used to battle the first wild Pokémon that the Trainer encounters.",
            image: "assets/images/StarterPokemon.png",
        },
	];

	// Hides Content at Start Up
	$("#gameArea").hide();

	// Start Button Click and Hide
	$("#startBtn").on("click", function(){
		$("#startGame").hide();
		newGame();
	});

	// Reset Button
	$("#startOverBtn").on("click", function(){
		$("#Res").hide();
		newGame();
	});

	//Function to Start Game After Initial Click
	function newGame() {
		$("#gameArea").show();
		$("#Ans").hide();
		$("#Res").hide();		
		correctAnswer = 0;
		wrongAnswer = 0;
		unanswered = 0;
		currentQ = 0;
		questions();
	}

	// Displays Question
	function questions() {
		$("#Ans").hide();
		$("#Qs").show();
        answered = true;
        
	// Prints Question from Array
		$(".question").html(triviaQuestions[currentQ].question);

	//Loops through possible choices and appends
		for (var i = 0; i <= 5; i++) {
			var list = $("<div>");
			list.text(triviaQuestions[currentQ].choices[i]);
			list.attr({"data-index": i });
			list.addClass("thisChoice");
			$(".choices").append(list);
		}

	//Calls Timer
		countdown();

	// Userclick
		$(".thisChoice").on("click",function(){
			userChoice = $(this).data("index");
			clearInterval(time);
			shoAnswer();
		});
	}

	// Timer Countdown
	function countdown() {
		seconds = 20;
		$("#time").html("00:" + seconds);
		answered = true;
		//Delay of 1 sec before timer goes off
		time = setInterval(countDownSho, 1000);
	}

	// Shows Timer
	function countDownSho() {
		seconds --;
		if(seconds < 10) {
			$("#time").html("00:0" + seconds);
			$("#time").css({"color": "red"});
		} else {
			$("#time").html("00:" + seconds);
			$("#time").css({"color": "#def"});
		}

		if (seconds < 1) {
			clearInterval(time);
			answered = false;
			shoAnswer();
		}
	}

	// Displays answer to div
	function shoAnswer() {
		$("#Qs").hide();
		$("#Res").hide();
		$("#Ans").show();
		$(".thisChoice").empty();

		var rightAnswerText = triviaQuestions[currentQ].choices[triviaQuestions[currentQ].correct];
		var rightAnswerIndex = triviaQuestions[currentQ].correct;
		console.log(rightAnswerText);
		console.log(rightAnswerIndex);

		//IMG
		var gifLink = triviaQuestions[currentQ].image;
		var Giffy = $("<img>");
		Giffy.attr("Src", gifLink);
		Giffy.addClass("gifImg");
		$("#gif").html(Giffy);
		
		// Img TEXT
		var gifText = triviaQuestions[currentQ].answerText;
			newCap = $("<div>");
			newCap.html(gifText);
			newCap.addClass("gifCap");
			$("#gifText").html(newCap);


		// Displays and Counts user answers and not answered
		if ((userChoice === rightAnswerIndex) && (answered === true)) {
			correctAnswer++;
			$("#text").html(text.correct);
			$("#correctAnswer").hide();
		} else if ((userChoice !== rightAnswerIndex) && (answered === true)) {
			wrongAnswer++;
			$("#text").html(text.incorrect);
			$("#correctAnswer").show().html("The correct answer was: " + rightAnswerText);
		} else {
			unanswered++;
			$("#text").html(text.noTime);
			$("#correctAnswer").html("The correct answer was: " + rightAnswerText);
			answered = true;
		}

		//Last Answer Reveal Timer
		if (currentQ === (triviaQuestions.length-1)) {
			setTimeout(results, 10000);
		} else {
			currentQ++;
			setTimeout(questions, 10000);
		}

	}

	function results() {
		$("#Ans").hide();
		$("#Qs").hide();
		$("#Res").show();
		$("#resultText").html(text.done);
		$("#correctAnswers").html("Correct Answers: " + correctAnswer);
		$("#wrongAnswers").html("Wrong Answers: " + wrongAnswer);
		$("#unanswered").html("Didn't Answer: " + unanswered);
		$("#startOverBtn").show();
		$("#startOverBtn").html("RESTART GAME");
	}

	
});