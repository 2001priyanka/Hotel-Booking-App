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

const Payments = ({route}) => {
  // const {data: roomId} = route?.params;
  // console.log('data', roomId);

  const [roomsDetails, setRoomsDetails] = useState({});
  const [allocationData, setAllocationData] = useState({
    message: '',
  });
  const navigation = useNavigation();

  const gpayPayemnt = () => {
    navigation.navigate('Gpay');
  };
  const neftPayment = () => {
    navigation.navigate('Neft');
  };
  // const [buidingsDetails, setBuidingsDetails] = useState([]);

  // const showRooms = async () => {
  //   try {
  //     const res = await axios({
  //       url: API_URI + `/user/room/`,
  //       method: 'GET',
  //       // data: roomId.key,
  //     });
  //     if (res) {
  //       console.log('showRooms', res);
  //       setRoomsDetails(res?.data?.results);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

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
        <View style={{backgroundColor: 'white', flex: 1}}>
          <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate('BuyCoin');
          // }}
          >
            <IconFa name="chevron-left" size={40} style={{top: 10, left: 10}} />
          </TouchableOpacity>

          {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
            
          </View> */}

          <Text
            style={{
              fontSize: 28,
              fontWeight: '600',
              // marginLeft: 50,
              color: 'black',
              marginTop: 10,
              alignSelf: 'center',
            }}>
            Make Payment:
          </Text>

          <View
            style={{
              paddingHorizontal: 10,
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F4F6F9',
                borderRadius: 100,
                padding: 20,
                paddingHorizontal: 10,
                marginTop: 15,
                justifyContent: 'space-around',
              }}>
              <Text style={{fontSize: 18, fontWeight: '500', color: 'black'}}>
                Amount: Rs 5000
                {/* {amount} */}
              </Text>
            </View>
          </View>
          <View
            style={{
              // paddingHorizontal: 10,
              position: 'relative',
              marginTop: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Image
              source={require('../../assets/images/verticle.jpg')}
              style={{
                borderRadius: 100,
                width: 50,
                height: 50,
                zIndex: 999,
                // marginLeft: 150,
                marginTop: -8,
              }}
            /> */}
            <Text style={{position: 'absolute', zIndex: 0, left: 10}}>
              -------------------------------------------------------------------------------------------------
            </Text>
          </View>

          <View
            style={{
              // flexDirection: 'row',
              // justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginTop: 10,
            }}>
            {/* <View
          style={{
            borderWidth: 2,
            borderColor: '#F4F6F9',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 70,
            borderRadius: 100,
          }}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>500{tokens}</Text>
        </View> */}
          </View>

          <View
            style={{
              marginTop: 50,
              // borderTopWidth: 1,
              borderTopColor: 'lightgray',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <View
                className="row1"
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',

                  width: vw(75),
                  height: vh(8),
                  borderWidth: 1,
                  borderColor: 'gray',
                  borderRadius: 10,
                  padding: 10,
                  backgroundColor: 'white',
                }}>
                <View>
                  <Image
                    source={{
                      uri: 'https://cdn-images-1.medium.com/max/1200/1*NKfnk1UF9xGoR0URBEc6mw.png',
                    }}
                    style={{height: vh(4), width: vw(8)}}
                  />
                </View>
                <Text style={{marginLeft: 10}}>Pay using Razorpay</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                // onPress={() => {
                //   navigation.navigate('Gpay', {
                //     tokens,
                //     amount,
                //   });
                // }}
                onPress={gpayPayemnt}>
                <View
                  className="row1"
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: vw(75),
                    height: vh(8),
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 10,
                    padding: 10,
                    backgroundColor: 'white',
                  }}>
                  <View>
                    <Image
                      source={{
                        uri: 'data:image/png;base64,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',
                      }}
                      style={{height: vh(4), width: vw(8)}}
                    />
                  </View>
                  <Text style={{marginLeft: 10}}>Pay using Google</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              //   onPress={() => {
              //     navigation.navigate('Neft', {
              //       tokens,
              //       amount,
              //     });
              //   }}
              onPress={neftPayment}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <View
                  className="row1"
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: vw(75),
                    height: vh(8),
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderRadius: 10,
                    padding: 10,
                    backgroundColor: 'white',
                  }}>
                  <View>
                    <Image
                      source={{
                        uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1qmiMrdDOAA38l2t9d4bkNZG9D6p7Jl_OKtqKXmgIhb1YF-rhOw4hm1kTaTDr9HgYp_U&usqp=CAU',
                      }}
                      style={{height: 30, width: 35}}
                    />
                  </View>
                  <Text style={{marginLeft: 10}}>Pay using NEFT</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Payments;

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
