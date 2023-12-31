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
// import {Dropdown} from 'react-native-element-dropdown';
import {MimeTypeMap} from '../../MimeTypeMap';
import DocumentPicker from 'react-native-document-picker';
import {PermissionsAndroid} from 'react-native';
import * as RNFS from 'react-native-fs';
import {API_URI, BASE_URL} from '../../config/Config';
import axios from 'axios';
import {useSelector} from 'react-redux';

const data = [
  {label: 'Aadhar card', value: 'AADHAR'},
  {label: 'Pan card', value: 'PAN'},
  {label: 'Document', value: 'DOCUMENT'},
  {label: 'Address proof', value: 'ADDRESS'},
  {label: 'Cheque copy', value: 'CHEQUE'},
  {label: 'Passport', value: 'PASSWORD'},
  {label: 'police verification form', value: 'POLICE VERIFICATION FORM'},
];

const DocumentUpload2 = ({route}) => {
  const docType = route?.params
  const [imageUri, setimageUri] = useState(null);
  const [files, setFiles] = useState([]);
  const [label, setLabel] = useState(' ');
  const [loading, setLoading] = useState(null);
  const [user, setUserData] = useState(null);
   const [documentNo, setDocumentNo] = useState({
     documentNumber: '',
     userId,
     docType,
   });
 
  const [value, setValue] = useState(docType);
  const [isTrue, setIsTrue] = useState(false);
  // let userId = '6422b8e68d924ec8e15ea7e4';
  const userId = useSelector(reduxState => reduxState?.login?.user?.id)
   console.log(userId)
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
      setimageUri(null);
      setFiles(null);
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
  
   const submitHandler = async () => {
     console.log('submitHandler called');
     if (imageUri && docType) {
       console.log('CALL API');
       try {
         const DocumentImageRes = await axios({
           url: API_URI + '/admin/document',
           method: 'POST',
           data: {
            //  tenant_id: userId,
            //  docType
             ...documentNo,
           },
         });
         if (DocumentImageRes) {
           console.log('DocumentImageRes ', DocumentImageRes?.data?.data?._id);
           if (DocumentImageRes?.data?.success) {
             //   navigate("/roomImages");
             uploadFilesToAPI(DocumentImageRes?.data?.data?._id);
           }
         }
       } catch (error) {
         console.log('API error', error);
       }
     } else {
       window.alert('Required Fields Missing');
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
          model: 'document',
          model_key: 'media1',
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
        </View>
        {/* <View
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
        </View> */}
        <TouchableOpacity
          style={{
            borderWidth: 1,
            height: vh(30),
            width: vw(90),
            marginTop: vh(4),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: vw(2),
          }}
          onPress={() => selectAllFiles()}>
          <Image
            source={
              imageUri
                ? {uri: imageUri}
                : {uri: BASE_URL + user?.document.replace('Storage\\', '/')}
            }
            style={{height: vh(25), width: vw(80), overflow: 'hidden'}}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={{marginVertical: vh(3)}}>
          <Text style={{textAlign: 'center'}}>{label ? label : ' '}</Text>
        </View>
        {imageUri ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => submitHandler()}
              style={{width: 250}}>
              <View
                style={{
                  paddingVertical: 15,
                  marginTop: 20,
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

export default DocumentUpload2;

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
