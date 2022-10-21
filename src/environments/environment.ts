// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_api : 'http://localhost:8080/api',
  USER_POOL_REGION: 'us-east-1',
  USER_POOL_ID: 'us-east-1_tUCIm649L',
  USER_POOL_WEB_CLIENT_ID : '4fqmdo8r0nrs9ksu32gu4t7vvh',
  USER_POOL_DOMAIN: 'arcangel.auth.us-east-1.amazoncognito.com',
  USER_POOL_REDIRECT_SIGN_IN: 'http://localhost:4200/logout',
  USER_POOL_REDIRECT_SIGN_OUT: 'http://localhost:4200/login',
  USER_POOL_INDETITY_PROVIDER: 'IniciarSSO'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */