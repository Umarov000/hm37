
const config = require("config");
const jwt = require("jsonwebtoken");

class JwtService {
  constructor(accessKey, refreshKey, accessTime, refreshTime) {
    this.accessKey = accessKey;
    this.refreshKey = refreshKey;
    this.accessTime = accessTime;
    this.refreshTime = refreshTime;
  }


  generateTokens(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });
    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token) {
    return jwt.verify(token, this.accessKey);
  }

  async verifyRefreshToken(token) {
    return jwt.verify(token, this.refreshKey);
  }
}


const authorJwt = new JwtService(
  config.get("access_key"),
  config.get("refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);

const userJwt = new JwtService(
  config.get("user.access_key"),
  config.get("user.refresh_key"),
  config.get("user.access_time"),
  config.get("user.refresh_time")
);

const adminJwt = new JwtService(
  config.get("admin.access_key"),
  config.get("admin.refresh_key"),
  config.get("admin.access_time"),
  config.get("admin.refresh_time")
);


module.exports = {
  authorJwt,
  userJwt,
  adminJwt,
};
