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
import React, {useEffect, useState} from 'react';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {Dropdown} from 'react-native-element-dropdown';
import {MimeTypeMap} from '../../MimeTypeMap';
import DocumentPicker from 'react-native-document-picker';
import {PermissionsAndroid} from 'react-native';
import * as RNFS from 'react-native-fs';
import {API_URI, BASE_URL, URL} from '../../config/Config';
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
  const [label, setLabel] = useState(' ');
  const [loading, setLoading] = useState(null);
  const [user, setUserData] = useState(null);
  // const [transactiondetails, setTransactionDetails] = useState({
  //   user2_id: '',
  //   tokens: '',
  //   amount: '',
  //   txn_id: '',
  //   txn_mode: '',
  //   txn_channel: '',
  //   txn_meta: '',
  //   type: 'BUY',
  //   screenshot: '',
  // });
  const [value, setValue] = useState(null);
  const [isTrue, setIsTrue] = useState(false);
  let userId = '6422b8e68d924ec8e15ea7e4';

  const getUserData = async () => {
    console.log('getuser called');
    try {
      const res = await axios({
        url: API_URI + `/admin/user/${userId}`,
        method: 'GET',
      });
      if (res) {
        console.log('USER DETAIL success', res?.data?.results);
        setUserData(res?.data?.results)
        // uploadFilesToAPI(res?.data?.results[i]?._id);
        // Alert.alert('Purchase Successful!!');

        // navigation.navigate('home');
      }
    } catch (error) {
      console.log('submit error', error);
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
      setimageUri(res[0].uri);
      setFiles(res[0]);
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
          model_key: 'document',
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
      uploadFilesToAPI(userId);
    }
  }, [files]);

  useEffect(() => {
    getUserData();
  }, []);

  console.log(imageUri);
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, padding: vw(5), position: 'relative'}}>
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
            // height: vh(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#000',
              fontWeight: '400',
              fontSize: vf(3),
              marginVertical: vh(5),
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
            // backgroundColor='#000'
            containerStyle={{borderColor: '#000'}}
            itemTextStyle={{color: '#000'}}
            itemContainerStyle={{borderBottomWidth: 0.1}}
            search
            maxHeight={270}
            labelField="label"
            valueField="value"
            placeholder="Select item"
            searchPlaceholder="Search..."
            value={value}
            // backgroundColor="#234459"
            onChange={item => {
              console.log(item);
              setValue(item.value);
              setLabel(item.label);
            }}
            renderLeftIcon={() => (
              <IconFa
                style={styles.icon}
                name="shield-account-outline"
                color="black"
                size={20}
              />
            )}
          />
        </View>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            height: vh(30),
            width: vw(90),
            marginTop: vh(4),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius:vw(2)

          }} onPress={() => selectAllFiles()}>
          <Image
            source={imageUri? imageUri:{uri:BASE_URL+ user?.document.replace('Storage\\',"/")}}
            style={{height: vh(25), width: vw(80), overflow: 'hidden'}}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={{marginVertical: vh(3)}}>
          <Text style={{textAlign: 'center'}}>{label ? label : ' '}</Text>
        </View>
        <TouchableOpacity
          style={
            imageUri
              ? {display: 'none', position: 'absolute'}
              : {justifyContent: 'center', alignItems: 'center'}
          }
          >
          <View
            style={{
              //   top: vh(0),
              height: vh(9),
              backgroundColor: '#89C93D',
              width: vw(80),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: vw(5),
            }}>
            <Text style={{fontSize: vf(2.5), color: '#fff'}}>
              upload document
            </Text>
          </View>
        </TouchableOpacity>
        {imageUri ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // marginVertical: vh(25),
              // marginRight: 20,
            }}>
            <TouchableOpacity
              onPress={()=>uploadFilesToAPI()}
              style={{width: 250}}
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
                  upload
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
    width: vw(70),
    backgroundColor: '#234459',
    paddingHorizontal: vw(5),
    borderRadius: vw(2),
    // color:'#fff'
  },
  icon: {
    marginRight: 10,
    color: '#fff',
  },
  placeholderStyle: {
    fontSize: vf(2),
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
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
