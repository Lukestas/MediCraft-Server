import { app } from './server/server.js';
import { PORT } from './config/env.js';
import { startDBConnection } from './config/mongodb.js';

startDBConnection();

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
