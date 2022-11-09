import express from "express";

const app = express();
const port = process.env.port || 90;

app.use(express.json());

app.post('/add', (req, res) => {
    console.log(`${req.body.payload}`);
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});