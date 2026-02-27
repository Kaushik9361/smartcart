import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { sequelize } from "./config/db.js";


const startServer = async () => {
await connectDB();
await sequelize.sync({ alter: true });


app.listen(env.PORT, () => {
console.log(`Server running on port ${env.PORT}`);
});
};


startServer();