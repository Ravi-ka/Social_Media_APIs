import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepository from "./user.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async signUp(req, res) {
    try {
      const { name, email, password, gender } = req.body;
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = { name, email, hashedPassword, gender };
      await this.userRepository.signUp(newUser);
      return res
        .status(201)
        .json({ result: "New user created", response: newUser });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: "Error",
        message: "Something went wrong! Please try again",
      });
    }
  }

  async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const checkEmail = await this.userRepository.findByEmail(email);
      if (!checkEmail) {
        return res.status(404).json({
          result: false,
          response: "User Not Found or Incorrect Credentials",
        });
      } else {
        const passwordMatch = await bcrypt.compare(
          password,
          checkEmail.hashedPassword
        );
        if (passwordMatch) {
          const token = jwt.sign(
            {
              userID: checkEmail._id,
              email: checkEmail.email,
            },
            process.env.JWT_SECRET,
            { algorithm: "HS256", expiresIn: "1h" }
          );
          res
            .status(201)
            .json({ result: "SignIn Successful", response: token });
        } else {
          return res.status(404).json({
            result: false,
            response: "User Not Found or Incorrect Credentials",
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        result: "Error",
        message: "Something went wrong! Please try again",
      });
    }
  }
}
