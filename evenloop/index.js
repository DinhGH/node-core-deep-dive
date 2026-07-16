async function thoiCom() {
  console.log("2. Bật nồi cơm điện."); // Nửa trước await

  // Bắt đầu bẻ đôi tại đây!
  await camDienNoiCom(); // Tác vụ này tốn thời gian

  // Nửa sau await (Bị biến thành MicroTask)
  console.log("4. Cơm chín rồi! Ăn cơm thôi.");
}

function camDienNoiCom() {}

// Bắt đầu chạy chương trình:
console.log("1. Chuẩn bị bữa tối");
thoiCom();
console.log("3. Tranh thủ quét cái nhà");
