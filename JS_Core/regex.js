//Regex (Regular Expression)
// là một "ngôn ngữ nhỏ"
// dùng để mô tả mẫu (pattern).
text = "hello world!";
console.log(text.match(/world/)); //[ 'world', index: 6, input: 'hello world!', groups: undefined ]
// tim thay chuoi 'world' tai index 6, group la gia tri muon phan tach tu chuoi text va lay ra
// neu chuoi ko match tra ve null
// regex nam ben trong 1 cap //.
// ^ bat dau, ^abc: thi phai bat dau bang abc.... $ ket thuc, abc$: thi phai ket thuc ...abc. \/ khai bao dau '/'
//flag: g: tim va lay toan bo. i: khong phan biet hoa thuong. m: dung khi text co nhieu dong
// dau '.' dai dien cho dung 1 ky tu bat ky
// dau '*' dai dien cho 0 hoac nhieu lan cua ky tu truoc no, con lai thich ky tu gi cung dc
//dau '+' dai dien cho it nhat 1 ky tu lien truoc, con lai thich ky tu gi cung dc
//dau '?' dai dien cho co the co ky tu truoc hoac k
const str = "cat dog cat";
console.log(str.match(/cat/)); // tra ve cat dau tien. ['cat',index:0,input:'cat dog cat']
console.log(str.match(/cat/g)); // tra ve toan bo cat. ["cat","cat"]
const text = `cat
dog
fish`;
console.log(text.match(/^dog/)); //null
console.log(text.match(/^dog/m)); //['dog', index: 4, input: 'cat\ndog\nfish', groups: undefined]
const str = "cat bat hatascasc";
console.log("lat hat cat".match(/.at/g)); //['lat', 'hat', 'cat']
console.log(text.match(/ab*/)); //text can be: a, ab,abb,abbbbbbbbasc;
console.log(text.match(/ab+/)); //text can be: ab, abb,abbbbcasbbbb;
console.log(text.match(/ab?c/)); //text can be: ac, abc;
///[abc]/ mot trong cac ky tu
console.log("bc".match(/[abc]/)); //['b', index: 0, input: 'bc', groups: undefined]
console.log("VASDVADVcG".match(/[a-z]+/)); // mot chua it nhat 1 ki tu viet thuong. [A-Z] chu hoa.
// [a-zA-Z] chu thuong hoac hoa [0-9] so
console.log("5Ssdd5Ss5".match(/[a-zA-Z]+/)); //['Ssdd', index: 1, input: '5Ssdd5Ss5', groups: undefined]
// /\d/: Tim kiem tra co phai so. \D Tim kiem tra ko phai la so
console.log("f4".match(/\d/)); //['4', index: 1, input: 'f4', groups: undefined]
// /\w/: chu [a-zA-Z0-9]. /\W/: tim kiem tra ko phai chu
// /\s/: tim kiem tra khoang trang. /\S/ nguoc lai
//d{3}: lap lai. d{3,6}: khoang
console.log("fa2r334r".match(/\d{3}/)); //['334', index: 4, input: 'fa2r334r', groups: undefined]
console.log("fa2r33rv24244g".match(/\d{3,6}/)); //['24244', index: 8, input: 'fa2r33rv24244g', groups: undefined]
// () nhom. dung de trich xuat du lieu ra
const result = "2025-08-30".match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(result);
//['2025-08-30', '2025', '08', '30', index: 0, input: '2025-08-30', groups: undefined]
const email = "abc@gmail.com";
const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(regex.test(email));
const regex = /^0\d{9}$/; //phone
const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/; //password
