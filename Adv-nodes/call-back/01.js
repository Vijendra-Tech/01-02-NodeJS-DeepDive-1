function replaceStr(str = "", done) {
  process.nextTick(() => {
    done(str.replace(/[a-zA-Z]/g, "X"));
  });
}

replaceStr("Hello World!", (hidden) => {
  console.log(hidden);
});


console.log('end');