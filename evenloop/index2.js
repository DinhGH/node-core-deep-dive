console.log("1. Start");

setTimeout(() => {
  console.log("2. Timeout");
}, 0);

async function ChuyenA() {
  console.log("3. Vào Chuyến A");
  await Promise.resolve();
  console.log("4. Kết thúc Chuyến A");
}

async function ChuyenB() {
  console.log("5. Vào Chuyến B");
  await Promise.resolve();
  console.log("6. Kết thúc Chuyến B");
}

ChuyenA();

Promise.resolve().then(() => {
  console.log("7. Promise lẻ loi");
});

ChuyenB();

console.log("8. End");
