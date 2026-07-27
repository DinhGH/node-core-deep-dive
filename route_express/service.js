const mockDb = require("./mockDb");

exports.getAllPosts = async () => {
  return await mockDb.findAll();
};

exports.getPostById = async (id) => {
  const post = await mockDb.findById(id);
  if (!post) {
    const error = new Error(`Không tìm thấy bài viết với ID: ${id}`);
    error.statusCode = 404;
    throw error;
  }
  return post;
};
