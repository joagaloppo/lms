const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: "Computer Science" },
                { name: "Music" },
                { name: "Photography" },
                { name: "Fitness" },
                { name: "Accounting" },
                { name: "Filming" },
            ],
        });

        console.log("Success seeding");
    } catch (err) {
        console.log("Error seeding the database:", err);
    } finally {
        await db.$disconnect();
    }
}

main();
