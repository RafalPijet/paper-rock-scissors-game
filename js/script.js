"use strict";
(function () {
    var params = {
        info: document.getElementById("output"),
        infoModal: document.getElementById("output-modal"),
        score: document.getElementById("result"),
        myLog: document.getElementById("log-info"),
        buttonStart: document.getElementById("start"),
        buttonDetails: document.getElementById("details"),
        buttonSubmit: document.getElementById("submit-button"),
        faceNormal: document.getElementById("face-normal"),
        faceNoHappy: document.getElementById("face-no-happy"),
        faceLost: document.getElementById("face-lost"),
        faceWin: document.getElementById("face-win"),
        faceStart: document.getElementById("face-start"),
        tableOfSummary: document.getElementById("show-data"),
        choiceButtons: document.querySelectorAll(".player-move"),
        closeElements: document.querySelectorAll(".js--close-modal"),
        elements: ["paper", "stone", "shears"],
        progress: [],
        progressCounter: null,
        roundCounter: null,
        userName: null,
        userCounter: null,
        compCounter: null,
        check: false
    };

    var prepareGame = function() {
        var turnRows = document.querySelectorAll(".turn-row");
        for (var i = 0; i < turnRows.length; i++) {
            params.tableOfSummary.deleteRow(0);
        }
        params.userCounter = 0;
        params.compCounter = 0;
        params.progressCounter = 0;
        params.progress = [];
    }
    
    function confirmPlayerData() {
        params.userName = document.getElementById("player-name").value;
        params.roundCounter = parseInt(document.getElementById("player-rounds").value);

        if (params.userName.length > 0 && params.roundCounter > 0 && params.roundCounter <= 100) {
            params.check = true;
            params.buttonStart.classList.toggle("hidden");
            params.buttonDetails.classList.add("display-off");
            prepareGame();
            resetFaces();
            showScore();
            params.info.innerHTML = "select the button";
            closeModal();
        } else {
            openModal("#player-data");
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
            params.info.innerHTML = params.userName.toUpperCase() + " WON THE ENTIRE GAME!!!";
            params.infoModal.innerHTML = params.userName.toUpperCase() + " WON THE ENTIRE GAME!!!";
            resetFaces();
            params.faceLost.classList.remove("show-face");
        } else if (params.userCounter < params.compCounter) {
            params.info.innerHTML = params.userName.toUpperCase() + " LOST THE ENTIRE GAME!!!";
            params.infoModal.innerHTML = params.userName.toUpperCase() + " LOST THE ENTIRE GAME!!!";
            resetFaces();
            params.faceWin.classList.remove("show-face");
        } else if (params.userCounter === params.compCounter) {
            params.info.innerHTML = "DRAW";
            params.infoModal.innerHTML = "DRAW";
            resetFaces();
            params.faceNormal.classList.remove("show-face");
        }
        showLog("GAME OVER");
        params.buttonDetails.classList.remove("display-off");
        showSummary();
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
        var answer = ": " + params.userName + " played " + userChoice.toUpperCase() + ", computer played " + compChoice.
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
        var dataRow = {};
        var userResult = 0;
        var compResult = 0;
        params.faceStart.classList.add("show-face");

        if (userChoice === compChoice) {
            showInfo(userChoice, compChoice, "draw");
        } else if ((userChoice === params.elements[2] && compChoice === params.elements[0]) ||
            (userChoice === params.elements[1] && compChoice === params.elements[2]) ||
            (userChoice === params.elements[0] && compChoice === params.elements[1])) {
            showInfo(userChoice, compChoice, "you");
            params.userCounter ++;
            userResult ++;
        } else {
            showInfo(userChoice, compChoice, "comp");
            params.compCounter ++;
            compResult ++;
        }
        params.roundCounter --;
        params.progressCounter ++;
        dataRow["turn"] = params.progressCounter;
        dataRow["userChoice"] = userChoice;
        dataRow["compChoice"] = compChoice;
        dataRow["userResult"] = userResult;
        dataRow["compResult"] = compResult;
        dataRow["userScore"] = params.userCounter;
        dataRow["compScore"] = params.compCounter;
        params.progress.push(dataRow);

        if (params.roundCounter > 0) {
            showScore();
        } else {
            showScore();
            endGame();
        }
    }

    function showSummary() {
        for (var i = 0; i < params.progress.length; i++) {
            var row = params.tableOfSummary.insertRow(i);
            row.classList.add("turn-row");
            row.insertCell(0).textContent = params.progress[i].turn;
            row.insertCell(1).textContent = params.progress[i].userChoice;
            row.insertCell(2).textContent = params.progress[i].compChoice;
            row.insertCell(3).textContent = params.progress[i].userResult + " : " + params.progress[i].compResult;
            row.insertCell(4).textContent = params.progress[i].userScore + " : " + params.progress[i].compScore;
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
        openModal("#player-data");
    })

    params.buttonStart.addEventListener("mouseenter", function() {
        resetFaces();
        params.faceStart.classList.remove("show-face");
    })

    params.buttonSubmit.addEventListener("click", function() {
        confirmPlayerData();
    })

    params.buttonDetails.addEventListener("click", function() {
        openModal("#summaryOfResult");
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