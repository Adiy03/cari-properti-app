import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
    // ambil dari cookie
  const token = req.cookies.token

  // jika tdk authenctic
  if(!token) return res.status(401).json({message: "Not Authenticated"})

  // verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if(err) res.status(403).json({message: "Invalid Token"})

    req.userId = payload.id;

    next();
  })
}