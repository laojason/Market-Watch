const express = require('express');
var cors = require('cors')

const app = express();

app.use(cors())

app.get('/api/users', (req, res) => {
    const users = [
        {
            id: 1, 
            username: 'jlao',
            watchList: ['AMD', 'AMZN']
        }
    ]
    res.json(users);
});

const port = 4000;

app.listen(port, () => console.log(`server has started on ${port}`))    