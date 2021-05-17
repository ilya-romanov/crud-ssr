const users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const e = require("express");
const log = console.log;

const loginLanding = async (req, res) => {
  try {
    res.status(200).render("login", { response: "No responses yet !", exp: '∞'});
  } catch (e) {
    res.status(404).render("error", {
      response: "Can not serve the login landing page: " + e.message, exp: 0
    });
  }
};
const login = async (req, res) => {
  try {
    /* tests */
    if (!req.body.email || !req.body.password) throw new Error("please provide credentials");
    const userFromDb = await users.readOne(req.body.email);
    if (userFromDb === null) throw new Error('user not found');
    if ( !userFromDb.approved ) throw new Error('user not approved');
    if ( !await bcrypt.compare(req.body.password, userFromDb.password)) throw new Error('wrong password');

    /* tests passed, create jwt */
    const token = await jwt.sign({ email: userFromDb.email }, process.env.JWT_SECRET, { expiresIn: 60 });
    res.cookie("token", token, { httpOnly: true, maxAge: 60000 }); /* ms */
    res.render("login", { response: token , exp: 60});

  } catch (e) {
    res
      .status(401)
      .render("error", { response: "Invalid login details: " + e.message, exp: 0 });
  }
};

const registerLanding = async (req, res) => {
  try {
    res.status(200).render("register", { response: "No responses yet !", exp: '∞' });
  } catch (e) {
    res.status(404).render("error", {
      response: "Can not serve the register landing page: " + e.message, exp: 0
    });
  }
};
const register = async (req, res) => {
  try {
    res.status(200).render("register", {
      response: await users.createOne(req.body.email, req.body.password, req.body.approved), exp: '∞'
    });
  } catch (e) {
    res
      .status(404)
      .render("error", { response: "Invalid register details: " + e.message, exp: 0 });
  }
};

module.exports = {
  loginLanding,
  login,
  registerLanding,
  register,
};
