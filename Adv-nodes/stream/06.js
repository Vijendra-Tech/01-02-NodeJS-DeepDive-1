/** Transform Steem
 *
 */

const { Transform } = require("stream");

class TransformStream extends Transform {
  constructor(char) {
    super();
    this.replaceChar = char;
  }
  _transform(chunk, encoding, cb) {
    const trChunk = String(chunk).toUpperCase();
    this.push(trChunk);
    cb();
  }
  _flush() {
    this.push("more stuff is going on---");
  }
}
var replaceStream = new TransformStream('X');

process.stdin.pipe(replaceStream).pipe(process.stdout)

