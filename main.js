import { scenario } from "./scenario.js";

const ASSETS = {
  backgrounds: [
    "bright_gym.jpg",
    "bright_street.jpg",
    "blackbg.jpg"
  ],
  characters: {
    captain: ["serious", "serious2"],
    lan: ["nomal", "nomal2", "doubt", "angry", "trouble", "confused", "smile", "smile2", "shadow"]
  },
  bgm: ["lan_theme"],
  se: ["bump"]
};

const backlog = [];
const charaState = {};
let isLogOpen = false;
let currentEntry = null;

let textIndex = 0;
let current = "start";
const flags = {};
let isTyping = false;
let typingTimer = null;

let isAuto = false;
let autoTimer = null;
const AUTO_WAIT = 1200;

const bgImg = document.getElementById("bg");
const charaImg = document.getElementById("chara");

const titleDiv = document.getElementById("title");
const gameDiv = document.getElementById("game");

const nameBox = document.getElementById("nameBox");
const textDiv = document.getElementById("text");
const choicesDiv = document.getElementById("choices");

const logDiv = document.getElementById("log");
const logContent = document.getElementById("logContent");

const newGameBtn = document.getElementById("newGame");
const openLoadBtn = document.getElementById("openLoad");
const loadMenu = document.getElementById("loadMenu");
const toTitleBtn = document.getElementById("toTitle");
const autoBtn = document.getElementById("autoBtn");

// --------------------
// 基本ロジック
// --------------------

const audioManager = {
  bgm: null,
  bgmName: null,

  playBGM(name, loop = true, fade = 0) {
    const src = `audio/bgm/${name}.mp3`;

    // 同じ曲なら何もしない
    if (this.bgmName === name) return;

    if (this.bgm) {
      this.stopBGM(fade);
    }

    const audio = new Audio(src);
    audio.loop = loop;
    audio.volume = 1;

    audio.play();

    this.bgm = audio;
    this.bgmName = name;
  },

  stopBGM(fade = 0) {
    if (!this.bgm) return;

    if (fade > 0) {
      const step = this.bgm.volume / (fade / 50);
      const interval = setInterval(() => {
        this.bgm.volume -= step;
        if (this.bgm.volume <= 0) {
          clearInterval(interval);
          this.bgm.pause();
          this.bgm = null;
          this.bgmName = null;
        }
      }, 50);
    } else {
      this.bgm.pause();
      this.bgm = null;
      this.bgmName = null;
    }
  },

  playSE(name) {
    const src = `audio/se/${name}.mp3`;
    const se = new Audio(src);
    se.play();
  }
};

function checkCondition(choice) {
  if (choice.if && !flags[choice.if]) return false;
  if (choice.ifNot && flags[choice.ifNot]) return false;

  if (choice.ifValue) {
    const k = Object.keys(choice.ifValue)[0];
    if ((flags[k] || 0) < choice.ifValue[k]) return false;
  }
  if (choice.ifValueLess) {
    const k = Object.keys(choice.ifValueLess)[0];
    if ((flags[k] || 0) >= choice.ifValueLess[k]) return false;
  }
  return true;
}

function showScene(key) {
  const scene = scenario[key];
  current = key;
  
  // 背景
  if (scene.bg !== undefined) {
    bgImg.src = scene.bg ? "images/" + scene.bg : "";
  }

  // 立ち絵
  if (scene.chara !== undefined) {
    if (scene.chara === null) {
      charaImg.style.display = "none";
    } else {
      charaImg.src = "images/" + scene.chara;
      charaImg.style.display = "block";
    }
  }

  choicesDiv.innerHTML = "";
  const entry = scene.texts[textIndex];
  currentEntry = entry;
  updateName(entry.name);
  advanceText();
}

function typeText(text) {
  let i = 0;
  textDiv.textContent = "";
  isTyping = true;
  typingTimer = setInterval(() => {
    textDiv.textContent += text[i];
    i++;

    if (i >= text.length) {
      clearInterval(typingTimer);
      isTyping = false;

      // 🔔 表示完了通知
      onTextFinished();
    }
  }, 30);
}


function updateName(name) {
  if (!name) {
    nameBox.textContent = "";
    nameBox.style.visibility = "hidden";
  } else {
    nameBox.textContent = name;
    nameBox.style.visibility = "visible";
  }
}

