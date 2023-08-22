/** Callback using Promise */

var delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve("Delay has ended"), ms);
  });
};
delay(1000)
  .then(console.log)
  .then(console.log("ended"))
  .then(() => 42)
  .then((num) => console.log("Number getting", num));

  
