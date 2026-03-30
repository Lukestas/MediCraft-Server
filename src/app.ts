import { app } from './server/server.js';
import { PORT } from './config/env.js';

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
