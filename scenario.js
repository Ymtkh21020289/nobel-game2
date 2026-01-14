export const scenario = {
  start: {
    bg: "bg/bright_street.jpg",

    texts: [
      { name: null, text: "今日は入学式。" },
      { name: null, text: "新しい服に新しいカバン、まさしく心機一転といった感じだ。" },
      { name: null, text: "楽しみだと思う反面、不安も同時に押し寄せてくる。" },
      { name: null, text: "俺は新しい学校でうまくやっていけるだろうか？" },
      { name: null, text: "もし友達ができなかったら？" },
      { name: null, text: "いや、そんなことは考えるべきじゃないな。" },
      { name: null, text: "何はともあれ、俺の新しい青春が幕を開けるんだ！" },
      { name: null, text: "お、もうすぐ入学式が始まる時間だ。" },
      { name: null, text: "早く体育館に向わなくちゃな。" },
      { name: null, text: "変にプログラム変えるよりこうする方が楽なんですよね。by製作者" }
    ],

    next: "hall"
  },

  hall: {
    bg: "bg/bright_gym.jpg",

    texts: [
      { name: "教師", text: "「……それでは新入生代表挨拶。」" },
      { name: null, text: "そう言われると一人の女の子がステージ上に上がった。" },
      //{ name: null, text: "銀色の艶やかな髪で身長は少し低め。" },
      //{ name: null, text: "首にかけているのは…………………………ヘッドホン！？" },
      { command: "show", chara: "captain", face: "serious", pos:"center" },
      { name: null, text: "彼女はマイクの前に立つと深呼吸をし、口を開いた。" },
      { command: "face", chara: "captain", face: "serious2" },
      { name: "？？？", text: "「諸君！！この世界はバグで溢れている！！」" },
      { name: null, text: "・・・・・・・・" },
      { name: null, text: "・・・・・・は？" },
      { name: "？？？", text: "「君たちの中にも気づいてる人はいるはずだ！」" },
      { name: "？？？", text: "「このままでは安全な暮らしすらも危うくなってしまう！！」" },
      { name: "？？？", text: "「さぁ！共に立ち上がり、巨悪を打ち倒そうではないか！」" },
      { command: "hide", chara: "captain" },
      { name: null, text: "そういうと彼女は深々と礼をしてステージを降りた。" },
      { name: null, text: "何だったんだ今のは？" },
      { name: null, text: "あれがいわゆる「厨二病」ってやつなのか？" },
      { name: null, text: "良く分からないけど、怖いからあの子には近付かないでおこう…" },
      { name: null, text: "ゲームシステム的にシーンごとのいちばん最後の文章だけ読まれないんですよね。" }
    ]
  }
};
