const homepage = document.querySelector(".homepage");
const scoreboard = document.querySelector(".scoreboard");
const gameboard = document.querySelector(".gameboard");

const addPlayerBtn = document.querySelector("#addPlayerBtn");
const addPlayerInput = document.querySelector("#addPlayerInput");
const playersList = document.querySelector("#playersList");

const startGameBtn = document.querySelector("#startGameBtn");
const screen = document.querySelector(".screen");
const goOnHomeBtn = document.querySelector(".go-on-home");
const playerboard = document.querySelector(".playerboard");

let players = [];
let activePlayerIndex = 0;
let playerOnMove;

//add players
addPlayerBtn.addEventListener("click", () => {
  if (players.length > 3) {
    alert("Max 4 players");
  } else if (!addPlayerInput.value) {
    alert("Must enter name");
  } else if (addPlayerInput.value.length > 8) {
    alert("Max 8 characters name");
  } else {
    players.push({
      name: addPlayerInput.value,
      p15: 0,
      p16: 0,
      p17: 0,
      p18: 0,
      p19: 0,
      p20: 0,
      pBull: 0,
    });
    let newPlayerDiv = document.createElement("h4");
    newPlayerDiv.innerHTML = `${addPlayerInput.value}`;
    newPlayerDiv.id = `${addPlayerInput.value}`;
    let removePlayer = document.createElement("span");
    removePlayer.classList.add("remove-player");
    removePlayer.innerHTML = "&nbsp❌";
    removePlayer.addEventListener("click", (e) => {
      players.splice(players.indexOf(newPlayerDiv.id), 1);
      e.target.parentElement.remove();
    });
    newPlayerDiv.append(removePlayer);
    playersList.append(newPlayerDiv);
    addPlayerInput.value = "";
    addPlayerInput.focus();
  }
});

//make table
function makeTable() {
  let table = '<table border="1">';
  table += `<tr><th>Name</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th><th>Bull</th></tr>`;
  players.forEach((player) => {
    table = table + `<tr>`;
    table = table + `<td>${player.name}</td>`;
    table = table + `<td>${player.p15}</td>`;
    table = table + `<td>${player.p16}</td>`;
    table = table + `<td>${player.p17}</td>`;
    table = table + `<td>${player.p18}</td>`;
    table = table + `<td>${player.p19}</td>`;
    table = table + `<td>${player.p20}</td>`;
    table = table + `<td>${player.pBull}</td>`;
    table += `</tr>`;
  });
  table += "</table>";
  document.querySelector(".scoreboard").innerHTML = table;
}

//start game
startGameBtn.addEventListener("click", () => {
  if (players.length < 2) {
    alert("Must add 2-4 players");
  } else {
    makeTable();
    screen.style.display = "flex";
    screen.innerHTML = `${players[0].name} move`;
    playerOnMove = players[activePlayerIndex].name;
    homepage.style.display = "none";
    document.body.style.backgroundImage = "none";
    scoreboard.style.display = "block";
    gameboard.style.display = "flex";
  }
});

//game
const allfields = document.querySelectorAll(".fieldspan");
let allHits = [];

