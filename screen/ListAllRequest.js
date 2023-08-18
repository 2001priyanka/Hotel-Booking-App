import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {API_URI, BASE_URL} from '../config/Config';
import axios from 'axios';

const ListAllRequest = ({}) => {
  const route = useRoute();

  const userId = useSelector(reduxsState => reduxsState?.login?.user);
  // console.log(userData);
  const navigation = useNavigation();

  const onNextPressed = param => {
    const data = {
      key: param,
    };
    console.log('data', data);
    console.log('param', param);
    navigation.navigate('FeedBackDetails', {data});
  };

  // const [rooms,setRooms] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [originalRoom, setOriginalRoom] = useState([]);
  // const [userData, setUserData] = useState([]);
  const [roomstype, setRoomstype] = useState([
    {
      img: (
        <ImageBackground
          source={require('../images/house8.jpg')}
          style={{
            width: '105%',
            height: '105%',
            // borderRadius: 20,
          }}
          imageStyle={{borderRadius: 10}}></ImageBackground>
      ),
      icon: <IconFA name="rupee" style={{marginTop: 20, fontSize: vf(4)}} />,
      name: 'Budget Rooms',
      priceRange: '8000-12000',
    },
    {
      img: (
        <ImageBackground
          source={require('../images/modern-balcony-design.jpg')}
          style={{
            width: '105%',
            height: '105%',
            borderRadius: 20,
          }}
          imageStyle={{borderRadius: 10}}></ImageBackground>
      ),
      icon: <IconFa name="balcony" style={{marginTop: 20, fontSize: vf(4)}} />,
      name: 'Balcony Rooms',
      priceRange: '12000-25000',
    },
    {
      img: (
        <ImageBackground
          source={require('../images/house6.jpg')}
          style={{width: '105%', height: '105%'}}
          imageStyle={{borderRadius: 10}}></ImageBackground>
      ),
      icon: (
        <IconFA
          name="rupee"
          style={{marginTop: 20, fontSize: vf(4), borderRadius: 20}}
        />
      ),
      name: 'Premium Rooms',
      priceRange: '25000-35000',
    },
    {
      img: (
        <ImageBackground
          source={require('../images/bhkrooms.jpg')}
          style={{width: '105%', height: '105%'}}
          imageStyle={{borderRadius: 10}}></ImageBackground>
      ),
      icon: <IconFA name="rupee" style={{marginTop: 20, fontSize: vf(4)}} />,
      name: 'Premium Rooms',
      priceRange: '25000-35000',
    },
  ]);

  const getAllRequest = async () => {
    try {
      const res = await axios({
        url: API_URI + `/user/request/`,
        method: 'GET',
      });
      if (res) {
        console.log('getAllRequest', res);
        setFeedbackData(res?.data?.results);
        // setOriginalRoom(res?.data?.results);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAllRequest();
  }, []);

  const _renderItem = ({item, index}) => {
    console.log('index', index, item);
    return (
      <TouchableOpacity onPress={() => onNextPressed(item._id)}>
        <View style={styles.card}>
          <View style={styles.detailsRow}>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '25%',
              }}>
              <Text
                style={{
                  // paddingRight: 30,
                  fontSize: vf(1.8),
                  color: 'black',
                  // marginTop: 4,
                }}>
                Username
              </Text>
              <Text
                style={{
                  // paddingRight: 80,
                  fontSize: vf(1.6),
                  color: 'black',
                  // marginTop: 4,
                }}>
                {item.user_id && item.user_id[0]?.username}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                width: '40%',
              }}>
              <Text
                style={{
                  // paddingRight: 30,
                  fontSize: vf(1.8),
                  color: 'black',
                  // marginTop: 4,
                }}>
                Building Name
              </Text>
              <Text
                style={{
                  // paddingRight: 80,
                  fontSize: vf(1.6),
                  color: 'black',
                  // marginTop: 4,
                }}>
                {item.building_id && item.building_id[0]?.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '30%',
              }}>
              <Text
                style={{
                  // paddingRight: 5,
                  fontSize: vf(1.8),
                  color: 'black',
                  // marginTop: 4,
                }}>
                Message
              </Text>
              <Text
                style={{
                  // paddingRight: 80,
                  fontSize: vf(1.6),
                  color: 'black',
                  // marginTop: 4,
                }}>
                {item.message}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: vw(5),
            marginVertical: vh(1),
          }}>
          <Text style={{fontSize: vf(3), color: '#000', marginTop: vh(2)}}>
            Requests
          </Text>
        </View>

        <FlatList
          data={feedbackData}
          renderItem={_renderItem}
          //   numColumns={2}
          //   contentContainerStyle={{padding: vw(1.5)}}
        />
      </View>
    </ScrollView>
  );
};

export default ListAllRequest;

const styles = StyleSheet.create({
  root: {
    alignItems: 'stretch',
    padding: 5,

    flex: 1,
    backgroundColor: '#555',
  },
  slider: {
    marginVertical: 20,
  },
  button: {},
  header: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 10,
    paddingHorizontal: 30,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  valueText: {
    // width: 50,
    color: 'black',
    fontSize: 20,
  },
  card: {
    // flex: 1,
    // flexDirection: 'column',
    borderRadius: 10,
    // paddingHorizontal: 10,
    // paddingTop: 10,
    alignSelf: 'center',
    // margin: 10,
    width: vw(90),
    backgroundColor: '#F5F4F8',
    elevation: 2,
    marginBottom: 20,
  },
  detailsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: vw(90),
    padding: 20,
  },
  //   buttonRow: {
  //     flex: 1,
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //     alignItems: 'center',
  //     width: vw(90),
  //   },
  //   actionButton: {
  //     width: vw(45),
  //     flexDirection: 'row',
  //     justifyContent: 'center',
  //     alignItems: 'center',
  //     padding: 10,
  //     elevation: 5,
  //   },
});
