import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password -otp");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Get user by username
export const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne(
      { username: req.params.username },
      "-password -otp"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { username, email, role, firstName, lastName } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (username) user.username = username;
    if (email) user.email = email;
    if (role) user.role = role;

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete all todos associated with the user
    await Todo.deleteMany({ user: user._id });

    // Delete the user
    await user.deleteOne();

    res.json({ message: "User and associated todos deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

// Get all tickets (admin only)
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({})
      .populate("creator", "username email")
      .populate("assignedAdmin", "username")
      .populate("purchase", "orderNumber items totalAmount")
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching tickets", error: error.message });
  }
};

// Get unassigned tickets (admin only)
export const getUnassignedTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ assignedAdmin: null })
      .populate("creator", "username email")
      .populate("purchase", "orderNumber")
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching unassigned tickets",
        error: error.message,
      });
  }
};

// Get tickets assigned to specific admin
export const getAdminTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ assignedAdmin: req.user._id })
      .populate("creator", "username email")
      .populate("purchase", "orderNumber")
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching admin tickets", error: error.message });
  }
};
