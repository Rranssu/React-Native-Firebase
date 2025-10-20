import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import admin from "firebase-admin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const serviceAccount = path.join(__dirname, "key/key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.get("/", (req, res) => {
  res.send("Server is Running!\nTry adding /students in the URL!");
});

app.post("/students", async (req, res) => {
  try {
    const {firstName, lastName, course, year, age, phoneNumber} = req.body;
    const docRef = await db.collection("users").add({firstName, lastName, course, year, age, phoneNumber, createdAt: admin.firestore.Timestamp.now()});
    res.status(201).json({ id: docRef.id, firstName, lastName, course, year, age, phoneNumber, createdAt: admin.firestore.Timestamp.now() });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const {firstName, lastName, course, year, age, phoneNumber, createdAt: Date} = req.body;
    const docRef = await db.collection("users").doc(req.params.id).set({firstName, lastName, course, year, age, phoneNumber, createdAt: admin.firestore.Timestamp.now()}, { merge: true });
    res.status(201).json({ id: docRef.id, firstName, lastName, course, year, age, phoneNumber, createdAt: admin.firestore.Timestamp.now() });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const {firstName, lastName, course, year, age, phoneNumber, createdAt: Date} = req.body;
    const docRef = await db.collection("users").doc(req.params.id).delete({firstName, lastName, course, year, age, phoneNumber, createAt: admin.firestore.Timestamp.now()}, { merge: true });
    res.status(201).json({ id: docRef.id, firstName, lastName, course, year, age, phoneNumber, createdAt: admin.firestore.Timestamp.now() });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
});

app.get("/students", async (req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(port, () => console.log(` Server running on http://localhost:${port}`));

