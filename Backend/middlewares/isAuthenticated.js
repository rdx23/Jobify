import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated.",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.status(401).json({
        message: "Invalid token payload.",
        success: false,
      });
    }

    req.id = decode.userId; // Attach userId to request
    next();
  } catch (error) {
    console.error("Authentication middleware error:", error);
    return res.status(401).json({
      message: "Invalid or expired token.",
      success: false,
    });
  }
};

export default isAuthenticated;
