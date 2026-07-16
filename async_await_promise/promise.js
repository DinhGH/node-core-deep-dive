async function layDuLieuTrangChu() {
  try {
    // Cả 3 hàm này được kích hoạt chạy SONG SONG cùng lúc
    const [user, orders, products] = await Promise.all([
      layThongTinUser(), // Promise 1
      layDonHang(), // Promise 2
      laySanPhamGoiY(), // Promise 3
    ]);

    console.log("Đã có đủ dữ liệu sau 2 giây!", user, orders, products);
  } catch (error) {
    // Nếu layDonHang() bị lỗi, lập tức nhảy vào đây, không cần đợi các hàm khác
    console.error("Một trong các tác vụ bị lỗi rồi:", error);
  }
}

// Hàm giả lập việc đếm ngược, sau 3 giây sẽ tự động BÁO LỖI (Reject)
function sytemTimeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(
      () => reject(new Error("Yêu cầu quá thời gian cho phép (Timeout)!")),
      ms,
    );
  });
}

async function taiAnhLen() {
  try {
    // Cho hàm upAnh thực tế ĐUA với hàm sytemTimeout (3 giây)
    const ketQua = await Promise.race([
      upAnhNang30MB(), // Có thể mất 5 giây nếu mạng yếu
      sytemTimeout(3000), // Đúng 3 giây là nổ bom báo lỗi
    ]);

    console.log("Up ảnh thành công!", ketQua);
  } catch (error) {
    // Nếu sau 3 giây upAnh chưa xong, sytemTimeout thắng cuộc và ném lỗi vào đây
    console.error("Thất bại:", error.message);
  }
}