function advanceText() {
  const scene = scenario[current];
  const entry = scene.texts[textIndex];
  console.log({
    index: textIndex,
    entry,
    isTyping
  });

  // ① 文字表示中 → 即全文
  if (isTyping) {
    const back = scene.texts[textIndex-1];
    clearInterval(typingTimer);
    textDiv.textContent = back.text;
    isTyping = false;

    onTextFinished();
    return;
  }

  // 🔽 command は即実行して次へ
  if (entry.command) {
    executeCommand(entry);
    textIndex++;
    advanceText();
    return;
  }

  if (entry.type) {
    applyCommand(entry);
    textIndex++;
    advanceText();
    return;
  }

  // ② 次のテキスト
  if (entry.text && textIndex < scene.texts.length - 1) {
    textIndex++;
    const next = scene.texts[textIndex];
    const back = scene.texts[textIndex-1];
    currentEntry = back;
    updateName(entry.name);
    typeText(entry.text);
    return;
  }

  // ③ 選択肢
  if (scene.choices) {
    stopAuto();
    showChoices(scene.choices);
    return;
  }

  // ④ 次シーン
  if (scene.next) {
    textIndex = 0;
    showScene(scene.next);
  }
}

function onTextFinished() {
  if (!currentEntry) return;

  const logText = currentEntry.name
    ? `${currentEntry.name}：${currentEntry.text}`
    : currentEntry.text;

  backlog.push(logText);

  scheduleAutoAdvance();
}

function startAuto() {
  isAuto = true;
  scheduleAutoAdvance();
}

function stopAuto() {
  isAuto = false;
  clearTimeout(autoTimer);
}

function scheduleAutoAdvance() {
  clearTimeout(autoTimer);
  if (!isAuto) return;

  autoTimer = setTimeout(() => {
    // ログ表示中・選択肢中は止める
    const scene = scenario[current];
    if (isLogOpen || scene.choices) {
      stopAuto();
      return;
    }
    advanceText();
  }, AUTO_WAIT);
}

function openLog() {
  isLogOpen = true;
  logDiv.style.display = "block";
  logContent.innerHTML = "";

  backlog.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    logContent.appendChild(p);
  });
}

function closeLog() {
  isLogOpen = false;
  logDiv.style.display = "none";
}

textDiv.addEventListener("click", advanceText);

logDiv.addEventListener("click", closeLog);

document.addEventListener("keydown", (e) => {
  if (e.key === "l" || e.key === "L") {
    if (!isLogOpen) openLog();
    return;
  }

  if (e.key === "a" || e.key === "A") {
    if (isAuto) stopAuto();
    else startAuto();
    return;
  }

  if (isLogOpen) {
    if (e.key === "Enter" || e.key === " ") {
      closeLog();
    }
    return;
  }

  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    advanceText();
  }
});

function showChoices(choices) {
  choicesDiv.innerHTML = "";

  choices.forEach(choice => {
    if (!checkCondition(choice)) return;

    const btn = document.createElement("button");
    btn.textContent = choice.text;

    btn.onclick = () => {
      if (choice.add) {
        for (const k in choice.add) {
          flags[k] = (flags[k] || 0) + choice.add[k];
        }
      }
      if (choice.setFlag) flags[choice.setFlag] = true;

      showScene(choice.next);
    };

    choicesDiv.appendChild(btn);
  });
}

function showChara(id, face, pos = "center") {
  const img = document.getElementById(id);
  img.src = `images/chara/${id}_${face}.png`;
  img.style.opacity = 1;

  if (pos === "left") img.style.left = "10%";
  if (pos === "center") img.style.left = "40%";
  if (pos === "right") img.style.left = "70%";

  charaState[id] = {
    face,
    pos,
    visible: true
  };
}

function changeFace(id, face) {
  const img = document.getElementById(id);
  img.src = `images/chara/${id}_${face}.png`;

  if (!charaState[id]) charaState[id] = {};
  charaState[id].face = face;
}


function hideChara(id) {
  const img = document.getElementById(id);
  img.style.opacity = 0;

  if (!charaState[id]) charaState[id] = {};
  charaState[id].visible = false;
}

