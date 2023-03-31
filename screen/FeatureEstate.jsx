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
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';

const FeatureEstate = () => {


  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{position: 'relative'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: vw(5),
            marginTop: vh(2),
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
          {/* <Text style={{color: '#000', fontSize: vf(2.5)}}>Search result</Text> */}
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
            flex: 1,
            marginVertical: vh(2),
            paddingHorizontal: vw(2),
            height: vh(40),
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <Image
              source={require('../images/11.jpg')}
              resizeMode="contain"
              style={{width: vw(60), height: vh(30)}}
            />
          </View>
          <View style={{}}>
            <Image
              source={require('../images/house8.jpg')}
              style={{width: vw(39), height: vh(19)}}
              resizeMode="contain"
            />
            <Image
              source={require('../images/house7.jpg')}
              style={{width: vw(39), height: vh(19), marginTop: 10}}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={{paddingHorizontal: vw(5)}}>
          <Text
            style={{
              fontSize: vf(3.5),
              color: '#000',
              letterSpacing: 0.5,
              fontWeight: '600',
              marginTop: vh(-3),
            }}>
            Top Estate Agent
          </Text>
          <Text style={{marginVertical: vh(1)}}>
            Find the best recommendations place to live
          </Text>
          <Text
            style={{fontSize: vf(2.5), color: '#000', marginVertical: vh(1)}}>
            <Text style={{fontWeight: '600'}}>70</Text> estates
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              // marginVertical: vh(2),
              flexWrap: 'wrap',
            }}>
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
                  source={require('../images/house3.jpg')}
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
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default FeatureEstate;

const styles = StyleSheet.create({});
