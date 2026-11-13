/* データ：FILE.09 のマップ定義（当たり判定）と、足取りの地図の下絵 */
'use strict';

/* 桜ヶ丘三丁目：上半分に、垣根をはさんで二軒の家。下半分に通りと商店
     左上に春日家（1〜8,1〜6）。母屋（1〜5,1〜2）と縁側（1〜5,3）、犬小屋（7,1）
       右の垣根（9,1〜7）に裏木戸（9,4）。下の垣根（1〜8,7）に表の門（3,7）
     真ん中に路地（10,1〜7）。裏木戸は、この路地に開く
     右上に権藤家（12〜18,1〜6）。左の板塀（11,1〜7）。物干し（12〜13,1）、母屋（14〜18,1〜2）と縁側（14〜18,3）
       縁側の道具箱（18,3）、盆栽棚（12〜14,5）、自転車（18,5）。下の板塀（12〜18,7）に門（16,7）
     通り（1〜18,8〜9）。右の端（19,8〜9）から、みはらし坂へ
     左下に大森酒店（1〜5,10〜12。店先 3,10）、町内会の掲示板（8〜9,10）、自販機（11,10）、右下に松井豆腐店（13〜18,10〜12。店先 15,10）
   みはらし坂：左上に桜ヶ丘神社。拝殿（1〜5,1〜3。床下 2〜4,3）、狛犬（1,5・5,5）、鳥居の柱（2,7・4,7）。拝殿の右に木立（7〜8,1〜2）
     坂道が、左下の入口（0,12〜13）から、右上の坂の上のベンチ（14〜16,1）へのぼる。ベンチの向こうは海。右上の端に木（18,1〜2）
     神社の下の坂に、瀬川の原付（8,8）
     川（6〜18,10〜11）。みはらし橋（11〜12,10〜11）で渡る。川向こうに、あしだ動物病院（14〜18,12〜13。入口 14,13） */
Object.assign(MAPDEF,{
  sakura:{name:'桜ヶ丘三丁目 ― 春日家と通り',border:true,dusk:true,
    solids:[// 春日家：母屋・犬小屋・右の垣根（裏木戸 9,4）・下の垣根（表の門 3,7）
            [1,1,5,2],[7,1,1,1],[9,1,1,3],[9,5,1,3],[1,7,2,1],[4,7,5,1],
            // 権藤家：左の板塀・物干し・母屋・道具箱・盆栽棚・自転車・下の板塀（門 16,7）
            [11,1,1,7],[12,1,2,1],[14,1,5,2],[18,3,1,1],[12,5,3,1],[18,5,1,1],[12,7,4,1],[17,7,2,1],
            // 通りの下：酒屋・掲示板・自販機・豆腐屋
            [1,10,5,3],[8,10,2,1],[11,10,1,1],[13,10,6,3]]},
  saka:{name:'みはらし坂 ― 神社と川べり',border:true,dusk:true,
    solids:[// 神社：拝殿・木立・狛犬・鳥居の柱
            [1,1,5,3],[7,1,2,2],[1,5,1,1],[5,5,1,1],[2,7,1,1],[4,7,1,1],
            // 坂の上：ベンチ・木
            [14,1,3,1],[18,1,1,2],
            // 原付・川（橋 11〜12 は渡れる）・動物病院
            [8,8,1,1],[6,10,5,2],[13,10,6,2],[14,12,5,2]]},
});

/* ---------- 足取りの地図（js/ui/route.js）：下絵の図形と、場所の座標 ----------
   viewBox は 200×130。1 は 10 メートル。場所の名前は、言語ごとの evidence.js の ROUTE_PLACES */
