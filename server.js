const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/notify', (req, res) => {
    const { appointment } = req.body;

    fetch(`https://maker.ifttt.com/trigger/new_appt/with/key/YOUR_IFTTT_KEY`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "value1": appointment
        })
    })
    .then(response => response.json())
    .then(data => {
        res.json({ success: true, data });
    })
    .catch(error => {
        res.status(500).json({ success: false, error });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
