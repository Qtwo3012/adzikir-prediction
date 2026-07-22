// ======================================
// PARSER ENGINE V4.1
// ======================================

// ----------------------
// Bersihkan Text
// ----------------------
function cleanText(text){

    return text
        .replace(/\u00A0/g," ")
        .replace(/\u200B/g,"")
        .replace(/\r/g,"");

}

// ----------------------
// Pecah Baris
// ----------------------
function splitLines(text){

    return text
        .replace(/\t/g,"\n")
        .split("\n")
        .map(x=>x.trim())
        .filter(x=>x!="");

}

// ----------------------
// Format : 1st: 1234
// ----------------------
function parseFirstFormat(line){

    const m = line.match(/1st\s*:?\s*(\d{4})/i);

    if(m){
        return m[1];
    }

    return null;

}

// ----------------------
// Format :
// BKMG-1234
// 5678
// ----------------------
function parseCodeFormat(lines,index){

    if(

        /^[A-Z]{2,10}-\d{4}$/i.test(lines[index]) &&

        index+1<lines.length &&

        /^\d{4}$/.test(lines[index+1])

    ){

        return lines[index+1];

    }

    return null;

}

// ----------------------
// Hapus Duplikat
// ----------------------
function uniqueDraw(draws){

    return [...new Set(draws)];

}

// ======================================
// MAIN PARSER
// ======================================

function parseDataset(text){

    text = cleanText(text);

    const lines = splitLines(text);

    let draws = [];

    for(let i=0;i<lines.length;i++){

        let result = parseFirstFormat(lines[i]);

        if(result){

            draws.push(result);

            continue;

        }

        result = parseCodeFormat(lines,i);

        if(result){

            draws.push(result);

            continue;

        }

    }

    return uniqueDraw(draws);

}        // 1234
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
