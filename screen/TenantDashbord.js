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
// import Slider from 'rn-range-slider';
// import Thumb from '../Slider/Thumb';
// import Rail from '../Slider/Rail';
// import RailSelected from '../Slider/RailSelected';
// import Notch from '../Slider/Notch';
// import Label from '../Slider/Label';
// import TextButton from '../components/TextButton';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {API_URI, BASE_URL} from '../config/Config';
import axios from 'axios';

const TenantDashbord = ({}) => {
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

  //   const [rangeDisabled, setRangeDisabled] = useState(false);
  //   const [low, setLow] = useState(1000);
  //   const [high, setHigh] = useState(100000);
  //   const [min, setMin] = useState(0);
  //   const [max, setMax] = useState(100);
  //   const [floatingLabel, setFloatingLabel] = useState(false);

  //   const renderThumb = useCallback(() => <Thumb />, []);
  //   const renderRail = useCallback(() => <Rail />, []);
  //   const renderRailSelected = useCallback(() => <RailSelected />, []);
  //   const renderLabel = useCallback(value => <Label text={value} />, []);
  //   const renderNotch = useCallback(() => <Notch />, []);
  //   const handleValueChange = (ulow, uhigh) => {
  //     setLow(ulow);
  //     setHigh(uhigh);
  //     console.log('priceRange', ulow, uhigh);
  //   };

  //   useEffect(() => {
  //     const tempRooms = originalRoom.filter(room => {
  //       console.log(
  //         'tempRooms',
  //         room,
  //         +room.rent,
  //         +low,
  //         // +low >= +room.rent,
  //         +room.rent >= low,
  //         +room.rent <= high,
  //         +room.rent >= low && +room.rent <= high,
  //       );
  //       return +room.rent >= low && +room.rent <= high;
  //     });
  //     setRoomsData(tempRooms);
  //   }, [low, high]);

  //   const toggleRangeEnabled = useCallback(
  //     () => setRangeDisabled(!rangeDisabled),
  //     [rangeDisabled],
  //   );
  //   const setMinTo50 = useCallback(() => setMin(50), []);
  //   const setMinTo0 = useCallback(() => setMin(0), []);
  //   const setMaxTo100 = useCallback(() => setMax(100), []);
  //   const setMaxTo500 = useCallback(() => setMax(500), []);
  //   const toggleFloatingLabel = useCallback(
  //     () => setFloatingLabel(!floatingLabel),
  //     [floatingLabel],
  //   );

  // const [rooms,setRooms] = useState([]);
  const [roomsData, setRoomsData] = useState([]);
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
            flexDirection:'row',
            justifyContent:'center',
            // borderRadius: 20,
          }}
          imageStyle={{borderRadius: 10}}></ImageBackground>
      ),
      icon: <IconFA name="rupee" style={{marginTop: 20, fontSize: vf(4)}} />,
      name: 'Budget Rooms',
      priceRange: '8000-12000',
    },
    // {
    //   img: (
    //     <ImageBackground
    //       source={require('../images/modern-balcony-design.jpg')}
    //       style={{
    //         width: '105%',
    //         height: '105%',
    //         borderRadius: 20,
    //       }}
    //       imageStyle={{borderRadius: 10}}></ImageBackground>
    //   ),
    //   icon: <IconFa name="balcony" style={{marginTop: 20, fontSize: vf(4)}} />,
    //   name: 'Balcony Rooms',
    //   priceRange: '12000-25000',
    // },
    // {
    //   img: (
    //     <ImageBackground
    //       source={require('../images/house6.jpg')}
    //       style={{width: '105%', height: '105%'}}
    //       imageStyle={{borderRadius: 10}}></ImageBackground>
    //   ),
    //   icon: (
    //     <IconFA
    //       name="rupee"
    //       style={{marginTop: 20, fontSize: vf(4), borderRadius: 20}}
    //     />
    //   ),
    //   name: 'Premium Rooms',
    //   priceRange: '25000-35000',
    // },
    // {
    //   img: (
    //     <ImageBackground
    //       source={require('../images/bhkrooms.jpg')}
    //       style={{width: '105%', height: '105%'}}
    //       imageStyle={{borderRadius: 10}}></ImageBackground>
    //   ),
    //   icon: <IconFA name="rupee" style={{marginTop: 20, fontSize: vf(4)}} />,
    //   name: 'Premium Rooms',
    //   priceRange: '25000-35000',
    // },
  ]);

  //   const getAllRooms = async () => {
  //     try {
  //       const res = await axios({
  //         url: API_URI + `/user/room/`,
  //         method: 'GET',
  //       });
  //       if (res) {
  //         console.log('getAllRooms', res);
  //         setRoomsData(res?.data?.results);
  //         setOriginalRoom(res?.data?.results);
  //       }
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   };

  //   useEffect(() => {
  //     getAllRooms();

  //   }, []);

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
            Welcome!
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{fontSize: vf(2.5), color: '#000', letterSpacing: 0.5}}>
              Your Room
            </Text>
          </View>
        </View>

        <FlatList
          data={roomstype}
          renderItem={_renderItem1}
          numColumns={2}
          contentContainerStyle={{padding: vw(1.5)}}
        />

        <FlatList
          data={roomsData}
          renderItem={_renderItem}
          numColumns={2}
          contentContainerStyle={{padding: vw(1.5)}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 20,
        }}>
        <Text style={{color: 'black', fontSize: vf(2.5)}}>Pending Bills</Text>
      </View>
      <View style={{...styles.card}}>
        <View
          style={{
            ...styles.titleRow,
          }}>
          <Text style={{fontSize: vf(2.5), color: '#000'}}>
            {/* {item.billType} */}
            Bill:Electricity
          </Text>
          <Text
            style={{
              fontSize: vf(2.5),
              color: '#000',
              backgroundColor: '#d7d7d7',
              borderRadius: 10,
              paddingHorizontal: 20,
            }}>
            Rs.
            {/* {item.amount} */}
          </Text>
        </View>
        <View style={styles.detailsRow}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '25%',
            }}>
            <Text
              style={{
                // paddingRight: 30,
                fontSize: vf(1.8),
                color: 'black',
                // marginTop: 4,
              }}>
              billDate
            </Text>
            <Text
              style={{
                // paddingRight: 80,
                fontSize: vf(1.6),
                color: 'black',
                // marginTop: 4,
              }}>
              {/* {item.billDate} */}billDate
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '25%',
            }}>
            <Text
              style={{
                // paddingRight: 30,
                fontSize: vf(1.8),
                color: 'black',
                // marginTop: 4,
              }}>
              dueDate
            </Text>
            <Text
              style={{
                // paddingRight: 80,
                fontSize: vf(1.6),
                color: 'black',
                // marginTop: 4,
              }}>
              {/* {item.dueDate} */}dueDate
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '40%',
            }}>
            <Text
              style={{
                // paddingRight: 5,
                fontSize: vf(1.8),
                color: 'black',
                // marginTop: 4,
              }}>
              Over Due Amount
            </Text>
            <Text
              style={{
                // paddingRight: 80,
                fontSize: vf(1.6),
                color: 'black',
                // marginTop: 4,
              }}>
              {/* {item.overdueAmount} */}overdueAmount
            </Text>
          </View>
        </View>
        <View
          style={{
            ...styles.buttonRow,
          }}>
          <TouchableOpacity
            // onPress={viewPaymentsDetails}
            style={{
              ...styles.actionButton,
              backgroundColor: '#EE023D',
              width: '50%',
              borderBottomLeftRadius: 10,
            }}>
            <Text style={{color: '#fff'}}>pay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={() => viewBillDetails(item)}
            style={{
              ...styles.actionButton,
              backgroundColor: '#89C93D',
              width: '50%',
              borderBottomRightRadius: 10,
            }}>
            <Text style={{color: '#fff'}}>View</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity style={{width: 250}}>
          <View
            style={{
              padding: 15,
              marginTop: vh(3),
              borderRadius: 15,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#204D6C',
            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '500',
                color: 'white',
              }}>
              Request
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default TenantDashbord;

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
    flex: 1,
    flexDirection: 'column',
    borderRadius: 10,
    // paddingHorizontal: 10,
    // paddingTop: 10,
    alignSelf: 'center',
    // margin: 10,
    width: vw(90),
    backgroundColor: '#F5F4F8',
    elevation: 5,
    marginBottom: 20,
  },
  titleRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: vw(90),
    padding: 10,
  },
  detailsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: vw(90),
    padding: 20,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: vw(90),
  },
  actionButton: {
    width: vw(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 5,
  },
  Button: {
    width: vw(45),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop:20,
    // elevation: 5,
  },
});