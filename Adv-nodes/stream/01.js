const { Readable } = require("stream");

const arr = ["rana", "kfdkfd", "dddd", "fwwew", "deeere"];

class StreamFromArray extends Readable {
  constructor(array) {
    super({ objectMode: true });
    this._array = array;
    this._index = 0;
  }

  _read() {
    if (this._index < this._array.length) {
      const chunk = {
        data: this._array[this._index],
        index: this._index
      };    
      this.push(chunk); // Push the chunk to the readable stream
      this._index += 1;
    } else {
      this.push(null); // Signal the end of the stream
    }
  }
}

const peaStream = new StreamFromArray(arr);

peaStream.on("data", (chunk) => console.log(chunk));
peaStream.on("end", () => console.log("done"));
