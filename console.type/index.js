console.log("Log");

const users = [
  { id: 1, name: "Nguyễn Văn A", role: "Admin", gpa: 3.8 },
  { id: 2, name: "Trần Thị B", role: "Student", gpa: 3.5 },
  { id: 3, name: "Lê Văn C", role: "Student", gpa: 3.9 },
];

console.table(users);

console.error("❌ Đã xảy ra lỗi nghiêm trọng!");
// In dòng chữ màu đỏ (thường đi kèm stack trace)

console.warn("⚠️ Bật cảnh báo: Hàm này sắp bị loại bỏ!");
// In dòng chữ màu vàng/cam

console.info("ℹ️ Thông tin: Hệ thống đã khởi chạy xong.");
// In thông tin dạng hướng dẫn (một số trình duyệt hiện biểu tượng 'i')

console.time("ThoiGianXuly"); // Bắt đầu bấm giờ với nhãn 'ThoiGianXuly'

// Giả lập một tác vụ tốn thời gian
for (let i = 0; i < 1000000; i++) {
  Math.sqrt(i);
}

console.timeEnd("ThoiGianXuly"); // Bấm dừng và in ra: ThoiGianXuly: 3.45ms

class Person {
  constructor(name) {
    this.name = name;
  }
}
const p = new Person("An");

console.dir(p);
// In ra chi tiết đối tượng, mở rộng xem được __proto__, constructor, v.v.

function renderUI() {
  console.count("Số lần render UI");
}

renderUI(); // In: Số lần render UI: 1
renderUI(); // In: Số lần render UI: 2

console.countReset("Số lần render UI"); // Reset số đếm về 0

console.clear;
