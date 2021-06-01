"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var player1 = "", player2 = "";
var game = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
var qtd = 0;

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var encodedMsg = user + " says " + msg;
    var li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);
});

connection.on("SetPlayer1", function (userId) {
    player1 = userId;
    document.getElementById("player1").innerHTML = player1;
    document.getElementById("btnP1").disabled = true;
});

connection.on("SetPlayer2", function (userId) {
    player2 = userId;
    document.getElementById("player2").innerHTML = player2;
    document.getElementById("btnP2").disabled = true;
});

connection.on("SqrGame", function (indexTd, userId) {
    if (userId == player1) {
        game[indexTd] = "O";
        document.getElementsByTagName("td")[indexTd].innerHTML = "O";
    }
    else {
        game[indexTd] = "X";
        document.getElementsByTagName("td")[indexTd].innerHTML = "X";
    }
    
    console.log(game);
    qtd++;
    checkResult();
});

connection.on("ResetGame", function(){
    var AllTd = document.getElementsByTagName("td");
    for (var i = 0; i < AllTd.length; i++) {
        document.getElementsByTagName("td")[i].innerHTML = "<input type='button' onclick='SqrGame(" + [i] + ")' value=' ' />";
        document.getElementsByTagName("td")[i].style.color = "";
    }
    game = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
    qtd = 0;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});
document.getElementById("quitButton").addEventListener("click", function (event) {
    var user = document.getElementById("userInput").value;
    connection.invoke("QuitMessage", user).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

function SetPlayer1() {
    connection.invoke("SetPlayer1").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
}

function SetPlayer2() {
    connection.invoke("SetPlayer2").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
}

function SqrGame(indexTd) {
    connection.invoke("SqrGame", indexTd).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
};

function ResetGame() {
    connection.invoke("ResetGame").catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
};

function checkResult() {
    if (qtd >= 5) {
        if (game[0] == game[4] && game[4] == game[8]) {
            document.getElementsByTagName("td")[0].style.color = "green";
            document.getElementsByTagName("td")[4].style.color = "green";
            document.getElementsByTagName("td")[8].style.color = "green";
            var AllInput = document.getElementsByTagName("Input");
            for (var i = 0; i < AllInput.length; i++) {
                AllInput[i].disabled = true;
            }
        }
        if (game[2] == game[4] && game[4] == game[6]) {
            document.getElementsByTagName("td")[2].style.color = "green";
            document.getElementsByTagName("td")[4].style.color = "green";
            document.getElementsByTagName("td")[6].style.color = "green";
        }
    }
}