import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Purchase from '../models/Purchase.js';
import Ticket from '../models/Ticket.js';

// Load env variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "ticketmern"
});

// Sample data
// Renamed to usersData to avoid conflict with the processed 'users' variable later
const usersData = [
    {
        username: 'admin1',
        email: 'admin1@example.com',
        password: 'admin123',
        role: 'admin',
        isVerified: true
    },
    {
        username: 'admin2',
        email: 'admin2@example.com',
        password: 'admin123',
        role: 'admin',
        isVerified: true
    },
    {
        username: 'user1',
        email: 'user1@example.com',
        password: 'user123',
        role: 'user',
        isVerified: true
    },
    {
        username: 'user2',
        email: 'user2@example.com',
        password: 'user123',
        role: 'user',
        isVerified: true
    }
];

const purchases = [
    {
        orderNumber: 'ORD001',
        items: [
            { name: 'Custom Business Sign', quantity: 1, price: 299.99 },
            { name: 'Installation Service', quantity: 1, price: 100.00 }
        ],
        totalAmount: 399.99,
        status: 'completed'
    },
    {
        orderNumber: 'ORD002',
        items: [
            { name: 'LED Shop Sign', quantity: 1, price: 599.99 },
            { name: 'Rush Service', quantity: 1, price: 150.00 }
        ],
        totalAmount: 749.99,
        status: 'pending'
    }
];

// Seed function
async function seedDatabase() {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Purchase.deleteMany({});
        await Ticket.deleteMany({});

        // Hash passwords for users before creation
        const salt = await bcrypt.genSalt(10);
        const usersWithHashedPasswords = await Promise.all(
            usersData.map(async (userData) => {
                const hashedPassword = await bcrypt.hash(userData.password, salt);
                return { ...userData, password: hashedPassword };
            })
        );

        // Create users
        const createdUsers = await User.create(usersWithHashedPasswords);
        console.log('Users created successfully (with hashed passwords)');

        // Get admin and regular user references
        const admins = createdUsers.filter(user => user.role === 'admin');
        const regularUsers = createdUsers.filter(user => user.role === 'user');

        // Create purchases for each regular user
        const createdPurchases = await Promise.all(
            purchases.map((purchase, index) => {
                return Purchase.create({
                    ...purchase,
                    user: regularUsers[index]._id
                });
            })
        );
        console.log('Purchases created successfully');

        // Create tickets with random admin assignments and attachments
        const tickets = [
            {
                title: 'Installation Request for Business Sign',
                purchase: createdPurchases[0]._id,
                creator: regularUsers[0]._id,
                assignedAdmin: admins[Math.floor(Math.random() * admins.length)]._id,
                status: 'in_progress',
                messages: [
                    {
                        sender: regularUsers[0]._id,
                        content: 'When can you install my business sign? Here\'s the location photo.',
                        attachments: [{
                            filename: 'location.jpg',
                            url: 'https://example.com/uploads/location.jpg'
                        }]
                    },
                    {
                        sender: admins[0]._id,
                        content: 'I\'ve reviewed the location photo. We can schedule the installation for next week. Here\'s our installation guide.',
                        attachments: [{
                            filename: 'installation_guide.pdf',
                            url: 'https://example.com/uploads/installation_guide.pdf'
                        }]
                    }
                ]
            },
            {
                title: 'LED Sign Design Approval',
                purchase: createdPurchases[1]._id,
                creator: regularUsers[1]._id,
                assignedAdmin: admins[Math.floor(Math.random() * admins.length)]._id,
                status: 'open',
                messages: [
                    {
                        sender: regularUsers[1]._id,
                        content: 'Please check my sign design requirements and mockup.',
                        attachments: [{
                            filename: 'design_mockup.png',
                            url: 'https://example.com/uploads/design_mockup.png'
                        }]
                    }
                ]
            }
        ];

        await Ticket.create(tickets);
        console.log('Tickets created successfully');

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase();