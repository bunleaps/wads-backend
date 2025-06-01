import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const adminAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password -otp');

        if (!user) {
            return res.status(401).json({ message: 'Access denied. User not found or token invalid.' });
        }

        // Log the user object and role for debugging
        // console.log('AdminAuth - User:', user);
        // console.log('AdminAuth - User Role:', user.role);

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }

        req.user = user; // Attach user to the request object
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Access denied. Invalid or expired token.' });
        }
        console.error('Admin authentication error:', error);
        res.status(500).json({ message: 'Internal server error during admin authentication.' });
    }
};