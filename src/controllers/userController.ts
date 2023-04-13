import { Request, Response } from "express";

// for now will keep it like this
const isValidCountry = (
  value: any,
  helpers: { error: (arg0: string) => any }
) => {
  if (!value || typeof value !== "string") {
    return helpers.error("any.invalid");
  }

  const countryCode = countries.getAlpha2Code(value, "en");

  if (!countryCode) {
    return helpers.error("any.invalid");
  }

  return countryCode;
};


export const register = async (req: Request, res: Response) => {
  try {
    let {
      email,
      password,
      firstname,
      lastname,
      gender,
      usertype,
      country,
      city,
      postalcode,
      language,
      dateofbirth,
    } = req.body;
    password = password.trim();
    }
    //Check to see if email exist in the databse
    const user_email = await User.findOne({ email });
    if (user_email) {
      return res
        .status(400)
        .json({ message: "The email is already registerd" });
    }

    password = await bcrypt.hash(password, 12);
    console.log("hashed", password);

    // Create a new user in the database with the hashed password
    const registerUser = await User.create({
      email,
      password,
      firstname,
      lastname,
      gender,
      usertype,
      country,
      city,
      postalcode,
      language,
      dateofbirth,
    });
    const access_token = createAccessToken({
      id: registerUser._id.toString(),
      email: registerUser.email,
      role: registerUser.role,
    });
    console.log(registerUser._doc["password"]);
    delete registerUser._doc["password"];
    res.status(200).json({
      status: "success",
      message: "Registration Successfully",
      access_token,
      user: {
        ...registerUser._doc,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "unknown",
      message: err.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    const user = await User.findOne({ email: email }).select("+password");
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Username and password can not be blank",
      });
    }


    res.status(200).json({
      status: "success",
      message: "You have been logged in!",
      access_token,
      user: {
        ...user._doc,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "unknown",
      message: err.message,
    });
  }
};
export const updateUser = async (req: CustomRequest, res: Response) => {
  try {
    const payload = req.body;
    const { error } = updateUserSchema.validate(payload);
    if (error && error.details) {
      return res.status(400).json({
        status: "failed",
        message: error.details[0].message,
      });
    }
    const authenticatedUser = req.user;
    let psw = "";
    if (payload.password) {
      psw = payload.password;
    }
    if (psw !== "") {
      payload.password = await bcrypt.hash(psw, 12);
    }
    await User.findByIdAndUpdate(authenticatedUser._id, payload);
    return res.status(200).send({ status: "success", message: "true" });
  } catch (error) {
    return res.status(500).json({
      status: "unknown",
      message: error.message,
    });
  }
};
