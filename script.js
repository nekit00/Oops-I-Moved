const player = document.getElementById("player");
const playerNameEl = document.getElementById("playerName");
const world = document.getElementById("world");

const nameInput = document.getElementById("nameInput");
const startBtn = document.getElementById("startBtn");

let playerName = "Player";

// START position
let x = 100;
let y = 100;
let targetX = x;
let targetY = y;

// objects
let trees = [];
let waters = [];

// Tree
function generateTrees(count) {
  for (let i = 0; i < count; i++) {
    let tx = Math.random() * 760;
    let ty = Math.random() * 560;

    trees.push({ x: tx, y: ty });

    const tree = document.createElement("img");
    tree.src = "https://tinkr.tech/sdb_apps/wanderworld/images/tree.png";
    tree.style.position = "absolute";
    tree.style.left = tx + "px";
    tree.style.top = ty + "px";
    tree.style.width = "48px";
    tree.style.imageRendering = "pixelated";

    world.appendChild(tree);
  }
}

// Water
function generateWater(count) {
  for (let i = 0; i < count; i++) {
    let tx = Math.random() * 760;
    let ty = Math.random() * 560;

    waters.push({ x: tx, y: ty });

    const water = document.createElement("img");
    water.src = "https://tinkr.tech/sdb_apps/wanderworld/images/water.png";
    water.style.position = "absolute";
    water.style.left = tx + "px";
    water.style.top = ty + "px";
    water.style.width = "40px";
    water.style.imageRendering = "pixelated";

    world.appendChild(water);
  }
}

// Colision
function isColliding(nx, ny) {
  for (let t of trees) {
    if (Math.abs(nx - t.x) < 30 && Math.abs(ny - t.y) < 30) return true;
  }
  for (let w of waters) {
    if (Math.abs(nx - w.x) < 25 && Math.abs(ny - w.y) < 25) return true;
  }
  return false;
}

// Cow
let cow = { x: 300, y: 300, targetX: 300, targetY: 300 };

const cowEl = document.createElement("img");
cowEl.src = "https://tinkr.tech/sdb_apps/wanderworld/images/cow.png";
cowEl.style.position = "absolute";
cowEl.style.width = "40px";
cowEl.style.imageRendering = "pixelated";
world.appendChild(cowEl);

const cowText = document.createElement("div");
cowText.classList.add("npcText");
world.appendChild(cowText);

function updateCow() {
  if (Math.random() < 0.01) {
    cow.targetX = Math.random() * 760;
    cow.targetY = Math.random() * 560;

    const phrases = ["Moo 🐄", "Hello!", "Welcome!", "Grass..."];
    cowText.innerText = phrases[Math.floor(Math.random() * phrases.length)];
  }

  cow.x += (cow.targetX - cow.x) * 0.02;
  cow.y += (cow.targetY - cow.y) * 0.02;

  cowEl.style.left = cow.x + "px";
  cowEl.style.top = cow.y + "px";

  cowText.style.left = cow.x + "px";
  cowText.style.top = (cow.y - 20) + "px";
}

// Chicken
let chicken = { x: 500, y: 200, targetX: 500, targetY: 200 };

const chickenEl = document.createElement("img");
chickenEl.src = "https://tinkr.tech/sdb_apps/wanderworld/images/chicken.png";
chickenEl.style.position = "absolute";
chickenEl.style.width = "40px";
chickenEl.style.imageRendering = "pixelated";
world.appendChild(chickenEl);

const chickenText = document.createElement("div");
chickenText.classList.add("npcText");
world.appendChild(chickenText);

function updateChicken() {
  if (Math.random() < 0.01) {
    chicken.targetX = Math.random() * 760;
    chicken.targetY = Math.random() * 560;

    const phrases = ["Cluck!", "Hi!", "Seeds...", "Run!"];
    chickenText.innerText = phrases[Math.floor(Math.random() * phrases.length)];
  }

  chicken.x += (chicken.targetX - chicken.x) * 0.02;
  chicken.y += (chicken.targetY - chicken.y) * 0.02;

  chickenEl.style.left = chicken.x + "px";
  chickenEl.style.top = chicken.y + "px";

  chickenText.style.left = chicken.x + "px";
  chickenText.style.top = (chicken.y - 20) + "px";
}

// Player
function update() {
  let nextX = x + (targetX - x) * 0.1;
  let nextY = y + (targetY - y) * 0.1;

  if (!isColliding(nextX, nextY)) {
    x = nextX;
    y = nextY;
  }

  player.style.left = x + "px";
  player.style.top = y + "px";

  // Name
  playerNameEl.innerText = playerName;
  playerNameEl.style.left = x + "px";
  playerNameEl.style.top = (y - 15) + "px";

  updateCow();
  updateChicken();

  requestAnimationFrame(update);
}

// Movement
world.addEventListener("click", (e) => {
  const rect = world.getBoundingClientRect();
  targetX = e.clientX - rect.left;
  targetY = e.clientY - rect.top;
});

// Name
startBtn.onclick = () => {
  if (nameInput.value.trim() !== "") {
    playerName = nameInput.value;
  }
};

// Start
generateTrees(15);
generateWater(10);
update();
