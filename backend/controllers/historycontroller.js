import History from "../models/historymodel.js";

// ─── SAVE ────────────────────────────────────────────────────────────────────
export const saveHistory = async (req, res) => {
  try {
    const {
      userId,
      input_type,
      original_input,
      verdict,
      confidence,
      explanation,
      visual_inconsistencies,
      ai_generation_indicators,
      sources,
    } = req.body;

    if (!input_type || !verdict) {
      return res
        .status(400)
        .json({ success: false, message: "input_type and verdict are required" });
    }

    const allowed = ["text", "image", "voice", "ai_image"];
    if (!allowed.includes(input_type)) {
      return res
        .status(400)
        .json({ success: false, message: `input_type must be one of: ${allowed.join(", ")}` });
    }

    const entry = new History({
      userId: userId || null,
      input_type,
      original_input: String(original_input || "").slice(0, 5000),
      verdict: String(verdict).slice(0, 500),
      confidence: Math.max(0, Math.min(100, Number(confidence) || 0)),
      explanation: String(explanation || "").slice(0, 10000),
      visual_inconsistencies: Array.isArray(visual_inconsistencies)
        ? visual_inconsistencies.map((s) => String(s).slice(0, 1000))
        : [],
      ai_generation_indicators: Array.isArray(ai_generation_indicators)
        ? ai_generation_indicators.map((s) => String(s).slice(0, 1000))
        : [],
      sources: Array.isArray(sources)
        ? sources.map((s) => String(s).slice(0, 2000))
        : [],
    });

    const saved = await entry.save();
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    console.error("History save error:", err.message);
    return res.status(500).json({ success: false, message: "Failed to save history" });
  }
};

// ─── GET ALL (paginated) ────────────────────────────────────────────────────
export const getHistory = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    // Optional filters
    const filter = {};
    if (req.query.type && ["text", "image", "voice", "ai_image"].includes(req.query.type)) {
      filter.input_type = req.query.type;
    }
    if (req.query.search) {
      const q = req.query.search.trim().slice(0, 200);
      if (q) {
        filter.$or = [
          { original_input: { $regex: q, $options: "i" } },
          { verdict: { $regex: q, $options: "i" } },
          { explanation: { $regex: q, $options: "i" } },
        ];
      }
    }

    const [items, total] = await Promise.all([
      History.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      History.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("History fetch error:", err.message);
    return res.status(500).json({ success: false, message: "Failed to fetch history" });
  }
};

// ─── GET ONE ────────────────────────────────────────────────────────────────
export const getHistoryById = async (req, res) => {
  try {
    const entry = await History.findById(req.params.id).lean();
    if (!entry) {
      return res.status(404).json({ success: false, message: "History entry not found" });
    }
    return res.status(200).json({ success: true, data: entry });
  } catch (err) {
    console.error("History get error:", err.message);
    return res.status(500).json({ success: false, message: "Failed to fetch history entry" });
  }
};

// ─── DELETE ONE ──────────────────────────────────────────────────────────────
export const deleteHistory = async (req, res) => {
  try {
    const entry = await History.findByIdAndDelete(req.params.id);
    if (!entry) {
      return res.status(404).json({ success: false, message: "History entry not found" });
    }
    return res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("History delete error:", err.message);
    return res.status(500).json({ success: false, message: "Failed to delete history entry" });
  }
};

// ─── CLEAR ALL ──────────────────────────────────────────────────────────────
export const clearHistory = async (req, res) => {
  try {
    const filter = {};
    // If userId is provided, only clear that user's history
    if (req.query.userId) filter.userId = req.query.userId;
    const result = await History.deleteMany(filter);
    return res.status(200).json({
      success: true,
      message: `Cleared ${result.deletedCount} entries`,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    console.error("History clear error:", err.message);
    return res.status(500).json({ success: false, message: "Failed to clear history" });
  }
};
