const redis = require("redis");

// 1. Tạo một Client để kết nối với Redis Server đang chạy ở máy (localhost:6379)
const redisClient = redis.createClient({
  url: "redis://127.0.0.1:6379",
});

// Bắt các sự kiện kết nối để dễ theo dõi
redisClient.on("connect", () => console.log("🔄 Đang kết nối tới Redis..."));
redisClient.on("ready", () => console.log("✅ Redis đã sẵn sàng hoạt động!"));
redisClient.on("error", (err) => console.error("❌ Lỗi kết nối Redis:", err));

// Hàm giả lập việc gọi API thời tiết (mất 1.5 giây)
function fetchWeatherFromExternalAPI(city) {
  return new Promise((resolve) => {
    console.log(
      `🐢 [API] Đang cào dữ liệu từ vệ tinh cho thành phố: ${city}...`,
    );
    setTimeout(() => {
      resolve({
        city: city,
        temperature: "32°C",
        condition: "Nắng nóng rực rỡ",
        updatedAt: new Date().toLocaleTimeString(),
      });
    }, 1500); // Giả lập mạng chậm 1.5 giây
  });
}

// Hàm chính xử lý logic Cache với Redis
async function getWeather(city) {
  // Định nghĩa cái "Key" để lưu trong Redis, ví dụ: "weather:hanoi"
  const cacheKey = `weather:${city.toLowerCase()}`;

  try {
    // Lấy dữ liệu từ Redis ra xem có chưa
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      console.log(`⚡ [CACHE HIT] Tìm thấy trong Redis! Trả kết quả ngay.`);
      // Vì Redis chỉ lưu chuỗi (String), nên ta phải parse nó ngược thành Object dạng JSON
      return JSON.parse(cachedData);
    }

    // Nếu KHÔNG tìm thấy trong Redis (Cache Miss) -> Phải đi gọi API gốc
    console.log(
      `⚠️ [CACHE MISS] Không có trong Redis. Phải gọi API bên ngoài...`,
    );
    const weatherData = await fetchWeatherFromExternalAPI(city);

    // Lưu kết quả này vào Redis để lần sau dùng lại
    // EX: 600 nghĩa là dữ liệu này sẽ tự động biến mất (Hết hạn/TTL) sau 600 giây (10 phút)
    await redisClient.set(cacheKey, JSON.stringify(weatherData), {
      EX: 600,
    });

    return weatherData;
  } catch (error) {
    console.error("Lỗi khi xử lý dữ liệu:", error);
  }
}

// Kịch bản chạy thử nghiệm
async function main() {
  // Kết nối tới server Redis trước khi chạy lệnh
  await redisClient.connect();

  console.log("\n--- 🔴 LẦN TRUY CẬP ĐẦU TIÊN (Hà Nội) ---");
  console.time("Thời gian phản hồi");
  const data1 = await getWeather("Hanoi");
  console.log("Kết quả:", data1);
  console.timeEnd("Thời gian phản hồi"); // Sẽ tốn ~1.5 giây

  console.log("\n--- 🟢 LẦN TRUY CẬP THỨ HAI (Hà Nội - Ngay sau đó) ---");
  console.time("Thời gian phản hồi");
  const data2 = await getWeather("Hanoi");
  console.log("Kết quả:", data2);
  console.timeEnd("Thời gian phản hồi"); // Sẽ tốn ~0 mili giây!

  console.log("\n--- 🔵 LẦN TRUY CẬP THỨ BA (Thành phố khác: Đà Nẵng) ---");
  console.time("Thời gian phản hồi");
  const data3 = await getWeather("DaNang");
  console.log("Kết quả:", data3);
  console.timeEnd("Thời gian phản hồi"); // Lại tốn ~1.5 giây vì Đà Nẵng chưa được cache

  // Ngắt kết nối khi xong việc
  await redisClient.disconnect();
}

main();
