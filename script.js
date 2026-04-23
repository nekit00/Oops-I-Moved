const player = document.getElementById("player");
const world = document.getElementById("world");

//player position
let x = 100;
let y = 100;

let targetX = x;
let targetY = y;

//objects
let trees = [];
let waters = [];

//Trees
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

//Water
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
    water.style.width = "35px";
    water.style.imageRendering = "pixelated";

    world.appendChild(water);
  }
}

//checking
function isColliding(nx, ny) {
  //Trees
  for (let t of trees) {
    if (Math.abs(nx - t.x) < 30 && Math.abs(ny - t.y) < 30) {
      return true;
    }
  }

  //Water
  for (let w of waters) {
    if (Math.abs(nx - w.x) < 20 && Math.abs(ny - w.y) < 20) {
      return true;
    }
  }

  return false;
}

// Cow
let cow = {
  x: 300,
  y: 300,
  targetX: 300,
  targetY: 300
};

const cowEl = document.createElement("img");
cowEl.src = "https://tinkr.tech/sdb_apps/wanderworld/images/cow.png";
cowEl.style.position = "absolute";
cowEl.style.width = "40px";
cowEl.style.imageRendering = "pixelated";
world.appendChild(cowEl);

//Cows text
const cowText = document.createElement("div");
cowText.style.position = "absolute";
cowText.style.background = "white";
cowText.style.padding = "2px 5px";
cowText.style.fontSize = "10px";
cowText.style.borderRadius = "5px";
world.appendChild(cowText);

//cow movement
function updateCow() {
  //changing plase
  if (Math.random() < 0.005) {
    cow.targetX = Math.random() * 760;
    cow.targetY = Math.random() * 560;

    const phrases = [
      "Moo~~~",
      "Hello!",
      "I am cow",
      "Welcome traveler",
      "grass..."
    ];

    cowText.innerText = phrases[Math.floor(Math.random() * phrases.length)];
  }

  cow.x += (cow.targetX - cow.x) * 0.02;
  cow.y += (cow.targetY - cow.y) * 0.02;

  cowEl.style.left = cow.x + "px";
  cowEl.style.top = cow.y + "px";

  cowText.style.left = cow.x + "px";
  cowText.style.top = (cow.y - 20) + "px";
}

//plaer movement
function update() {
  let nextX = x + (targetX - x) * 0.1;
  let nextY = y + (targetY - y) * 0.1;

  if (!isColliding(nextX, nextY)) {
    x = nextX;
    y = nextY;
  }

  player.style.left = x + "px";
  player.style.top = y + "px";

  updateCow();

  requestAnimationFrame(update);
}

//klick
world.addEventListener("click", (e) => {
  const rect = world.getBoundingClientRect();

  targetX = e.clientX - rect.left;
  targetY = e.clientY - rect.top;
});

//update + start
generateTrees(15);
generateWater(10);
update();
