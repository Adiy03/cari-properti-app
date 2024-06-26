import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt"

export const getUsers = async (req, res) => {
  try {
    // console.log("it works")
    const users = await prisma.user.findMany();
    res.status(200)
      .json(users)
  } catch (err) {
    console.log(err);
    res.status(500)
      .json({ message: "Failed to get Users" })
  }
}

export const getUser = async (req, res) => {

  // ambil id
  const id = req.params.id;
  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });
    res.status(200)
      .json(user)
  } catch (err) {
    console.log(err);
    res.status(500)
      .json({ message: "Failed to get User" })
  }
}

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" })
  }

  let updatedPassword = null;

  try {

    // jika ada password, di hash dulu
    if (password) {
      updatedPassword = await bcrypt.hash(password, 4)
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      }
    })

    const {password:userPassword, ...rest} = updatedUser
    res.status(200).json(rest)
  } catch (err) {
    console.log(err);
    res.status(err)
      .json({ message: "Failed to Update" })
  }
}

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized!" })
  }

  try {
    await prisma.user.delete({
      where:{id}
    })
    res.status(200).json({message: "user deleted"})
  } catch (err) {
    console.log(err);
    res.status(err)
      .json({ message: "Failed to Delete Users" })
  }
}