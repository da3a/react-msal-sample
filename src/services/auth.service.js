import * as Msal from 'msal';

export default class AuthService {
  constructor() {
    let PROD_REDIRECT_URI = 'https://localhost:3000/';
    let redirectUri = window.location.origin;
    if (window.location.hostname !== '127.0.0.1') {
      redirectUri = PROD_REDIRECT_URI;
    }
    this.applicationConfig = {
      clientID: '9990d302-61f6-420c-837f-67cf28a49b18',
      graphScopes: ['user.read']
    };
    console.log(redirectUri)
    this.app = new Msal.UserAgentApplication(
      this.applicationConfig.clientID,
      'https://login.microsoftonline.com/6f41e494-594b-44f6-8c09-65df9f00ec5d/',
      redirectUri = "https://localhost:3000/",
      () => {
        // callback for login redirect
      },
      {
        redirectUri
      }
    );
  }
  login = () => {
    return this.app.loginPopup(this.applicationConfig.graphScopes).then(
      idToken => {
        const user = this.app.getUser();
        if (user) {
          return user;
        } else {
          return null;
        }
      },
      () => {
        return null;
      }
    );
  };
  logout = () => {
    this.app.logout();
  };
  getToken = () => {
    return this.app.acquireTokenSilent(this.applicationConfig.graphScopes).then(
      accessToken => {
        return accessToken;
      },
      error => {
        return this.app
          .acquireTokenPopup(this.applicationConfig.graphScopes)
          .then(
            accessToken => {
              return accessToken;
            },
            err => {
              console.error(err);
            }
          );
      }
    );
  };
}
