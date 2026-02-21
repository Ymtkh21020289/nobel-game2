export const scenario = {
  start: {
    bg: "bg/blackbg.jpg",

    texts: [
      { name: "誠", text: "「………あー、やべぇ。完全に寝過ごした」" },
      { name: null, text: "俺の名前は佐藤誠。どこにでもいる、ごく普通の高校二年生だ。" },
      { name: null, text: "どれくらい普通かっていうと、テストの点数は平均点ぴったりだし、趣味はこれといってない。" },
      { name: "誠", text: "「って、自己紹介してる場合じゃねぇ！今日は始業式だってのに！」" },
      { name: null, text: "俺は慌てて制服に着替え、食卓に置いてあったパンをひっつかんで家を飛び出した。" },
      { name: null, text: "…この文章が見えるのかい？" },
    ],

    next: "street1"
  },

  street1: {
    bg: "bg/bright_street.jpg",

    texts: [
      { name: "誠", text: "「いっけねぇ、遅刻遅刻ー！」" },
      { command: "show", chara: "lan", face: "shadow", pos:"center" },
      { name: "？？？", text: "「あーっ！ どいてどいてー！ 止まれないよぉーっ！」" },
      { name: null, text: "ドゴォォォォォォォォォォォン！！" },
      { name: "誠", text: "「ぐはっ！？」" },
      { name: null, text: "突如、何かがものすごい勢いで突っ込んできた。" },
      { name: "誠", text: "「い、いってぇ……。」" },
      { name: "誠", text: "「おい、大丈夫かよ」" },
      { command: "face", chara: "lan", face: "confused" },
      { name: "？？？", text: "「ううう……。あうっ、私の遅刻防止用フランスパンが、砂まみれに……」" },
      { name: null, text: "目の前で涙目でパンを見つめているのは、幼馴染の天真（てんま）らんだ。" },
      { name: null, text: "こいつは昔からこうだ。曲がり角があれば必ず誰かとぶつかる、歩く衝突事故人間である。" },
    ]
  }
};
