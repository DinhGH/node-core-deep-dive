console.log("1. Khởi động");

setTimeout(() => {
  console.log("2. setTimeout 0ms");
}, 0);

async function testAsync() {
  console.log("3. Bắt đầu hàm async");

  await Promise.resolve().then(() => {
    console.log("4. Promise bên trong await");
  });

  console.log("5. Code phía sau await");
}

testAsync();

Promise.resolve().then(() => {
  console.log("6. Promise bên ngoài");
});

console.log("7. Kết thúc");
