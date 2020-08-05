const fs = require("fs");
const axios = require("axios");

const arg = process.argv[2];

if (arg) {
  if (arg.startsWith("http")) {
    webCat(arg);
  } else {
    cat(arg);
  }
}

function cat(path) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.log("Error reading ", path);
      console.log(err);
      process.exit(1);
    }

    console.log(data);
  });
}

async function webCat(url) {
  try {
    let resp = await axios.get(url);
    console.log(resp.data);
  } catch (err) {
    console.log("Error fetching ", url);
    console.log(err);
    process.exit(1);
  }
}
