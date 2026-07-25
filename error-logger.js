import express from 'express';
import path from 'path';

const app = express();
app.use(express.json());

function sanitize(data) {
  if (typeof data !== 'object' || data === null) {
    return data;
  }
  if (Array.isArray(data)) {
    return data.map(sanitize);
  }

  const sanitized = {};
  const sensitiveKeys = ['password', 'token', 'secret', 'authorization', 'cookie', 'apikey', 'creditcard'];

  for (const [key, value] of Object.entries(data)) {
    if (sensitiveKeys.some(k => key.toLowerCase().includes(k))) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitize(value);
    } else {
      sanitized[key] = value;
    }
  }
  return sanitized;
}


app.post('/log-error', (req, res) => {
  console.log("=== CLIENT ERROR ===");
  console.log(sanitize(req.body));
  console.log("====================");
  res.sendStatus(200);
});

app.use(express.static('dist'));
app.get('*', (req, res) => res.sendFile(path.resolve('dist/index.html')));

app.listen(3002, () => console.log('Error logger listening on 3002'));
