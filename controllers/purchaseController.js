import Purchase from "../models/Purchase.js";
import User from "../models/User.js";

export const createPurchase = async (req, res) => {
  console.log("Received request to create purchase. Body:", req.body); // Log the request body
  try {
    // Destructure userId and other purchase details from the request body
    const { userId, ...purchaseDetails } = req.body;

    // Check if userId is provided in the request body
    if (!userId) {
      return res
        .status(400)
        .json({ error: "userId is required in the request body." });
    }

    // Create a new purchase object
    const purchase = new Purchase({
      ...purchaseDetails, // Spread other details like items, totalAmount, status
      user: userId, // Assign the userId from the request body to the 'user' field
    });
    await purchase.save();
    res.status(201).json(purchase);
  } catch (error) {
    console.error("Error creating purchase:", error); // Log the error for debugging
    res.status(400).json({ error: error.message });
  }
};

export const getUserPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }, "-password -otp");
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const updatePurchaseStatusByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const purchase = await Purchase.findById(id);

    if (!purchase) {
      return res.status(404).json({ error: "Purchase not found" });
    }

    // Validate the new status against the schema enum
    const validStatuses = Purchase.schema.path("status").enumValues;
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    purchase.status = status;
    await purchase.save();

    res.json({ message: "Purchase status updated successfully", purchase });
  } catch (error) {
    console.error("Error updating purchase status:", error);
    res
      .status(500)
      .json({
        error: "Failed to update purchase status",
        details: error.message,
      });
  }
};
