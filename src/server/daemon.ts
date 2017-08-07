import { ApiConnector } from 'server/base/ApiConnector';
import { BittrexAdapter } from 'server/base/api/BittrexAdapter';
import { Parser } from 'server/base/Parser';

import { DatabaseConnector } from 'server/base/DatabaseConnector';
import { FirebaseAdapter } from 'server/base/db/FirebaseAdapter';

const bittrexApi = ApiConnector.create(BittrexAdapter);

const db = DatabaseConnector.create(FirebaseAdapter);

const parser = new Parser(db);
parser.execute(bittrexApi);

