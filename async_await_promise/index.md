"Async (bất đồng bộ) là cơ chế giúp code không làm nghẽn luồng chính; nó cho phép các tác vụ tốn thời gian chạy ngầm nhờ sự điều phối của Event Loop.

Một hàm có chữ async nếu không có await bên trong thì các dòng code bên trong nó vẫn chạy đồng bộ (từ trên xuống dưới) như hàm thường, chỉ khác là nó luôn trả về một Promise.

Khi gặp chữ await, luồng chính sẽ thực thi tác vụ ngay tại chữ await đó, rồi "bẻ đôi" hàm async: Nó đóng gói toàn bộ phần code nằm PHÍA SAU chữ await biến thành một MicroTask rồi thoát ra ngoài hàm để làm việc khác. Khi tác vụ tại await chạy xong, cái "khóa" được mở, phần code phía sau mới được đưa vào MicroTask Queue để Event Loop bốc lên chạy nốt."