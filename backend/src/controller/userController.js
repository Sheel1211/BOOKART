import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";

export const userRegister = async (req, res) => {
  const { firstName, lastName, email, password, userType } = req.body;
  console.log(
    "firstName : ",
    firstName,
    "lastName : ",
    lastName,
    "email : ",
    email,
    "password : ",
    password,
    "userType: ",
    userType
  );

  if (!firstName || !lastName || !email || !password || !userType) {
    //console.log("in empty field");
    return res.status(433).json({ error: "please fill all the fields" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      //console.log("in user alredy exist");
      res.status(422).json({ error: "User Already Exist!" });
      return;
    } else {
      //console.log("in creating user");
      const user = new User({
        firstName,
        lastName,
        email,
        password,
        userType,
      });
      const userRegister = await user.save();
      if (userRegister) {
        //console.log("user created");
        return res.status(201).json({ user: userRegister });
      }
    }
  } catch (error) {
    console.log("in catch");
    console.log(error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(433).json({ error: "Please fill all the fields" });
    }

    console.log("in above finduser");
    const findUser = await User.findOne({ email: email }).select("+password");
    console.log("findUser", findUser);
    if (findUser) {
      console.log("In findUser");

      if (findUser.password) {
        console.log("password match or not?");
        const isMatch = await bcrypt.compare(password, findUser.password);
        if (isMatch) {
          console.log("password is matched");
          let token = await findUser.getJWTToken();

          res.cookie("jwt", token, {
            expires: new Date(Date.now() + 500000),
            httpOnly: false,
            secure: false,
          }).status(200).json(findUser);
        } else {
          res.status(422).json({ error: "Invalid Credentials!" });
        }
      } else {
        res.status(422).json({ error: "Invalid Credentials!" });
      }
    } else {
      res.status(422).json({ error: "Invalid Credentials!" });
    }
  } catch (error) {
    console.log(error);
  }
};
