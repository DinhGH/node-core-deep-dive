// JavaScript luôn truyền tham số theo giá trị (Pass by Value).
//JavaScript luôn truyền tham số theo giá trị. Đối với object, giá trị được truyền là tham chiếu (địa chỉ) của object,
// nên cả hai biến cùng tham chiếu đến một object và có thể thay đổi nội dung của object đó.
//1. Primitive (Kiểu dữ liệu nguyên thủy) - Truyền theo giá trị (Pass by Value)
let a = 10;
let b = a;
b = 20;
console.log(a); // 10
console.log(b); // 20
//a ---> 10, b ---> 10, b = 20, b ---> 20
//function
function change(x) {
  x = 100;
}
let a = 10;
change(a);
console.log(a);
//10. vi copy a thanh bien x voi gia tri 10 nhung la 1 bien khac, nen x = 100, a = 10
// De thay doi bien a. thay
// function change(x) {
//     return 100;
// }
// let a = change(a);
//hoac
// function change() {
//     a =  100;
// }

// 2. Object - Lưu địa chỉ của object
let user1 = {
  name: "John",
};
let user2 = user1;
user2.name = "David";
console.log(user1.name); // David
console.log(user2.name); // David
//vi user2 tham chieu toi user1 va copy dia chi cua user1

let user1 = {
  name: "John",
};
let user2 = user1;
user2 = {
  name: "David",
};
console.log(user1.name); //John
console.log(user2.name); //David

//Function
function change(user) {
  user.name = "David";
}
let obj = {
  name: "John",
};
change(obj);
console.log(obj.name); //David. user tham chieu den dia chi cua obj chu ko copy nhu kieu passbyvalue

function change(user) {
  user = {
    name: "David",
  };
}
let obj = {
  name: "John",
};
change(obj);
console.log(obj.name); //John. gan user cho 1 dia chi obj moi
