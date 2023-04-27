import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {PermissionsAndroid} from 'react-native';
import * as RNFS from 'react-native-fs';
import axios from 'axios';
import {API_URI, BASE_URL} from '../config/Config';
import {useNavigation, useRoute} from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import {MimeTypeMap} from '../MimeTypeMap';
// import { API_URI } from '../config/Config';

const PendingBills = () => {
  const [files, setFiles] = useState(null);
  // const [userData, setUsersData] = useState({});
  const [imageUri, setimageUri] = useState(null);
  const route = useRoute();
  const user_data = route.params?.userData;
  const navigation = useNavigation();
  const onNextPressed = bill => {
    navigation.navigate('BillsDetails', bill);
  };
  // const [bills, setBills] = useState([]);
  const [pendingBills, setPendingBills] = useState([]);

  const getPendingBills = async () => {
    try {
      const res = await axios({
        url: API_URI + '/user/bill',
        method: 'GET',
      });
      if (res) {
        console.log('getPendingBills', res);
        setPendingBills(res?.data?.results);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

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
  useEffect(() => {
    getPendingBills();
  }, []);
  // console.log(BASE_URL+user_data.profilePic?.replace('Storage\\','/'));

  const _renderItem = ({item, index}) => {
    return (
      <View style={styles.uppersection2}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', marginTop:20}}>
          <Text style={{fontSize: vf(2.5), color: '#000'}}>
            {item.billType} Bill:
          </Text>
          <Text
            style={{
              fontSize: vf(2.5),
              color: '#000',
              backgroundColor: '#C1C3C0',
              borderRadius:10,
              paddingHorizontal:20,
            }}>
            {item.amount}Rs
          </Text>
        </View>
        <View style={styles.uppersection1}>
          <View>
            <Text
              style={{
                paddingRight: 30,
                fontSize: vf(1.8),
                color: 'black',
                // marginTop: 4,
              }}>
              billDate
            </Text>
            <Text
              style={{
                // paddingRight: 80,
                fontSize: vf(1.6),
                color: 'black',
                // marginTop: 4,
              }}>
              {item.billDate}
            </Text>
          </View>
          <View>
            <Text
              style={{
                paddingRight: 30,
                fontSize: vf(1.8),
                color: 'black',
                // marginTop: 4,
              }}>
              dueDate
            </Text>
            <Text
              style={{
                // paddingRight: 80,
                fontSize: vf(1.6),
                color: 'black',
                // marginTop: 4,
              }}>
              {item.dueDate}
            </Text>
          </View>
          <View>
            <Text
              style={{
                paddingRight: 5,
                fontSize: vf(1.8),
                color: 'black',
                // marginTop: 4,
              }}>
              Over Due Amount
            </Text>
            <Text
              style={{
                // paddingRight: 80,
                fontSize: vf(1.6),
                color: 'black',
                // marginTop: 4,
              }}>
              {item.overdueAmount}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => onNextPressed(item)}>
              <View
                style={{
                  // paddingVertical: 8,
                  paddingHorizontal: 10,
                  backgroundColor: '#204D6C',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderRadius: 50,
                  margin: 10,
                  padding: 5,
                }}>
                <Text
                  style={{
                    color: '#fff',
                  }}>
                  View
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              {/* onPress={() => onNextPressed(item)} */}
              <View
                style={{
                  backgroundColor: '#204D6C',
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderRadius: 50,
                  margin: 10,
                  padding: 5,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    borderRadius: 50,
                    // padding: 5,
                  }}>
                  Pay
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: vw(3)}}>
        <Text
          style={{
            // alignItems:'center',
            fontWeight: '500',
            fontSize: vf(3),
            color: '#000',
            paddingLeft: 20,
            marginTop: vh(3),
          }}>
          Pending Bills
        </Text>
      </View>
      <FlatList data={pendingBills} renderItem={_renderItem} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginVertical: vh(4),
          height: vh(7),
          width: vw(90),
          // marginHorizontal: vw(1.5),
          backgroundColor: '#89C93D',
          borderRadius: vw(5),
          padding: 5,
          marginTop: vh(10),
        }}>
        <Text
          style={{
            color: '#fff',
            alignSelf: 'center',
            fontSize: vf(2.5),
            // marginTop: 20,
            borderRadius: 50,
          }}>
          View Previous Bills
        </Text>
      </View>
    </ScrollView>
  );
};

export default PendingBills;

const styles = StyleSheet.create({
  uppersection1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    // paddingLeft: 20,
    height: vh(15),
  },
  uppersection2: {
    borderRadius: 10,
    paddingLeft: 20,
    margin: 10,
    // width: vw(100),
    backgroundColor: '#F5F4F8',
    elevation: 5,
    // height: vh(15),
  },
});
