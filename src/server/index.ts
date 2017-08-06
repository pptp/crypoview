import { App } from './App';
// import * as config from 'server/config';

export const app = new App();

import './controllers';

app.bootstrap();
