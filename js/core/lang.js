/* 言語の選択と、言語ごとのファイルの読み込み */
'use strict';

/* =========================================================
   言語は 'ja'（日本語）と 'en'（英語）。
   URL の ?lang=en / ?lang=ja が最優先で、選んだ言語は localStorage に覚えておく。
   UIの文言は js/lang/<言語>.js の L に、事件の台詞は
     日本語 … js/data/fileXX/
     英語   … js/data/en/fileXX/（マップの当たり判定 maps.js は日本語版と共通。英語版の maps.js は名前だけ上書きする）
   にあり、選んだ言語のものだけを読み込む（file:// で開いても動くように document.write で順に読む）。
   ========================================================= */
const LANG_KEY='hidden-truth-lang';
const LANG=(()=>{
  const q=/[?&]lang=(ja|en)\b/.exec(location.search);
  let l=q&&q[1];
  try{ if(l) localStorage.setItem(LANG_KEY,l); else l=localStorage.getItem(LANG_KEY); }catch(e){}
  return l==='en'?'en':'ja';
})();
document.documentElement.lang=LANG;
document.write(`<script src="js/lang/${LANG}.js"><\/script>`);
if(LANG==='en') document.write('<link rel="stylesheet" href="css/en.css">');

function setLang(l){
  try{localStorage.setItem(LANG_KEY,l);}catch(e){}
  location.replace(location.pathname);   // ?lang= を外して読み込み直す
}

const CASE_PARTS=['evidence','hypotheses','maps','characters','hotspots','scenes','interrogation','story'];
function loadCaseData(ids){
  const tag=src=>document.write(`<script src="${src}"><\/script>`);
  for(const id of ids) for(const p of CASE_PARTS){
    if(LANG==='ja'||p==='maps') tag(`js/data/${id}/${p}.js`);
    if(LANG==='en') tag(`js/data/en/${id}/${p}.js`);
  }
}