for (let i = 0; i < allfields.length; i++) {
  allfields[i].addEventListener("click", (e) => {
    console.log(e.target.id);
    playerboard.innerHTML = "";

    let hitValue = e.target.id;

    allHits.push(hitValue);
    if (allHits.length == 4) {
      allHits.pop();

      const counts = {};

      allHits.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
      });

      players[activePlayerIndex].pBull += counts["50"] ? counts["50"] : 0;
      if (players[activePlayerIndex].pBull >= 3) {
        players[activePlayerIndex].pBull = 3;
      }

      players[activePlayerIndex].p20 += counts["20"] ? counts["20"] : 0;
      players[activePlayerIndex].p20 += counts["40"] ? 2 : 0;
      players[activePlayerIndex].p20 += counts["60"] ? 3 : 0;
      if (players[activePlayerIndex].p20 >= 3) {
        players[activePlayerIndex].p20 = 3;
      }

      players[activePlayerIndex].p19 += counts["19"] ? counts["19"] : 0;
      players[activePlayerIndex].p19 += counts["38"] ? 2 : 0;
      players[activePlayerIndex].p19 += counts["57"] ? 3 : 0;
      if (players[activePlayerIndex].p19 >= 3) {
        players[activePlayerIndex].p19 = 3;
      }

      players[activePlayerIndex].p18 += counts["18"] ? counts["18"] : 0;
      players[activePlayerIndex].p18 += counts["36"] ? 2 : 0;
      players[activePlayerIndex].p18 += counts["54"] ? 3 : 0;
      if (players[activePlayerIndex].p18 >= 3) {
        players[activePlayerIndex].p18 = 3;
      }

      players[activePlayerIndex].p17 += counts["17"] ? counts["17"] : 0;
      players[activePlayerIndex].p17 += counts["34"] ? 2 : 0;
      players[activePlayerIndex].p17 += counts["51"] ? 3 : 0;
      if (players[activePlayerIndex].p17 >= 3) {
        players[activePlayerIndex].p17 = 3;
      }

      players[activePlayerIndex].p16 += counts["16"] ? counts["16"] : 0;
      players[activePlayerIndex].p16 += counts["32"] ? 2 : 0;
      players[activePlayerIndex].p16 += counts["48"] ? 3 : 0;
      if (players[activePlayerIndex].p16 >= 3) {
        players[activePlayerIndex].p16 = 3;
      }

      players[activePlayerIndex].p15 += counts["15"] ? counts["15"] : 0;
      players[activePlayerIndex].p15 += counts["30"] ? 2 : 0;
      players[activePlayerIndex].p15 += counts["45"] ? 3 : 0;
      if (players[activePlayerIndex].p15 >= 3) {
        players[activePlayerIndex].p15 = 3;
      }

      makeTable();

      hitValue = "Your move 🎯";

      //check for win

      if (
        players[activePlayerIndex].pBull == 3 &&
        players[activePlayerIndex].p20 == 3 &&
        players[activePlayerIndex].p19 == 3 &&
        players[activePlayerIndex].p18 == 3 &&
        players[activePlayerIndex].p17 == 3 &&
        players[activePlayerIndex].p16 == 3 &&
        players[activePlayerIndex].p15 == 3
      ) {
        alert("🎯 " + players[activePlayerIndex].name + " Wins! 🎯");
        screen.style.display = "none";
        goOnHomeBtn.style.display = "block";
        hitValue = players[activePlayerIndex].name + "wins";
        gameboard.style.display = "none";
        setInterval(createWinAnimation, 300);
        playerboard.innerHTML =
          "🎯 " + players[activePlayerIndex].name + " Wins! 🎯";
        document.querySelector(".playermove").remove(); //sredi-console error
      } else {
        alert("next player");
      }

      allHits = [];
      activePlayerIndex < players.length - 1
        ? (activePlayerIndex += 1)
        : (activePlayerIndex = 0);

      playerOnMove = players[activePlayerIndex].name;
      screen.innerHTML = `${players[activePlayerIndex].name} move`;
    }

    const playermove = document.createElement("p");
    playermove.classList.add("playermove");
    let removeMove = document.createElement("span");
    removeMove.innerHTML = "&nbsp❎";
    removeMove.classList.add("remove-move");
    removeMove.addEventListener("click", (e) => {
      e.target.parentElement.remove();
      hitValue = null;
      allHits.pop();
    });

    playermove.innerHTML = `${playerOnMove} ${hitValue}`;
    playermove.append(removeMove);
    playerboard.append(playermove);
  });
}
//go on home page
function goOnHomePage() {
  let confirmMessage = confirm("Go to home page?");
  if (confirmMessage) {
    location.href = "index.html";
  }
}
//win animation
function createWinAnimation() {
  const dart = document.createElement("div");
  dart.classList.add("dart");
  dart.style.left = Math.random() * 100 + "vw";
  dart.style.animationDuration = Math.random() * 2 + 3 + "s";
  dart.innerText = "🎯";
  document.body.appendChild(dart);
  setTimeout(() => {
    dart.remove();
  }, 2000);
}
