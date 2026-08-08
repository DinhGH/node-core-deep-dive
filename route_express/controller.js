const {
  getAllUsers,
  getUserById,
  updateUser,
  updateUser1,
  deleteUser,
  createUser,
  checkEmail,
  getUserPagination,
  getUserDetailService,
  getuserfilterService,
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

async function getuserfilter(req, res, next) {
  try {
    const data = await getuserfilterService(req.query);
    return res.status(200).json({ status: "Success", data: data });
  } catch (err) {
    next(err);
  }
}

async function getuserbyid(req, res, next) {
  try {
    // const userid = req.params.id;
    const { id } = req.query;
    const data = await getUserById(id);
    if (data.length === 0) {
      const err = new Error();
      err.message = "Can not found this user in db";
      err.statusCode = 404;
      return next(err); // cach chuan de dung. no se goi ngay middleware va log loi, ko di xuong cath hay next(err) o duoi
      // throw err; //dung de nem ngoai le, no se di qua catch roi toi next(err). thuong dung o service de nem loi catch tu bat duoc
    }
    res
      .status(200)
      .json({ status: "success", results: data.length, data: data });
  } catch (err) {
    next(err); // cai nay chi duoc goi khi loi ket noi db, cau lenh sai, hay service throw new Error("");
  }
}

async function getUserDetail(req, res, next) {
  try {
    const id = req.params.id;
    const data = await getUserDetailService(id);
    if (data.length === 0) {
      const err = new Error();
      err.message = "USer not Found!";
      err.statusCode = 404;
      return next(err);
    }
    return res
      .status(200)
      .json({ status: "Success", results: data.length, data: data });
  } catch (err) {
    next(err);
  }
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
  getUserDetail,
  getuser,
  deleteuser,
  updateuser,
  getuserfilter,
  updateuser1,
};
