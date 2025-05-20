const jwt = require("jsonwebtoken");
const config = require("config");

const { sendErrorRes } = require("../../helpers/send_error_res");
const { userJwt } = require("../../services/jwt.service");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).send({ message: `unauthorized` });
    }
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];
    if (bearer !== "Bearer" || !token) {
      return res.status(401).send({ message: `Bearer token berilmagan` });
    }

    // const decodedPayload = jwt.verify(token, config.get("userTokenKey"));

    const decodedPayload = await userJwt.verifyAccessToken(token);
    req.user = decodedPayload;

    next();
  } catch (error) {
    sendErrorRes(error, res);
  }
};
