export const test = (req, res, next) => {
  res.json({ message: "api is working" });
};

export const signout = async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie("connect.sid");
      res.status(200).json("User has been signed out");
    });
  } catch (error) {
    next(error);
  }
};
