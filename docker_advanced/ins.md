3. Chạy thử nghiệm và kiểm chứng tính năng Nâng cao
   Mở terminal tại thư mục dự án và gõ lệnh kích hoạt toàn bộ workflow:

Bash
docker compose up --build
(Thêm tham số --build để đảm bảo Docker luôn build lại code Web mới nhất của bạn).

Sau khi hệ thống khởi động xong (SQL Server có thể mất khoảng 10-15 giây để thiết lập ban đầu), bạn hãy mở trình duyệt và truy cập: http://localhost:8080

Thử nghiệm 1 (Ghi dữ liệu): Nhấn F5 liên tục vài lần. Bạn sẽ thấy danh sách lịch sử truy cập tăng dần (ID: 1, ID: 2, ID: 3...). Chứng tỏ code Web đã kết nối thành công và ghi được dữ liệu vật lý vào SQL Server trong container.

Bài kiểm tra "Sức chịu đựng" của Volume (Quan trọng)
Bây giờ chúng ta sẽ chứng minh xem triết lý "Container có thể bị tiêu hủy nhưng dữ liệu vật lý phải sống" hoạt động thế nào:

Quay lại terminal, bấm Ctrl + C để dừng hệ thống.

Gõ lệnh tiêu hủy hoàn toàn hệ thống:

Bash
docker compose down
Lúc này, cả container Web và container SQL Server đã bị xóa sạch hoàn toàn khỏi máy máy tính của bạn.

Bây giờ, hãy gõ lệnh khởi chạy lại hệ thống từ đầu:

Bash
docker compose up
Quay lại trình duyệt và F5 trang http://localhost:8080.

Kết quả: Bạn sẽ thấy danh sách ID không hề bị reset về 1, mà nó tiếp tục tăng lên (ví dụ: ID: 4, ID: 5...).

Giải mã hiện tượng: Dù container SQL Server cũ đã bị xóa sổ, nhưng nhờ cấu hình volumes: sql_data, toàn bộ file database vật lý đã được neo giữ an toàn trên ổ cứng máy thật của bạn. Khi container mới được sinh ra, nó lập tức "gắn" cái ổ cứng này vào và đọc tiếp dữ liệu cũ một cách mượt mà.

1. FROM node:20-alpine
   Ý nghĩa: Chọn hệ điều hành và môi trường nền tảng (Base Image).

Chi tiết: Bạn đang ra lệnh cho Docker: "Hãy chuẩn bị cho tôi một hệ điều hành Linux siêu nhẹ tên là Alpine (chỉ nặng khoảng 5MB) và cài đặt sẵn môi trường NodeJS phiên bản 20 lên đó". Đây là cái móng nhà để ứng dụng của bạn đứng lên.

2. WORKDIR /usr/src/app
   Ý nghĩa: Tạo và chuyển vào thư mục làm việc bên trong Container.

Chi tiết: Dòng này tương đương với lệnh mkdir /usr/src/app && cd /usr/src/app trên Linux. Từ dòng này trở đi, mọi thao tác sao chép file hay chạy lệnh đều sẽ diễn ra bên trong thư mục /usr/src/app này của hệ điều hành ảo.

3. COPY package\*.json ./
   Ý nghĩa: Sao chép các file quản lý thư viện từ máy thật vào container.

Chi tiết: Ký tự \* giúp copy cả file package.json và package-lock.json (nếu có) từ thư mục dự án trên máy thật của bạn vào thư mục hiện tại (./ tức là /usr/src/app) trong container.

4. RUN npm install
   Ý nghĩa: Cài đặt các thư viện (dependencies) cần thiết cho dự án.

Chi tiết: Lệnh này chạy trực tiếp bên trong container. Nó sẽ đọc file package.json vừa được copy ở bước trước để tải toàn bộ thư viện (như express, mssql...) về và lưu vào thư mục node_modules bên trong container.

5. COPY . .
   Ý nghĩa: Sao chép toàn bộ mã nguồn còn lại từ máy thật vào container.

Chi tiết: Dấu chấm đầu tiên . đại diện cho toàn bộ thư mục dự án hiện tại trên máy thật của bạn. Dấu chấm thứ hai . đại diện cho thư mục làm việc hiện tại trong container (/usr/src/app).

6. EXPOSE 3000
   Ý nghĩa: Khai báo cổng kết nối nội bộ.

Chi tiết: Dòng này giống như một lời chú thích gửi tới Docker và lập trình viên: "Ứng dụng NodeJS này khi khởi động sẽ lắng nghe và chạy ở cổng 3000 đấy nhé". (Như chúng ta đã thảo luận ở phần trước, dòng này chưa tự động mở cổng ra máy thật mà cần thêm tham số -p khi chạy container).

7. CMD ["npm", "start"]
   Ý nghĩa: Lệnh khởi chạy ứng dụng khi container bắt đầu hoạt động.

Chi tiết: Khác với lệnh RUN (chạy ngay trong quá trình build để tạo ra Image), lệnh CMD chỉ thực sự chạy khi ai đó dùng Image này để dựng lên một Container thực tế. Nó tương đương với việc bạn mở terminal lên gõ npm start để kích hoạt file app.js chạy và giữ cho server web luôn hoạt động.

💡 Một bí mật cực hay: Tại sao lại tách đôi việc COPY?
Bạn có thắc mắc tại sao Docker không gộp chung lại thành một dòng copy duy nhất cho gọn như thế này không?

Dockerfile

# Viết gộp kiểu này (KHÔNG KHUYẾN KHÍCH):

COPY . .
RUN npm install
Lý do nằm ở cơ chế Caching (Bộ nhớ đệm) của Docker:

Quá trình tải thư viện (npm install) thường mất rất nhiều thời gian (khoảng 1 - 2 phút hoặc lâu hơn). Trong khi đó, việc bạn thay đổi code trong file app.js lại diễn ra liên tục mỗi phút.

Docker rất thông minh: Khi bạn chạy lệnh build lại Image, nó sẽ so sánh xem file nào có sự thay đổi. Nếu bạn chỉ sửa code trong app.js mà không thêm bớt thư viện nào trong package.json:

Docker sẽ nhận thấy file package\*.json ở Bước 3 không hề thay đổi.

Nó sẽ bỏ qua (Sử dụng Cache) toàn bộ Bước 4 (RUN npm install) mà không cần tải lại thư viện.

Nó nhảy thẳng đến Bước 5 để copy đè code mới vào. Quá trình build lại lúc này chỉ mất vỏn vẹn 0.5 giây thay vì bắt bạn ngồi đợi tải lại thư viện từ đầu!

Đây gọi là kỹ thuật tối ưu hóa Dockerfile bằng cách phân tầng layer, một kiến thức cực kỳ quan trọng khi làm việc thực tế với Docker!
3. Các bước để chạy lại sau khi sửa file
Sau khi đã sửa và lưu file docker-compose.yml:

Bạn tắt hẳn các container đang bị lỗi và dọn dẹp phân quyền cũ bằng cách gõ:

Bash
docker compose down -v
(Tham số -v cực kỳ quan trọng ở đây, nó sẽ xóa luôn cái Volume lỗi đang bị kẹt phân quyền cũ đi để Docker tạo lại cái mới sạch sẽ).

Khởi chạy lại hệ thống:

Bash
docker compose up
