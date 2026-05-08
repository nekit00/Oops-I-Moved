const API_URL = "https://tinkr.tech/sdb/wanderworld_players";

const player = document.getElementById("player");
const playerNameEl = document.getElementById("playerName");
const world = document.getElementById("world");

const nameInput = document.getElementById("nameInput");
const startBtn = document.getElementById("startBtn");

// PLAYER DATA

let playerName = "Player";

// Unique player id
const playerId = Date.now().toString();

// Current position
let x = 100;
let y = 100;

// Target position
let targetX = x;
let targetY = y;

// OTHER PLAYERS

let otherPlayers = {};

// WORLD OBJECTS

let trees = [];
let waters = [];

// GENERATE TREES

function generateTrees(count) {

  for (let i = 0; i < count; i++) {

    let tx = Math.random() * 760;
    let ty = Math.random() * 560;

    trees.push({
      x: tx,
      y: ty
    });

    const tree = document.createElement("img");

    tree.src =
      "https://tinkr.tech/sdb_apps/wanderworld/images/tree.png";

    tree.style.position = "absolute";
    tree.style.left = tx + "px";
    tree.style.top = ty + "px";
    tree.style.width = "48px";
    tree.style.imageRendering = "pixelated";

    world.appendChild(tree);
  }
}

// GENERATE WATER

function generateWater(count) {

  for (let i = 0; i < count; i++) {

    let tx = Math.random() * 760;
    let ty = Math.random() * 560;

    waters.push({
      x: tx,
      y: ty
    });

    const water = document.createElement("img");

    water.src =
      "https://tinkr.tech/sdb_apps/wanderworld/images/water.png";

    water.style.position = "absolute";
    water.style.left = tx + "px";
    water.style.top = ty + "px";
    water.style.width = "40px";
    water.style.imageRendering = "pixelated";

    world.appendChild(water);
  }
}

// COLLISION SYSTEM

function isColliding(nx, ny) {

  // Tree collisions
  for (let t of trees) {

    if (
      Math.abs(nx - t.x) < 30 &&
      Math.abs(ny - t.y) < 30
    ) {
      return true;
    }
  }

  // Water collisions
  for (let w of waters) {

    if (
      Math.abs(nx - w.x) < 25 &&
      Math.abs(ny - w.y) < 25
    ) {
      return true;
    }
  }

  return false;
}

// SAVE PLAYER TO API

async function savePlayer() {

  const playerData = {

    playerId: playerId,
    name: playerName,

    x: x,
    y: y,

    updated: Date.now()
  };

  await fetch(API_URL, {

    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify(playerData)
  });
}

// LOAD PLAYERS

async function loadPlayers() {

  const res = await fetch(API_URL);

  const players = await res.json();

  // Remove old visual players
  for (let id in otherPlayers) {

    otherPlayers[id].el.remove();
    otherPlayers[id].label.remove();
  }

  otherPlayers = {};

  // Keep only newest player records
  const latestPlayers = {};

  players.forEach(p => {

    // Ignore broken records
    if (!p.playerId) return;

    // Keep newest update only
    if (
      !latestPlayers[p.playerId] ||
      p.updated > latestPlayers[p.playerId].updated
    ) {

      latestPlayers[p.playerId] = p;
    }
  });

  // Draw players
  Object.values(latestPlayers).forEach(p => {

    // Ignore yourself
    if (p.playerId === playerId) return;

    // Ignore offline players
    if (Date.now() - p.updated > 5000) return;

    // Create player
    const el = document.createElement("img");

    el.src =
     "https://tinkr.tech/sdb_apps/wanderworld/images/player.png";

    el.style.position = "absolute";
    el.style.width = "32px";
    el.style.height = "32px";
    el.style.imageRendering = "pixelated";

    world.appendChild(el);

    // Create name label
    const label = document.createElement("div");

    label.style.position = "absolute";
    label.style.color = "white";
    label.style.fontSize = "12px";

    world.appendChild(label);

    // Set player position
    el.style.left = p.x + "px";
    el.style.top = p.y + "px";

    // Set player name
    label.innerText = p.name;

    label.style.left = p.x + "px";
    label.style.top = (p.y - 15) + "px";

    // Save reference
    otherPlayers[p.playerId] = {
      el,
      label
    };
  });
}

// MAIN GAME LOOP

function update() {

  // Smooth movement
  let nextX = x + (targetX - x) * 0.1;
  let nextY = y + (targetY - y) * 0.1;

  // Collision check
  if (!isColliding(nextX, nextY)) {

    x = nextX;
    y = nextY;
  }

  // Update player position
  player.style.left = x + "px";
  player.style.top = y + "px";

  // Update player name
  playerNameEl.innerText = playerName;

  playerNameEl.style.left = x + "px";
  playerNameEl.style.top = (y - 15) + "px";

  // Repeat every frame
  requestAnimationFrame(update);
}

// CLICK MOVEMENT

world.addEventListener("click", (e) => {

  const rect = world.getBoundingClientRect();

  targetX = e.clientX - rect.left;
  targetY = e.clientY - rect.top;
});

// START BUTTON

startBtn.onclick = () => {

  if (nameInput.value.trim() !== "") {

    playerName = nameInput.value;
  }
};

// START GAME

generateTrees(15);
generateWater(10);

update();

// Save player every 1 second
setInterval(savePlayer, 1000);

// Load players every 1 second
setInterval(loadPlayers, 1000);
