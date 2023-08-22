/** Pipe Stream */
const fs = require("fs");

// const readStream = fs.createReadStream("./Adv-nodes/stream/files/bulk.txt");
const writeStream = fs.createWriteStream("./file.txt");

// readStream.pipe(writeStream).on("error", (error) => {
//   console.error(error);
// });

process.stdin.pipe(writeStream)
