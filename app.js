const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let cpuLoad = 0;
let memoryLoad = 0;
let stressInterval;

// Function to generate CPU load
function generateCPULoad(loadPercentage) {
    const startTime = Date.now();
    while (Date.now() - startTime < loadPercentage * 10) {
        Math.sqrt(Math.random() * 1000);
    }
}

// Function to generate Memory load
function generateMemoryLoad(loadPercentage) {
    return new Array(loadPercentage * 1000000).fill('X'); // Allocating memory
}

// Endpoint to handle load settings
app.post('/stress', (req, res) => {
    cpuLoad = parseInt(req.body.cpu) || 0;
    memoryLoad = parseInt(req.body.memory) || 0;

    clearInterval(stressInterval);

    if (cpuLoad > 0 || memoryLoad > 0) {
        stressInterval = setInterval(() => {
            if (cpuLoad > 0) generateCPULoad(cpuLoad);
            if (memoryLoad > 0) global.memory = generateMemoryLoad(memoryLoad);
        }, 1000);
    }
    
    res.send(`CPU Load: ${cpuLoad}%, Memory Load: ${memoryLoad}% set successfully.`);
});

// Web interface
app.get('/', (req, res) => {
    res.send(`
        <h2>Set CPU & Memory Load</h2>
        <form action="/stress" method="POST">
            <label>CPU Load (%):</label>
            <input type="number" name="cpu" min="0" max="100"><br>
            <label>Memory Load (%):</label>
            <input type="number" name="memory" min="0" max="100"><br>
            <button type="submit">Apply Load</button>
        </form>
    `);
});

app.listen(port, () => console.log(`App running on port ${port}`));
