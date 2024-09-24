import { createConnection } from 'typeorm';

/** É suficiente importar esta conexão no server.ts, pois ela buscará os dados de conexão automaticamente no ormconfig.ts */

createConnection();
