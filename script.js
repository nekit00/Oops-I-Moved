const player = document.getElementById("player");
const world = document.getElementById("world");

// start position
let x = 100;
let y = 100;

// target
let targetX = x;
let targetY = y;

// update the position
function update() {
  // smooth movement
  x += (targetX - x) * 0.1;
  y += (targetY - y) * 0.1;

  player.style.left = x + "px";
  player.style.top = y + "px";

  requestAnimationFrame(update);
}

// movement
world.addEventListener("click", (e) => {
  const rect = world.getBoundingClientRect();

  targetX = e.clientX - rect.left;
  targetY = e.clientY - rect.top;
});

// start
update();