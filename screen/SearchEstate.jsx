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
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {API_URI} from '../config/Config';
import {BASE_URL} from '../config/Config';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';

const SearchEstate = () => {
  const [rooms, setRooms] = useState([]);
  const [singleRoom, setSingleRoom] = useState({});
  const getAllRooms = async () => {
    try {
      const res = await axios({
        url: API_URI + '/admin/room',
        method: 'GET',
      });
      if (res.status == 200) {
        console.log('rooms', res?.data?.results);
        setRooms(res?.data?.results);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const singleRoomData = async _id => {
    try {
      const res = await axios({
        url: API_URI + `/admin/room/${_id}`,
        method: 'GET',
      });
      if (res?.status == 200) {
        console.log('single room detail', res?.data);
        setSingleRoom(res?.data?.results);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllRooms();
    // singleRoomData('64184cf462f5c90db4fbcb30')
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: vw(5), position: 'relative'}}>
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
              backgroundColor: `rgba(0,0,0,0.05)`,
              borderRadius: vw(5),
              // margin: vw(5),
            }}>
            <IconFa name="chevron-left" size={20} />
          </View>
          <Text style={{color: '#000', fontSize: vf(2.5)}}>Search result</Text>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: vh(6),
              width: vw(12),
              backgroundColor: `rgba(0,0,0,0.05)`,
              borderRadius: vw(5),
              // margin: vw(5),
            }}>
            <Image
              resizeMode="contain"
              source={require('../images/lock.jpg')}
              style={{width: vw(5), height: vh(6)}}
            />
          </View>
        </View>
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
            <TextInput placeholder="Search House, Apartment etc" />
          </View>
          <View>
            <IconFa name="magnify" size={25} color="#000" />
          </View>
        </View>
        <Text style={{fontSize: vf(2.5), color: '#000', marginVertical: vh(3)}}>
          Found <Text style={{fontWeight: '600'}}>128</Text> estates
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 15,
            marginVertical: vh(2),
            flexWrap: 'wrap',
          }}>
          {rooms.map(item => (
            <View
              style={{
                height: vh(32),
                width: vw(43),
                backgroundColor: `rgba(0,0,0,0.1)`,
                borderRadius: vw(5),
                // elevation:1
                padding: 5,
              }}
              key={item._id}>
              <View style={{position: 'relative'}}>
                <Image
                  source={
                    item?.photo
                      ? {uri: BASE_URL + item.photo}
                      : require('../images/preview.png')
                  }
                  resizeMode="contain"
                  style={{height: vh(22), width: vw(40), borderRadius: vw(5)}}
                />
                <Text
                  style={
                    item.photo
                      ? {
                          color: '#fff',
                          position: 'absolute',
                          bottom: 12,
                          right: 15,
                        }
                      : {
                          color: '#fff',
                          position: 'absolute',
                          bottom: 12,
                          right: 15,
                          backgroundColor:'#234459',
                          padding:3,
                          borderRadius:vw(2)
                        }
                  }>
                  ${item.rent}
                  <Text style={{fontSize: 11}}>/month</Text>
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
                  Wings Tower
                </Text>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // marginVertical: vh(1),
                    }}>
                    <IconFa name="star" color="yellow" size={20} />
                    <Text style={{color: '#000'}}>4.9</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      // marginVertical: vh(1),
                    }}>
                    <IconFa name="map-marker" size={15} />
                    <Text style={{fontSize: 10}}>Jakarta Indonesia</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
          {/* <View
            style={{
              height: vh(32),
              width: vw(43),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(5),
              // elevation:1
              padding: 5,
            }}>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/house4.jpg')}
                resizeMode="contain"
                style={{height: vh(22), width: vw(40), borderRadius: vw(5)}}
              />
              <Text
                style={{
                  color: '#fff',
                  position: 'absolute',
                  bottom: 12,
                  right: 15,
                }}>
                $220<Text style={{fontSize: 11}}>/month</Text>
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
                Wings Tower
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="star" color="yellow" size={20} />
                  <Text style={{color: '#000'}}>4.9</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="map-marker" size={15} />
                  <Text style={{fontSize: 10}}>Jakarta Indonesia</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: vh(32),
              width: vw(43),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(5),
              // elevation:1
              padding: 5,
            }}>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/house5.jpg')}
                resizeMode="contain"
                style={{height: vh(22), width: vw(40), borderRadius: vw(5)}}
              />
              <Text
                style={{
                  color: '#fff',
                  position: 'absolute',
                  bottom: 12,
                  right: 15,
                  backgroundColor: '#2D5067',
                  borderRadius: vw(2),
                  padding: 2,
                }}>
                $220<Text style={{fontSize: 11}}>/month</Text>
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
                Wings Tower
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="star" color="yellow" size={20} />
                  <Text style={{color: '#000'}}>4.9</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="map-marker" size={15} />
                  <Text style={{fontSize: 10}}>Jakarta Indonesia</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              height: vh(32),
              width: vw(43),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(5),
              // elevation:1
              padding: 5,
            }}>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/house6.jpg')}
                resizeMode="contain"
                style={{height: vh(22), width: vw(40), borderRadius: vw(5)}}
              />
              <Text
                style={{
                  color: '#fff',
                  position: 'absolute',
                  bottom: 12,
                  right: 15,
                  backgroundColor: '#2D5067',
                  borderRadius: vw(2),
                  padding: 2,
                }}>
                $220<Text style={{fontSize: 11}}>/month</Text>
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
                Wings Tower
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="star" color="yellow" size={20} />
                  <Text style={{color: '#000'}}>4.9</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="map-marker" size={15} />
                  <Text style={{fontSize: 10}}>Jakarta Indonesia</Text>
                </View>
              </View>
            </View>
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default SearchEstate;

const styles = StyleSheet.create({});
