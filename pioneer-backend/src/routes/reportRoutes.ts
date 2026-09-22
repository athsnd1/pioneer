import express from "express";
import prisma from "../lib/prisma.js";
import * as Sentry from '@sentry/node';

const router = express.Router();

router.get("/", async (req, res) => {

    const { id: userId } = req.user;

    try {

        const reports = await prisma.report.findMany({
            where: {
                userId: userId
            }
        });

        return res.status(200).json({ message: "Reports fetched successfully", reports });

    } catch (error) {
        Sentry.captureException(error);
        console.error(error);
        return res.status(500).json({ message: "Failed to get reports" });
    }

});

router.get("/stats", async (req, res) => {

    const { id: userId } = req.user;

    const stats = await prisma.report.aggregate({
        where: {
            userId: userId
        },

        _sum: {
            hours: true,
            visits: true,
            studies: true,
            videos: true,
            books: true
        },

        _count: {
            id: true
        }
    });

    if(!stats) {
        return res.status(500).json({message: "Failed to get stats"});
    }

    res.status(200).json({
        totalReports: stats._count.id,
        totalHours: stats._sum.hours ?? 0,
        totalVisits: stats._sum.visits ?? 0,
        totalStudies: stats._sum.studies ?? 0,
        totalVideos: stats._sum.videos ?? 0,
        totalBooks: stats._sum.books ?? 0
    });

});

router.get("/edit/:id", async (req, res) => {
    const { id: userId } = req.user;
    const { id } = req.params;

    const report = await prisma.report.findUnique({
        where: {
            id
        }
    });

    if (!report || report.userId !== userId) {
        return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).json({ report });
});

router.put("/edit/:id", async (req, res) => {

    const { id: userId } = req.user;
    const { id: reportId }  = req.params;
    const { date, hours, visits, studies, videos, books, comment } = req.body;

    const report = await prisma.report.findUnique({
        where: {
            id: reportId
        }
    });

    if (!report || report.userId !== userId) {
        return res.status(404).json({ message: "Report not found" });
    }

    const updatedReport = await prisma.report.update({
       where: {
        id: reportId
       },

       data: {
        date,
        hours,
        visits,
        studies,
        videos,
        books,
        comment
       }
    });

    if (!updatedReport) {
        return res.status(500).json({ message: "Failed to update report" });
    }

    return res.status(200).json({ message: "Report updated successfully" });

});

router.post("/create", async (req, res) => {

    const { date, hours, visits, studies, videos, books, comment } = req.body;
    const { id: userId } = req.user;

    if (!date || hours === null || visits === null || studies === null || videos === null || books === null) {
        return res.status(400).json({ message: "No input field should be empty" });
    }

    try {

        await prisma.report.create({
            data: {
                date,
                hours,
                visits,
                studies,
                videos,
                books,
                comment,
                userId: userId
            }
        });

        res.status(201).json({ message: "Report successfully created" });

    } catch (error) {
        Sentry.captureException(error);
        console.error(error);
        return res.status(500).json({ message: `Failed to create new report` });
    }

});

router.delete("/delete/:id", async (req, res) => {

    const { id: reportId } = req.params;
    const { id: userId } = req.user;

    const report = await prisma.report.findUnique({
        where: {
            id: reportId
        }
    });

    if (!report || report.userId !== userId) {
        return res.status(404).json({ message: "Report not found" });
    }

    const deletedReport = await prisma.report.delete({
        where: {
            id: reportId
        }
    });

    if(!deletedReport) {
        return res.status(500).json({ message: "Failed to delete report" });
    }

    return res.status(204).json({ message: "Report deleted successfully"});

});

router.get("/monthly-stats", async (req, res) => {

    try {

        const reports = await prisma.report.findMany({
            where: {
                userId: req.user.id
            }
        });

        if (!reports) {
            return res.status(404).json({ message: "Reports not found" });
        }

        type MonthlyStats = {
            month: string;
            hours: number;
            visits: number;
            studies: number;
            videos: number;
            books: number;
            reports: number;
        };

        const groupedReports = reports.reduce((monthlyTotals, report) => {

            const reportDate = new Date(report.date);

            const monthKey =
                `${reportDate.getFullYear()}-${reportDate.getMonth()}`;

            if (!monthlyTotals[monthKey]) {

                monthlyTotals[monthKey] = {

                    month: reportDate.toLocaleString("en-US", {
                        month: "short",
                        year: "numeric"
                    }),

                    hours: 0,
                    visits: 0,
                    studies: 0,
                    videos: 0,
                    books: 0,
                    reports: 0

                };

            }

            monthlyTotals[monthKey].hours += report.hours;
            monthlyTotals[monthKey].visits += report.visits;
            monthlyTotals[monthKey].studies += report.studies;
            monthlyTotals[monthKey].videos += report.videos;
            monthlyTotals[monthKey].books += report.books;
            monthlyTotals[monthKey].reports++;

            return monthlyTotals;

        }, {} as Record<string, MonthlyStats>);

    const monthlyData = Object.values(groupedReports);

    return res.status(200).json({monthlyData});
        
    } catch (error) {
        Sentry.captureException(error);
        console.error(error);
        return res.status(500).json({ message: "Failed to get monthly stats "});
    }
});

export default router;
