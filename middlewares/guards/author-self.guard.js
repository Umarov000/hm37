const { sendErrorRes } = require("../../helpers/send_error_res");

module.exports = (req, res, next) => {
  try {
    if (req.params.id != req.author.id) {
      return res
        .status(403)
        .send({
          message: `Ruxat etilmagan user. Faqat shahiy malumotlarni korishi mumkin`,
        });
    }
    next()
  } catch (error) {
    sendErrorRes(error, res);
  }
};
