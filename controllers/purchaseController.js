import Purchase from '../models/Purchase.js';

export const createPurchase = async (req, res) => {
    try {
        const purchase = new Purchase({
            ...req.body,
            user: req.user._id
        });
        await purchase.save();
        res.status(201).json(purchase);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find({ user: req.user._id })
            .sort({ createdAt: -1 });
        res.json(purchases);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};