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
import Slider from 'rn-range-slider';
import Thumb from '../Slider/Thumb';
import Rail from '../Slider/Rail';
import RailSelected from '../Slider/RailSelected';
import Notch from '../Slider/Notch';
import Label from '../Slider/Label';
import TextButton from '../components/TextButton';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {API_URI, BASE_URL} from '../config/Config';
import axios from 'axios';
const Dashboard = ({}) => {
  const route = useRoute();
  const userData = route?.params?.data;
  const userId = useSelector(reduxsState => reduxsState?.login?.user);
  // console.log(userData);
  const navigation = useNavigation();
  const onNextPressed = param => {
    const data = {
      key: param,
    };
    console.log('data', data);
    console.log('param', param);
    navigation.navigate('Details', {data});
  };
  const onNextPressed1 = () => {
    navigation.navigate('RoomList');
  };

  const [rangeDisabled, setRangeDisabled] = useState(false);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [floatingLabel, setFloatingLabel] = useState(false);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback((low, high) => {
    setLow(low);
    setHigh(high);
  }, []);

    const toggleRangeEnabled = useCallback(
      () => setRangeDisabled(!rangeDisabled),
      [rangeDisabled],
    );
    const setMinTo50 = useCallback(() => setMin(50), []);
    const setMinTo0 = useCallback(() => setMin(0), []);
    const setMaxTo100 = useCallback(() => setMax(100), []);
    const setMaxTo500 = useCallback(() => setMax(500), []);
    const toggleFloatingLabel = useCallback(
      () => setFloatingLabel(!floatingLabel),
      [floatingLabel],
    );

  // const [rooms,setRooms] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
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

  const filterRoomsByPrice = (rooms, maxPrice) => {
    return rooms.filter(room => room.priceRange <= maxPrice);
  };
  const getAllRooms = async () => {
    try {
      const res = await axios({
        url: API_URI + `/user/room/`,
        method: 'GET',
      });
      if (res) {
        console.log('getAllRooms', res);
        setRoomsData(res?.data?.results);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  // const getUserData = async () => {
  //   try {
  //     const res = await axios({
  //       url: API_URI + `/user/user/`,
  //       method: 'GET',
  //     });
  //     if (res) {
  //       console.log('getUserData', res);
  //       setUserData(res?.data?.results);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  useEffect(() => {
    getAllRooms();
    // getUserData();
  }, []);

  const _renderItem = ({item, index}) => {
    console.log('index', index, item);
    return (
      <View
        key={index + item?._id}
        style={{
          height: vh(33),
          width: vw(45),
          marginHorizontal: vw(1.5),
          marginVertical: vh(1),
          backgroundColor: `rgba(0,0,0,0.1)`,
          borderRadius: vw(2),
          // elevation:1
          padding: 5,
        }}>
        <TouchableOpacity onPress={() => onNextPressed(item._id)}>
          <View>
            <View style={{position: 'relative'}}>
              <Image
                // source={require('../images/house1.jpg')}
                source={{
                  uri: BASE_URL + item?.photo?.replace('Storage\\', ''),
                }}
                resizeMode="contain"
                style={{
                  height: vh(22),
                  width: vw(43),
                  borderRadius: vw(2),
                }}
              />
              <Text
                style={{
                  color: '#fff',
                  backgroundColor: '#000',
                  borderRadius: 50,
                  padding: 5,
                  paddingHorizontal: 10,
                  position: 'absolute',
                  bottom: 12,
                  right: 15,
                }}>
                Rs {item.rent}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '600',
                  fontSize: vf(2),
                  padding: vw(2),
                }}>
                {item.building_id[0]?.name}
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="map-marker" size={15} />
                  <Text style={{fontSize: vf(1.5), color: '#000'}}>
                    {item.building_id && item.building_id[0]?.address1}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const _renderItem1 = ({item, index}) => {
    return (
      <View
        key={index + item?._id}
        style={{
          height: vh(20),
          width: vw(45),
          marginHorizontal: vw(1.5),
          margin: 10,
          // backgroundColor: `rgba(0,0,0,0.1)`,
          borderRadius: vw(2),
          padding: 5,
        }}>
        <View style={{borderRadius: 20}}>{item.img}</View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 15,
            right: 30,
          }}>
          <Text
            style={{
              color: '#000',
              fontWeight: '600',
              fontSize: vf(2),
              // padding: vw(2),
            }}>
            {item.name}
          </Text>
        </View>

        <Text
          style={{
            alignItems: 'center',
            color: '#08A216',
            fontWeight: '800',
            fontSize: vf(2),
            position: 'absolute',
            top: 40,
            right: 30,
          }}>
          {item.priceRange}
        </Text>
        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            top: 40,
            right: 70,
          }}>
          {item.icon}
        </View>

        <TouchableOpacity
          style={{position: 'absolute', top: 70, right: 40}}
          onPress={onNextPressed1}>
          <Text
            style={{
              color: '#fff',
              alignSelf: 'center',
              backgroundColor: '#204D6C',
              borderRadius: 50,
              padding: 5,
              paddingHorizontal: 30,
              marginTop: 30,
            }}>
            View
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          padding: vw(5),
          backgroundColor: '#204D6C',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: vf(3.5)}}>
          Nikharstayz
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('profile', {userData})}>
          <View
            style={{
              borderRadius: vw(100),
              borderColor: '#fff',
              borderWidth: 1,
            }}>
            {userData?.profilePic ? (
              <Image
                source={{
                  uri: userData?.profilePic
                    ? BASE_URL + userData.profilePic?.replace('Storage\\', '/')
                    : userData?.imageURL,
                }}
                style={{
                  width: vw(12),
                  height: vh(6),
                  borderWidth: 1,
                  borderColor: `rgba(0,0,0,0.1)`,
                  borderRadius: vw(100),
                }}
                resizeMode="contain"
              />
            ) : (
              <Text
                style={{
                  fontSize: vf(2),
                  margin: 10,
                  marginVertical: 12,
                  color: '#fff',
                }}>
                You
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <View style={{padding: 10}}>
          <Text style={{fontSize: vf(3), color: '#000', letterSpacing: 0.5}}>
            Hey,
            <Text style={{color: '#204D6C', fontWeight: '700'}}>
              {`${userId?.username ? userId.username : userId?.name}`}
            </Text>
          </Text>
          <Text style={{fontSize: vf(3), color: '#000', letterSpacing: 0.5}}>
            Let's start exploring
          </Text>
          <View
            style={{
              height: vh(10),
              backgroundColor: `rgba(0,0,0,0.05)`,
              borderRadius: vw(5),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: vw(5),
              marginTop: vh(3),
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <IconFa name="magnify" size={25} color="#000" />
              <TextInput placeholder="Search House, Apartment etc" />
            </View>
            <View>
              <IconFa name="microphone-outline" size={25} />
            </View>
          </View>
          <Slider
            style={styles.slider}
            min={0}
            max={100}
            step={1}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
          <View style={styles.horizontalContainer}>
            <Text style={styles.valueText}>{low}</Text>
            <Text style={styles.valueText}>{high}</Text>
          </View>
          <View style={styles.horizontalContainer}>
            <TextButton
              text="Toggle floating"
              containerStyle={styles.button}
              onPress={toggleFloatingLabel}
            />
            <TextButton
              text={rangeDisabled ? 'Enable range' : 'Disable range'}
              containerStyle={styles.button}
              onPress={toggleRangeEnabled}
            />
          </View>
          <View style={styles.horizontalContainer}>
            <TextButton
              text="Set min to 0"
              containerStyle={styles.button}
              onPress={setMinTo0}
            />
            <TextButton
              text="Set min to 50"
              containerStyle={styles.button}
              onPress={setMinTo50}
            />
          </View>
          <View style={styles.horizontalContainer}>
            <TextButton
              text="Set max to 100"
              containerStyle={styles.button}
              onPress={setMaxTo100}
            />
            <TextButton
              text="Set max to 500"
              containerStyle={styles.button}
              onPress={setMaxTo500}
            />
          </View>
          {/* <View style={{height: 1000}} /> */}
        </View>

        <FlatList
          data={roomstype}
          renderItem={_renderItem1}
          numColumns={2}
          contentContainerStyle={{padding: vw(1.5)}}
        />
        <View style={{paddingHorizontal: vw(5), marginVertical: vh(1)}}>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: vh(1),
            }}>
            <Text style={{fontSize: vf(2), color: '#000'}}>
              Top Estate Agent
            </Text>
            <Text style={{color: '#204D6C'}}>explore</Text>
          </View> */}
          {/* <ScrollView horizontal>
            <View style={{flexDirection: 'row'}}>
              {item1.map(item => (
                <View
                  style={{
                    alignItems: 'center',
                    marginVertical: vw(2),
                    gap: 5,
                    borderRadius: vw(20),
                    marginRight: 10,
                  }}
                  key={item.id}>
                  <Image
                    source={item.image}
                    resizeMode="contain"
                    style={{height: vh(10), width: vw(20), borderRadius: vw(2)}}
                  />
                  <Text style={{color: '#000'}}>{item.title}</Text>
                </View>
              ))}
            </View>
          </ScrollView> */}
          <Text style={{fontSize: vf(2), color: '#000', marginTop: vh(2)}}>
            Explore Nearby Estate
          </Text>
        </View>

        <FlatList
          data={roomsData}
          renderItem={_renderItem}
          numColumns={2}
          contentContainerStyle={{padding: vw(1.5)}}
        />
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
    root: {
    alignItems: 'stretch',
    padding: 12,
    flex: 1,
    backgroundColor: '#555',
  },
  slider: {
  },
  button: {
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  valueText: {
    width: 50,
    color: 'white',
    fontSize: 20,
  },
});
