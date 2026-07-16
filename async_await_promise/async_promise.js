// 1. Hàm này BẮT BUỘC phải trả về một Promise tự tạo thì await mới có tác dụng
function ham() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("as");
      resolve(); // 🔑 Mở khóa đập await khi hết 3 giây!
    }, 3000);
  });
}

async function tinhSau() {
  await ham(); // 🛑 Giờ thì await đã có tác dụng, nó sẽ đóng băng tại đây đúng 3 giây!
  return "Chào bạn!";
}

// 2. Muốn lấy giá trị trong hộp quà, ta phải bọc ngoài bằng một hàm async khác và dùng await
async function chayChuongTrinh() {
  const ketQua2 = await tinhSau(); // 🔑 Dùng await để bóc hộp quà ra lấy dữ liệu thật
  console.log(ketQua2); // In ra chữ: "Chào bạn!"
}

chayChuongTrinh();
