import express from "express";

const Colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",

    FgBrBlack: "\u001b[30;1m",
    FgBrRed: "\u001b[31;1m",
    FgBrGreen: "\u001b[32;1m",
    FgBrYellow: "\u001b[33;1m",
    FgBrBlue: "\u001b[34;1m",
    FgBrMagenta: "\u001b[35;1m",
    FgBrCyan: "\u001b[36;1m",
    FgBrWhite: "\u001b[37;1m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m",
}

const app = express();
const port = process.env.port || 90;

app.use(express.json());

app.post('/add', (req, res) => {
    var eType = eventType(req.body.PAYLOAD);
    console.log(
        Colors.Reset, `[${req.body.timestamp}]`,
        eType.color, `[${eType.state}]`,
        Colors.Reset, `${req.body.PAYLOAD.substring(0, 4)},`,
        "Zone: ", `${req.body.Zone},`,
        "Building: ", `${req.body.BuildingID},`,
        "Site: ", req.body.SiteID
    );
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});

function eventType (payload) {
    if (payload.charAt(3) === 'I') return {state: "ISOLATED", color: Colors.FgBlue};
    if (payload.charAt(0) === 'A') return {state: "ALARM", color: Colors.FgBrRed};
    if (payload.charAt(1) === 'P') return {state: "PREALARM", color: Colors.FgRed};
    if (payload.charAt(2) === 'F') return {state: "FAULT", color: Colors.FgYellow};
    return {state: "NORMAL", color: Colors.Reset};
}