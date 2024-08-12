import express from "express";
import dotenv from "dotenv";
import Prisma from "./db/Prisma.js";

dotenv.config();

const app = express();
const port = 3990;

app.use(express.json());

app.get('/', async(req, res) => {

      const users = await Prisma.user.findMany();

      const names = users.map((user) => user.name);

      res.send(
        `There are ${names.length} users with the names of ${names.join(", ")}`
      );
})

app.post('/create-user', async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const newUser = await Prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });

        res.json({
            message: "User created successfully",
            user: newUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));