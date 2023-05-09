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

const ShowInterest = ({route}) => {
  const {data: roomId} = route?.params;
  console.log('data', roomId);

  const [roomsDetails, setRoomsDetails] = useState({});
  const [allocationData, setAllocationData] = useState({
    message: '',
  });
  // const [buidingsDetails, setBuidingsDetails] = useState([]);

  const showRooms = async () => {
    try {
      const res = await axios({
        url: API_URI + `/user/room/${roomId.key}`,
        method: 'GET',
        // data: roomId.key,
      });
      if (res) {
        console.log('showRooms', res);
        setRoomsDetails(res?.data?.results);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const getAllocationData = async () => {
    try {
      const res = await axios({
        url: API_URI + '/user/allocation',
        method: 'POST',
        // data: {
        //   message:'hello want to see the rooms'
        // }
      });
      if (res) {
        console.log('getAllocationData', res);
        setAllocationData(res?.data?.results);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const submitHandler = async () => {
    console.log('submitHandler called');
    if (
      // allocationData.room_id != '' &&
      // allocationData.user_id != '' &&
      // allocationData.owner_id != '' &&
      // allocationData.manager_id != '' &&
      allocationData.message
      // allocationData.rent != '' &&
      // allocationData.deposit
    ) {
      console.log('CALL API');

      try {
        const allocationRes = await axios({
          url: API_URI + '/admin/allocation',
          method: 'POST',
          data: {
            ...allocationData,
          },
        });

        if (allocationRes) {
          console.log('allocationRes ', allocationRes);
          if (allocationRes?.data?.success) {
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
      showRooms();
      getAllocationData();
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
                fontSize: vf(3),
                marginVertical: vh(2),
              }}>
              Contact Us
            </Text>
          </View>
          <View>
            <Text style={{color: 'black', fontSize: vf(2)}}>
              Building Name :
              {roomsDetails.building_id && roomsDetails.building_id[0]?.name}
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{color: 'black', fontSize: vf(2)}}>
              Rent: Rs {roomsDetails && roomsDetails?.rent}
            </Text>
          </View>
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
              setAllocationData({
                ...allocationData,
                message: e
              });
            }}
            value={allocationData?.address1}
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
                borderRadius: vw(5),
                padding: 5,
              }}>
              <Text
                style={{
                  color: '#fff',
                  alignSelf: 'center',
                  fontSize: vf(2.5),
                  borderRadius: 50,
                }}>
                Show Interest
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
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
        </TouchableOpacity> */}

          {/* <TextInput
          placeholder="Aadhar Card Number"
          style={{
            height: vh(9),
            width: vw(90),
            borderBottomWidth: 1,
            padding: 20,
            paddingHorizontal: 30,
          }}
        /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShowInterest;

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
