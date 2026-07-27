const testdatacontroller = require("./controller.js");
const testdata = async (req, res) => {
  const { url, method } = req;
  if (url == "/api/testdata/getuser" && method == "GET") {
    return await testdatacontroller.getuser(req, res);
  }
  const match = url.match(/^\/api\/testdata\/getuser\/(\d+)$/);
  if (match && method == "GET") {
    const userid = match[1]; //math tra ve ["urlapi","id"] neu no match con ko tra ve null
    console.log(userid);
    console.log(typeof userid);

    return await testdatacontroller.getuser1(req, res, userid);
  }
  console.log("loi o day1");
  res.writeHead(400);
  res.end(JSON.stringify({ status: "error", message: "Not Found" }));
};

module.exports = testdata; // tra ve 1 ham testdata
// module.exports = {testdata}; //tra ve 1 list obj function, hien tai trong list chi co 1 ham
//{testdata: [AsyncFunction]}. muon goi thi tenbienimport.testdata() hoac const {testdata} = require(path)
