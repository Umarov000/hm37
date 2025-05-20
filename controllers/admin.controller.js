const { sendErrorRes } = require("../helpers/send_error_res");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { adminValidation } = require("../validation/admin.validation");
const Admin = require("../schemas/Admin");
const { adminJwt } = require("../services/jwt.service");
const uuid = require('uuid');
const mailService = require("../services/mail.service");

const create = async (req, res) => {
  try {
    const body = req.body;
    const { error, value } = adminValidation(body);
    if (error) {
      return sendErrorRes(error, res);
    }
    const hashedPassword = bcrypt.hashSync(value.password, 7);

    const activation_link = uuid.v4()

    const newAdmin = await Admin.create({
      ...value,
      password: hashedPassword,
    });

    const link = `${config.get(
          "api_url"
        )}/api/admin/activate/${activation_link}`;
    
        await mailService.sendMail(value.email, link);
    res.status(201).send({ message: "New Admin added", newAdmin });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.status(200).send(admins);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    res.status(200).send(admin);
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    await Admin.findByIdAndUpdate(id, body);
    res.status(200).send({ message: "Admin updated successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await Author.findByIdAndDelete(id);
    res.status(200).send({ message: "Admin deleted successfully" });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).send({ message: `Parol yoki email xato!` });
    }
    const validPassword = bcrypt.compareSync(password, admin.password);
    if (!validPassword) {
      return res.status(401).send({ message: `Parol yoki email xato!` });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      isActive: admin.isActive,
      isCreator: admin.isCreator,
    };

    let tokens = adminJwt.generateTokens(payload);

    // const token = jwt.sign(payload, config.get("adminTokenKey"), {
    //   expiresIn: config.get("tokenExpTime"),
    // });

    admin.refreshToken = tokens.refreshToken;
    await admin.save();

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    res.status(201).send({
      message: `Tizimga xush kelibsiz ${admin.first_name}`,
      id: admin.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi." });
    }

    const admin = await Admin.findOneAndUpdate(
      { refreshToken },
      {
        refreshToken: "",
      },
      {
        new: true,
      }
    );

    if (!admin) {
      return res.status(400).send({ message: "Token notogri. " });
    }
    res.clearCookie("refreshToken");
    res.send({ message: `You logged out` });
  } catch (error) {
    sendErrorRes(error, res);
  }
};

const refreshTokenAdmin = async (req, res) => {
  try {
    let { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi." });
    }
    await adminJwt.verifyRefreshToken(refreshToken);
    const admin = await Admin.findOne({ refreshToken });
    if (!admin) {
      return res.status(401).send({ message: `refresh token topilmaid! ` });
    }



    const payload = {
      id: admin._id,
      email: admin.email,
      isActive: admin.isActive,
      isCreator: admin.isCreator,
    };
    const tokens = adminJwt.generateTokens(payload);
    admin.refreshToken = tokens.refreshToken;
    await admin.save();
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.get("cookie_refresh_time"),
    });

    res.status(201).send({
      message: `Tokenlar yangilandi!`,
      id: admin.id,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    sendErrorRes(error, res)
    
  }
};
const adminActivate = async (req, res) => {
  try {
    const { link } = req.params;
    const admin = await Admin.findOne({ activation_link: link });

    if (!admin) {
      return res.status(400).send({ message: "Admin lionk notogri" });
    }
    if(admin.isActive){
      return res.status(400).send({ message: "Admin Faollashtirilgan" });
    }
    admin.isActive = true
    await user.save()

    res.send({message: `Admin faollashtirildi`})
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
  loginAdmin,
  logoutAdmin,
  refreshTokenAdmin,
  adminActivate,
};
