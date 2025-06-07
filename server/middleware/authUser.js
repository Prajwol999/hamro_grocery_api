import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.SECRET);
    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id }; // Attach user info to request object
      next();
    } else {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
