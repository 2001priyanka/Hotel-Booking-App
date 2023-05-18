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
// import {MimeTypeMap} from '../../MimeTypeMap';
import {MimeTypeMap} from '../MimeTypeMap';
import DocumentPicker from 'react-native-document-picker';
import {PermissionsAndroid} from 'react-native';
import * as RNFS from 'react-native-fs';
// import {API_URI, BASE_URL} from '../../config/Config';
import {API_URI, BASE_URL} from '../config/Config';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const data = [
  {label: 'Electricity', value: 'ELECTRICITY'},
  {label: 'maintenance', value: 'MAINTENANCE'},
  {label: 'Plumbing', value: 'PLUMBING'},
  //   {label: 'Cheque copy', value: 'CHEQUE'},
  //   {label: 'Passport', value: 'PASSWORD'},
];

const Referral = ({route}) => {
  const navigation = useNavigation();
  const onNextPressed = () => {
    navigation.navigate('RoomList');
  };
  const docType = route?.params;
  const [imageUri, setimageUri] = useState(null);
  const [files, setFiles] = useState([]);
  const [label, setLabel] = useState(' ');
  const [loading, setLoading] = useState(null);
  const [user, setUserData] = useState(null);
  const [documentImageData, setDocumentImageData] = useState({
    tenant_id: '',
  });
  const [message, setMessage] = useState([]);
  const [value, setValue] = useState();
  const [isTrue, setIsTrue] = useState(false);
  // let userId = '6422b8e68d924ec8e15ea7e4';
  const userId = useSelector(reduxState => reduxState?.login?.user?.id);
  console.log(userId);

  const submitHandler = async () => {
    console.log('submitHandler called');
    if (imageUri) {
      console.log('CALL API');
      try {
        const RequestImageRes = await axios({
          url: API_URI + '/admin/request',
          method: 'POST',
          data: {
            user_id: userId,
            title: 'test',
            message: 'This is a test',
          },
        });
        if (RequestImageRes) {
          console.log('RequestImageRes ', RequestImageRes?.data?.data?._id);
          if (RequestImageRes?.data?.success) {
            //   navigate("/roomImages");
            uploadFilesToAPI(RequestImageRes?.data?.data?._id);
          }
        }
      } catch (error) {
        console.log('API error', error);
      }
    } else {
      window.alert('Required Fields Missing');
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
            }}>
            <IconFa name="chevron-left" size={20} />
          </View>
        </View>
        <View
          style={{
            // height: vh(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Text
            style={{
              textAlign: 'center',
              color: '#000',
              fontWeight: '400',
              fontSize: vf(3),
              marginVertical: vh(2.5),
            }}>
            please select the request
          </Text> */}
        </View>
        <View style={styles.title}>
          <Text style={{fontSize: vf(3), color: '#000'}}>Referral</Text>
        </View>
        <View style={{paddingHorizontal: 15, marginTop: 30}}>
          <Text style={{color: 'black', fontSize: vf(2)}}>UserName:</Text>
        </View>
        <TextInput
          placeholder="UserName"
          label="UserName"
          multiline={true}
          numberOfLines={2}
          style={styles.textArea}

          //   onChangeText={e => {
          //     console.log(e);
          //     setUsersData({
          //       ...usersData,
          //       address1: e,
          //     });
          //   }}
          //   value={usersData?.address1}
        />
        <View style={{paddingHorizontal: 15, marginTop: 10}}>
          <Text style={{color: 'black', fontSize: vf(2)}}>Email:</Text>
        </View>
        <TextInput
          placeholder="Email"
          label="Email"
          multiline={true}
          numberOfLines={2}
          style={styles.textArea}

          //   onChangeText={e => {
          //     console.log(e);
          //     setUsersData({
          //       ...usersData,
          //       address1: e,
          //     });
          //   }}
          //   value={usersData?.address1}
        />
        <View style={{paddingHorizontal: 15, marginTop: 10}}>
          <Text style={{color: 'black', fontSize: vf(2)}}>Mobile:</Text>
        </View>
        <TextInput
          placeholder="Mobile"
          label="Mobile"
          multiline={true}
          numberOfLines={2}
          style={styles.textArea}

          //   onChangeText={e => {
          //     console.log(e);
          //     setUsersData({
          //       ...usersData,
          //       address1: e,
          //     });
          //   }}
          //   value={usersData?.address1}
        />
        <View style={{paddingHorizontal: 15, marginTop:10}}>
          <Text style={{color: 'black', fontSize: vf(2)}}>Message:</Text>
        </View>
        <TextInput
          placeholder="Message"
          label="Message"
          multiline={true}
          numberOfLines={7}
          style={styles.textArea}

          //   onChangeText={e => {
          //     console.log(e);
          //     setUsersData({
          //       ...usersData,
          //       address1: e,
          //     });
          //   }}
          //   value={usersData?.address1}
        />

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
                padding: 15,
                marginTop: vh(5),
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
      </View>
    </ScrollView>
  );
};

export default Referral;

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
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textArea: {
    // height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: 'top',
    borderColor: '#A09C9C',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#204D6C',
    width: vw(15),
    height: vh(5),
    borderRadius: 10,
  },
});
