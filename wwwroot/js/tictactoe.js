"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
var player1 = "", player2 = "";
var game = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
var qtd = 0;
var lstInput = "";

//Disable send button until connection is established
document.getElementById("status").style.backgroundColor = "red";

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
    document.getElementById("btnP1").innerHTML = "O";
});

connection.on("SetPlayer2", function (userId) {
    player2 = userId;
    document.getElementById("player2").innerHTML = player2;
    document.getElementById("btnP2").disabled = true;
    document.getElementById("btnP2").innerHTML = "X";
});

connection.on("SqrGame", function (indexTd, userId) {
    if (userId == player1 && lstInput != "O") {
        game[indexTd] = "O";
        document.getElementsByTagName("td")[indexTd].innerHTML = "O";
        document.getElementsByTagName("td")[indexTd].style.color = "blue";
        document.getElementById("turnPlayer").innerHTML = "Vez do Jogador 2";
        lstInput = "O";
    }
    else if (userId == player2 && lstInput != "X") {
        game[indexTd] = "X";
        document.getElementsByTagName("td")[indexTd].innerHTML = "X";
        document.getElementsByTagName("td")[indexTd].style.color = "red";
        document.getElementById("turnPlayer").innerHTML = "Vez do Jogador 1";
        lstInput = "X";
    }
    qtd++;
    checkResult();
});

connection.on("ResetGame", function(){
    var AllTd = document.getElementsByTagName("td");
    for (var i = 0; i < AllTd.length; i++) {
        document.getElementsByTagName("td")[i].innerHTML = "<input type='button' onclick='SqrGame(" + [i] + ")' value=' ' />";
        document.getElementsByTagName("td")[i].style.color = "";
        document.getElementById("btnReset").classList.remove("newGame");
        document.getElementById("turnPlayer").classList.remove("winner");
        document.getElementById("turnPlayer").innerHTML = "Vez do Jogador 1";
    }
    game = [" ", " ", " ", " ", " ", " ", " ", " ", " "]
    qtd = 0;
});

connection.start().then(function () {
    document.getElementById("status").style.backgroundColor = "green";
}).catch(function (err) {
    return console.error(err.toString());
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
        if (game[0] == game[4] && game[4] == game[8] && ( game[0] != " " && game[4] != " " && game[8] != " ")) {
            document.getElementsByTagName("td")[0].style.color = "green";
            document.getElementsByTagName("td")[4].style.color = "green";
            document.getElementsByTagName("td")[8].style.color = "green";
            var AllInput = document.getElementsByTagName("Input");
            for (var i = 0; i < AllInput.length; i++) {
                AllInput[i].disabled = true;
            }
            if (lstInput == "O")
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 1";
            else
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 2";
            document.getElementById("btnReset").classList.add("newGame");
            document.getElementById("turnPlayer").classList.add("winner");
        }
        if (game[2] == game[4] && game[4] == game[6] && ( game[2] != " " && game[4] != " " && game[6] != " ")) {
            document.getElementsByTagName("td")[2].style.color = "green";
            document.getElementsByTagName("td")[4].style.color = "green";
            document.getElementsByTagName("td")[6].style.color = "green";
            var AllInput = document.getElementsByTagName("Input");
            for (var i = 0; i < AllInput.length; i++) {
                AllInput[i].disabled = true;
            }
            if (lstInput == "O")
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 1";
            else
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 2";
            document.getElementById("btnReset").classList.add("newGame");
            document.getElementById("turnPlayer").classList.add("winner");
        }
        if (game[0] == game[1] && game[1] == game[2] && ( game[0] != " " && game[1] != " " && game[2] != " ")) {
            document.getElementsByTagName("td")[0].style.color = "green";
            document.getElementsByTagName("td")[1].style.color = "green";
            document.getElementsByTagName("td")[2].style.color = "green";
            var AllInput = document.getElementsByTagName("Input");
            for (var i = 0; i < AllInput.length; i++) {
                AllInput[i].disabled = true;
            }
            if (lstInput == "O")
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 1";
            else
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 2";
            document.getElementById("btnReset").classList.add("newGame");
            document.getElementById("turnPlayer").classList.add("winner");
        }
        if (game[3] == game[4] && game[4] == game[5] && ( game[3] != " " && game[4] != " " && game[5] != " ")) {
            document.getElementsByTagName("td")[3].style.color = "green";
            document.getElementsByTagName("td")[4].style.color = "green";
            document.getElementsByTagName("td")[5].style.color = "green";
            var AllInput = document.getElementsByTagName("Input");
            for (var i = 0; i < AllInput.length; i++) {
                AllInput[i].disabled = true;
            }
            if (lstInput == "O")
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 1";
            else
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 2";
            document.getElementById("btnReset").classList.add("newGame");
            document.getElementById("turnPlayer").classList.add("winner");
        }
        if (game[6] == game[7] && game[7] == game[8] && ( game[6] != " " && game[7] != " " && game[8] != " ")) {
            document.getElementsByTagName("td")[6].style.color = "green";
            document.getElementsByTagName("td")[7].style.color = "green";
            document.getElementsByTagName("td")[8].style.color = "green";
            var AllInput = document.getElementsByTagName("Input");
            for (var i = 0; i < AllInput.length; i++) {
                AllInput[i].disabled = true;
            }
            if (lstInput == "O")
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 1";
            else
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 2";
            document.getElementById("btnReset").classList.add("newGame");
            document.getElementById("turnPlayer").classList.add("winner");
        }
        if (game[0] == game[3] && game[3] == game[6] && ( game[0] != " " && game[3] != " " && game[6] != " ")) {
            document.getElementsByTagName("td")[0].style.color = "green";
            document.getElementsByTagName("td")[3].style.color = "green";
            document.getElementsByTagName("td")[6].style.color = "green";
            var AllInput = document.getElementsByTagName("Input");
            for (var i = 0; i < AllInput.length; i++) {
                AllInput[i].disabled = true;
            }
            if (lstInput == "O")
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 1";
            else
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 2";
            document.getElementById("btnReset").classList.add("newGame");
            document.getElementById("turnPlayer").classList.add("winner");
        }
        if (game[1] == game[4] && game[4] == game[7] && ( game[1] != " " && game[4] != " " && game[7] != " ")) {
            document.getElementsByTagName("td")[1].style.color = "green";
            document.getElementsByTagName("td")[4].style.color = "green";
            document.getElementsByTagName("td")[7].style.color = "green";
            var AllInput = document.getElementsByTagName("Input");
            for (var i = 0; i < AllInput.length; i++) {
                AllInput[i].disabled = true;
            }
            if (lstInput == "O")
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 1";
            else
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 2";
            document.getElementById("btnReset").classList.add("newGame");
            document.getElementById("turnPlayer").classList.add("winner");
        }
        if (game[2] == game[5] && game[5] == game[8] && ( game[2] != " " && game[5] != " " && game[8] != " ")) {
            document.getElementsByTagName("td")[2].style.color = "green";
            document.getElementsByTagName("td")[5].style.color = "green";
            document.getElementsByTagName("td")[8].style.color = "green";
            var AllInput = document.getElementsByTagName("Input");
            for (var i = 0; i < AllInput.length; i++) {
                AllInput[i].disabled = true;
            }
            if (lstInput == "O")
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 1";
            else
                document.getElementById("turnPlayer").innerHTML = "Vencedor Jogador 2";
            document.getElementById("btnReset").classList.add("newGame");
            document.getElementById("turnPlayer").classList.add("winner");
        }

    }
}