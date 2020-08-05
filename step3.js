const fs = require("fs");
const axios = require("axios");

let path = process.argv[2];
let out = "";

if (path != "--out") {
  catWebCat(path);
} else {
  path = process.argv[4];
  out = process.argv[3];
  catWebCat(path), out;
}

function handle(data, out) {
    if(out){
        fs.writeFile(out, data, 'utf8', function(err){
            if(err){
                console.log("Couldn't write ", out);
                console.log(err);
                process.exit(1);
            }
        })
    }
    
    console.log(data);
}

function catWebCat(path) {
  if (path.startsWith("http")) {
    webCat(path);
  } else {
    cat(path);
  }
}

function cat(path) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log("Error reading ", path);
      console.log(err);
      process.exit(1);
    }
    handle(data);
  });
}

async function webCat(url) {
  try {
    let resp = await axios.get(url);
    handle(resp.data);
  } catch (err) {
    console.log("Error fetching ", url);
    console.log(err);
    process.exit(1);
  }
}
