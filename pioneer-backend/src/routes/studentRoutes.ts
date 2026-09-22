import express from "express";
import prisma from "../lib/prisma.js";
import * as Sentry from "@sentry/node";

const router = express.Router();

router.get("/all", async (req, res) => {

    const { id: userId } = req.user;

    try {

        const students = await prisma.student.findMany({
            where: {
                userId: userId
            }
        });

        return res.status(200).json({ students })
        
    } catch (error) {
        Sentry.captureException(error);
        console.error(error);
        res.status(500).json({ message: "Failed to get students"})
    }

});

router.get("/some/:id", async (req, res) => {

    const { id: studentId } = req.params;

    const { id: userId } = req.user;

    try {

        const student = await prisma.student.findFirst({
            where: {
                id: studentId,
                userId: userId
            }
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        return res.status(200).json({ message: "Student found successfully", student });
        
    } catch (error) {

        Sentry.captureException(error);

        console.error(error);

        return res.status(500).json({ message: "Failed to get student" });
        
    }

});

router.post("/add-student", async (req, res) => {

    const { name, address, phone, details } = req.body;
    const { id: userId } = req.user;

    if (!name || !address || !phone || !details) {
        return res.status(400).json({ message: "No input field should be empty" });
    }

    try {

        const studentAdded = await prisma.student.create({
            data: {
                name,
                address,
                phone, 
                details,
                userId: userId
            }
        });

        res.status(201).json({ message: "Student addedd successfully", name: studentAdded.name, address: studentAdded.address, phone: studentAdded.phone, details: studentAdded.details });
        
    } catch (error) {
        Sentry.captureException(error);
        console.error(error);
        return res.status(500).json({ message: `Failed to add new student` });
    }

});

router.delete("/delete/:id", async (req, res) => {

    const { id: userId } = req.user;
    const { id: studentId } = req.params;

    try {

        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        });

        if (!student || student.userId !== userId) {
            return res.status(404).json({ message: "The requested student does not exist"});
        }

        const studentRemoved = await prisma.student.delete({
            where: {
                id: studentId
            }
        });

        if (!studentRemoved) {
            return res.status(500).json({ message: "Failed to remove student" });
        }

        res.status(200).json({ message: "Student removed successfully" });
        
    } catch (error) {
        Sentry.captureException(error);
        console.error(error);
        res.status(500).json({ message: "Failed to remove student" });
    }

});

router.put("/edit/:id", async (req, res) => {

    const { id: userId } = req.user;
    const { name, address, phone, details } = req.body;
    const { id: studentId } = req.params;

    if (!name || !address || !phone || !details) {
        return res.status(400).json({ message: "No fields should be empty"});
    }

    try {

        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        const updatedStudent = await prisma.student.update({
            where: {
                id: studentId,
                userId: userId
            },
            data: {
                name,
                address,
                phone,
                details
            }
        });

        if (!updatedStudent) {
            return res.status(500).json({ message: "Failed to update student"});
        }

        return res.status(200).json({ message: "Student updated successfully", updatedStudent });
        
    } catch (error) {
        Sentry.captureException(error);
        console.error(error);
        return res.status(500).json({ message: "Failed to update student"});
    }

});

export default router;