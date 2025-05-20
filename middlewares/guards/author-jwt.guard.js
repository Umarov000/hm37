const jwt = require("jsonwebtoken");
const config = require("config");

const { sendErrorRes } = require("../../helpers/send_error_res");
const { authorJwt} = require("../../services/jwt.service");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).send({ message: "Unauthorized" });
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.status(401).send({ message: "Bearer token berilmagan" });
    }

    const decodedPayload = await authorJwt.verifyAccessToken(token);
    req.author = decodedPayload;

    next();
    
  } catch (error) {
    sendErrorRes(error, res); // Убедитесь, что эта функция есть
  }
};
