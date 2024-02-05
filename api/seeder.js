import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
//import users from './data/users.js';
import products from './data/products.js';
//import User from './models/user.model.js';
import Product from './models/product.model.js';
//import Order from './models/order.model.js';
import connectDB from './config/db.js';

dotenv.config();

console.log('from seeder: '+ process.env.MONGO)

//connectDB();
await mongoose.connect("mongodb+srv://agiraldomolina:P4ngFE3SgWUFrkI7@mern-burger-queen.tqgvfo7.mongodb.net/mern-burger-queen?retryWrites=true&w=majority")

// console.log(`MongoDB Connected: ${process.env.MONGO}`.green.inverse);

const importData = async () => {
    try {
        await Product.deleteMany();
        //await User.deleteMany();

        //const createUsers = await User.insertMany(users);

        //const adminUser = createUsers[0]._id;

        const sampleProducts = products.map((product)=>{
            return {product};
        })

        await Product.insertMany(sampleProducts);

        console.log('Data imported successfully!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        //await Order.deleteMany();
        await Product.deleteMany();
        //await User.deleteMany();
        console.log('Data destroyed successfully!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
}else{
    importData();
}