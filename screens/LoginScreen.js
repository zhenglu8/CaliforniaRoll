import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';

import * as firebase from 'firebase';
import { Container, Content, Header, Form, Input, Button, Label, Item} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import * as Facebook from 'expo-facebook'; 
import * as Google from 'expo-google-app-auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAIGEJf2cRo20CW4RgcVBiUX752mTCgq_M',
  authDomain: 'californiaroll-72d40.firebaseapp.com',
  databaseURL: 'https://californiaroll-72d40.firebaseio.com/',
  projectId: 'californiaroll-72d40',
  storageBucket: 'californiaroll-72d40.appspot.com',
  messagingSenderId: 'G-BHXTGP962T',
  appId: '1:322543554605:web:4686b34797a61f32e668a4'
};

firebase.initializeApp(firebaseConfig);



export default class LoginScreen extends React.Component{

  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
  }



  signUpUser = (email,password) =>{

    try{
      if(this.state.password.length < 6){
        alert("Please enter more than 6 digits")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch(error){
      console.log(error.toString())
    }

  }

  logInUser = (email,password) =>{

    try{
      firebase.auth().signInWithEmailAndPassword(email,password).then(function (user) {
        if(user){
        //this.props.navigation.navigate('DashboardScreen');
        console.log(user)
        }
      })
      //this.props.navigation.navigate('DashboardScreen')
    }
    catch(error){
      console.log(error.toString())
    }
  }


  /*
  async loginWithFacebook() {

    
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('1071250916603139', { permissions: ['public_profile', 'email'] });

    if (type == 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      })
    }
  }
  */

  
  logIn = async () => {
    try {
      await Facebook.initializeAsync('1071250916603139');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

    signInWithGoogleAsync = async () => {
      try {
        const result = await Google.logInAsync({
          behaviour: 'web',
          androidClientId: '322543554605-4hfdud2gbenpsef991gj0t7rt7ifrah6.apps.googleusercontent.com',
          //iosClientId: YOUR_CLIENT_ID_HERE,
          scopes: ['profile', 'email'],
        });
    
        if (result.type === 'success') {
          this.onSignIn(result);
          this.props.navigation.navigate('DashboardScreen');
          return result.accessToken;
        } else {
          return { cancelled: true };
        }
      } catch (e) {
        return { error: true };
      }
    }

    onSignIn = googleUser => {
      console.log('Google Auth Response', googleUser);
      // We need to register an Observer on Firebase Auth to make sure auth is initialized.
      var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
              //googleUser.getAuthResponse().id_token);
              googleUser.idToken,
              googleUser.accessToken);
          // Sign in with credential from the Google user.
          firebase
          .auth()
          .signInWithCredential(credential).then(function(result){
            console.log('user logged in')
            
              firebase
                .database()
                .ref('/users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  created_at: Date.now()
                })
                .then(function(snapshot) {
                  // console.log('Snapshot', snapshot);
                });
            
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this));
    }

    isUserEqual = (googleUser, firebaseUser) => {
      if (firebaseUser) {
        var providerData = firebaseUser.providerData;
        for (var i = 0; i < providerData.length; i++) {
          if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()) {
            // We don't need to reauth the Firebase connection.
            return true;
          }
        }
      }
      return false;
    }
  
  

  render(){
  return (
    <Container style={styles.container}>
      <Image 
        source={require('../assets/Logo.png')}  
        style={{width: 200, height: 200, marginLeft: 80}} 
      />
      <Form>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(email) => this.setState({email})}
          />
        </Item>
        <Item floatingLabel>
          <Label>Password</Label>
          <Input
          secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(password) => this.setState({password})}
          />
        </Item>

        <Button style={{ marginTop: 10}}
          full
          rounded
          success
          onPress={()=> this.logInUser(this.state.email, this.state.password)}
          onPress={() => this.props.navigation.navigate('DashboardScreen')}
        >
          <Text style={{ color: 'white'}}>Log In</Text>
        </Button>
        <Button style={{ marginTop: 10}}
          full
          rounded
          warning
          onPress={()=> this.signUpUser(this.state.email, this.state.password)}
        >
          <Text style={{ color: 'white'}}>Sign Up</Text>
        </Button>
        <Button style={{ marginTop: 10}}
          full
          rounded
          primary
          onPress={() => this.logIn()}
        >
          <Text style={{ color: 'white'}}>Sign In with Facebook</Text>
        </Button>
        <Button style={{ marginTop: 10}}
          full
          rounded
          danger
          onPress={() => this.signInWithGoogleAsync()}
          //onPress={() => this.props.navigation.navigate('DashboardScreen')}
        >
          <Text style={{ color: 'white'}}>Sign In with Google</Text>
        </Button>
        
      </Form>
    </Container>
  );
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
});