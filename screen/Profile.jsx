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
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {PermissionsAndroid} from 'react-native';
import * as RNFS from 'react-native-fs';
import axios from 'axios';
import {API_URI, BASE_URL} from '../config/Config';
import {useRoute} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {MimeTypeMap} from '../MimeTypeMap';
// import { API_URI } from '../config/Config';

const Profile = () => {
  const [files, setFiles] = useState(null);
  // const [userData, setUsersData] = useState({});
  const [imageUri, setimageUri] = useState(null);
  const route = useRoute();
  const user_data = route.params?.userData;
  // const getUserData = async () => {
  //   if (user) {
  //     try {
  //       const res = await axios({
  //         url: API_URI + `admin/user/${user_data?._id}`,
  //         method: 'GET',
  //         // data: {
  //         //   profilePic: imageUri,
  //         // },
  //         // headers: {
  //         //   Authorization: `Bearer ${token}`,
  //         // },
  //       });

  //       if (res) {
  //         console.log('updateUserDatax res', res?.data);
  //         setUsersData(res?.data?.user);
  //         // navigation.navigate('ProfilePage');
  //       }
  //     } catch (error) {
  //       console.log('updateUserData error', error);
  //     }
  //   } else {
  //     Alert.alert('Required Fields Missing!');
  //   }
  // };
  // console.log(route.params?.userData);
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
  // const userImage=async()=>{
  //   try {
  //     const res=await DocumentPicker.pick({
  //       type: [DocumentPicker.types.allFiles],
  //     })
  //     console.log(res)
  //   } catch (error) {
  //     if (DocumentPicker.isCancel(error)) {
  //       console.log("error -----", error);
  //     } else {
  //       throw error;
  //     }
  //   }
  // }
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
  // useEffect(() => {
  //   getUserData();
  // }, []);
  // console.log(BASE_URL+user_data.profilePic?.replace('Storage\\','/'));
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: vw(5), position: 'relative'}}>
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
          <Text style={{color: '#000', fontSize: vf(2.5)}}>Profile</Text>
          <Text style={{color: '#fff'}}>hhhhhhg</Text>
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontWeight: '700',
            fontSize: vf(2.5),
            marginTop: vh(2),
            letterSpacing: 1,
          }}>
          {user_data?.email.split('@')[0]}
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
                marginTop: vh(2),
                borderWidth: 1,
                borderColor: '#000',
                width: vw(40),
                borderRadius: vw(100),
                // justifyContent:'center',
                // marginLeft:'auto'
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
        <Text
          style={{
            fontWeight: '700',
            fontSize: vf(2),
            color: '#000',
            marginTop: vh(2),
          }}>
          140
          <Text
            style={{
              color: `rgba(0,0,0,0.7)`,
              fontSize: vf(1.8),
              letterSpacing: 1,
            }}>
            {' '}
            listings
          </Text>
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginVertical: vh(2),
            flexWrap: 'wrap',
          }}>
          <View
            style={{
              height: vh(32),
              width: vw(43),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(5),
              // elevation:1
              padding: 5,
            }}>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/house3.jpg')}
                resizeMode="contain"
                style={{height: vh(22), width: vw(40), borderRadius: vw(5)}}
              />
              <Text
                style={{
                  color: '#fff',
                  position: 'absolute',
                  bottom: 12,
                  right: 15,
                }}>
                $220<Text style={{fontSize: 11}}>/month</Text>
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '600',
                  fontSize: vf(2),
                  padding: vw(2),
                }}>
                Wings Tower
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="star" color="yellow" size={20} />
                  <Text style={{color: '#000'}}>4.9</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="map-marker" size={15} />
                  <Text style={{fontSize: 10}}>Jakarta Indonesia</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: vh(32),
              width: vw(43),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(5),
              // elevation:1
              padding: 5,
            }}>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/house4.jpg')}
                resizeMode="contain"
                style={{height: vh(22), width: vw(40), borderRadius: vw(5)}}
              />
              <Text
                style={{
                  color: '#fff',
                  position: 'absolute',
                  bottom: 12,
                  right: 15,
                }}>
                $220<Text style={{fontSize: 11}}>/month</Text>
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '600',
                  fontSize: vf(2),
                  padding: vw(2),
                }}>
                Wings Tower
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="star" color="yellow" size={20} />
                  <Text style={{color: '#000'}}>4.9</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="map-marker" size={15} />
                  <Text style={{fontSize: 10}}>Jakarta Indonesia</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: vh(32),
              width: vw(43),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(5),
              // elevation:1
              padding: 5,
            }}>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/house5.jpg')}
                resizeMode="contain"
                style={{height: vh(22), width: vw(40), borderRadius: vw(5)}}
              />
              <Text
                style={{
                  color: '#fff',
                  position: 'absolute',
                  bottom: 12,
                  right: 15,
                  backgroundColor: '#2D5067',
                  borderRadius: vw(2),
                  padding: 2,
                }}>
                $220<Text style={{fontSize: 11}}>/month</Text>
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '600',
                  fontSize: vf(2),
                  padding: vw(2),
                }}>
                Wings Tower
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="star" color="yellow" size={20} />
                  <Text style={{color: '#000'}}>4.9</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="map-marker" size={15} />
                  <Text style={{fontSize: 10}}>Jakarta Indonesia</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: vh(32),
              width: vw(43),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(5),
              // elevation:1
              padding: 5,
            }}>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/house6.jpg')}
                resizeMode="contain"
                style={{height: vh(22), width: vw(40), borderRadius: vw(5)}}
              />
              <Text
                style={{
                  color: '#fff',
                  position: 'absolute',
                  bottom: 12,
                  right: 15,
                  backgroundColor: '#2D5067',
                  borderRadius: vw(2),
                  padding: 2,
                }}>
                $220<Text style={{fontSize: 11}}>/month</Text>
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '600',
                  fontSize: vf(2),
                  padding: vw(2),
                }}>
                Wings Tower
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="star" color="yellow" size={20} />
                  <Text style={{color: '#000'}}>4.9</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="map-marker" size={15} />
                  <Text style={{fontSize: 10}}>Jakarta Indonesia</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              position: 'absolute',
              bottom: vh(18),
              height: vh(9),
              backgroundColor: '#89C93D',
              width: vw(80),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: vw(5),
            }}>
            <Text style={{fontSize: vf(2.5), color: '#fff'}}>Start Chat</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
