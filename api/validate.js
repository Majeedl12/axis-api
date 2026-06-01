export default async function handler(req, res) {
    const { key, hwid } = req.query;
    if (!key) return res.status(200).send('false');

    try {
        const resp = await fetch('https://fluent-stag-141278.upstash.io/get/' + key, {
            headers: { 'Authorization': 'Bearer gQAAAAAAAifeAAIgcDE5YmIwNzM0ZDNhZjA0N2RhODllY2UwY2YxNDhhZjZmMg' }
        });
        const data = await resp.json();
        
        if (data.result) {
            const parsed = JSON.parse(data.result);
            
            if (hwid && parsed.hwid !== hwid) {
                return res.status(200).send('false');
            }
            
            if (Date.now() < parsed.expiresAt) {
                return res.status(200).send('true');
            }
        }
    } catch (e) {}
    
    res.status(200).send('false');
}
