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

const Neft = ({route}) => {
  // const {data: roomId} = route?.params;
  // console.log('data', roomId);

  const [roomsDetails, setRoomsDetails] = useState({});
  const [allocationData, setAllocationData] = useState({
    message: '',
  });
  const navigation = useNavigation();

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

  // useEffect(() => {
  //   if (roomId) {
  //     showRooms();
  //     getAllocationData();
  //   }
  // }, [roomId]);
  // useEffect(() => {
  //   getSingleBuildingDetails();
  // }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: vh(100)}}>
      <ScrollView style={{height: vh(100)}}>
        <View
          style={{
            paddingHorizontal: 30,
            // paddingVertical: 20,
            justifyContent: 'center',
            // alignItems: 'center',
            flex: 1,
            // height: 1000,
            // backgroundColor: 'red',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 30,
              paddingVertical: 20,
              minHeight: 580,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 15,
            }}>
            <View style={{marginTop: 30}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  //   backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Pay Amount
                </Text>

                <View
                  style={{
                    backgroundColor: '#D7F7CB',
                    padding: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{fontSize: 18, fontWeight: '600', color: '#43D90A'}}>
                    ₹ 5000
                  </Text>
                </View>
              </View>
              <View style={{backgroundColor: 'white', marginTop: 20}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',

                    marginVertical: 5,
                    marginBottom: 8,
                    color: 'black',
                  }}>
                  STATE BANK OF INDIA (SBI)
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginBottom: 8,
                    color: 'black',
                  }}>
                  In favour of : Ian Joseph Somerhalder
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginBottom: 8,
                    color: 'black',
                  }}>
                  Account Type : Savings
                </Text>
                <Text style={{fontSize: 15, fontWeight: '500', color: 'black'}}>
                  Account no: 944358543
                </Text>

                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '500',
                    marginTop: 8,
                    color: 'black',
                  }}>
                  IFSC no: SBIN98293994
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 1,
                }}>
                {/* <Image
                  source={{
                    uri: imageUri,
                  }}
                  style={{width: 300, height: 300}}
                /> */}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 15,
                }}>
                <TouchableOpacity
                  //   onPress={() => {
                  //     selectAllFiles();
                  //   }}
                  style={{width: 170}}
                  // style={{position: 'absolute', bottom: 10, right: 10, marginTop: 10}}
                >
                  <View
                    style={{ 
                      borderWidth: 1.5,
                      borderColor: '#43D90A',
                      padding: 10,
                      marginTop: 2,
                      borderRadius: 15,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* {imageUri ? ( */}
                    {/* <IconFa name="refresh" size={25} /> */}
                    {/* ) : ( */}
                    <IconFa name="plus" size={25} />
                    {/* )} */}
                    <Text>
                      {/* {imageUri ? 'Reselect Screenshot' : 'Add Screenshot'} */}
                      Add Screenshot
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* {imageUri ? ( */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 40,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('PaymentOptions');
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: '500',
                        padding: 20,
                        color: 'black',
                      }}>
                      Cancel
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  //   onPress={submitTransaction}
                  style={{
                    backgroundColor: '#43D90A',
                    borderRadius: 15,
                    marginBottom: 15,
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '500',
                      color: 'white',
                      padding: 15,
                    }}>
                    Make Payment
                  </Text>
                </TouchableOpacity>
              </View>
              {/* ) : null} */}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Neft;

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
