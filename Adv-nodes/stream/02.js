/** use all read stream  from fs*/

const fs = require("fs");

const readStream = fs.createReadStream('./Adv-nodes/stream/files/bulk.txt');

readStream.on("data", (chunk) => {
  console.log("reading chunk \n", chunk.toString());
});

readStream.on("end", () => {
  console.log("its finished");
});

readStream.on("error", (error) => {
  console.log(`An Error has accured `);
  console.error(error);
});

readStream.pause()

/** Streams are there in node */
process.stdin.on('data',(chunk)=>{
    readStream.read()
})
