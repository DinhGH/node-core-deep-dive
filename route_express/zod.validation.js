const { z } = require("zod");

//khai bao 1 chuan quy tac validate cho user
const createUserSchdema = z.object({
  username: z
    .string({
      required_error: "Username la bat buoc",
      invalid_type_error: "Username phai la chuoi",
    })
    .trim()
    .min(1, { message: "Username ko duoc de rong" }),
  email: z
    .string({ required_error: "Email la bat buoc" })
    .email({ message: "Email khong dung dinh dang" }),
  password: z
    .string({ required_error: "Password la bat buoc" })
    .min(8, { message: "Mat khau phai it nhat 8 ki tu" }),
});
//Hàm Middleware tổng quát dùng lại được cho MỌI Schema của Zod
//function validateSchema(schema){return function(req,res,next){}}
const validateSchedema = (schema) => (req, res, next) => {
  try {
    // parseSync / safeParse sẽ kiểm tra req.body theo schema
    const parsedData = schema.parse(req.body);
    // Gán lại dữ liệu đã sạch (đã trim/clean) vào req.body
    req.body = parsedData;
    next(); // Cho qua Controller
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);

      return res.status(400).json({
        status: "fail",
        errors: error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
    next(error);
  }
};

module.exports = { createUserSchdema, validateSchedema };
