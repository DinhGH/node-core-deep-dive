const mockDB = require("./mockDB.js");
const getuserservice = async () => {
  return await mockDB.findAllUser();
};

const getuserservice1 = async (id) => {
  const user = await mockDB.findById(id);
  if (!user) {
    const error = new Error(`Không tìm thấy user với ID: ${id}`);
    error.statusCode = 404;
    throw error;
  }
  // neu ko cat nem loi cho nay, thi khi qua controller no gui ve status 200, nhung res.end loi o data: undefied nen no nem loi o catch,
  //o do co status 500 nen bao loi Error [ERR_HTTP_HEADERS_SENT]: Cannot write headers after they are sent to the client
  return user;
};

module.exports = { getuserservice1, getuserservice };
