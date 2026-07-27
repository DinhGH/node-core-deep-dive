const { getAllPosts, getPostById } = require("./service.js");
const getpost = async (req, res, next) => {
  const data = await getAllPosts();
  res.status(200).json({ status: "success", results: data.length, data: data });
};

async function getpostbyid(req, res, next) {
  const postid = req.params.id;
  const data = await getPostById(postid);
  res.status(200).json({ status: "success", results: data.length, data: data });
}

module.exports = { getpost, getpostbyid };
