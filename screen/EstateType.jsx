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
import React, {useState} from 'react';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';

const EstateType = () => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: vw(5), position: 'relative'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: vh(6),
            width: vw(12),
            backgroundColor: `rgba(0,0,0,0.1)`,
            borderRadius: vw(5),
            // margin: vw(5),
          }}>
          <IconFa name="chevron-left" size={20} />
        </View>
        <Text style={{fontSize: vf(3.5), color: '#000', letterSpacing: 0.5}}>
          Select your preferable
        </Text>
        <Text
          style={{
            fontSize: vf(3.5),
            color: '#204D6C',
            fontWeight: '700',
            letterSpacing: 0.5,
          }}>
          real estate type
        </Text>
        <Text style={{marginVertical: vh(2)}}>
          You can edit this later on your account setting.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginVertical: vh(2),
            flexWrap: 'wrap',
          }}>
          <View
            style={{
              height: vh(28),
              width: vw(43),
              backgroundColor: `#1F4C6B`,
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
            </View>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: vf(2),
                  padding: vw(2),
                }}>
                Apartment
              </Text>
            </View>
          </View>
          <View
            style={{
              height: vh(28),
              width: vw(43),
              backgroundColor: `#1F4C6B`,
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
            </View>
            <View>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '600',
                  fontSize: vf(2),
                  padding: vw(2),
                }}>
                Villa
              </Text>
            </View>
          </View>
          <View
            style={{
              height: vh(28),
              width: vw(43),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(5),
              // elevation:1
              padding: 5,
            }}>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/house7.jpg')}
                resizeMode="contain"
                style={{height: vh(22), width: vw(40), borderRadius: vw(5)}}
              />
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '600',
                  fontSize: vf(2),
                  padding: vw(2),
                }}>
                House
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}></View>
            </View>
          </View>
          <View
            style={{
              height: vh(28),
              width: vw(43),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(5),
              // elevation:1
              padding: 5,
            }}>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/house8.jpg')}
                resizeMode="contain"
                style={{height: vh(22), width: vw(40), borderRadius: vw(5)}}
              />
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '600',
                  fontSize: vf(2),
                  padding: vw(2),
                }}>
                Cottage
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}></View>
            </View>
          </View>
          <View
            style={{
              height: vh(28),
              width: vw(43),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(5),
              // elevation:1
              padding: 5,
            }}>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/house8.jpg')}
                resizeMode="contain"
                style={{height: vh(22), width: vw(40), borderRadius: vw(5)}}
              />
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '600',
                  fontSize: vf(2),
                  padding: vw(2),
                }}>
                Cottage
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}></View>
            </View>
          </View>
          <View
            style={{
              height: vh(28),
              width: vw(43),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(5),
              // elevation:1
              padding: 5,
            }}>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/house7.jpg')}
                resizeMode="contain"
                style={{height: vh(22), width: vw(40), borderRadius: vw(5)}}
              />
            </View>
            <View>
              <Text
                style={{
                  color: '#000',
                  fontWeight: '600',
                  fontSize: vf(2),
                  padding: vw(2),
                }}>
                House
              </Text>
              <View style={{flexDirection: 'row', gap: 10}}></View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              position: 'absolute',
              bottom: vh(23),
              height: vh(10),
              backgroundColor: '#89C93D',
              width: vw(80),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: vw(5),
            }}>
            <Text style={{fontSize: vf(2.5), color: '#fff'}}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EstateType;

const styles = StyleSheet.create({});
