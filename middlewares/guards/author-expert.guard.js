const { sendErrorRes } = require("../../helpers/send_error_res");

module.exports = (req, res, next) => {
  try {
    if (!req.author.isExpert) {
      return res.status(403).send({
        message: `Ruxat etilmagan user. Siz exspert emas ekansiz`,
      });
    }
    next();
  } catch (error) {
    sendErrorRes(error, res);
  }
};
