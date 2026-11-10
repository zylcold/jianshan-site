const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
const hero = document.querySelector(".hero");
const layers = [...hero.querySelectorAll("[data-depth]")];
let scrollFrame = 0;

function drawLandscape() {
  scrollFrame = 0;
  const bounds = hero.getBoundingClientRect();
  const offset = motion.matches ? 0 : Math.min(bounds.height, Math.max(0, -bounds.top));
  for (const layer of layers) {
    layer.style.setProperty("--drift", `${offset * Number(layer.dataset.depth)}px`);
  }
}

function updateLandscape() {
  if (!scrollFrame) scrollFrame = requestAnimationFrame(drawLandscape);
}

window.addEventListener("scroll", updateLandscape, { passive: true });
window.addEventListener("resize", updateLandscape);
motion.addEventListener("change", updateLandscape);
drawLandscape();

const sceneSelect = document.querySelector(".scene-select");
const sceneButtons = [...sceneSelect.querySelectorAll("button")];
const scenes = [...document.querySelectorAll("[data-scene]")];
const sceneArt = [...document.querySelectorAll("[data-art]")];
const sceneMount = document.querySelector(".scene-mount");
const sceneNumber = document.querySelector("#scene-number");
const audio = document.querySelector("#nature-audio");
const audioButton = document.querySelector(".audio-button");
const soundLabel = document.querySelector("#sound-label");
const audioStatus = document.querySelector(".audio-status");
let activeScene = scenes[0];
let playRequest = 0;
let wantsSound = false;

function updateAudioButton() {
  audioButton.setAttribute("aria-pressed", String(wantsSound));
  soundLabel.textContent = `${wantsSound ? "停止" : "试听"}${activeScene.dataset.sound}`;
}

function stopSound() {
  playRequest++;
  wantsSound = false;
  audio.pause();
  updateAudioButton();
}

function showScene(button) {
  const id = button.getAttribute("aria-controls");
  if (activeScene.id === id) return;
  stopSound();
  audioStatus.textContent = "";
  activeScene = document.getElementById(id);
  for (const candidate of sceneButtons) {
    candidate.setAttribute("aria-pressed", String(candidate === button));
  }
  for (const scene of scenes) scene.hidden = scene !== activeScene;
  for (const art of sceneArt) art.hidden = art.dataset.art !== id;
  sceneMount.dataset.view = id;
  const number = String(sceneButtons.indexOf(button) + 1).padStart(2, "0");
  sceneNumber.textContent = `${number} / 03`;
  updateAudioButton();
}

for (const button of sceneButtons) {
  button.addEventListener("click", () => showScene(button));
}

audioButton.addEventListener("click", async () => {
  if (wantsSound) {
    stopSound();
    return;
  }
  const request = ++playRequest;
  const source = `assets/media/${activeScene.dataset.audio}.m4a`;
  if (audio.getAttribute("src") !== source) audio.src = source;
  audioStatus.textContent = "";
  wantsSound = true;
  updateAudioButton();
  try {
    await audio.play();
  } catch {
    if (request !== playRequest) return;
    stopSound();
    audioStatus.textContent = "暂时无法播放，请重试。";
  }
});

sceneSelect.hidden = false;
audioButton.hidden = false;

const breathButton = document.querySelector(".breath-button");
const breathPhase = document.querySelector("#breath-phase");
const moon = document.querySelector(".moon");
const inhaleSeconds = 6;
const cycleSeconds = 16;
let breathStart = null;
let breathFrame = 0;

function drawBreath(now) {
  if (breathStart === null) return;
  const elapsed = ((now - breathStart) / 1000) % cycleSeconds;
  const inhaling = elapsed < inhaleSeconds;
  const phase = inhaling ? "慢慢吸气" : "缓缓呼气";
  if (phase !== breathPhase.textContent) breathPhase.textContent = phase;

  const progress = inhaling
    ? elapsed / inhaleSeconds
    : (cycleSeconds - elapsed) / (cycleSeconds - inhaleSeconds);
  const eased = progress * progress * (3 - 2 * progress);
  moon.style.setProperty("--glow", `${0.24 + eased * 0.76}`);
  moon.style.setProperty("--halo", `${1 + eased * 0.24}`);
  breathFrame = requestAnimationFrame(drawBreath);
}

function stopBreathing() {
  if (breathStart === null) return;
  breathStart = null;
  cancelAnimationFrame(breathFrame);
  moon.style.removeProperty("--glow");
  moon.style.removeProperty("--halo");
  breathPhase.textContent = "静候一息";
  breathButton.textContent = "开始呼吸";
}

breathButton.addEventListener("click", () => {
  if (breathStart !== null) {
    stopBreathing();
    return;
  }
  breathStart = performance.now();
  breathButton.textContent = "结束呼吸";
  drawBreath(breathStart);
});

breathButton.hidden = false;

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopSound();
    stopBreathing();
  }
});
