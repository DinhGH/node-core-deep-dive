// Cách 1: Sử dụng try...catch...finally (Cơ bản - Phải biết)
// async function getUserData(userId) {
//   try {
//     const response = await fetch(`https://api.example.com/users/${userId}`);

//     // Lưu ý: fetch API không tự throw error khi HTTP status là 4xx hay 5xx
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;

//   } catch (error) {
//     // Handling error: log lỗi, gửi lên Sentry, hoặc hiển thị thông báo
//     console.error("Lỗi khi lấy dữ liệu user:", error.message);
//     throw error; // Re-throw nếu muốn hàm gọi bên ngoài xử lý tiếp

//   } finally {
//     // Chạy bất kể thành công hay thất bại (thường dùng để tắt Loading state)
//     console.log("Hoàn tất tiến trình fetch.");
//   }
// }

// Cách 2: Sử dụng wrapper function (Pattern kiểu Go / Tuple Return)
// // Hàm helper giúp chuyển Promise thành dạng [error, result]
// const handleAsync = async (promise) => {
//   try {
//     const data = await promise;
//     return [null, data];
//   } catch (error) {
//     return [error, null];
//   }
// };

// // Sử dụng vô cùng gọn gàng:
// async function processOrder(orderId) {
//   // Lấy thông tin đơn hàng
//   const [orderErr, order] = await handleAsync(fetchOrder(orderId));
//   if (orderErr) return console.error("Không lấy được đơn hàng:", orderErr);

//   // Thanh toán
//   const [payErr, payment] = await handleAsync(payOrder(order));
//   if (payErr) return console.error("Thanh toán thất bại:", payErr);

//   console.log("Xử lý thành công:", payment);
// }

// Cách 3: Bắt lỗi danh sách Promise chạy song song (Promise.all vs Promise.allSettled)
// async function fetchMultipleData() {
//   const promises = [
//     fetch('/api/user'),
//     fetch('/api/products'),
//     fetch('/api/bad-url') // API này bị lỗi
//   ];

//   // An toàn hơn Promise.all vì không làm sập các request thành công khác
//   const results = await Promise.allSettled(promises);

//   results.forEach((result, index) => {
//     if (result.status === 'fulfilled') {
//       console.log(`Task ${index} thành công:`, result.value);
//     } else {
//       console.error(`Task ${index} thất bại:`, result.reason);
//     }
//   });
// }

async function getUser() {
  try {
    console.log("1. Bắt đầu gọi API...");
    const response = await fetch("https://api.example.com/users/999999");

    if (!response.ok) {
      console.log("2. Phát hiện lỗi 404! Bắt đầu NÉM LỖI (throw)...");

      // Dòng này hoạt động như một "nút nhảy":
      // Nó LẬP TỨC ngắt luồng trong try và BẮN BỎ CÁC DÒNG CODE PHÍA DƯỚI NÓ.
      throw new Error(`API bị lỗi HTTP Status: ${response.status}`);

      console.log("Dòng này sẽ KHÔNG BAO GIỜ chạy!");
    }

    const data = await response.json(); // Dòng này cũng KHÔNG CHẠY
    return data;
  } catch (error) {
    // 3. Dòng throw ở trên sẽ BẮN LỖI THẲNG VÀO ĐÂY!
    console.log("3. Đã nhảy vào CATCH!");
    console.error("Nội dung lỗi bắt được:", error.message);
  } finally {
    // 4. Cho dù có throw hay không, FINALLY VẪN LUÔN CHẠY CUỐI CÙNG!
    console.log("4. Đã nhảy vào FINALLY! (Ví dụ: Tắt spinner loading)");
  }
}

getUser();
