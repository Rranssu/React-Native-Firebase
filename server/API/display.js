import express from "express";
import { db } from "../firebase.js";

const router = express.Router();

router.get("/students", async (req, res) => {
  try {
    const snapshot = await db.collection("students").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

router.get("/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("students").doc(id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "students not found" });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

router.get("/students/course/:course/:level", async (req, res) => {
  try {
    const { course, level } = req.params;
    const yearMap = { "1st": "1", "2nd": "2", "3rd": "3", "4th": "4" };
    const year = yearMap[level.toLowerCase()];

    if (!year) {
      return res.status(400).json({ error: "Invalid year level. Use 1st, 2nd, 3rd, or 4th." });
    }

    const snapshot = await db
      .collection("students")
      .where("course", "==", course.toUpperCase())
      .where("year", "==", year)
      .get();

    const students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch filtered students" });
  }
});

router.get("/students/year/:level", async (req, res) => {
  try {
    const { level } = req.params;
    const yearMap = { "1st": "1", "2nd": "2", "3rd": "3", "4th": "4" };
    const year = yearMap[level.toLowerCase()];

    if (!year) {
      return res.status(400).json({ error: "Invalid year level. Use 1st, 2nd, 3rd, or 4th." });
    }

    const snapshot = await db.collection("students").where("year", "==", year).get();
    const students = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students by year" });
  }
});

router.get("/students/:field/:order", async (req, res) => {
  try {
    const { field, order } = req.params;
    const validOrders = ["asc", "desc"];

    if (!validOrders.includes(order.toLowerCase())) {
      return res.status(400).json({ error: "Order must be 'asc' or 'desc'" });
    }

    const snapshot = await db
      .collection("students")
      .orderBy(field, order.toLowerCase())
      .get();

    const sorted = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(sorted);
  } catch (error) {
    res.status(500).json({ error: "Failed to sort students" });
  }
});

export default router;
