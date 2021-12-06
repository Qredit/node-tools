import fetch from "node-fetch";
import fs from "fs";


async function iterate() {
       let wallets = [];
       
       for (let i = 1; i < 300; i++) {
              console.log("- Fetching "+i+ " of 300\n")
              let twallets = await fetch("https://api.ark.io/api/wallets?page=" +i+"&limit=100");
              twallets.json().then(function(d) {
                     if (d.data) {
                            d.data.forEach(function(tw) {
                                   if (tw) {
                                          if (tw.attributes.vote) {
                                                 wallets.push("{\"address\":\""+tw.address+"\"},");
                                          }
                                   }
                            });
                     }
              })
       }
       let file = fs.createWriteStream('wallets.json');
       file.on('error', function(err) { /* error handling */ });
       file.write("["+"\n");
       wallets.forEach(function(v) { file.write(v + "\n"); });
       file.write("]"+"\n");
       file.end();
}


iterate();