exports.onlyAdmin = async (req, res, next) => {
  try {
    const user = await req.user;

    if (user.role !== 1) {
      return res
        .status(401)
        .json({ message: "only Admin Can access this routes" });
    }
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
