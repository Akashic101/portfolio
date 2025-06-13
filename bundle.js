const canvas = document.getElementById("hexCanvas");
const ctx = canvas.getContext("2d");

let width, height;

let side;
let hexWidth, hexHeight, horizSpacing, vertSpacing;

let hexCenters = [];

/**
 * Adjusts the canvas size and hexagon parameters based on the window's dimensions.
 * It sets the canvas width and height, scales the context for high-DPI screens,
 * and recalculates hexagon size and spacing. Finally, it re-calculates the hex centers.
 */
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

/**
 * Calculates the center coordinates for all hexagons to be drawn on the canvas.
 * Hexagons are arranged in an interlocking grid pattern, with odd columns offset vertically.
 * The calculated centers are stored in the `hexCenters` array.
 */
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

/**
 * Draws a single hexagon on the canvas at the specified (x, y) coordinates.
 * The hexagon is filled with a shade of gray determined by `fillShade`.
 * @param {number} x - The x-coordinate of the hexagon's center.
 * @param {number} y - The y-coordinate of the hexagon's center.
 * @param {number} fillShade - The grayscale shade (0-255) to fill the hexagon with.
 */
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

/**
 * The main animation loop that continuously draws and updates the hexagon grid.
 * It clears the canvas, calculates the target brightness for each hexagon based on mouse proximity,
 * smooths the current shade, and then draws each hexagon. Uses `requestAnimationFrame` for smooth animation.
 */
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

// Configuration Constants
const TYPING_SPEED_MS = 100; // Milliseconds per character for typing effect
const TYPING_FONT_ANIMATION_DURATION_MS = 800; // Duration of initial font animation
const HOVER_FONT_ANIMATION_DURATION_MS = 1000; // Duration of hover font animation
const NAME_TO_TYPE = "David Moll";
const HOMEPAGE_PATHS = ["/", "/index.html"];

/**
 * Applies a random monospace font, bold, and italic style to a given HTML element,
 * then resets the styles after a specified duration.
 * @param {HTMLElement} element - The HTML element to apply the font effect to.
 * @param {number} duration - The duration (in milliseconds) after which to reset the styles.
 */
function applyRandomFontEffect(element, duration) {
  const font = monospaceFonts[Math.floor(Math.random() * monospaceFonts.length)];
  const isBold = Math.random() < 0.5;
  const isItalic = Math.random() < 0.5;

  element.style.fontFamily = font;
  element.style.fontWeight = isBold ? "900" : "normal";
  element.style.fontStyle = isItalic ? "italic" : "normal";

  setTimeout(() => {
    element.style.fontFamily = "'Courier Prime', monospace";
    element.style.fontWeight = "";
    element.style.fontStyle = "";
  }, duration);
}

const typedTextElement = document.getElementById("typed-text");
let charIndex = 0;

/**
 * Implements a typewriter-like effect, typing out the `NAME_TO_TYPE` character by character.
 * Each character is appended to `typedTextElement` within its own `<span>` and briefly animates its font.
 * The effect pauses after each character based on `TYPING_SPEED_MS`.
 */
function typeWriterEffect() {
  if (charIndex < NAME_TO_TYPE.length) {
    const charSpan = document.createElement("span");
    charSpan.textContent = NAME_TO_TYPE.charAt(charIndex);
    typedTextElement.appendChild(charSpan);

    // Apply initial animating font change
    applyRandomFontEffect(charSpan, TYPING_FONT_ANIMATION_DURATION_MS);

    charIndex++;
    setTimeout(typeWriterEffect, TYPING_SPEED_MS); // Adjust typing speed here (milliseconds per character)
  } else {
    // Optionally, reset styling after typing is complete, or apply a final style
    // For now, it will just remain as typed.
  }
}

if (typedTextElement) {
  if (HOMEPAGE_PATHS.includes(window.location.pathname)) {
    typedTextElement.textContent = ""; // Clear content to start fresh
    typeWriterEffect();
  } else {
    // For non-homepage, immediately display the name and attach hover effects
    const nameChars = NAME_TO_TYPE.split('');
    nameChars.forEach(char => {
      const charSpan = document.createElement("span");
      charSpan.textContent = char;
      typedTextElement.appendChild(charSpan);
    });
  }

  // Event delegation for hover effect on all name characters
  typedTextElement.addEventListener("mouseenter", (e) => {
    if (e.target.tagName === 'SPAN' && typedTextElement.contains(e.target)) {
      applyRandomFontEffect(e.target, HOVER_FONT_ANIMATION_DURATION_MS);
    }
  }, true); // Use capture phase to ensure it fires before child elements

  // Also listen for mouseout on the parent to reset any lingering effects
  typedTextElement.addEventListener("mouseleave", (e) => {
    // No specific reset needed here, as individual char timeouts handle it.
  });
}

animate();
