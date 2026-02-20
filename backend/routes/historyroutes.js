import express from "express";
import {
  saveHistory,
  getHistory,
  getHistoryById,
  deleteHistory,
  clearHistory,
} from "../controllers/historycontroller.js";

const historyRouter = express.Router();

// POST   /api/history/save      – save a new entry
historyRouter.post("/save", saveHistory);

// GET    /api/history            – list all (paginated, filterable)
historyRouter.get("/", getHistory);

// GET    /api/history/:id        – get single entry
historyRouter.get("/:id", getHistoryById);

// DELETE /api/history/clear      – clear all history
historyRouter.delete("/clear", clearHistory);

// DELETE /api/history/:id        – delete single entry
historyRouter.delete("/:id", deleteHistory);

export default historyRouter;
