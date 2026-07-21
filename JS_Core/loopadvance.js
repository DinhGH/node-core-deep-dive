//1. .forEach() – Thay thế cho for truyền thống
const numbers = [1, 2, 3, 4];

numbers.forEach((num, index) => {
  console.log(`Phần tử thứ ${index} là: ${num}`);
});

//2. .map() – "Vua" của lập trình React
const numbers = [1, 2, 3, 4];

// Nhân đôi tất cả phần tử trong mảng
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8]

// Trong React: Chuyển mảng tên thành mảng HTML/JSX
const names = ["Định", "An"];
const listHTML = names.map((name) => `<li>${name}</li>`);

//3. .filter() – Lọc dữ liệu theo điều kiện
const listSV = [
  { ten: "Định", gpa: 3.9 },
  { ten: "An", gpa: 2.8 },
  { ten: "Bình", gpa: 3.6 },
];

// Lọc ra danh sách sinh viên giỏi (GPA >= 3.2)
const svGioi = listSV.filter((sv) => sv.gpa >= 3.2);

console.log(svGioi);
// Kết quả: Mảng gồm 2 sinh viên (Định và Bình)

//4. .find() – Tìm phần tử ĐẦU TIÊN thỏa mãn
const listSV = [
  { id: 101, ten: "Định" },
  { id: 102, ten: "An" },
];

// Tìm sinh viên có id = 101
const svFound = listSV.find((sv) => sv.id === 101);

console.log(svFound); // { id: 101, ten: "Định" }

//5. .reduce() – "Bào" cả mảng về một giá trị duy nhất
const gioHang = [
  { ten: "Áo", gia: 100 },
  { ten: "Quần", gia: 200 },
  { ten: "Mũ", gia: 50 },
];

// Tính tổng tiền giỏ hàng (0 là giá trị tổng ban đầu)
const tongTien = gioHang.reduce((total, item) => total + item.gia, 0);

console.log(tongTien); // 350
//array.reduce((accumulator, currentValue, currentIndex, array) => {
// Logic xử lý ở đây
//   return accumulator;
// }, initialValue);

//6. .some() và .every() – Kiểm tra điều kiện (Trả về true/false)
// .some(): Trả về true nếu có Í T NHẤT 1 phần tử thỏa mãn điều kiện.

// .every(): Trả về true chỉ khi TẤT CẢ phần tử đều thỏa mãn điều kiện.

const numbers = [2, 4, 6, 7, 8];

// Kiểm tra xem mảng có chứa số lẻ nào không?
const coSoLe = numbers.some((num) => num % 2 !== 0); // true (vì có số 7)

// Kiểm tra xem TẤT CẢ có phải số chẵn không?
const tatCaChan = numbers.every((num) => num % 2 === 0); // false
