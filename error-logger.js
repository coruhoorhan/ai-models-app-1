import express from 'express';
import path from 'path';

const app = express();
app.use(express.json());

app.post('/log-error', (req, res) => {
  console.log("=== CLIENT ERROR ===");
  console.log(req.body);
  console.log("====================");
  res.sendStatus(200);
});

app.use(express.static('dist'));
app.get('*', (req, res) => res.sendFile(path.resolve('dist/index.html')));

app.listen(3002, () => console.log('Error logger listening on 3002'));
