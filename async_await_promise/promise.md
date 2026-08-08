1. Promise.all() – Chạy song song & Đợi TẤT CẢ (Rất hay dùng)
   Ý nghĩa:
   Cho phép chạy nhiều Promise cùng một lúc. Nó chỉ trả về kết quả khi TẤT CẢ các Promise đều thành công (fulfilled). Nếu có bất kỳ 1 Promise nào bị lỗi (rejected), nó sẽ ngắt ngay lập tức và quăng lỗi vào khối catch.
2. Promise.allSettled() – Chạy song song & Đợi XONG HẾT (Dù thành công hay thất bại)
   Ý nghĩa:
   Giống Promise.all ở chỗ chạy song song, nhưng KHÔNG bị hủy nếu có lỗi. Nó sẽ đợi tất cả các Promise chạy xong hoàn toàn, sau đó trả về mảng kết quả kèm trạng thái (status: 'fulfilled' hoặc status: 'rejected').
   Ứng dụng thực tế:
   Gửi email thông báo hoặc notification cho 100 người dùng cùng lúc. Nếu 5 người bị lỗi sai email, 95 người còn lại vẫn nhận được bình thường.
3. Promise.race() – Ai nhanh hơn thì lấy (Đua tốc độ)
   Ý nghĩa:
   Cho các Promise "chạy đua" với nhau. Promise nào hoàn thành đầu tiên (dù Thành công hay Thất bại) thì Promise.race() sẽ lấy ngay kết quả của Promise đó và bỏ qua các Promise còn lại.
   Ứng dụng thực tế:
   Làm tính năng Timeout cho API / DB Query (Ngắt request nếu Database xử lý quá lâu).
4. Promise.any() – Lấy kết quả THÀNH CÔNG đầu tiênÝ nghĩa:Khá giống Promise.race(), nhưng nó chỉ quan tâm đến Promise THÀNH CÔNG đầu tiên.Nếu có 1 Promise thành công $\rightarrow$ Lấy luôn kết quả đó.Nếu tất cả các Promise đều thất bại $\rightarrow$ Nó mới quăng ra lỗi chung (AggregateError).Ứng dụng thực tế:Gửi request đến 3 Server Mirror (máy chủ dự phòng) khác nhau để lấy dữ liệu. Chỉ cần 1 server phản hồi thành công trước là lấy luôn, bỏ qua 2 server kia.
