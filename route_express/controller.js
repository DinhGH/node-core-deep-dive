const {
  getAllUsers,
  getUserById,
  updateUser,
  updateUser1,
  deleteUser,
  createUser,
  checkEmail,
  getUserPagination,
} = require("./service.js");
const getuser = async (req, res, next) => {
  // const data = await getAllUsers();
  const { page, limit } = req.body;
  const data = await getUserPagination(page, limit);
  return res
    .status(200)
    .json({ status: "success", results: data.length, data: data });
};

async function createuser(req, res, next) {
  const { email } = req.body;
  const chkemail = await checkEmail(email);
  console.log(chkemail);
  if (chkemail) {
    return res
      .status(500)
      .json({ status: "Fail", message: "Email da ton tai!" });
  }
  const user = req.body;
  const data = await createUser(user);
  res
    .status(200)
    .json({ status: "Success", message: "Create user successfully!" });
}

async function getuserbyid(req, res, next) {
  // const userid = req.params.id;
  const { id } = req.query;
  const data = await getUserById(id);
  res.status(200).json({ status: "success", results: data.length, data: data });
}

async function updateuser(req, res, next) {
  // const {id ,username, email, password} = ;
  const id = req.params.id;
  const data = await updateUser(req.body, id);
  if (data === 0) {
    return res.status(404).json({ status: "fail", message: "User not found!" });
  }
  console.log(data);
  res.status(200).json({ status: "Success", message: "Update user completed" });
}

async function updateuser1(req, res, next) {
  const id = req.params.id;
  const data = await updateUser1(req.body, id);
  if (data === 0) {
    return res.status(404).json({ status: "Fail", message: "User not found!" });
  }
  res.status(200).json({ status: "Success", message: "Update user completed" });
}
async function deleteuser(req, res, next) {
  const id = req.params.id;
  const data = await deleteUser(id);
  if (data === 0) {
    return res.status(404).json({ status: "Fail", message: "User not found" });
  }
  res
    .status(201)
    .json({ status: "Success", message: "Delete user successfully" });
}
module.exports = {
  createuser,
  getuserbyid,
  getuser,
  deleteuser,
  updateuser,
  updateuser1,
};
