import express from "express";
import admin from "firebase-admin";
import { db } from "../firebase.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, course, year, age, phoneNumber } = req.body;
    const docRef = await db.collection("students").add({
      firstName,
      lastName,
      course,
      year,
      age,
      phoneNumber,
      createdAt: admin.firestore.Timestamp.now(),
    });
    res.status(201).json({ id: docRef.id, message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to insert data" });
  }
});

export default router;
