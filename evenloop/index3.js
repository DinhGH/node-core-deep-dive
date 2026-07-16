console.log("1. Khởi động");

setTimeout(() => {
  console.log("2. Timeout");
}, 0);

process.nextTick(() => {
  console.log("3. NextTick lẻ loi");
});

async function Hàm_X() {
  console.log("4. Hàm X bắt đầu");
  await Hàm_Y();
  console.log("5. Hàm X sau await thứ nhất");
  await Promise.resolve();
  console.log("6. Hàm X sau await thứ hai");
}

async function Hàm_Y() {
  console.log("7. Hàm Y bắt đầu");
  // Không có await ở đây nhé!
  return "Xong Y";
}

Hàm_X();

Promise.resolve().then(() => {
  console.log("8. Promise ngoài");
});

console.log("9. Kết thúc");
