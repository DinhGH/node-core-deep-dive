//array
const numbers = [10, 20, 30, 40];
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

let i = 0;
while (i < numbers.length) {
  console.log(numbers[i]);
  i++;
}

for (const i of numbers) {
  console.log(i);
}

//object
const student = {
  ten: "Dinh",
  tuoi: 20,
  truong: "Duy Tân",
};

// 1. Chỉ lấy danh sách các Key
for (const key of Object.keys(student)) {
  console.log(key); // "ten", "tuoi", "truong"
}

// 2. Chỉ lấy danh sách các Value
for (const val of Object.values(student)) {
  console.log(val); // "Định", 20, "Duy Tân"
}

// 3. Lấy cả Cặp [Key, Value] cùng lúc
for (const [key, value] of Object.entries(student)) {
  console.log(`${key} -> ${value}`);
}
// const entry of Object.entries(student);
// Trả về: [ ["ten", "Định"], ["tuoi", 20], ["truong", "Duy Tan"] ]
// Destructuring key = entry[0], entry = nam[1]

const dsSinhVien = [
  { id: 1, ten: "Định", gpa: 3.9 },
  { id: 2, ten: "An", gpa: 3.5 },
  { id: 3, ten: "Bình", gpa: 3.8 },
];

for (const sv of dsSinhVien) {
  for (const [key, value] of Object.entries(sv)) {
    console.log(`${key}: ${value}`);
  }
}

let i = 1;

do {
  console.log(`Lần chạy thứ: ${i}`);
  i++;
} while (i <= 3);