function executeCommand(cmd) {
  switch (cmd.command) {
    case "show":
      showChara(cmd.chara, cmd.face, cmd.pos);
      break;
    case "face":
      changeFace(cmd.chara, cmd.face);
      break;
    case "hide":
      hideChara(cmd.chara);
      break;
  }
}

// --------------------
// タイトル関連
// --------------------
const preloadImages = [];
let loadedCount = 0;
let totalCount = 0;

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      loadedCount++;
      resolve();
    };

    img.onerror = () => {
      console.warn("Failed to load:", src);
      loadedCount++;
      resolve(); // エラーでも進める
    };

    preloadImages.push(img); // GC対策
  });
}

function applyCommand(cmd) {

  if (cmd.type === "bgm") {
    audioManager.playBGM(cmd.name, cmd.loop ?? true, cmd.fade ?? 0);
    return true;
  }

  if (cmd.type === "bgmStop") {
    audioManager.stopBGM(cmd.fade ?? 0);
    return true;
  }

  if (cmd.type === "se") {
    audioManager.playSE(cmd.name);
    return true;
  }

  return false;
}

async function preloadAllAssets() {
  const tasks = [];

  // 背景
  ASSETS.backgrounds.forEach(bg => {
    totalCount++;
    tasks.push(preloadImage(`images/bg/${bg}`));
  });

  // 立ち絵
  for (const chara in ASSETS.characters) {
    ASSETS.characters[chara].forEach(face => {
      totalCount++;
      tasks.push(
        preloadImage(`images/chara/${chara}_${face}.png`)
      );
    });
  }

  await Promise.all(tasks);
}

async function startGame() {
  titleDiv.style.display = "none";
  gameDiv.style.display = "block";
  await preloadAllAssets();
  showScene(current);
}

function resetGame() {
  current = "start";
  textIndex = 0;
  for (const k in flags) delete flags[k];
  document.querySelectorAll(".chara").forEach(img => {
    img.style.opacity = 0;
  });
}

function  initialize() {
  for (const chara in ASSETS.characters) {
    charaState[chara] = {
      visible: false
    };
  }
}

// ニューゲーム
newGameBtn.onclick = () => {
  initialize();
  resetGame();
  startGame();
};

// ロードメニュー表示
openLoadBtn.onclick = () => {
  loadMenu.style.display =
    loadMenu.style.display === "none" ? "block" : "none";
};

// タイトルへ戻る
toTitleBtn.onclick = () => {
  gameDiv.style.display = "none";
  titleDiv.style.display = "block";
};

autoBtn.onclick = () => {
  if (isAuto) stopAuto();
  else startAuto();
  autoBtn.textContent = isAuto ? "AUTO ON" : "AUTO";
};

// --------------------
// セーブ／ロード
// --------------------
function save(slot) {
  const data = {
    scene: current,
    textIndex,
    charaState: JSON.parse(JSON.stringify(charaState)), // 深コピー
    flags,
    bgm: audioManager.bgmName
  };
  localStorage.setItem("novelSave" + slot, JSON.stringify(data));
  console.log("SAVE DATA:", data);
  alert(`スロット${slot}にセーブしました`);
}

function load(slot) {
  const json = localStorage.getItem("novelSave" + slot);
  if (!json) {
    alert(`スロット${slot}は空です`);
    return;
  }

  const data = JSON.parse(json);
  resetGame();

  current = data.scene;
  textIndex = data.textIndex;
  for (const chara in data.charaState) {
    charaState[chara] = data.charaState[chara];
  }
  for (const k in data.flags) {
    flags[k] = data.flags[k];
  }
  if (saveData.bgm) {
    audioManager.playBGM(saveData.bgm);
  }
  restoreCharaState(data.charaState);
  startGame();
}

function restoreCharaState(state) {
  // 一旦全キャラ非表示
  document.querySelectorAll(".chara").forEach(img => {
    img.style.opacity = 0;
  });

  for (const id in state) {
    const s = state[id];
    if (!s.visible) continue;
    showChara(id, s.face, s.pos);
  }
}

document.querySelectorAll(".save").forEach(btn => {
  btn.onclick = () => save(btn.dataset.slot);
});

document.querySelectorAll(".load").forEach(btn => {
  btn.onclick = () => load(btn.dataset.slot);
});
