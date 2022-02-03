// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authAdminUrl: "http://localhost:3000/admin",
  authUserUrl: "http://localhost:3000/user",
  addUserUrl: "http://localhost:3000/add",
  firebaseConfig : {
    apiKey: "AIzaSyDrp7T5i2Sn8MkhqALMtDOjLxIF3s_zW48",
    authDomain: "theta-arcana-300517.firebaseapp.com",
    databaseURL: "https://theta-arcana-300517-default-rtdb.firebaseio.com",
    projectId: "theta-arcana-300517",
    storageBucket: "theta-arcana-300517.appspot.com",
    messagingSenderId: "161175492340",
    appId: "1:161175492340:web:1f5c382c730fefa6dd30a1",
    measurementId: "G-2XV6LBB7PJ"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
