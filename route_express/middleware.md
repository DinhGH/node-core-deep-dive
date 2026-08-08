Middleware là gì?Middleware đơn giản là một hàm nằm ở giữa Request gửi lên và Response trả về (Req $\rightarrow$ Middleware $\rightarrow$ Res).Nó nhận vào 3 tham số: (req, res, next).Nếu middleware xử lý xong và muốn chuyển sang hàm tiếp theo (Controller hoặc Middleware khác), nó bắt buộc phải gọi next().Nếu phát hiện lỗi hoặc dữ liệu không hợp lệ, nó có thể chặn lại và trả về response ngay lập tức (res.status(...).json(...)).4 Dạng Middleware trong Express.jsExpress phân loại Middleware thành 4 dạng chính dựa trên phạm vi áp dụng và chức năng:Client Request ──► [ 1. Application-level ]
│
▼
[ 2. Router-level ]
│
▼
[ 3. Built-in / 3rd-party ]
│
▼
[ Controller / Route Handler ]
│
▼ (nếu có lỗi call next(err))
[ 4. Error-handling ] ──► Response Error

1. Application-level Middleware (Cấp ứng dụng)Khái niệm: Gắn trực tiếp vào app bằng app.use(). Mọi request đi vào server (bất kể URL hay Method nào) đều phải đi qua đây trước.
2. Router-level Middleware (Cấp Router)
   Khái niệm: Chỉ áp dụng cho một nhánh Route cụ thể hoặc một API endpoint nhất định. Thường dùng để Check Authentication / Authorization (xác thực) hoặc Validate dữ liệu.

Ví dụ thực tế: Trước khi cho phép tạo/sửa/xóa user, cần kiểm tra xem email và username có bị trống hay không (Validation). 3. Built-in & Third-party Middleware (Tích hợp sẵn & Thư viện ngoài)
Khái niệm:

Built-in: Do Express dựng sẵn (express.json(), express.urlencoded(), express.static()).

Third-party: Thư viện cài qua npm giúp giải quyết các bài toán phổ biến (CORS, Security Header, Upload file...).

Ví dụ thực tế:

cors: Cho phép Frontend (React/Vue) gọi API từ domain/port khác.

morgan: Thư viện log request chuyên nghiệp thay vì tự console.log.4. Error-handling Middleware (Xử lý lỗi tập trung)
Khái niệm: Đặc biệt nhất trong 4 loại. Nó bắt buộc phải nhận 4 tham số: (err, req, res, next).
Bất kỳ khi nào trong Controller/Service bạn gọi next(err) hoặc ném ra Exception, Express sẽ bỏ qua tất cả middleware thường và nhảy thẳng tới Error-handling Middleware này.

Giúp bạn không cần viết try-catch lặp đi lặp lại ở mọi controller để res status 500. 4. Error-handling Middleware (Xử lý lỗi tập trung)
Khái niệm: Đặc biệt nhất trong 4 loại. Nó bắt buộc phải nhận 4 tham số: (err, req, res, next).
Bất kỳ khi nào trong Controller/Service bạn gọi next(err) hoặc ném ra Exception, Express sẽ bỏ qua tất cả middleware thường và nhảy thẳng tới Error-handling Middleware này.

Giúp bạn không cần viết try-catch lặp đi lặp lại ở mọi controller để res status 500.

Thay vì mỗi middleware hoặc controller tự res.status(...).json(...) khi gặp lỗi, ta có thể gọi next(err) để chuyển lỗi cho Error Middleware xử lý tập trung. Đồng thời Express sẽ bỏ qua toàn bộ middleware/route còn lại của request đó.

co the goi bang throw new error, goi o controller, hay o mot middleware khac,
