const createError = require("http-errors");
const bycrypt = require("bcryptjs");
const passport = require("passport");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../../config/config.json")[
  process.env.NODE_ENV || "development"
];

// Models
const User = require("../../models/User");

// Middlewares
const { asyncHandler } = require("../../middlewares/errorHandlers");

// Helpers
const { sendSuccessResponse } = require("../../helpers/helpers");

const { createUserValidator } = require("../../validators/userValidators");

let users = (module.exports = {});

/**
 * Create a new User.
 *
 * @name create a new user
 * @route {POST} /user/create
 */

users.create = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const userDataCopy = req.body;

  // Check if the user already exists
  const isUserExists = await User.find({ email: email });

  if (isUserExists.length > 0) {
    throw createError.Conflict("This email   is already in use");
  }

  // Validate the data
  const validateData = await createUserValidator.validateAsync(userDataCopy);

  // Change the data type of pincode
  if (req.body.address !== undefined) {
    req.body.address.pincode = parseInt(req.body.address.pincode);
  }

  // Hash Password
  bycrypt.genSalt(10, (err, salt) => {
    bycrypt.hash(password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      req.body.password = hashedPassword;
      // Save the user
      const user = new User(req.body);
      const savedUser = await user.save();

      savedUser.password = undefined; //remove field

      // Login into the account
      passport.authenticate("login", async (err, user, info) => {
        try {
          req.login(user, { session: false }, async (err) => {
            if (err) next(err);

            const body = { _id: user._id, email: user.email };

            const token = jwt.sign({ user: body }, config.secret);

            let options = {
              maxAge: 1000 * 60 * 15, // would expire after 15 minutes
              httpOnly: false, // The cookie only accessible by the web server
              signed: true, // Indicates if the cookie should be signed
            };

            res.cookie("token", token, options);

            return res.send({
              success: true,
              payload: {
                message: "Account created successfully...",
                token: token,
                user: savedUser,
              },
            });
          });
        } catch (err) {
          next(err);
        }
      })(req, res, next);
    });
  });
});

/**
 * Login User
 *
 * @name login user
 * @route {POST} /user/login
 */

users.login = asyncHandler(async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const err = createError(401, "Incorrect Credentials");
        return next(err);
      }

      req.login(user, { session: false }, async (err) => {
        if (err) next(err);

        const body = { _id: user._id, email: user.email };

        const token = jwt.sign({ user: body }, config.secret);

        // Get the user data
        const userData = await User.findOne({ _id: user._id }, { password: 0 });

        let options = {
          maxAge: 1000 * 60 * 43200, // would expire after 30 days
          httpOnly: false, // The cookie only accessible by the web server
          signed: true, // Indicates if the cookie should be signed
        };

        res.cookie("token", token, options);

        return res.json({
          success: true,
          payload: { token, user: userData },
        });
      });
    } catch (err) {
      next(err);
    }
  })(req, res, next);
});

// User Logout
users.logout = asyncHandler(async (req, res, next) => {
  req.logout();
  res.send(sendSuccessResponse({ message: "Logged out successfully" }));
});

users.me = asyncHandler(async (req, res, next) => {
  const userData = await User.find({ _id: req.user._id });

  res.send(sendSuccessResponse({ user: userData }));
});

users.addShip = asyncHandler(async (req, res, next) => {
  const userData = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $addToSet: { ships: { $each: req.body.ships } } }
  );

  const newUserData = await User.find({ _id: req.user._id });

  res.send(
    sendSuccessResponse({ message: "Added successfully", user: newUserData })
  );
});
