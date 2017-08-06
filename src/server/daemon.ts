import { ApiConnector } from 'server/base/ApiConnector';
import { BittrexStrategy } from 'server/base/api/BittrexStrategy';
import { Parser } from 'server/base/Parser';

import { DatabaseConnector } from 'server/base/DatabaseConnector';
import { FirebaseStrategy } from 'server/base/db/FirebaseStrategy';

const bittrexApi = ApiConnector.create(BittrexStrategy);

const db = DatabaseConnector.create(FirebaseStrategy);

const parser = new Parser(db);
parser.execute(bittrexApi);

