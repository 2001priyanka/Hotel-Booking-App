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

const Details = ({route}) => {
  const {data: roomId} = route?.params;
  console.log('data', roomId.key);

  const [roomsDetails, setRoomsDetails] = useState({});
  // const [buidingsDetails, setBuidingsDetails] = useState([]);

  const getSingleRoomsDetails = async () => {
    try {
      const res = await axios({
        url: API_URI + `/user/room/${roomId.key}`,
        method: 'GET',
        // data: roomId.key,
      });
      if (res) {
        console.log('getSingleRoomsDetails', res);
        setRoomsDetails(res?.data?.results);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  // const getSingleBuildingDetails = async () => {
  //   try {
  //     const res = await {
  //       url: API_URI + `/user/building`,
  //       method: 'GET',
  //     };
  //     if (res) {
  //       console.log('getSingleBuildingDetails', res);
  //       setBuidingsDetails(res?.data?.results);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  useEffect(() => {
    if (roomId) {
      getSingleRoomsDetails();
    }
  }, [roomId]);
  // useEffect(() => {
  //   getSingleBuildingDetails();
  // }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: vh(100)}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            borderRadius: 20,
          }}>
          {roomsDetails?.photo && (
            <Image
              // source={require('../images/11.jpg')}
              source={{
                uri: BASE_URL + roomsDetails?.photo?.replace('Storage\\', ''),
              }}
              style={{height: vh(50), width: vw(90), borderRadius: 40}}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
          }}>
          <View>
            <Text style={{fontSize: vf(3), color: 'black'}}>
              {roomsDetails?.building_id && roomsDetails?.building_id[0]?.name}
            </Text>
            <Text style={{fontSize: vf(2)}}>
              <IconFa name="map-marker" style={{fontSize: vf(2)}} />
              {roomsDetails.building_id && roomsDetails.building_id[0]?.state}
            </Text>
          </View>
          <View>
            <Text style={{fontSize: vf(3), color: 'black'}}>
              Rs{roomsDetails?.rent}
            </Text>
            <Text style={{fontSize: vf(2)}}>per month</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
          }}>
          <View
            style={{
              backgroundColor: '#8BC83F',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              paddingHorizontal: 30,
              height: vh(7),
              width: vw(70),
            }}>
            <Text style={{color: 'white'}}>Rent</Text>
          </View>
          {/* <View
            style={{
              backgroundColor: '#F5F4F8',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              paddingHorizontal: 40,
            }}>
            <Text>Buy</Text>
          </View> */}
        </View>
        <View style={styles.uppersection1}>
          <View>
            <Image
              source={require('../images/image5.jpg')}
              //   resizeMode="contain"
              style={{
                height: vh(4),
                width: vw(14),
                height: vh(7),
                borderRadius: vw(10),
              }}
            />
          </View>
          <View>
            <Text
              style={{
                paddingLeft: 20,
                fontSize: vf(2.5),
                color: 'black',
                // marginTop: 4,
              }}>
              {roomsDetails.manager_id && roomsDetails.manager_id[0]?.name}
            </Text>
            <Text
              style={{
                paddingLeft: 20,
                fontSize: vf(2),
                color: 'black',
                // marginTop: 4,
              }}>
              Real Estate Agency
            </Text>
          </View>
          <View>
            <IconFa
              name="chat-processing-outline"
              style={{fontSize: vf(3.5), paddingLeft: 70}}
            />
          </View>
        </View>
        {/* <FlatList data={roomsDetails} renderItem={_renderItem} /> */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.uppersection2}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: vf(2),
                  paddingLeft: 10,
                  color: 'black',
                }}>
                {roomsDetails.bedrooms} Bedrooms
              </Text>
            </View>
          </View>
          <View style={styles.uppersection2}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: vf(2),
                  paddingLeft: 10,
                  color: 'black',
                }}>
                {roomsDetails.bathrooms} Bathrooms
              </Text>
            </View>
          </View>
          <View style={styles.uppersection2}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{
                  fontSize: vf(2),
                  paddingLeft: 10,
                  color: 'black',
                }}>
                {roomsDetails.halls} Halls
              </Text>
            </View>
          </View>
        </ScrollView>
        <View>
          <Text
            style={{
              fontSize: vf(2.5),
              marginTop: 20,
              color: 'black',
              paddingLeft: 20,
            }}>
            Location & Public Facilities
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            margin: 20,
          }}>
          {/* <View>
                <Text>hello</Text>
            </View> */}
          <IconFa name="map-marker" style={{fontSize:20}} />
          <View>
            <Text style={{paddingLeft: 10, color: 'black'}}>
              {roomsDetails.building_id &&
                roomsDetails.building_id[0]?.address1}
            </Text>
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;

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
});
