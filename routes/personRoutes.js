import express from "express";
import Person from "../models/person.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("Person saved successfully");
    res.status(200).json(response);
  } catch (err) {
    console.error("Error saving person:", err);
    res.status(500).json({ error: "Server Internal Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Persons fetched successfully");
    res.status(200).json(data);
  } catch (err) {
    console.error("Error fetching persons:", err);
    res.status(500).json({ error: "Server Internal Error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (["waiter", "manager", "chef"].includes(workType)) {
      const response = await Person.find({ work: workType });
      console.log("Persons fetched successfully");
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: "Invalid Work Type" });
    }
  } catch (err) {
    console.error("Error fetching persons by work type:", err);
    res.status(500).json({ error: "Server Internal Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      return res.status(404).json({ message: "Person not found" });
    }
    console.log("Person updated successfully");
    res.status(200).json(response);
  } catch (err) {
    console.error("Error updating person:", err);
    res.status(500).json({ error: "Server Internal Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ message: "Person not found" });
    }
    console.log("Person deleted successfully");
    res.status(200).json(response);
  } catch (err) {
    console.error("Error deleting person:", err);
    res.status(500).json({ error: "Server Internal Error" });
  }
});

export default router;
