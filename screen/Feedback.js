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

const Feedback = ({route}) => {
  const {data: roomId} = route?.params;
  console.log('data', roomId.key);
  const navigation = useNavigation();

  const docType = route?.params;

  const [feedbackData, setFeedbackData] = useState({
    mobile: '',
    email: '',
    message: '',
  });
  // userId = '6422b8e68d924ec8e15ea7e4';
  const userId = useSelector(reduxState => reduxState?.login?.user?.id);
  console.log(userId);

  const getFeedbackData = async () => {
    try {
      const res = await axios({
        url: API_URI + `/user/feedback/${roomId.key}`,
        method: 'POST',
        // data: {
        //   message:'hello want to see the rooms'
        // }
      });
      if (res) {
        console.log('getFeedbackData', res);
        setFeedbackData(res?.data?.results);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const submitHandler = async () => {
    console.log('submitHandler called');
    if (feedbackData.message) {
      console.log('CALL API');

      try {
        const feedbackRes = await axios({
          url: API_URI + `/user/feedback/${roomId.key}`,
          method: 'POST',
          data: {
            ...feedbackData,
            feedbackCategory: 'ROOM',
            // user_id: userId,
            // title: 'test',
            // message: 'This is a test',
            // mobile: '832842347',
            // email: 'test@gmail.com',
            data: {key: roomId.key},
          },
        });
        if (feedbackRes) {
          console.log('feedbackRes ', feedbackRes);
          if (feedbackRes?.data?.success) {
            //   navigate("/roomImages");
            // uploadFilesToAPI(feedbackRes?.data?.data?._id);
          }
        }
      } catch (error) {
        console.log('API error', error);
      }
    } else {
      window.alert('Required Fields Missing');
    }
  };

  useEffect(() => {
    getFeedbackData();
  }, []);
  // const submitHandler = async () => {
  //   console.log('submitHandler called');
  //   if (
  //     feedbackData.user_id != '' &&
  //     feedbackData.mobile != '' &&
  //     feedbackData.email != '' &&
  //     feedbackData.message
  //   ) {
  //     console.log('CALL API');

  //     try {
  //       const feedbackRes = await axios({
  //         url: API_URI + '/admin/feedback',
  //         method: 'POST',
  //         data: {
  //           ...feedbackData,
  //         },
  //       });

  //       if (feedbackRes) {
  //         console.log('feedbackRes ', feedbackRes?.data?.data?._id);
  //         // if (feedbackRes?.data?.success) {
  //         //   //   navigate("/roomImages");
  //         //   // uploadFilesToAPI(feedbackRes?.data?.data?._id);
  //         // }
  //       }
  //     } catch (error) {
  //       console.log('API error', error);
  //     }
  //   } else {
  //     window.alert('Required Fields Missing');
  //   }
  // };

  // console.log(imageUri);
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
          <Text style={{fontSize: vf(3), color: '#000'}}>Feedback</Text>
        </View>
        {/* <View style={{paddingHorizontal: 15, marginTop: 30}}>
          <Text style={{color: 'black', fontSize: vf(2)}}>UserName:</Text>
        </View> */}
        {/* <TextInput
          placeholder="UserName"
          label="UserName"
          multiline={true}
          numberOfLines={2}
          style={styles.textArea}
          onChangeText={e => {
            console.log(e);
            setFeedbackData({
              ...feedbackData,
              user_id: e,
            });
          }}
          value={feedbackData?.user_id}
        /> */}
        <View style={{paddingHorizontal: 15, marginTop: 10}}>
          <Text style={{color: 'black', fontSize: vf(2)}}>Email:</Text>
        </View>
        <TextInput
          placeholder="Email"
          label="Email"
          multiline={true}
          numberOfLines={2}
          style={styles.textArea}
          onChangeText={e => {
            console.log(e);
            setFeedbackData({
              ...feedbackData,
              email: e,
            });
          }}
          value={feedbackData?.email}
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
          onChangeText={e => {
            console.log(e);
            setFeedbackData({
              ...feedbackData,
              mobile: e,
            });
          }}
          value={feedbackData?.mobile}
        />
        <View style={{paddingHorizontal: 15, marginTop: 10}}>
          <Text style={{color: 'black', fontSize: vf(2)}}>Message:</Text>
        </View>
        <TextInput
          placeholder="Message"
          label="Message"
          multiline={true}
          numberOfLines={7}
          style={styles.textArea}
          onChangeText={e => {
            console.log(e);
            setFeedbackData({
              ...feedbackData,
              message: e,
            });
          }}
          value={feedbackData?.message}
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

export default Feedback;

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
