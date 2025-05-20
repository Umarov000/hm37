const { sendErrorRes } = require("../helpers/send_error_res");
const Author = require("../schemas/Author");
const { authorValidation } = require("../validation/author.validation");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const config = require("config");
const { authorJwt } = require("../services/jwt.service");
const uuid = require("uuid");
const mailService = require("../services/mail.service");

const create = async (req, res) => {
  try {
    const body = req.body;
    const { error, value } = authorValidation(body);
    if (error) {
      return sendErrorRes(error, res);
    }
    const hashedPassword = bcrypt.hashSync(value.password, 7);
    const activation_link = uuid.v4();

    const newAuthor = await Author.create({
      ...value,
      password: hashedPassword,
      activation_link,
    });
    const link = `${config.get(
      "api_url"
    )}/api/author/activate/${activation_link}`;

    await mailService.sendMail(value.email, link);
    res.status(201).send({ message: "New Author added", newAuthor });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const authors = await Author.find({});
    res.status(200).send(authors);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await Author.findById(id);
    res.status(200).send(author);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await Author.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Author updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await Author.findByIdAndDelete(id);
    res.status(200).send({ message: "Author deleted successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const author = await Author.findOne({ email });
    if (!author) {
      return res.status(401).send({ message: `Parol yoki email xato!` });
    }
    const validPassword = bcrypt.compareSync(password, author.password);
    if (!validPassword) {
      return res.status(401).send({ message: `Parol yoki email xato!` });
    }

    const payload = {
      id: author._id,
      email: author.email,
      isActive: author.isActive,
      isExpert: author.isExpert,
    };

    // const token = jwt.sign(payload, config.get("tokenKey"), {
    //   expiresIn: config.get("tokenExpTime"),
    // });

    const tokens = authorJwt.generateTokens(payload);

    author.refreshToken = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    //-------------------test error-------------------
    // try {
    //   setTimeout(function () {
    //     throw new Error("UncaughtException example");
    //   }, 1000);
    // } catch (error) {
    //   console.log(error);
    // }
    // new Promise((resolve, reject) => {
    //   reject(new Error("UnHandledRejection example"));
    // });
    //-------------------test error-------------------

    res.status(201).send({
      message: `Tizimga xush kelibsiz ${author.first_name}`,
      id: author.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const logoutAuthor = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi." });
    }
    const author = await Author.findOneAndUpdate(
      { refreshToken },
      {
        refreshToken: "",
      },
      {
        new: true,
      }
    );
    if (!author) {
      return res.status(400).send({ message: "Token notogri. " });
    }

    res.clearCookie("resreshToken");
    res.send({ message: `You logged out` });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const refreshTokenAuthor = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi." });
    }
    await authorJwt.verifyRefreshToken(refreshToken);
    const author = await Author.findOne({ refreshToken });
    if (!author) {
      return res.status(401).send({ message: `refresh token topilmaid! ` });
    }
    const payload = {
      id: author._id,
      email: author.email,
      isActive: author.isActive,
      isExpert: author.isExpert,
    };
    const tokens = authorJwt.generateTokens(payload);
    author.refreshToken = tokens.refreshToken;
    await author.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });
    res.status(201).send({
      message: `Tokenlar yangilandi!`,
      id: author.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const authorActivate = async (req, res) => {
  try {
    const { link } = req.params;
    const author = await Author.findOne({ activation_link: link });

    if (!author) {
      return res.status(400).send({ message: "Avtor lionk notogri" });
    }
    if(author.isActive){
      return res.status(400).send({ message: "Avval Faollashtirilgan" });
    }
    author.isActive = true
    await author.save()

    res.send({message: `Avtor faollashtirildi`})
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
  loginAuthor,
  logoutAuthor,
  refreshTokenAuthor,
  authorActivate,
};
