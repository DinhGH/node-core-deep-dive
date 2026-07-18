Các bước thực hiện DemoHãy tạo một thư mục trống trên máy tính của bạn (ví dụ đặt tên là docker-demo) và mở nó bằng bất kỳ trình soạn thảo code nào (như VS Code).1.Tạo file giao diện Web (index.html):Bước 1.Tạo một file tên là index.html và dán đoạn mã HTML đơn giản này vào:HTML

    Docker Demo




        🐳 Hello Docker!
        Ứng dụng web này đang chạy hoàn toàn bên trong một Docker Container!

2.Tạo công thức đóng gói (Dockerfile):Bước 2.Tạo một file tên chính xác là Dockerfile (không có đuôi file như .txt hay .docker) nằm chung thư mục với file index.html ở trên. Dán 3 dòng này vào:Dockerfile# Bước 1: Sử dụng web server Nginx siêu nhẹ làm nền móng
FROM nginx:alpine

# Bước 2: Chép file index.html từ máy bạn vào đúng thư mục chứa web của Nginx trong container

COPY index.html /usr/share/nginx/html/index.html

# Bước 3: Nginx mặc định chạy ở cổng 80, ta thông báo cổng này ra ngoài

EXPOSE 80
3.Build ra chiếc hộp đóng băng (Image):Bước 3.Mở Terminal (Command Prompt hoặc PowerShell) ngay tại thư mục chứa 2 file trên và chạy lệnh sau để build: docker build -t my-first-docker-web .
(Chú ý có dấu chấm . ở cuối lệnh nhé, nó nghĩa là "hãy build ở thư mục hiện tại").Docker sẽ đọc file Dockerfile, tự tải Nginx Alpine về (nếu máy chưa có), chép file index.html vào và tạo ra một Image tên là my-first-docker-web.4.Kích hoạt chiếc hộp hoạt động (Container):Bước 4.Sau khi build xong, bạn gõ lệnh sau để chạy container: docker run -d -p 8080:80 --name web-container my-first-docker-web
Giải thích lệnh một chút:-d (detached): Chạy ngầm dưới nền để bạn vẫn dùng được terminal tiếp.-p 8080:80 (port): Ánh xạ cổng 8080 của máy thật vào cổng 80 của container.--name: Đặt tên cho container này dễ quản lý.
Bạn gõ -p 9000:80 -> Bạn sẽ vào web bằng địa chỉ localhost:9000.

Bạn gõ -p 7777:80 -> Bạn sẽ vào web bằng địa chỉ localhost:7777.
