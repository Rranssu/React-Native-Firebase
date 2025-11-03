import express from "express";
import { db } from "../firebase.js";

const router = express.Router();
const usersCollection = db.collection("users");

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const newUser = {
      email,
      password,
      registeredAt: new Date(),
    };

    const docRef = await usersCollection.add(newUser);
    res.status(201).json({ id: docRef.id, message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/users", async (req, res) => {
  try {
    const allUsers = await usersCollection
      .select("email", "registeredAt")
      .orderBy("registeredAt", "asc")
      .get();

    const userArray = [];

    allUsers.forEach((doc) => {
      const data = doc.data();
      const formattedDate = data.registeredAt.toDate().toLocaleString();
      userArray.push({
        id: doc.id,
        email: data.email,
        registeredAt: formattedDate,
      });
    });

    res.status(200).json(userArray);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
