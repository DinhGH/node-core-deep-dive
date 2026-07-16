// Hàm docFile nhận vào một hàm khác làm callback
function docFileTuDatabase(tenFile, callback) {
  console.log("Đang đọc file: " + tenFile);

  // Giả lập việc đọc file mất 2 giây
  setTimeout(() => {
    let duLieu = "Nội dung của file " + tenFile;
    // Đọc xong rồi! Bây giờ "gọi lại" hàm callback và đưa dữ liệu cho nó
    callback(duLieu);
  }, 2000);
}

// Hàm này sẽ đóng vai trò là Callback
function xuLyDuLieu(data) {
  console.log("Kết quả nhận được: " + data);
}

// Truyền hàm xuLyDuLieu vào làm tham số
docFileTuDatabase("danh_sach_sinh_vien.txt", xuLyDuLieu);

console.log("Tôi chạy trước nè, không cần chờ 2 giây đâu!");
