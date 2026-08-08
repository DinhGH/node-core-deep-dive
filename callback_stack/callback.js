function hello(callback) {
  console.log("Hello");

  callback();
}

hello(() => {
  console.log("World");
});

setTimeout(() => {
  console.log("3 giây");
}, 3000); // day cung la 1 callback, dang ky 1 ham sau 3s no chay, chu ko phai dung lai cho 3s
