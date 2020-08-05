const fs = require('fs')

const argv = process.argv

if(argv[2])
{
    cat(argv[2]);
}

function cat(path){
    fs.readFile(path, 'utf-8', (err, data) => {
        if (err){
            console.log("Error reading ", path);
            console.log(err);
            process.kill(1);
        }

        console.log(data);
    })
}