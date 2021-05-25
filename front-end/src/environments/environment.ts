// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { DataQueriesModel } from './data-queries.model';

const dataQueries: DataQueriesModel = {
  loginEndpoint: 'http://localhost:3000/login',
  apiEndpoint: 'http://localhost:3000/api',
  reportsEndpoint: 'http://localhost:3000/generated-reports',
  websocket: 'localhost:3000'
};

export const environment = {
  production: false,
  dataQueries
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
