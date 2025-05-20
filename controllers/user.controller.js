const { sendErrorRes } = require("../helpers/send_error_res");
const bcrypt = require("bcrypt");
const { userValidation } = require("../validation/user.validation");
const User = require("../schemas/User");
const jwt = require("jsonwebtoken");
const { userJwt } = require("../services/jwt.service");
const config = require("config");
const uuid = require('uuid');
const mailService = require("../services/mail.service");

const create = async (req, res) => {
  try {
    const body = req.body;
    const { error, value } = userValidation(body);
    if (error) {
      return sendErrorRes(error, res);
    }
    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const activation_link = uuid.v4()

    const newAuthor = await User.create({
      ...value,
      password: hashedPassword,
    });

    const link = `${config.get(
          "api_url"
        )}/api/author/activate/${activation_link}`;

    await mailService.sendMail(value.email, link)
    res.status(201).send({ message: "New User added", newAuthor });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).send(user);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await User.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "User updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({ message: `Parol yoki email xato!` });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: `Parol yoki email xato!` });
    }

    const payload = {
      id: user._id,
      email: user.email,
      isActive: user.isActive,
    };
    // const token = jwt.sign(payload, config.get("userTokenKey"), {
    //   expiresIn: config.get("tokenExpTime"),
    // });

    const tokens = userJwt.generateTokens(payload);

    user.refreshToken = tokens.refreshToken;
    await user.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    res.status(201).send({
      message: `Tizimga xush kelibsiz ${user.name}`,
      id: user.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const logoutUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      res.status(400).send({ message: "Token topilmadi" });
    }
    const user = await User.findOneAndUpdate(
      { refreshToken },
      {
        refreshToken: "",
      },
      {
        new: true,
      }
    );
    if (!user) {
      res.status(400).send({ message: "Token notogri." });
    }

    res.clearCookie("refreshToken");
    res.send({ message: `You logged out` });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const refreshTokenUser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).send({ message: `Token topilmaid` });
    }

    await userJwt.verifyRefreshToken(refreshToken)
    const user = await User.findOne({ refreshToken });
    if(!user){
      return res.status(401).send({message: `User topilmadi`})
    }

    const payload = {
      id: user._id,
      email: user.email,
      isActive: user.isActive,
    };

    const tokens = userJwt.generateTokens(payload)
    user.refreshToken = tokens.refreshToken
    await user.save()

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });
    res.status(200).send({
      message: `Tokenlar yangilandi!`,
      id: user.id,
      accessToken: tokens.accessToken,
    });

  } catch (error) {
    sendErrorRes(error, res);
  }
};

const userActivate = async (req, res) => {
  try {
    const { link } = req.params;
    const user = await User.findOne({ activation_link: link });

    if (!user) {
      return res.status(400).send({ message: "User lionk notogri" });
    }
    if(user.isActive){
      return res.status(400).send({ message: "User Faollashtirilgan" });
    }
    user.isActive = true
    await user.save()

    res.send({message: `User faollashtirildi`})
  } catch (error) {
    sendErrorRes(error, res);
  }
};


module.exports = {
  create,
  findAll,
  findOne,
  update,
  remove,
  loginUser,
  logoutUser,
  refreshTokenUser,
  userActivate,
};
