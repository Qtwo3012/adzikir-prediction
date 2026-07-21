// ======================================
// UNIVERSAL AI SMART PARSER V7
// ======================================

function parseDataset(text){

    text = text
        .replace(/\u00A0/g," ")
        .replace(/\u200B/g,"")
        .replace(/\r/g,"");

    const lines = text
    .replace(/\t/g, "\n")
    .split("\n")
    .map(x => x.trim())
    .filter(x => x !== "");

    let draws = [];

    for(let i = 0; i < lines.length; i++){

        const line = lines[i];

        // ==========================
        // FORMAT : 1st: 1234
        // ==========================
        const m = line.match(/1st\s*:?\s*(\d{4})/i);

        if(m){
            draws.push(m[1]);
            continue;
        }

        // ==========================
        // FORMAT :
        // KODE-XXXX
        // 1234
        // ==========================
        if(
            /^[A-Z]{2,10}-\d{4}$/i.test(line) &&
            i + 1 < lines.length &&
            /^\d{4}$/.test(lines[i+1])
        ){

            draws.push(lines[i+1]);
            continue;
        }

    }

    draws = [...new Set(draws)];

//alert(draws.join("\n"));

return draws;
}