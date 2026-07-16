const fs = require("fs");

// Paused mode example
const readableStream = fs.createReadStream("myfile.txt", {
  encoding: "utf8",
  highWaterMark: 64 * 1024, // 64KB chunks
});

// Manually consume the stream using read()
readableStream.on("readable", () => {
  let chunk;
  while (null !== (chunk = readableStream.read())) {
    console.log(`Read ${chunk.length} bytes of data.`);
    console.log(chunk);
  }
});

readableStream.on("end", () => {
  console.log("No more data to read.");
});
