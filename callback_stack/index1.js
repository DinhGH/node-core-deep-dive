function layGia() {
  return 50; // (Bước 3) Trả về 50, layGia() bị nhấc ra khỏi Stack
}

function tinhTong() {
  let gia = layGia(); // (Bước 2) Gọi layGia(), đặt layGia() lên đầu Stack
  return gia + 10; // (Bước 4) Trả về 60, tinhTong() bị nhấc ra khỏi Stack
}

tinhTong(); // (Bước 1) Gọi tinhTong(), đặt tinhTong() vào Stack
