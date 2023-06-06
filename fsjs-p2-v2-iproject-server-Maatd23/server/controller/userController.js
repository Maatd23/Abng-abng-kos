const { comparePassword } = require("../helper/hasing");
const { encodeToken } = require("../helper/token");
const { User, Transaction, Kosan } = require("../models/");
const midtransClient = require("midtrans-client");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) throw { name: "email_required" };
      if (!password) throw { name: "password_required" };
      const user = await User.findOne({ where: { email } });
      if (!user) throw { name: "wrong" };
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) throw { name: "wrong" };
      const token = encodeToken({ id: user.id });
      res
        .status(200)
        .json({ access_token: token, email: user.email, role: user.role });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { name, email, password, phoneNumber, address } = req.body;
      const user = await User.create({
        name,
        email,
        password,
        role: "Costumer",
        phoneNumber,
        address,
      });
      res.status(201).json({
        message: `user with email ${user.email} has been created`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async registerOwner(req, res, next) {
    try {
      const { name, email, password, phoneNumber, address } = req.body;
      const user = await User.create({
        name,
        email,
        password,
        role: "owner",
        phoneNumber,
        address,
      });
      res.status(201).json({
        message: `user with email ${user.email} has been created`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addTransaction(req, res, next) {
    try {
      const UserId = req.user.id;
      const KosanId = req.body.KosanId;
      let transaction = await Transaction.create({ UserId, KosanId });
      res.status(201).json({
        message: "success added please continue to process",
        id: transaction.id,
      });
    } catch (err) {
      next(err);
    }
  }
  static async getTrasaction(req, res, next) {
    try {
      const UserId = req.user.id;
      let transaction = await Transaction.findAll({
        where: {
          UserId,
          isPay: false,
        },
        include: {
          model: Kosan,
          include: {
            model: User,
            attributes: ["email", "name", "id"],
          },
        },
      });
      res.status(201).json(transaction);
    } catch (err) {
      next(err);
    }
  }
  static async gotPayed(req, res, next) {
    try {
      const id = req.params.id;
      let transaction = await Transaction.findOne(id);
      if (!transaction) throw { name: "NotFound" };
      await transaction.update({ isPay: true });
      res.status(201).json(transaction);
    } catch (err) {
      next(err);
    }
  }
  static async generetToken(req, res, next) {
    try {
      console.log(req.user);
      const user = await User.findByPk(req.user.id);
      const price = req.body.price;
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_KEY,
      });
      let parameter = {
        transaction_details: {
          order_id: `Transection` + Math.floor(1000000 + Math.random() * 12345),
          gross_amount: price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: user.name,
          email: user.email,
        },
      };
      const midtras_token = await snap.createTransaction(parameter);
      res.status(200).json(midtras_token);
    } catch (err) {
      next(err);
    }
  }
  static async google(req, res, next) {
    try {
      let google_token = req.headers.google_token;

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userid = payload["sub"];
      let password = String(Math.random());
      console.log(password);
      let [user, isCreated] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password,
          role: "Staff",
        },
      });
      let payload_access_token = {
        id: user.id,
      };
      let access_token = encodeToken(payload_access_token);
      res
        .status(200)
        .json({ access_token, email: user.email, role: user.role });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = UserController;
