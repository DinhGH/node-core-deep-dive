# Bước 1: Sử dụng web server Nginx siêu nhẹ làm nền móng
FROM nginx:alpine

# Bước 2: Chép file index.html từ máy bạn vào đúng thư mục chứa web của Nginx trong container
COPY index.html /usr/share/nginx/html/index.html

# Bước 3: Nginx mặc định chạy ở cổng 80, ta thông báo cổng này ra ngoài
EXPOSE 80