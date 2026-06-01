export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    const { hwid } = req.query;
    if (!hwid) return res.status(400).send('Missing hwid');

    const key = 'axis_' + Array.from({ length: 20 }, () => Math.floor(Math.random() * 10)).join('');
    const expiresAt = Date.now() + 86400000;
    const value = JSON.stringify({ hwid, expiresAt });

    const url = 'https://fluent-stag-141278.upstash.io';
    const token = 'gQAAAAAAAifeAAIgcDE5YmIwNzM0ZDNhZjA0N2RhODllY2UwY2YxNDhhZjZmMg';

    try {
        const response = await fetch(`${url}/set/${key}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: value
        });
        if (response.ok) {
            res.status(200).send(key);
        } else {
            res.status(500).send('Error');
        }
    } catch (e) {
        res.status(500).send('Error');
    }
}
