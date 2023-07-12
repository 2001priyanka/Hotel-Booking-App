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
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {API_URI, BASE_URL} from '../config/Config';
import axios from 'axios';
import Slider from 'rn-range-slider';
import Thumb from '../Slider/Thumb';
import Rail from '../Slider/Rail';
import RailSelected from '../Slider/RailSelected';
import Notch from '../Slider/Notch';
import Label from '../Slider/Label';
import { useSelector } from 'react-redux';

const AllocatedRoomList = ({}) => {
  const route = useRoute();
  const token = useSelector(reduxState => reduxState?.login?.user?.accessToken);

  const userData = route?.params?.data;

  const routeData = route?.params?.data;
  console.log('userData', userData);
  console.log('route?.params', route?.params);

  const navigation = useNavigation();

  const onNextPressed = param => {
    const data = {
      key: param,
    };
    console.log('data', data);
    console.log('param', param);
    navigation.navigate('Details', {data});
  };

  const [rangeDisabled, setRangeDisabled] = useState(false);
  const [low, setLow] = useState(1000);
  const [high, setHigh] = useState(100000);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [floatingLabel, setFloatingLabel] = useState(false);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = (ulow, uhigh) => {
    setLow(ulow);
    setHigh(uhigh);
    console.log('priceRange', ulow, uhigh);
  };

  useEffect(() => {
    const tempRooms = originalRoom.filter(room => {
      console.log(
        'tempRooms',
        room,
        +room.rent,
        +low,
        // +low >= +room.rent,
        +room.rent >= low,
        +room.rent <= high,
        +room.rent >= low && +room.rent <= high,
      );
      return +room.rent >= low && +room.rent <= high;
    });
    setRoomsData(tempRooms);
  }, [low, high]);

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
  const [originalRoom, setOriginalRoom] = useState([]);
  const [roomstype, setRoomstype] = useState([
    {
      icon: <IconFA name="rupee" style={{marginTop: 20, fontSize: vf(4)}} />,
      name: 'Budget Rooms',
    },
    {
      icon: <IconFa name="balcony" style={{marginTop: 20, fontSize: vf(4)}} />,
      name: 'Balcony Rooms',
    },
    {
      icon: <IconFA name="rupee" style={{marginTop: 20, fontSize: vf(4)}} />,
      name: 'Premium Rooms',
    },
    {
      icon: <IconFa name="home" style={{marginTop: 20, fontSize: vf(4)}} />,
      name: 'Suites-BHK',
    },
  ]);

  const getAllRooms = async () => {
    try {
      const res = await axios({
        url: API_URI + `/user/allocation/`,
        method: 'GET',
        headers:{
          Authorization : "Bearer "+ token
        }
      });
      if (res) {
        console.log('getAllRooms', res?.data?.results);
        let myRooms = [];
        res?.data?.results &&
          res?.data?.results.map(item => {
            myRooms.push({
              ...item?.room_id[0],
              status: item?.status,
            });
          });

        setRoomsData(myRooms);
        setOriginalRoom(myRooms);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);

  const _renderItem = ({item, index}) => {
    console.log('_renderItem getAllRooms', item);
    return (
      <View
        key={index + item?._id}
        style={{
          height: vh(35),
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
                {item.building_id && item.building_id[0]
                  ? item.building_id[0]?.name
                  : null}
              </Text>
              {item.status == 'PENDING_APPROVAL' && (
                <Text
                  style={{
                    color: '#000',
                    fontWeight: '600',
                    fontSize: vf(2),
                    padding: vw(2),
                    backgroundColor: '#82B1FF',
                    borderRadius: 25,
                    textAlign: 'center',
                    marginBottom: 3,
                  }}>
                  Pending Approval
                </Text>
              )}
              {item.status == 'CANCELLED' && (
                <Text
                  style={{
                    color: '#FFF',
                    fontWeight: '600',
                    fontSize: vf(2),
                    padding: vw(2),
                    backgroundColor: '#B71C1C',
                    borderRadius: 25,
                    textAlign: 'center',
                    marginBottom: 3,
                  }}>
                  CANCELLED
                </Text>
              )}
              {item.status == 'APPROVED' && (
                <Text
                  style={{
                    color: '#FFF',
                    fontWeight: '600',
                    fontSize: vf(2),
                    padding: vw(2),
                    backgroundColor: '#76FF03',
                    borderRadius: 25,
                    textAlign: 'center',
                    marginBottom: 3,
                  }}>
                  Approved
                </Text>
              )}
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
        <View style={{paddingHorizontal: vw(5), marginVertical: vh(1)}}>
          <Text style={{fontSize: vf(2), color: '#000', marginTop: vh(2)}}>
            Explore Nearby Estate
          </Text>
        </View>

        {originalRoom?.length > 0 && (
          <Slider
            style={styles.slider}
            min={1000}
            max={100000}
            step={1000}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
          />
        )}
        <View style={styles.horizontalContainer}>
          <Text style={styles.valueText}>{low}</Text>
          <Text style={styles.valueText}>{high}</Text>
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

export default AllocatedRoomList;

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
});