defCase('file09',{
  ROUTE_XY:{kasuga:[52,56,'left'],sakaya:[30,76,'down'],tofu:[80,76,'down'],shrine:[100,42,'left'],
            bench:[156,16,'up'],bridge:[131,97,'right'],clinic:[162,113,'down'],station:[22,117,'right']},
  // 線に添える「道のり・時間」の札の位置（「出発>到着」ごと。札どうし、札とピンが重ならないように置く）
  ROUTE_LAB:{'kasuga>tofu':[55,80],'tofu>shrine':[106,62],'shrine>station':[58,92],'shrine>bench':[128,24],'bench>bridge':[160,58]},
  ROUTE_BG:`<rect width="200" height="130" fill="#e8dfc6"/>
    <path d="M138 0H200V52Q186 46 178 32Q166 12 138 0Z" fill="#a9c7d4"/>
    <path d="M150 5Q168 14 178 28M162 3Q178 12 188 26" stroke="#c9dee7" stroke-width=".8" fill="none"/>
    <ellipse cx="130" cy="28" rx="42" ry="20" fill="#ddd2b2"/>
    <path d="M56 112Q100 97 140 98T200 92" stroke="#a9c7d4" stroke-width="9" fill="none"/>
    <path d="M56 112Q100 97 140 98T200 92" stroke="#c9dee7" stroke-width="1" stroke-dasharray="4 5" fill="none"/>
    <g stroke="#cdbf9e" stroke-linecap="round" fill="none">
      <path d="M4 66H124" stroke-width="6"/><path d="M59 66V50" stroke-width="3"/>
      <path d="M32 66L22 122" stroke-width="4"/><path d="M122 66L131 97L162 113" stroke-width="4"/>
    </g>
    <path d="M86 66Q94 52 100 42Q128 30 156 16" stroke="#b89c6a" stroke-width="4" stroke-dasharray="2 1.4" fill="none"/>
    <rect x="126.5" y="90.5" width="9" height="13" rx="1" fill="#bfa67e" stroke="#7a6444" stroke-width=".6"/>
    <g fill="#d2c6a6" stroke="#ad9d7e" stroke-width=".5">
      <rect x="8" y="38" width="14" height="10"/><rect x="26" y="40" width="12" height="9"/><rect x="74" y="44" width="10" height="9"/>
      <rect x="8" y="80" width="12" height="9"/><rect x="40" y="82" width="14" height="10"/><rect x="92" y="80" width="12" height="9"/>
      <rect x="104" y="70" width="10" height="8"/>
    </g>
    <g fill="#e2cf9c" stroke="#9a8256" stroke-width=".6"><rect x="45" y="44" width="13" height="9"/><rect x="60" y="44" width="11" height="9"/></g>
    <g fill="#9ab07e"><circle cx="90" cy="34" r="4"/><circle cx="94" cy="28" r="3.4"/><circle cx="114" cy="40" r="3.6"/><circle cx="168" cy="22" r="3"/></g>
    <g transform="translate(110 30)" fill="#b8402e"><rect x="-5" y="0" width="10" height="1.4"/><rect x="-4" y="2" width="8" height=".9"/><rect x="-3.6" y="2" width="1.1" height="5"/><rect x="2.5" y="2" width="1.1" height="5"/></g>
    <rect x="150" y="8" width="11" height="2" fill="#8a6a44"/>
    <g fill="#e8e6e0" stroke="#9aa0a8" stroke-width=".6"><rect x="168" y="102" width="16" height="10"/></g>
    <g fill="#c8302a"><rect x="174.6" y="104" width="2.8" height="7"/><rect x="172.5" y="106" width="7" height="2.8"/></g>
    <rect x="4" y="104" width="13" height="7" fill="#c2bcaa" stroke="#8a8478" stroke-width=".6"/>
    <path d="M0 125H70" stroke="#8a8478" stroke-width="1.6" stroke-dasharray="1.2 1"/>
    <g transform="translate(9 10)" fill="#6a5a40"><path d="M0 -5L2.4 2H-2.4Z"/><text x="0" y="8" font-size="5" text-anchor="middle" font-weight="700">N</text></g>`,
});
