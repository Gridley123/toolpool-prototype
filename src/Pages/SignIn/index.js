//Firebase sign in
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBGdHOi9x6TRpqEgkTKan14qAECDopDk5Y",
  authDomain: "toolpool-frontend-dev.firebaseapp.com",
  databaseURL: "https://toolpool-frontend-dev.firebaseio.com",
  projectId: "toolpool-frontend-dev",
  storageBucket: "toolpool-frontend-dev.appspot.com",
  messagingSenderId: "760931099695"
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
}

  class SignIn extends React.Component {
    render() {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
  }

  export default SignIn;