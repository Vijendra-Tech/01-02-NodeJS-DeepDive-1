/** Writable stream */

const fs = require("fs");

const readStream = fs.createReadStream("./Adv-nodes/stream/files/bulk.txt");
const writeStream = fs.createWriteStream("./copy.txt", {
//   highWaterMark: 23232323,
});

readStream.on("data", (chunk) => {
  //   console.log("reading chunk \n", chunk.toString());
  const result = writeStream.write(chunk);
  if (!result) {
    console.log("backpressure");
    readStream.pause();
  }
});

readStream.on("end", () => {
  //   console.log("its finished");
  writeStream.end();
});

readStream.on("error", (error) => {
  console.log(`An Error has accured `);
  console.error(error);
});

writeStream.on("close", () => {
  process.stdout.write("file copied \n");
});

writeStream.on("drain", () => {
  console.log("Drained");
  readStream.resume();
});
