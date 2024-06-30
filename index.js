const fs = require("fs");
const offset = 8
const folder = fs.readdirSync("inputs")
folder.forEach(f => {
    const raw = fs.readFileSync("inputs/"+f, "utf8").toString();
    const lines = raw.split("\r\n");
    
    let playerPos = "models.model:partToWorldMatrix():apply()";
    let string = "";
    
    for (let i = 0; i < lines.length; i++) {
        let buildParticle = lines[i].split(" ");
    
        if (buildParticle.length > 1 && i > offset) {
            let particleParams = buildParticle.slice(1, 6).join(" ");
            let posX = `${playerPos}[1]${(buildParticle[6][1] !== "-" ? "+" : "")}${buildParticle[6].replace("~", "")}`;
            let posY = `${playerPos}[2]${(buildParticle[7][1] !== "-" ? "+" : "")}${buildParticle[7].replace("~", "")}`;
            let posZ = `${playerPos}[3]${(buildParticle[8][1] !== "-" ? "+" : "")}${buildParticle[8].replace("~", "")}`;
            string += `particles:newParticle("${particleParams}", ${posX}, ${posY}, ${posZ})` + (i !== lines.length - 2 ? "\n" : "");
        }
    }
    
    fs.writeFileSync("exports/"+f.split(".")[0]+".txt", string);
});

console.log("convert done!")