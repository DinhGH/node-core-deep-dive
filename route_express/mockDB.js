const POSTS = [
  {
    id: 1,
    title: "Hướng dẫn Node.js thuần",
    content: "Nội dung bài 1...",
    author: "DevA",
  },
  {
    id: 2,
    title: "Tìm hiểu Express.js",
    content: "Nội dung bài 2...",
    author: "DevB",
  },
];

module.exports = {
  // Giả lập truy vấn bất đồng bộ (async/await) như DB thật
  findAll: async () => POSTS,
  findById: async (id) => POSTS.find((post) => post.id === Number(id)),
};
