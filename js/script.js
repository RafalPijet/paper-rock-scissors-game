"use strict";
(function () {
    var info = document.getElementById("output");
    var score = document.getElementById("result");
    var myLog = document.getElementById("log-info")
    var buttonShears = document.getElementById("first");
    var buttonStone = document.getElementById("second");
    var buttonPaper = document.getElementById("third");
    var buttonStart = document.getElementById("start");
    var faceNormal = document.getElementById("face-normal");
    var faceNoHappy = document.getElementById("face-no-happy");
    var faceLost = document.getElementById("face-lost");
    var faceWin = document.getElementById("face-win");
    var faceStart = document.getElementById("face-start");
    var elements = ["paper", "stone", "shears"];
    var roundCounter;
    var userName;
    var userCounter;
    var compCounter;
    var check = false;

    var prepareGame = function() {
        userCounter = 0;
        compCounter = 0;
        check = true;
        userName = window.prompt("Enter your name:");
        roundCounter = window.prompt("Enter quantity of round:");
        buttonStart.classList.toggle("hidden");
        resetFaces();
        showScore();
        info.innerHTML = "select the button";
    }

    var resetFaces = function() {
        faceNormal.classList.add("show-face");
        faceLost.classList.add("show-face");
        faceWin.classList.add("show-face");
        faceNoHappy.classList.add("show-face");
    }

    var showLog = function(info) {
        myLog.innerHTML = info;
    }

    var endGame = function() {
        check = false;
        buttonStart.classList.toggle("hidden");

        if (userCounter > compCounter) {
            info.innerHTML = "YOU WON THE ENTIRE GAME!!!";
            resetFaces();
            faceLost.classList.remove("show-face");
        } else if (userCounter < compCounter) {
            info.innerHTML = "YOU LOST THE ENTIRE GAME!!!";
            resetFaces();
            faceWin.classList.remove("show-face");
        } else if (userCounter == compCounter) {
            info.innerHTML = "DRAW";
            resetFaces();
            faceNormal.classList.remove("show-face");
        }
        showLog("GAME OVER");
    }

    var showScore = function() {
        score.innerHTML = userName + "(" + userCounter + ") vs (" + compCounter + ")Computer";
        showLog("remaining rounds: <strong>" + roundCounter + "</strong>");
    }

    var randomCompChoice = function() {
        return Math.round((Math.random()) * 2);
    }

    var showInfo = function(userNumber, compNumber, checkScore) {
        var answers = ["you won", "computer won", "draw"];
        var answer = ": you played " + elements[userNumber].toUpperCase() + ", computer played " + elements[compNumber].
        toUpperCase();

        if (checkScore == "you") {
            info.innerHTML = answers[0].toUpperCase() + answer;
            resetFaces();
            faceLost.classList.remove("show-face");
        } else if (checkScore == "comp") {
            info.innerHTML = answers[1].toUpperCase() + answer;
            resetFaces();
            faceWin.classList.remove("show-face");
        } else {
            info.innerHTML = answers[2].toUpperCase() + answer;
            resetFaces();
            faceNoHappy.classList.remove("show-face");
        }
    }

    var playerMove = function(userChoice) {
        var compChoice = randomCompChoice();
        faceStart.classList.add("show-face");

        if (userChoice === compChoice) {
            showInfo(userChoice, compChoice, "draw");
        } else if ((userChoice == 0 && compChoice ==1) ||
            (userChoice == 1 && compChoice == 2) ||
            (userChoice == 2 && compChoice == 0)) {
            showInfo(userChoice, compChoice, "you");
            userCounter ++;
        } else {
            showInfo(userChoice, compChoice, "comp");
            compCounter ++;
        }
        roundCounter --;

        if (roundCounter > 0) {
            showScore();
        } else {
            showScore();
            endGame();
        }
    }

    buttonShears.addEventListener("click", function() {

        if (check) {
            playerMove(0);
        } else {
            showLog("Game over, please press the new game button!");
        }
    });

    buttonStone.addEventListener("click", function() {

        if (check) {
            playerMove(1);
        } else {
            showLog("Game over, please press the new game button!");
        }
    });

    buttonPaper.addEventListener("click", function() {

        if (check) {
            playerMove(2);
        } else {
            showLog("Game over, please press the new game button!");
        }
    });

    buttonStart.addEventListener("click", function() {
        prepareGame();
    })

    buttonStart.addEventListener("mouseenter", function() {
        resetFaces();
        faceStart.classList.remove("show-face");
    })
})();