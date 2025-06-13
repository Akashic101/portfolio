const canvas = document.getElementById("hexCanvas");
const ctx = canvas.getContext("2d");

let width, height;

let side;
let hexWidth, hexHeight, horizSpacing, vertSpacing;

let hexCenters = [];

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * devicePixelRatio;
  canvas.height = height * devicePixelRatio;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(devicePixelRatio, devicePixelRatio);

  if (width <= 600) {
    side = 15;
  } else if (width <= 900) {
    side = 20;
  } else {
    side = 30;
  }

  hexWidth = side * 2;
  hexHeight = Math.sqrt(3) * side;
  horizSpacing = side * 1.5;
  vertSpacing = hexHeight;

  calculateHexCenters();
}

function calculateHexCenters() {
  hexCenters = [];
  const cols = Math.ceil(width / horizSpacing) + 2;
  const rows = Math.ceil(height / vertSpacing) + 2;

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = col * horizSpacing;
      const y = row * vertSpacing + (col % 2 === 1 ? vertSpacing / 2 : 0);
      hexCenters.push({ x, y, currentShade: 0 });
    }
  }
}

function drawHex(x, y, fillShade) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const px = x + side * Math.cos(angle);
    const py = y + side * Math.sin(angle);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fillStyle = `rgb(${fillShade},${fillShade},${fillShade})`;
  ctx.fill();
}

let mouseX = -2000;
let mouseY = -2000;

window.addEventListener("resize", resize);
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});
window.addEventListener("mouseleave", () => {
  mouseX = -2000;
  mouseY = -2000;
});

resize();

function animate() {
  ctx.clearRect(0, 0, width, height);

  for (const hex of hexCenters) {
    const dx = mouseX - hex.x;
    const dy = mouseY - hex.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
const maxBrightness = 100;
const targetShade = Math.max(0, 1 - dist / 200) * maxBrightness;

    hex.currentShade += (targetShade - hex.currentShade) * 0.04;

    drawHex(hex.x, hex.y, Math.round(hex.currentShade));
  }

  requestAnimationFrame(animate);
}

const monospaceFonts = [
  "'Courier Prime', monospace",
  "'Fira Code', monospace",
  "'Source Code Pro', monospace",
  "'IBM Plex Mono', monospace",
  "'JetBrains Mono', monospace",
  "'Ubuntu Mono', monospace",
  "'Cutive Mono', monospace",
  "'Share Tech Mono', monospace",
  "'Overpass Mono', monospace",
  "'Inconsolata', monospace",
];

const spans = document.querySelectorAll(".header span");

spans.forEach((span) => {
  span.addEventListener("mouseenter", () => {
    const font =
      monospaceFonts[Math.floor(Math.random() * monospaceFonts.length)];

    const isBold = Math.random() < 0.5;
    const isItalic = Math.random() < 0.5;

    span.style.fontFamily = font;
    span.style.fontWeight = isBold ? "900" : "normal";
    span.style.fontStyle = isItalic ? "italic" : "normal";

    setTimeout(() => {
      span.style.fontFamily = "'Courier Prime', monospace";
      span.style.fontWeight = "";
      span.style.fontStyle = "";
    }, 1000);
  });
});

animate();
