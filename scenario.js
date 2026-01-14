export const scenario = {
  start: {
    bg: "bg/blackbg.jpg",

    texts: [
      { name: null, text: "………暗い。" },
      { name: null, text: "いや、暗いんじゃない。" },
      { name: null, text: "ここには何も存在しないんだ。" },
      { name: null, text: "床も、背景も、天井も境が判別できない。" },
      { name: null, text: "ユイだけが、何もない空間の中で確かに存在している。" },
      { name: "ユイ", text: "「ついにここまで来たんだね。」" },
      { name: null, text: "彼女は笑わない。" },
      { name: "ユイ", text: "「もうこれ以上台本は無いよ。」" },
      { name: null, text: "一歩こちらに歩み寄る。" },
      { name: "ユイ", text: "「もうこれ以上台本は無いよ。」" },
      { name: "ユイ", text: "「分岐も、エンディングも、全部・・・・・・使い切った。」" },
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
