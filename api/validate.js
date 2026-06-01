export default async function handler(req, res) {
    const { key, hwid } = req.query;
    if (!key || !hwid) return res.status(200).send('false');

    const url = 'https://fluent-stag-141278.upstash.io';
    const token = 'gQAAAAAAAifeAAIgcDE5YmIwNzM0ZDNhZjA0N2RhODllY2UwY2YxNDhhZjZmMg';

    try {
        const resp = await fetch(`${url}/get/${key}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (resp.ok) {
            const data = await resp.json();
            const parsed = JSON.parse(data.result);
            if (parsed.hwid === hwid && Date.now() < parsed.expiresAt) {
                return res.status(200).send('true');
            } else {
                 
                await fetch(`${url}/del/${key}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
            }
        }
    } catch (e) {}
    res.status(200).send('false');
}
