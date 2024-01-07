import jwt from "jsonwebtoken";

export default function jwtAuth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ result: "failed", response: "Unauthorized Token" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = payload.userID;
    req.email = payload.email;
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
  next();
}
