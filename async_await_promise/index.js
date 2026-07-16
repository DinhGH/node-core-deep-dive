// ❌ CÁCH CŨ: DÙNG PROMISE TRUYỀN THỐNG (Rối mắt, thụt lề liên tục)
function logicCu() {
  checkUser()
    .then((user) => {
      getCart(user.id).then((cart) => {
        checkout(cart).then((receipt) => {
          console.log("Thành công:", receipt);
        });
      });
    })
    .catch((err) => console.error(err));
}

//  CÁCH MỚI: DÙNG ASYNC/AWAIT (Thẳng hàng, cực kỳ sạch sẽ)
async function logicMoi() {
  try {
    const user = await checkUser();
    const cart = await getCart(user.id);
    const receipt = await checkout(cart);
    console.log("Thành công:", receipt);
  } catch (err) {
    console.error(err);
  }
}

// Người ta vẫn dùng Promise theo cách này:
async function loadTrangChu() {
  // Chạy song song cả 3 tác vụ cùng lúc để tối ưu thời gian
  const [sanPham, banner, thoiTiet] = await Promise.all([
    getProducts(),
    getBanners(),
    getWeather(),
  ]);

  console.log("Load xong toàn bộ trang chủ!");
}
