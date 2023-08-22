#! /usr/bin/env node

"use strict";
import minimist from "minimist";
import path from "path";
import fs from "fs";
import util from "util";
import getStdin from "get-stdin";
import { fileURLToPath } from "url";
let args = minimist(process.argv.slice(2), {
  boolean: ["help", "in"],
  string: ["file"],
});
var BASE_PATH = path.resolve(
  process.env.BASE_PATH || path.dirname(fileURLToPath(import.meta.url))
);

if (args.help) {
  forHelp();
} else if (args.file) {
  //   processGivenFile(path.join(BASE_PATH, args.file));
  //   let filePath = path.resolve(args.file);
  //   let dirName = path.dirname(path.resolve(args.file));
  //   console.log(dirName);
  //   console.log(filePath);
  fs.readFile(path.join(BASE_PATH, args.file), "utf-8", (err, contents) => {
    if (err) {
      showError(err.toString());
    } else {
      processGivenFile(contents);
    }
  });
} else if (args.in || args._.includes("_")) {
  getStdin().then(processGivenFile).catch(showError);
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
function processGivenFile(contents) {
  //   fs.readFile(filePath, "utf-8", (err, contents) => {
  //     if (err) {
  //       showError(err.toString());
  //     } else {
  //       console.log(contents);
  //     }
  //   });
  contents = contents.toUpperCase();
  process.stdout.write(contents);
}
