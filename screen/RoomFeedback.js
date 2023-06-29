import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {API_URI, BASE_URL} from '../config/Config';
import axios from 'axios';
import {useSelector} from 'react-redux';

const RoomFeedback = ({route}) => {
  const {data: roomId} = route?.params;
  console.log('data', roomId);
  const userId = useSelector(reduxState => reduxState?.login?.user?.id);
  console.log(userId);
  const [feedbackData, setFeedbackData] = useState({
    message: '',
  });
  // const [allocationData, setAllocationData] = useState({

  // });
  // const [buidingsDetails, setBuidingsDetails] = useState([]);

  const showFeedbacks = async () => {
    try {
      const res = await axios({
        url: API_URI + `/user/feedback/`,
        method: 'GET',
        // data: roomId.key,
      });
      if (res) {
        console.log('showFeedbacks', res);
        setFeedbackData(res?.data?.results);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // const getFeedbackData = async () => {
  //   try {
  //     const res = await axios({
  //       url: API_URI + '/user/feedback',
  //       method: 'POST',
  //       // data: {
  //       //   message:'hello want to see the rooms'
  //       // }
  //     });
  //     if (res) {
  //       console.log('getFeedbackData', res);
  //       setAllocationData(res?.data?.results);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };
  const submitHandler = async () => {
    console.log('submitHandler called');
    if (
      // allocationData.room_id != '' &&
      // allocationData.user_id != '' &&
      // allocationData.owner_id != '' &&
      // allocationData.manager_id != '' &&
      feedbackData.message
      // allocationData.rent != '' &&
      // allocationData.deposit
    ) {
      console.log('CALL API');

      try {
        const feedbackRes = await axios({
          url: API_URI + '/user/feedback',
          method: 'POST',
          data: {
            ...feedbackData,
            // room_id: roomId.key,
            user_id: userId,
            feedbackCategory: 'ROOM',
          },
        });

        if (feedbackRes) {
          console.log('feedbackRes ', feedbackRes);
          if (feedbackRes?.data?.success) {
            Alert.alert(
              'Feedback Sent',
              'Thank You for your Feedback \nWe will get in touch with you soon!',
            );
            // navigate('/allocations');
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
    if (roomId) {
      showFeedbacks();
    }
  }, [roomId]);
  // useEffect(() => {
  //   getSingleBuildingDetails();
  // }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: vh(100)}}>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{flex: 1, padding: vw(5), position: 'relative'}}>
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
                fontSize: vf(3.5),
                marginVertical: vh(2),
                fontWeight: '500',
              }}>
              Your Feedback
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}></View>
          <View style={{marginTop: 30}}>
            <Text style={{color: 'black', fontSize: vf(2), padding: 10}}>
              Message:
            </Text>
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

          <TouchableOpacity onPress={submitHandler}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginVertical: vh(4),
                height: vh(7),
                width: vw(80),
                backgroundColor: '#89C93D',
                borderRadius: vw(3),
                padding: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontSize: vf(2.5),
                  // borderRadius: 0,
                  fontWeight: '500',
                }}>
                upload
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomFeedback;

const styles = StyleSheet.create({
  uppersection1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 30,
    width: vw(90),
    paddingLeft: 20,
    backgroundColor: '#F5F4F8',
    height: vh(10),
  },
  uppersection2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30,
    width: vw(40),
    backgroundColor: '#F5F4F8',
    height: vh(7),
  },
  textArea: {
    // height: 100,
    // margin: 12,
    borderWidth: 1,
    // padding: 10,
    width: vw(90),
    // height: vh(30),
    borderRadius: 8,
    textAlignVertical: 'top',
    borderColor: '#A09C9C',
  },
});
