import jwt from "jsonwebtoken"

export const shouldBeLoggedIn = async(req, res) => {
  
  // // ambil dari cookie
  // const token = req.cookies.token

  // // jika tdk authenctic
  // if(!token) return res.status(401).json({message: "Noat Authenticate"})

  // // verify token
  // jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
  //   if(err) res.status(403).json({message: "Invalid Token"})
  // })

  // // pass process
  res.status(200).json({message: "Authenticated"})
}


export const shouldBeAdmin = async(req, res) => {
  // ambil dari cookie
  const token = req.cookies.token

  // jika tdk authenctic
  if(!token) return res.status(401).json({message: "Noat Authenticate"})

  // verify token
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if(!payload.isAdmin) res.status(403).json({message: "Invalid Token"})
  })

  // pass process
  res.status(200).json({message: "Authenticated"})

}