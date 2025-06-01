import Ticket from "../models/Ticket.js";

export const createTicket = async (req, res) => {
  try {
    const ticket = new Ticket({
      title: req.body.title,
      purchase: req.body.purchaseId,
      creator: req.user._id,
      messages: [
        {
          sender: req.user._id,
          content: req.body.initialMessage,
        },
      ],
    });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const addMessage = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    ticket.messages.push({
      sender: req.user._id,
      content: req.body.content,
      attachments: req.body.attachments || [],
    });

    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const assignAdmin = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    ticket.assignedAdmin = req.body.adminId;
    ticket.status = "in_progress";
    await ticket.save();
    res.json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTicketThread = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("creator", "username")
      .populate("assignedAdmin", "username")
      .populate("messages.sender", "username")
      .populate("purchase");
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get tickets based on user role
export const getTickets = async (req, res) => {
  try {
    let query = {};

    // Regular users can only see their own tickets
    if (req.user.role !== "admin") {
      query.creator = req.user._id;
    }

    // Apply filters if provided
    if (req.query.status) query.status = req.query.status;
    if (req.query.priority) query.priority = req.query.priority;

    const tickets = await Ticket.find(query)
      .populate("creator", "username")
      .populate("assignedAdmin", "username")
      .populate("purchase", "orderNumber")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's tickets with purchase details
export const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ creator: req.user._id })
      .populate("creator", "username")
      .populate("assignedAdmin", "username")
      .populate("purchase", "orderNumber items totalAmount")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
