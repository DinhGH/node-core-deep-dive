// khai bao bien giong python ko can cac tu khoa int, float, string,... khai bao ten bien
// va gan no bang gia tri nao do
//var, let: khai bao pham vi cua bien, mat dinh var. const: loai bien ko thay doi.
//Number: int, float, double,...
//String: '...',"...",`...${}`
// Boolean
// Undefined
// Null
// Symbol
// BigInt

obj1 = { ten: "Dinh", tuoi: "1" };
console.log(Number(obj1["tuoi"]) > 1 ? "yes" : "no");
console.log(obj1.tuoi);
a = [1, 2, 4, 5, "33"];
console.log(a[1]);
arr = [1, { ten: "Dinh", tuoi: 1 }, "chuoi", { a: { b: ["2", 3] } }, [1, 2, 3]];
console.log(Number(arr[3]["a"]["b"][0]) + 3);
let id1 = Symbol("id23re");
let id2 = Symbol("id");
console.log(id1.description, id2, id1 === id2);
// Khai báo chuẩn trong thực tế:
const TEN = "Định"; // String (dùng const vì tên không đổi)
let tuoi = 1; // Number
let user = { ten: TEN, tuoi }; // Object
let check = tuoi > 1; // Boolean (false)
let ranhGiung = null; // Null (chủ động để trống)
let chuaGiaTri; // Undefined (chưa gán)
let idDuyNhat = Symbol("id"); // Symbol
let maGiaoDich = 9999999999n; // BigInt
