import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {API_URI} from '../../config/Config';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginButton, AccessToken} from 'react-native-fbsdk-next';
import {LoginManager} from 'react-native-fbsdk-next';
import {Profile} from 'react-native-fbsdk-next';
import {useDispatch} from 'react-redux';
import {setIsLoggedIn, setLoggedInUser} from '../Redux/Slice/LoginSlice';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [googleAcoount, setGoogleAccount] = useState({});
  const [loginData, setLoginData] = useState({
    username: 'priyanka',
    password: '123456',
  });
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '679018857631-61vv3lgie70dljpi6mh372qpmltmrq86.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
      // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
      profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
    });
    // GoogleSignin.configure({
    //   webClientId:"679018857631-61vv3lgie70dljpi6mh372qpmltmrq86.apps.googleusercontent.com",
    //   offlineAccess:true,
    //   forceCodeForRefreshToken:true
    // })
  }, []);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      // await GoogleSignin.revokeAccess();
      // await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      // setGoogleAccount({ userInfo });
      console.log('userinfo', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('cancelled by user');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('login in progress');
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('service not available');
      } else {
        // some other error happened
        console.log('server not responding', error);
      }
    }
  };
  let userData = null;
  const loginHandler = async () => {
    try {
      console.log('loginhandler click', loginData);
      const res = await axios({
        url: API_URI + '/auth/signin',
        method: 'POST',
        data: {...loginData},
      });
      if (res.status == 200) {
        console.log(res.data?.user);
        userData = res?.data;
        dispatch(setIsLoggedIn(true));
        dispatch(setLoggedInUser(userData));
        navigation.navigate('dashboard', {userData});
      } else {
        console.log('some credential issue');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const signFacebook = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          profileObject();
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  function profileObject() {
    const currentProfile = Profile.getCurrentProfile().then(function (
      currentProfile,
    ) {
      if (currentProfile) {
        console.log(currentProfile);  
        userData = currentProfile;
        navigation.navigate('dashboard', {userData});
      }
    });
  }
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../images/login.jpg')}
            resizeMode="contain"
            style={{width: vw(100), height: vh(20)}}
          />
        </View>
        <View style={{paddingHorizontal: vw(5), marginVertical: vh(3)}}>
          <Text style={{fontSize: vf(3), color: '#000', letterSpacing: 0.5}}>
            Let's{' '}
            <Text style={{color: '#204D6C', fontWeight: '700'}}>Sign in</Text>
          </Text>
          <Text style={{marginVertical: vh(2)}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: vh(9),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(2),
              paddingHorizontal: vw(5),
              gap: 5,
              marginTop: vh(2),
            }}>
            <IconFa name="email-outline" size={20} />
            <TextInput
              placeholder="Email"
              onChangeText={text =>
                setLoginData({...loginData, username: text})
              }
              value={loginData.username}
              style={{height: vh(9), width: vw(100)}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: vh(9),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(2),
              paddingHorizontal: vw(5),
              gap: 5,
              marginTop: vh(2),
            }}>
            <IconFa name="lock-outline" size={20} />
            <TextInput
              placeholder="Password"
              onChangeText={text =>
                setLoginData({...loginData, password: text})
              }
              value={loginData.password}
              style={{height: vh(9), width: vw(100)}}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity>
              <Text style={{color: '#204D6C', marginVertical: vh(1)}}>
                Forget password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color: '#204D6C', marginVertical: vh(1)}}>
                Show password
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', marginVertical: vh(3)}}>
            <TouchableOpacity
              style={{
                height: vh(7),
                width: vw(70),
                backgroundColor: '#89C93D',
                borderRadius: vw(3),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={loginHandler}>
              <Text style={{color: '#fff', fontWeight: '600', fontSize: vf(2)}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'relative',
              height: vh(7),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: vw(90),
                height: vh(0.1),
                backgroundColor: `rgba(0,0,0,0.5)`,
              }}></View>
            <View
              style={{
                backgroundColor: `#fff`,
                padding: vw(2),
                position: 'absolute',
                paddingHorizontal: vw(10),
              }}>
              <Text>OR</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{
                height: vh(8),
                backgroundColor: `#F4F4F4`,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: vw(5),
                width: vw(42),
              }}
              onPress={() => signIn()}>
              <Image
                source={require('../../images/google.png')}
                resizeMode="contain"
                style={{width: vw(13), height: vh(5)}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: vh(8),
                backgroundColor: `#F4F4F4`,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: vw(5),
                width: vw(42),
              }}
              onPress={() => signFacebook()}>
              <Image
                source={require('../../images/face.png')}
                resizeMode="contain"
                style={{width: vw(13), height: vh(5)}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('register')}>
            <Text
              style={{textAlign: 'center', marginTop: vh(1), color: 'gray'}}>
              Don't have an accoun?{' '}
              <Text style={{color: '#204D6C'}}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({});
