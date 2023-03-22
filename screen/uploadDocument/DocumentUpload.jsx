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
import React, {useState} from 'react';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {Dropdown} from 'react-native-element-dropdown';
import { MimeTypeMap } from '../../MimeTypeMap';
import DocumentPicker from 'react-native-document-picker';
import {PermissionsAndroid} from 'react-native';
import * as RNFS from 'react-native-fs';
import { API_URI,URL } from '../../config/Config';
import axios from 'axios';

const data = [
  {label: 'Aadhar card', value: '1'},
  {label: 'Pan card', value: '2'},
  {label: 'Address proof', value: '3'},
  {label: 'Cheque copy', value: '4'},
  {label: 'Passport', value: '5'},
 
];

const DocumentUpload = () => {
    const [imageUri, setimageUri] = useState(null);
    const [files, setFiles] = useState([]);
    const [file, setFile] = useState(null);
    const [users, setUsers] = useState([]);
    const [transactiondetails, setTransactionDetails] = useState({
        user2_id: '',
        tokens: '',
        amount: '',
        txn_id: '',
        txn_mode: '',
        txn_channel: '',
        txn_meta: '',
        type: 'BUY',
        screenshot: '',
      });
  const [value, setValue] = useState(null);
  const [isTrue, setIsTrue] = useState(false);
  const submitTransaction = async () => {
    try {
      const res = await axios({
        url: API_URI + '/transaction',
        method: 'POST',
        data: {
          ...transactiondetails,
          tokens,
          amount,
          screenshot: imageUri,
        },
      });
      if (res) {
        console.log('transaction success', res);
        uploadFilesToAPI(res?.data?.transaction?._id);
        Alert.alert('Purchase Successful!!');

        navigation.navigate('home');
      }
    } catch (error) {
      console.log('submit error', error);
    }
  };
  const requestCameraPermission = async () => {
    try {
      // const granted = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.CAMERA,
      //   {
      //     title: 'App Camera Permission',
      //     message: 'App needs access to your camera ',
      //     buttonNeutral: 'Ask Me Later',
      //     buttonNegative: 'Cancel',
      //     buttonPositive: 'OK',
      //   },
      // );
      // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        // PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
        // PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        // PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
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
        // const options = {
        //   storageOptions: {
        //     path: 'images',
        //     mediaType: 'photo',
        //   },
        //   includeBase64: true,
        // };
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const selectAllFiles = async () => {
    setimageUri(null);
    setFiles(null);
    setFile(null);
    requestCameraPermission();
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });
      //Printing the log realted to the file
      console.log('123asdrfvbgt res x: ', res);
      console.log('123asdrfvbgt typeof res : ' + typeof res);
      console.log('123asdrfvbgt URI : ' + res[0].uri);
      console.log('123asdrfvbgt Type : ' + res[0].type);
      console.log('123asdrfvbgt File Name : ' + res[0].name);
      console.log('123asdrfvbgt File Size : ' + res[0].size);
      setimageUri(res[0].uri);
      setIsTrue(true);

      //Setting the state to show single file attributes
      setFiles(res[0]);
      console.log('123asdrfvbgt results>>', res);

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
    const data = files;
    // console.log('Config 9fb83f', Config);
    // Check if any file is selected or not
    var uploadUrl = `${URL}/upload`; // For testing purposes, go to http://requestb.in/ and create your own link
    try {
      // create an array of objects of the files you want to upload
      var filesArr = [];
      // files.map(async (item, index) => {
      if (files.uri.startsWith('content://')) {
        const urlComponents = files.uri.split('/');
        // const fileNameAndExtension = urlComponents[urlComponents.length - 1];
        const destPath = `${RNFS.ExternalCachesDirectoryPath}/${files.name}.${
          MimeTypeMap[files.type]
        }`;

        filesArr.push({
          name: files.name + MimeTypeMap[files.type],
          // name: 'file',
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
        console.log('UPLOAD HAS BEGUN! JobId: ' + jobId, filesArr);
      };
      // uploadFiles;
      var uploadProgress = response => {
        var percentage = Math.floor(
          (response.totalBytesSent / response.totalBytesExpectedToSend) * 100,
        );
        console.log('UPLOAD IS ' + percentage + '% DONE!');
      };
      RNFS.uploadFiles({
        toUrl: uploadUrl,
        files: filesArr,
        method: 'POST',
        headers: {
          Accept: '*/*',
          // 'Content-Type': 'multipart/form-data',
        },
        fields: {
          // name: 'MHN1.mp3',
          model_id: _id,
          model: 'transaction',
          model_key: 'screenshot',
          // user_id: doc.id,
          // reqType: 'FCM_BCAST',
        },
        begin: uploadBegin,
        progress: uploadProgress,
      })
        .then(response => {
          console.log('responseZZZ1', response);
          if (response.statusCode == 200) {
            console.log('FILES UPLOADED!'); // response.statusCode, response.headers, response.body
            Alert.alert('Purchase Successful!!');
            navigation.navigate('Dashboard');
          } else {
            console.log('SERVER ERROR');
          }
        })
        .catch(err => {
          if (err.description === 'cancelled') {
            // cancelled by user
          }
          console.log(err);
        });
    } catch (error) {
      console.log('UPLOADS', error);
    }
    if (data != null && data?.length > 0 && false) {
      // If file selected then create FormData
      const fileToUpload = data;
      const form = new FormData();

      console.log('TextReq.js:290 58eef2 item', filesArr);
      filesArr.map((item, index) => {
        // form.append(`files[${index}]`, item);
        // console.log('TextReq.js:231 b3f667 ', {
        //   uri: item?.uri,
        //   name: 'image.jpg',
        //   type: 'image/jpeg',
        // });
      });
      // form.append('files', {
      //   uri: fileToUpload[0]?.uri,
      //   name: 'image.jpg',
      //   type: 'image/jpeg',
      // });
      // form.append('files[]', fileToUpload);
      form.append('files', filesArr);
      // form.append('files', fileToUpload[0]);
      // form.append('apiRoute', 'prescription');
      form.append('userId', doc._id);
      console.log('TextReq.js:227 9fb83f form', form);
      await axios({
        url: `${URL}/upload`,
        // url: 'http://3.16.156.10:3001/api/upload',
        //url: 'http://13.232.211.114:3000/api/upload',
        method: 'POST',
        data: form,
        headers: {
          'Content-Type': 'multipart/form-data; boundary=BOUNDARY',
          // 'Access-Control-Allow-Origin': '*',
          // 'Access-Control-Allow-Credentials': true,
        },
      })
        .then(res => {
          console.log('res.data >>> ' + res.data);
          if (res.data) {
            alert('File Upload Successfully!');
          }
        })
        .catch(err => {
          alert(err);
          console.log('err >>> ' + err);
        });
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex:1,padding: vw(5), position: 'relative'}}>
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
          <Text style={{color: '#000', fontSize: vf(2.5)}}>
            Upload document
          </Text>
          <Text style={{color: '#fff'}}>hhhhhhg</Text>
        </View>
        <View
          style={{
            height: vh(50),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
              fontWeight: '400',
              fontSize: vf(3),
              marginVertical:vh(5)
            }}>
            please select the file to upload
          </Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={value}
            // backgroundColor="#234459"
            onChange={item => {
              setValue(item.value);
            }}
            renderLeftIcon={() => (
              <IconFa style={styles.icon} name="shield-account-outline" color="black" size={20} />
            )}
          />
          
        </View>
        <TouchableOpacity
          style={imageUri?{display:'none'}:{height:vh(50), justifyContent: 'center', alignItems: 'center'}}
          onPress={() => selectAllFiles()}
          >
          <View
            style={{
            //   position: 'absolute',
            //   top: vh(0),
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
        {imageUri ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: vh(25),
                // marginRight: 20,
              }}>
              <TouchableOpacity
                onPress={() => {
                  submitTransaction();
                }}
                style={{width: 250,}}
                // style={{position: 'absolute', bottom: 10, right: 10, marginTop: 10}}
              >
                <View
                  style={{
                    padding: 15,
                    marginTop: 2,
                    borderRadius: 15,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#89C93D',
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: '500',
                      color: 'white',
                    }}>
                    Make Payment
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
      </View>
    </ScrollView>
  );
};

export default DocumentUpload;

const styles = StyleSheet.create({
  dropdown: {
    margin: vw(4),
    height: vh(8),
    borderBottomColor: '#234459',
    borderBottomWidth: 0.5,
    width:vw(70),
    backgroundColor:'#234459',
    paddingHorizontal:vw(5),
    borderRadius:vw(2)
    // color:'#fff'
  },
  icon: {
    marginRight: 10,
    color:'#fff'
  },
  placeholderStyle: {
    fontSize: vf(2),
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'#fff',
    fontWeight:'600'
  },
  iconStyle: {
    width: vw(5),
    height: vh(3),
    // color:'#fff'
  },
  inputSearchStyle: {
    height: vh(5),
    fontSize: vf(2),
  },
});
