import express from "express";
import admin from "firebase-admin";
import { db } from "../firebase.js";

const router = express.Router();

router.put("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = { ...req.body, updatedAt: admin.firestore.Timestamp.now() };
    await db.collection("students").doc(id).set(data, { merge: true });
    res.json({ id, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.delete("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("students").doc(id).delete();
    res.json({ id, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
