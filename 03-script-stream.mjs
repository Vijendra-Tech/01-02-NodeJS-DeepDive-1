#! /usr/bin/env node

"use strict";
import minimist from "minimist";
import path from "path";
import fs from "fs";
// import util from "util";
// import getStdin from "get-stdin";
import { fileURLToPath } from "url";
import { Transform } from "stream";
import zlib from "zlib";
import CAF from "caf";

let args = minimist(process.argv.slice(2), {
  boolean: ["help", "in", "out", "compress"],
  string: ["file"],
});

var BASE_PATH = path.resolve(
  process.env.BASE_PATH || path.dirname(fileURLToPath(import.meta.url))
);

var FILE_OUT = path.join(BASE_PATH, "out.txt");

function steamComplete(stream) {
  return new Promise(function c(res) {
    stream.on("end", function () {
      res();
    });
  });
}

if (args.help) {
  forHelp();
} else if (args.file) {
  let fileStream = fs.createReadStream(path.join(BASE_PATH, args.file));
  processGivenFile(fileStream);
} else if (args.in || args._.includes("_")) {
  processGivenFile(process.stdin);
} else if (process.env.SOME_ENV_VAL) {
  console.log(rocess.env.SOME_ENV_VAL);
} else {
  //error
  showError("Incorrect usage", true);
}

function forHelp() {
  console.log("mycli usage:");
  console.log("  mycli --file ={FILENAME}");
  console.log("");
  console.log("  --help   print help");
  console.log("  --file={FILENAME}  process the file");
}

function showError(msg, incHelp = false) {
  console.error(msg);
  if (incHelp) {
    console.log(" ");
    forHelp();
  }
}
//param is readable stream
function processGivenFile(inStream) {
  var outStream = inStream;
  var upperStream = new Transform({
    transform(chunk, enc, cb) {
      this.push(chunk.toString().toUpperCase());
      cb();
    },
  });

  outStream = outStream.pipe(upperStream);
  if (args.compress) {
    let gZipStream = zlib.createGzip();
    outStream = outStream.pipe(gZipStream);
    FILE_OUT = `${FILE_OUT}.zip`;
  }
  var targetStream;
  if (args.out) {
    targetStream = process.stdout;
  } else {
    targetStream = fs.createWriteStream(FILE_OUT);
  }

  outStream = outStream.pipe(targetStream);
}
