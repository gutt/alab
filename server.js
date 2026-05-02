#!/usr/bin/env node

const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 86400000 }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', renderTable);
app.get('/table', renderTable);

function renderTable(req, res) {
    res.render('table/table', {
        layout: 'layouts/table_layout',
        title: 'A.Lab',
        algorithm: { id: 1, content: '' }
    }, (err, body) => {
        if (err) return res.status(500).send(err.message);
        res.render('layouts/table_layout', { title: 'A.Lab', body });
    });
}

if (require.main === module) {
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || '0.0.0.0';
    app.listen(port, host, () => {
        console.log(`alab listening on http://${host}:${port}`);
    });
}

module.exports = app;
