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
      { name: "？？？", text: "「あーっ！ どいてどいてー！ 止まれないよぉーっ！」" },
    ]
  }
};
