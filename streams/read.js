const fs = require("fs");

// Create a readable stream from a file
const readableStream = fs.createReadStream("output.txt", {
  encoding: "utf8",
  highWaterMark: 5 * 1024, // 5KB chunks
});

// Events for readable streams
readableStream.on("data", (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
  console.log(chunk);
  console.log("---------------");
});

readableStream.on("end", () => {
  console.log("No more data to read.");
});

readableStream.on("error", (err) => {
  console.error("Error reading from stream:", err);
});
