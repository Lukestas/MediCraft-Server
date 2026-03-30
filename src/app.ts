import { app } from './server/server.js';
import { PORT } from './config/env.js';
import { MongoDBConnection } from './config/mongodb.js';

MongoDBConnection();

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
