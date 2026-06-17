import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import { ADMIN_EMAIL, ADMIN_PASSWORD } from '../config/env.js';
import connectDB from '../config/db.js';

const seedAdmin = async()=>{
    try{
        await connectDB();

        const existingAdmin = await User.findOne({email: ADMIN_EMAIL});
        if(existingAdmin){
            console.log("Admin user already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
        const adminUser = new User({
            name: "Admin",
            email: ADMIN_EMAIL,
            password: hashedPassword,
            role: "ADMIN"
        });

        await adminUser.save();
        console.log("Admin user created successfully");
    } catch (error) {
        console.error("Error occurred while seeding admin user:", error);
        process.exit(1);
    }
};

seedAdmin();