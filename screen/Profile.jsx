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
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa1 from 'react-native-vector-icons/Ionicons';
import {Icon} from 'react-native-elements';
// import {mdiMessageAlert} from '@mdi/js';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {PermissionsAndroid} from 'react-native';
import * as RNFS from 'react-native-fs';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {API_URI, BASE_URL} from '../config/Config';
import {useNavigation, useRoute} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {MimeTypeMap} from '../MimeTypeMap';
import {setLoggedOut} from './Redux/Slice/LoginSlice';
// import { API_URI } from '../config/Config';

const Profile = () => {
  const token = useSelector(reduxState => reduxState?.login?.user?.accessToken);
  console.log('token', token);
  const [files, setFiles] = useState(null);
  // const [userData, setUsersData] = useState({});
  const [imageUri, setimageUri] = useState(null);
  const route = useRoute();
  const user_data = route.params?.userData;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: '',
    address1: '',
    email: '',
  });

  const getUserData = async () => {
    if (token) {
      try {
        const res = await axios({
          url: API_URI + '/user/user/editProfile',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res) {
          console.log('user data with token', res?.data?.user);
          setUserData(res?.data.user);
        }
      } catch (error) {
        console.log('profile data error', error);
      }
    }
  };
  useEffect(() => {
    getUserData();
  }, [token]);

  const requestCameraPermission = async () => {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
      if (
        grants['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const selectAllFiles = async () => {
    setFiles(null);
    // setFile(null);
    requestCameraPermission();
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });
      //Printing the log realted to the file
      console.log('selectAllFiles res x: ', res);
      console.log('selectAllFiles typeof res : ' + typeof res);
      console.log('selectAllFiles URI : ' + res[0].uri);
      console.log('selectAllFiles Type : ' + res[0].type);
      console.log('selectAllFiles File Name : ' + res[0].name);
      console.log('selectAllFiles File Size : ' + res[0].size);
      // setimageUri(res[0].uri);

      // if (res[0]) {
      setimageUri(res[0].uri);
      setFiles(res[0]);
      // updateUserData();

      // }

      //Setting the state to show single file attributes
      // setFiles(res[0]);

      // uploadFile(res[0]);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Canceled File Selection');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const uploadFilesToAPI = async _id => {
    // const data = files;
    // Check if any file is selected or not
    var uploadUrl = `${API_URI}/upload`;
    console.log('uploadFilesToAPI >> uploadUrl', uploadUrl, files, MimeTypeMap);
    try {
      // create an array of objects of the files you want to upload
      var filesArr = [];
      // files.map(async (item, index) => {
      if (files.uri.startsWith('content://')) {
        // const urlComponents = files.uri.split('/');
        // const fileNameAndExtension = urlComponents[urlComponents.length - 1];
        const destPath = `${RNFS.ExternalCachesDirectoryPath}/${files.name}.${
          MimeTypeMap[files.type]
        }`;
        console.log('selectAllFiles File Size : ', destPath);
        filesArr.push({
          name: files.name + MimeTypeMap[files.type],
          filename: files.name + MimeTypeMap[files.type],
          filepath: destPath,
          filetype: files.type,
          uri: files?.uri,
          type: files.type,
        });
        await RNFS.copyFile(files.uri, destPath);
      }
      // });

      var uploadBegin = response => {
        var jobId = response.jobId;
        console.log(
          'uploadFilesToAPI UPLOAD HAS BEGUN! JobId: ' + jobId,
          filesArr,
          response,
        );
      };
      // uploadFiles;
      var uploadProgress = response => {
        var percentage = Math.floor(
          (response.totalBytesSent / response.totalBytesExpectedToSend) * 100,
        );
        console.log('uploadFilesToAPI UPLOAD IS ' + percentage + '% DONE!');
      };
      RNFS.uploadFiles({
        toUrl: uploadUrl,
        files: filesArr,
        method: 'POST',
        headers: {
          Accept: '*/*',
        },
        fields: {
          model_id: _id,
          model: 'user',
          model_key: 'profilePic',
        },
        begin: uploadBegin,
        progress: uploadProgress,
      })
        .promise.then(response => {
          console.log('uploadFilesToAPI responseZZZ1', response);
          if (response.statusCode == 200) {
            console.log('uploadFilesToAPI FILES UPLOADED!'); // response.statusCode, response.headers, response.body
            // Alert.alert('Purchase Successful!!');
            // navigation.navigate('home');
          } else {
            console.log('uploadFilesToAPI SERVER ERROR');
          }
        })
        .catch(err => {
          if (err.description === 'cancelled') {
            // cancelled by user
          }
          console.log(err);
        });
    } catch (error) {
      console.log('uploadFilesToAPI UPLOADS', error);
    }
  };
  useEffect(() => {
    if (files) {
      uploadFilesToAPI(user_data?._id);
    }
  }, [files]);
  const logout = () => {
    dispatch(setLoggedOut());
    navigation.navigate('login');
  };
  return (
    <ScrollView style={{flex: 1, height: vh(100), backgroundColor: '#fff'}}>
      <View style={{padding: vw(3)}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: vh(6),
              width: vw(12),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(5),
              // margin: vw(5),
            }}>
            <IconFa name="chevron-left" size={20} />
          </View>
          <Text style={{color: '#000', fontSize: vf(3.5)}}>Profile</Text>
          <Text style={{color: '#fff'}}>hhhhhhg</Text>
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontWeight: '700',
          }}>
          {user_data?.email}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontWeight: '400',
            fontSize: vf(2),
            letterSpacing: 1,
          }}>
          {user_data?.email}
        </Text>
        <View style={{position: 'relative'}}>
          <TouchableOpacity
            onPress={() => selectAllFiles()}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={{
                // uri: 'https://6.vikiplatform.com/image/f39b70cc709449058542b107d493cff7.jpg?x=b&a=0x0&s=460x268&e=t&f=t&cb=1',
                uri: imageUri
                  ? imageUri
                  : user_data?.profilePic
                  ? BASE_URL + user_data?.profilePic?.replace('Storage\\', '/')
                  : user_data?.imageURL,
              }}
              style={{
                height: vh(20),
                borderWidth: 1,
                borderColor: '#000',
                width: vw(40),
                borderRadius: vw(100),
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              top: vh(18),
              right: vw(30),
              backgroundColor: '#89C93D',
              height: vh(3.5),
              width: vw(7),
              zIndex: 1,
              borderRadius: vw(2),
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '600',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: vf(1.5)}}>#</Text>8
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: vh(2),
              height: vh(5),
              width: vw(30),
              // marginHorizontal: vw(1.5),
              backgroundColor: '#89C93D',
              borderRadius: vw(3),
              // padding: 5,
            }}>
            <Text
              style={{
                color: '#fff',
                alignSelf: 'center',
                fontSize: vf(2),
                // marginTop: 20,
                borderRadius: 50,
              }}>
              Edit Profile
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text
            style={{
              // alignItems:'center',
              fontWeight: '500',
              fontSize: vf(2.5),
              color: '#000',
              paddingLeft: 20,
              // marginTop: vh(1),
            }}>
            {userData.name}
          </Text>
          <Text
            style={{
              // alignItems:'center',
              fontWeight: '500',
              fontSize: vf(2),
              color: '#000',
              paddingLeft: 20,
              // marginTop: vh(1),
            }}>
            {userData.email}
          </Text>
          <Text
            style={{
              // alignItems:'center',
              fontWeight: '500',
              fontSize: vf(2),
              color: '#000',
              paddingLeft: 20,
              // marginTop: vh(1),
            }}>
            {userData.address1}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AllocatedRoomList')}>
            <View style={styles.box}>
              <Icon reverse name="home" type="fontawesome" color="#517fa4" />
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontSize: vf(2.2),
                  // marginTop: 20,
                  borderRadius: 50,
                }}>
                Your Rooms
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DocumentList')}>
            <View style={styles.box}>
              <Icon reverse name="folder" type="fontawesome" color="#517fa4" />
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontSize: vf(2.2),
                  // marginTop: 20,
                  borderRadius: 50,
                }}>
                Upload Document
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => navigation.navigate('PendingBills')}>
            <View style={styles.box}>
              <Icon reverse name="money" type="fontawesome" color="#517fa4" />
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontSize: vf(2.2),
                  // marginTop: 20,
                  borderRadius: 50,
                }}>
                Pending Payments
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Request')}>
            <View style={styles.box}>
              <Icon reverse name="bolt" type="fontawesome" color="#517fa4" />
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontSize: vf(2.2),
                  // marginTop: 20,
                  borderRadius: 50,
                }}>
                Request
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Feedback');
            }}>
            <View style={styles.box}>
              <Icon reverse name="message" type="fontawesome" color="#517fa4" />
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontSize: vf(2.2),
                  // marginTop: 20,
                  borderRadius: 50,
                }}>
                Feedback
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Referral')}>
            <View style={styles.box}>
              <Icon reverse name="people" color="#517fa4" />
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontSize: vf(2.2),
                  // marginTop: 20,
                  borderRadius: 50,
                }}>
                Referral
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ListOfFeedBacks')}>
            <View style={styles.box}>
              <Icon
                reverse
                name="book"
                type="fontawesome"
                color="#517fa4"
                // size={40}
              />

              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontSize: vf(2.2),
                  // marginTop: 20,
                  borderRadius: 50,
                }}>
                List All FeedBacks
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ListAllRequest')}>
            <View style={styles.box}>
              <Icon reverse name="list" color="#517fa4" />
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontSize: vf(2.2),
                  // marginTop: 20,
                  borderRadius: 50,
                }}>
                List All Requests
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginVertical: vh(4),
            height: vh(7),
            width: vw(40),
            backgroundColor: '#89C93D',
            borderRadius: vw(5),
            padding: 5,
          }}
          onPress={logout}>
          <Text
            style={{
              color: '#fff',
              alignSelf: 'center',
              fontSize: vf(2.5),
              borderRadius: 50,
            }}>
            LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: vh(1),
    height: vh(15),
    width: vw(42),
    marginHorizontal: vw(1.5),
    backgroundColor: '#204D6C',
    borderRadius: vw(3),
    // padding: 5,
  },
});
