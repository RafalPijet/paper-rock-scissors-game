"use strict";
(function () {
    var params = {
        info: document.getElementById("output"),
        score: document.getElementById("result"),
        myLog: document.getElementById("log-info"),
        buttonStart: document.getElementById("start"),
        buttonSubmit: document.getElementById("submit-button"),
        faceNormal: document.getElementById("face-normal"),
        faceNoHappy: document.getElementById("face-no-happy"),
        faceLost: document.getElementById("face-lost"),
        faceWin: document.getElementById("face-win"),
        faceStart: document.getElementById("face-start"),
        choiceButtons: document.querySelectorAll(".player-move"),
        closeElements: document.querySelectorAll(".js--close-modal"),
        elements: ["paper", "stone", "shears"],
        roundCounter: null,
        userName: null,
        userCounter: null,
        compCounter: null,
        check: false
    };

    var prepareGame = function() {
        params.userCounter = 0;
        params.compCounter = 0;
        params.check = true;
        openModal("#player-data");
    }
    
    function confirmPlayerData() {
        params.userName = document.getElementById("player-name").value;
        params.roundCounter = parseInt(document.getElementById("player-rounds").value);

        if (params.userName.length > 0 && params.roundCounter > 0) {
            params.buttonStart.classList.toggle("hidden");
            resetFaces();
            showScore();
            params.info.innerHTML = "select the button";
            closeModal();
        } else {
            prepareGame();
        }
    }

    var resetFaces = function() {
        params.faceNormal.classList.add("show-face");
        params.faceLost.classList.add("show-face");
        params.faceWin.classList.add("show-face");
        params.faceNoHappy.classList.add("show-face");
    }

    var showLog = function(info) {
        params.myLog.innerHTML = info;
    }

    var endGame = function() {
        params.check = false;
        params.buttonStart.classList.toggle("hidden");

        if (params.userCounter > params.compCounter) {
            params.info.innerHTML = "YOU WON THE ENTIRE GAME!!!";
            resetFaces();
            params.faceLost.classList.remove("show-face");
        } else if (params.userCounter < params.compCounter) {
            params.info.innerHTML = "YOU LOST THE ENTIRE GAME!!!";
            resetFaces();
            params.faceWin.classList.remove("show-face");
        } else if (params.userCounter === params.compCounter) {
            params.info.innerHTML = "DRAW";
            resetFaces();
            params.faceNormal.classList.remove("show-face");
        }
        showLog("GAME OVER");
    }

    var showScore = function() {
        params.score.innerHTML = params.userName + "(" + params.userCounter + ") vs (" + params.compCounter + ")Computer";
        showLog("remaining rounds: <strong>" + params.roundCounter + "</strong>");
    }

    var randomCompChoice = function() {
        return params.elements[Math.round((Math.random()) * 2)];
    }

    var showInfo = function(userChoice, compChoice, checkScore) {
        var answers = ["you won", "computer won", "draw"];
        var answer = ": you played " + userChoice.toUpperCase() + ", computer played " + compChoice.
        toUpperCase();

        if (checkScore === "you") {
            params.info.innerHTML = answers[0].toUpperCase() + answer;
            resetFaces();
            params.faceLost.classList.remove("show-face");
        } else if (checkScore === "comp") {
            params.info.innerHTML = answers[1].toUpperCase() + answer;
            resetFaces();
            params.faceWin.classList.remove("show-face");
        } else {
            params.info.innerHTML = answers[2].toUpperCase() + answer;
            resetFaces();
            params.faceNoHappy.classList.remove("show-face");
        }
    }

    var playerMove = function(userChoice) {
        var compChoice = randomCompChoice();
        params.faceStart.classList.add("show-face");

        if (userChoice === compChoice) {
            showInfo(userChoice, compChoice, "draw");
        } else if ((userChoice === params.elements[2] && compChoice === params.elements[0]) ||
            (userChoice === params.elements[1] && compChoice === params.elements[2]) ||
            (userChoice === params.elements[0] && compChoice === params.elements[1])) {
            showInfo(userChoice, compChoice, "you");
            params.userCounter ++;
        } else {
            showInfo(userChoice, compChoice, "comp");
            params.compCounter ++;
        }
        params.roundCounter --;

        if (params.roundCounter > 0) {
            showScore();
        } else {
            showScore();
            endGame();
        }
    }

    function openModal(modal) {
        document.querySelectorAll('#overlay > *').forEach(function(modal) {
            modal.classList.remove('show')
        })
        document.querySelector('#overlay').classList.add('show')
        document.querySelector(modal).classList.add('show')
    }

    function closeModal() {
        document.getElementById("overlay").classList.remove("show");
    }

    for (var i = 0; i < params.choiceButtons.length; i++) {
        params.choiceButtons[i].addEventListener("click", function() {
            var userChoice = this.getAttribute("data-move");
            if (params.check) {
                playerMove(userChoice);
            } else {
                showLog("Game over, please press the new game button!");
            }
        })
    }

    for (var i = 0; i < params.closeElements.length; i++) {
        params.closeElements[i].addEventListener("click", function() {
            closeModal();
        })
    }

    params.buttonStart.addEventListener("click", function() {
        prepareGame();
    })

    params.buttonStart.addEventListener("mouseenter", function() {
        resetFaces();
        params.faceStart.classList.remove("show-face");
    })

    params.buttonSubmit.addEventListener("click", function() {
        confirmPlayerData();
    })

    document.querySelector("#overlay").addEventListener("click", function(event) {
        if (event.target === this) {
            closeModal();
        }
    })

    document.addEventListener('keyup', function(e) {
        if(e.keyCode === 27) {
            closeModal()
        }
    })

})();