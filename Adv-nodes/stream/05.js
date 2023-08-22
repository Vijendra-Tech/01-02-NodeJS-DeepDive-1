/** Duplex Stream */

const { PassThrough, Duplex } = require("stream");

const fs = require("fs");

const readStream = fs.createReadStream("./Adv-nodes/stream/files/bulk.txt");
const writeStream = fs.createWriteStream("./copy.txt");

class Throttle extends Duplex {
  constructor(ms) {
    super();
    this.delay = ms;
  }
  _write(chunk, encoding, cb) {
    this.push(chunk);
    setTimeout(cb, this.delay);
  }
  _final() {
    this.push(null);
  }
  _read() {}
}

const report = new PassThrough();
const throttle = new Throttle(10);

var total = 0;
report.on("data", (chunk) => {
  total += chunk.length;
  console.log("bytes  ", total);
});

readStream.pipe(throttle).pipe(report).pipe(writeStream);
