exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const checkEmail = await userService.checkEmail(email);
    if(checkEmail){
        const err =  new Error("Email da ton tai!");
        err.statusCode = 400;
        next(err)
    }
    const passwordHash = 
    const data = await userService.register(username, email, passwordHash);
    res
      .status(200)
      .json({
        status: "success",
        message: "Register successfully!",
        data: data,
      });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) =>{

}
