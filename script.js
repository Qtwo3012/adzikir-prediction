// ======================================
// PATTERN ANALYZER PRO FINAL V4
// ======================================

// ===== MIRROR ENGINE =====
const mirrorMap = {
    "0":"5",
    "1":"6",
    "2":"7",
    "3":"8",
    "4":"9",
    "5":"0",
    "6":"1",
    "7":"2",
    "8":"3",
    "9":"4"
};

function mirrorNumber(num){
    return num
        .toString()
        .split("")
        .map(x => mirrorMap[x])
        .join("");
}

// ===== START =====
window.onload = function(){

    const analyzeBtn = document.getElementById("analyzeBtn");

    if(!analyzeBtn){
        alert("ERROR : Tombol Analyze tidak ditemukan.");
        return;
    }

    analyzeBtn.addEventListener("click", analyze);

};
function analyze(){

    const text = document
        .getElementById("dataset")
        .value
        .trim();

    const result =
        document.getElementById("result");
	function analyze(){

    const text = document
        .getElementById("dataset")
        .value
        .trim();

    const result =
        document.getElementById("result");

    // ===== PROGRESS BAR =====
    let p = 0;

    let timer = setInterval(function(){

        p += 5;

        const bar = document.getElementById("progressBar");

        if(bar){
            bar.style.width = p + "%";
        }

        if(p >= 100){
            clearInterval(timer);
        }

    },40);

    result.innerHTML = `
        
⏳ Sedang menganalisa...

Mohon tunggu...
`;

    const mode =
        document.getElementById("modePrediction").value;

    if(text===""){

        result.innerHTML="Belum ada data.";

        return;

    }

    // ===== PARSE DATASET =====

    const lines = text
        .split("\n")
        .map(x=>x.trim())
        .filter(x=>x!="");

    // ======================================
// SMART DATASET EXTRACTOR V6
// ======================================

// ======================================
// UNIVERSAL SMART DATASET READER
// ======================================

// ======================================
// UNIVERSAL DATASET ENGINE V7
// ======================================

// ======================================
// UNIVERSAL PARSER V5
// ======================================

let format = "AUTO";

// Ambil hasil dari parser.js
let draws = parseDataset(text);
//alert("HASIL PARSER = " + draws.length);
//alert(draws.join("\n"));
//alert("TOTAL DRAW = " + draws.length);

// Cek hasil
if(draws.length===0){

    result.innerHTML = `
❌ DATASET TIDAK TERBACA

Tidak ditemukan angka 4 digit.
`;

    return;

}

// ===============================
// DATASET QUALITY CHECK
// ===============================

const datasetStatus =
    draws.length >= 30 ? "🟢 Sangat Baik" :
    draws.length >= 20 ? "🟡 Baik" :
    draws.length >= 10 ? "🟠 Cukup" :
    "🔴 Terlalu Sedikit";
  

    
    // ==============================
// DATASET HEALTH
// ==============================

let datasetHealth = "🟢 NORMAL";

if(draws.length < 10){

    datasetHealth = "🔴 DATA TERLALU SEDIKIT";

}else if(draws.length < 20){

    datasetHealth = "🟡 DATA CUKUP";

}else if(draws.length < 50){

    datasetHealth = "🟢 DATA BAIK";

}else{

    datasetHealth = "💎 DATA SANGAT KUAT";

}

// ===== FREKUENSI DIGIT =====

let freq = Array(10).fill(0);

draws.forEach(draw=>{

    draw.split("").forEach(d=>{

        freq[Number(d)]++;

    });

});

let ranking = [];

for(let i=0;i<10;i++){

    ranking.push({
        digit:i,
        total:freq[i]
    });

}

ranking.sort((a,b)=>b.total-a.total);


// ===== HOT =====

const hot = ranking.slice(0,5);
// ==============================
// POSISI DIGIT
// ==============================

let posisi = {

    as:{},
    kop:{},
    kepala:{},
    ekor:{}

};

draws.forEach(draw=>{

    posisi.as[draw[0]]=(posisi.as[draw[0]]||0)+1;
    posisi.kop[draw[1]]=(posisi.kop[draw[1]]||0)+1;
    posisi.kepala[draw[2]]=(posisi.kepala[draw[2]]||0)+1;
    posisi.ekor[draw[3]]=(posisi.ekor[draw[3]]||0)+1;

});

function topPos(obj){

    return Object.entries(obj)
        .sort((a,b)=>b[1]-a[1])
        .slice(0,3)
        .map(x=>`${x[0]} (${x[1]}x)`)
        .join(" • ");

}

window.posisiResult=`
AS : ${topPos(posisi.as)}<br>
KOP : ${topPos(posisi.kop)}<br>
KEPALA : ${topPos(posisi.kepala)}<br>
EKOR : ${topPos(posisi.ekor)}
`;
// ==============================
// DISTRIBUSI DIGIT
// ==============================

let distribusi = "";

for(let i=0;i<=9;i++){

    distribusi +=
`${i} ➜
AS:${posisi.as[i]||0}
 K:${posisi.kop[i]||0}
 H:${posisi.kepala[i]||0}
 E:${posisi.ekor[i]||0}<br>`;

}

window.distribusiDigit = distribusi;

// ===== COLD =====

const cold = ranking.slice(-2);
// ==============================
// HOT COLD SCORE
// ==============================

window.hotScore =
hot.map(x =>
`${x.digit} ⭐ ${x.total}x`
).join("<br>");

window.coldScore =
cold.map(x =>
`${x.digit} ❄️ ${x.total}x`
).join("<br>");

// ======================================
// GAP ANALYZER PRO V2
// ======================================

let gapRanking = [];

for(let d=0; d<=9; d++){

    let appear = 0;
    let last = -1;
    let maxGap = 0;

    draws.forEach((draw,index)=>{

        if(draw.includes(String(d))){

            appear++;

            if(last!=-1){

                const g = index-last-1;

                if(g>maxGap){
                    maxGap=g;
                }

            }

            last=index;

        }

    });

    let currentGap;

    if(last==-1){

        currentGap=draws.length;

    }else{

        currentGap=draws.length-last-1;

    }

    gapRanking.push({

        digit:d,

        appear,

        currentGap,

        maxGap

    });

}

gapRanking.sort((a,b)=>{

    if(b.currentGap!==a.currentGap)
        return b.currentGap-a.currentGap;

    return a.appear-b.appear;

});

// ==============================
// GAP REPORT
// ==============================

window.gapReport =
gapRanking
.slice(0,10)
.map(x =>
`Digit ${x.digit}
Gap:${x.currentGap}
Max:${x.maxGap}
Muncul:${x.appear}x`
)
.join("<br>");

// ===== BBFS =====

const bbfs =
ranking
.slice(0,7)
.map(x=>x.digit)
.join("*");

window.bbfs = bbfs;
// ==============================
// BBFS MIRROR ALT
// ==============================

window.bbfsMirror =
bbfs
.split("*")
.map(x=>mirrorNumber(x))
.join("*");

// ===== MISSING =====

const missing =
ranking
.filter(x=>x.total===0)
.map(x=>x.digit)
.join("*") || "Tidak ada";
// ===== PAIR ANALYZER =====

let pairFreq = {};

draws.forEach(draw=>{

    const pair = [
        draw.substring(0,2),
        draw.substring(1,3),
        draw.substring(2,4)
    ];

    pair.forEach(p=>{

        pairFreq[p] = (pairFreq[p] || 0) + 1;

    });

});

let pairRanking = Object.entries(pairFreq)
.sort((a,b)=>b[1]-a[1]);

const topPair = pairRanking.slice(0,10);

window.topPairResult =
topPair
.map(x=>`${x[0]} = ${x[1]}x`)
.join("<br>");


// ===== AI SCORE =====

let aiScore = 40;

aiScore += hot.length * 5;

aiScore += Math.min(topPair.length * 2,20);

if(missing==="Tidak ada"){
    aiScore += 15;
}

if(draws.length>=10){
    aiScore += 15;
}

if(aiScore>100){
    aiScore=100;
}

// ==============================
// AI SUMMARY
// ==============================

let aiSummary = "";

if(aiScore >= 90){

    aiSummary = "🟢 Pola sangat kuat. Layak dijadikan acuan.";

}else if(aiScore >= 75){

    aiSummary = "🔵 Pola cukup kuat. Disarankan tetap seleksi angka.";

}else if(aiScore >= 60){

    aiSummary = "🟡 Pola sedang. Gunakan sebagai referensi.";

}else{

    aiSummary = "🔴 Dataset kurang kuat. Sebaiknya tambah data terlebih dahulu.";

}

window.aiSummary = aiSummary;
// ==============================
// AI INSIGHT
// ==============================

let aiInsight = "";

if(hot.length >= 5){

    aiInsight += "🔥 Dominasi digit HOT masih sangat kuat.<br>";

}

if(gapRanking[0].gap >= gapRanking[0].maxGap){

    aiInsight += "📈 Ada digit yang sudah melewati GAP normal.<br>";

}

if(draws.length >= 30){

    aiInsight += "📊 Dataset cukup besar sehingga pola lebih stabil.<br>";

}else{

    aiInsight += "📊 Dataset masih berkembang.<br>";

}

window.aiInsight = aiInsight;

// ==============================
// DATASET QUALITY EFFECT
// ==============================

if(draws.length < 10){

    aiScore = Math.min(aiScore, 60);

}else if(draws.length < 20){

    aiScore = Math.min(aiScore, 80);

}else if(draws.length < 30){

    aiScore = Math.min(aiScore, 90);

}
let aiStar = "⭐";

if(aiScore >= 95){

    aiStar = "⭐⭐⭐⭐⭐";

}else if(aiScore >= 80){

    aiStar = "⭐⭐⭐⭐";

}else if(aiScore >= 60){

    aiStar = "⭐⭐⭐";

}else if(aiScore >= 40){

    aiStar = "⭐⭐";

}
// ==============================
// AI LEVEL
// ==============================

let aiLevel = "RENDAH";

if(aiScore>=95){

    aiLevel="EXTREME";

}else if(aiScore>=80){

    aiLevel="SANGAT TINGGI";

}else if(aiScore>=60){

    aiLevel="TINGGI";

}else if(aiScore>=40){

    aiLevel="SEDANG";

}
// ===== TREND ANALYZER =====

const trendFreq = Array(10).fill(0);

const last5 = draws.slice(0,5);

last5.forEach(draw=>{

    draw.split("").forEach(d=>{

        trendFreq[Number(d)]++;

    });

});

let trendText = "";

for(let i=0;i<10;i++){

    let status="↓";

    if(trendFreq[i]>=3){

        status="↑";

    }else if(trendFreq[i]>=1){

        status="→";

    }

    trendText += `${i} ${status}<br>`;

}
// ===== GENERATOR 2D =====

let result2D = [];

for(let i=0;i<hot.length;i++){

    for(let j=i+1;j<hot.length;j++){

        let a = hot[i].digit + "" + hot[j].digit;
        let b = hot[j].digit + "" + hot[i].digit;

        result2D.push(a);
        result2D.push(b);

    }

}

// ===== AI RANK =====

let aiRank = [];

result2D.forEach(item=>{

    let score = 0;

    item.split("").forEach(d=>{

        if(hot.map(x=>String(x.digit)).includes(d)){
            score += 10;
        }

    });

    if(new Set(item).size===2){
        score += 5;
    }

    aiRank.push({
        angka:item,
        score:score
    });

});

aiRank.sort((a,b)=>{

    if(b.score!==a.score){
        return b.score-a.score;
    }

    return a.angka.localeCompare(b.angka);

});

window.aiRecommend2D =
aiRank
.slice(0,10)
.map(x=>{

    let star="⭐";
    let level="RENDAH";

    if(x.score>=20){
        star="⭐⭐⭐⭐⭐";
        level="SANGAT TINGGI";
    }else if(x.score>=15){
        star="⭐⭐⭐⭐";
        level="TINGGI";
    }else if(x.score>=10){
        star="⭐⭐⭐";
        level="SEDANG";
    }

    return `${x.angka} ${star} (${level})`;

})
.join("<br>");

// ==============================
// AI SUPER PICK
// ==============================

window.superPick = aiRank
.slice(0,5)
.map((x,i)=>{

    let medal="";

    if(i==0) medal="🥇";
    else if(i==1) medal="🥈";
    else if(i==2) medal="🥉";
    else medal="⭐";

    return `${medal} ${x.angka} (${x.score} poin)`;

})
.join("<br>");

// ==============================
// AI TOP 5
// ==============================

window.aiTop5 =
aiRank
.slice(0,5)
.map((x,index)=>
`${index+1}. ${x.angka} ⭐ ${x.score} poin`
)
.join("<br>");
// ==============================
// AI TOP PRIORITAS
// ==============================

window.aiTop5 =
aiRank
.slice(0,5)
.map((x,i)=>{

    return `${i+1}. ${x.angka} (${x.score} poin)`;

})
.join("<br>");

window.result2D = result2D.join("*");
window.total2D = result2D.length;
// ===== GENERATOR 3D =====

let result3D=[];

for(let i=0;i<hot.length;i++){

    for(let j=0;j<hot.length;j++){

        for(let k=0;k<hot.length;k++){

            if(i!=j && i!=k && j!=k){

                result3D.push(
                    hot[i].digit+
                    ""+
                    hot[j].digit+
                    hot[k].digit
                );

            }

        }

    }

}

window.result3D=result3D.join("*");
window.total3D=result3D.length;
// ===== GENERATOR 4D =====

let result4D=[];

for(let i=0;i<hot.length;i++){

    for(let j=0;j<hot.length;j++){

        for(let k=0;k<hot.length;k++){

            for(let l=0;l<hot.length;l++){

                if(
                    i!=j &&
                    i!=k &&
                    i!=l &&
                    j!=k &&
                    j!=l &&
                    k!=l
                ){

                    result4D.push(

                        hot[i].digit+
                        ""+
                        hot[j].digit+
                        hot[k].digit+
                        hot[l].digit

                    );

                }

            }

        }

    }

}

window.result4D=result4D.join("*");
window.total4D=result4D.length;
// ===== MIRROR PREDICTION =====

window.resultMirror2D =
result2D
.map(x=>mirrorNumber(x))
.join("*");

window.resultMirror3D =
result3D
.map(x=>mirrorNumber(x))
.join("*");

window.resultMirror4D =
result4D
.map(x=>mirrorNumber(x))
.join("*");

// ===== OUTPUT =====

result.innerHTML = `
━━━━━━━━━━━━━━━━━━━━━━
📊 PATTERN ANALYZER PRO
━━━━━━━━━━━━━━━━━━━━━━

📅 Format : ${format}

📦 Total Draw : ${draws.length}

📊 Kualitas Dataset : ${datasetStatus}

🤖 AI Score : ${aiScore}%

━━━━━━━━━━━━━━━━━━━━━━

━━━━━━━━━━━━━━━━
🔥 TOP 10 PAIR

${window.topPairResult}

━━━━━━━━━━━━━━━━

🔥 HOT DIGIT

${window.hotScore}
━━━━━━━━━━━━━━━━

🎯 REKOMENDASI POSISI

${window.posisiResult}

━━━━━━━━━━━━━━━━

❄️ COLD DIGIT

${window.coldScore}

━━━━━━━━━━━━━━━━

🧠 AI SCORE

${aiStar} ${aiScore}%
━━━━━━━━━━━━━━━━

🔥 SUPER PICK

${window.superPick}
━━━━━━━━━━━━━━━━

📌 KESIMPULAN AI

${window.aiSummary}
━━━━━━━━━━━━━━━━

🧠 AI INSIGHT

${window.aiInsight}

━━━━━━━━━━━━━━━━
🤖 AI REKOMENDASI 2D

${window.aiRecommend2D}

━━━━━━━━━━━━━━━━

🎲 PREDIKSI 2D

${window.result2D}
━━━━━━━━━━━━━━━━

🎲 PREDIKSI 3D

${window.result3D}

━━━━━━━━━━━━━━━━

🎲 PREDIKSI 4D

${window.result4D}

━━━━━━━━━━━━━━━━

📦 TOTAL PREDIKSI

2D : ${window.total2D}

3D : ${window.total3D}

4D : ${window.total4D}

━━━━━━━━━━━━━━━━
🪞 MIRROR 2D

${window.resultMirror2D}

━━━━━━━━━━━━━━━━

🪞 MIRROR 3D

${window.resultMirror3D}

━━━━━━━━━━━━━━━━

🪞 MIRROR 4D

${window.resultMirror4D}

🎯 BBFS

${window.bbfs}

━━━━━━━━━━━━━━━━

🪞 BBFS ALT (Mirror)

${window.bbfsMirror}
━━━━━━━━━━━━━━━━

🚫 MISSING

${missing}
━━━━━━━━━━━━━━━━

📉 GAP ANALYZER

${window.gapReport}
━━━━━━━━━━━━━━━━

📈 FREKUENSI

${ranking.map(x=>`${x.digit} = ${x.total}x`).join("<br>")}

━━━━━━━━━━━━━━━━

📈 TREND ANALYZER

${trendText}

━━━━━━━━━━━━━━━━━━━━━━

🧠 Pattern Analyzer Pro

Version 4.0 FINAL

Build 2026.07

© AI Engine Prediction

━━━━━━━━━━━━━━━━━━━━━━
`;
}
// ===== COPY HASIL =====

document.getElementById("copyBtn").onclick=function(){

    navigator.clipboard.writeText(
        document.getElementById("result").innerText
    );

    alert("✅ Hasil berhasil disalin");

};

// ===== COPY 2D =====

document.getElementById("copy2d").onclick=function(){

    navigator.clipboard.writeText(window.result2D);

    alert("✅ 2D berhasil disalin");

};

// ===== COPY 3D =====

document.getElementById("copy3d").onclick=function(){

    navigator.clipboard.writeText(window.result3D);

    alert("✅ 3D berhasil disalin");

};

// ===== COPY 4D =====

document.getElementById("copy4d").onclick=function(){

    navigator.clipboard.writeText(window.result4D);

    alert("✅ 4D berhasil disalin");

};

// ===== COPY BBFS =====

document.getElementById("copybbfs").onclick=function(){

    navigator.clipboard.writeText(window.bbfs);

    alert("✅ BBFS berhasil disalin");

};
