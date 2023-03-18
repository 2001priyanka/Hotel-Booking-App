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
import {useNavigation} from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';

const UserPage = ({navigation}) => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <View
          style={{
            width: vw(100),
            height: vh(50),
            backgroundColor: '#fff',
            position: 'relative',
            marginTop: vh(2),
          }}>
          <Image
            source={require('../../images/11.jpg')}
            resizeMode="contain"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: vw(50),
              height: vh(24),
            }}
          />
          <Image
            source={require('../../images/12.jpg')}
            resizeMode="contain"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: vw(50),
              height: vh(24),
            }}
          />
          <Image
            source={require('../../images/13.jpg')}
            resizeMode="contain"
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: vw(50),
              height: vh(24),
            }}
          />
          <Image
            source={require('../../images/14.jpg')}
            resizeMode="contain"
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              width: vw(50),
              height: vh(24),
            }}
          />
        </View>
        <View style={{padding: vw(5)}}>
          <Text
            style={{fontSize: vf(3.5), color: '#000', marginVertical: vh(2)}}>
            Ready to{' '}
            <Text style={{color: '#204D6C', fontWeight: '600'}}>explore?</Text>
          </Text>
          <View style={{alignItems: 'center', marginVertical: vh(2)}}>
            <TouchableOpacity
              style={{
                height: vh(8),
                width: vw(80),
                backgroundColor: '#89C93D',
                borderRadius: vw(3),
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: 5,
              }} onPress={navigation.navigate('login')}>
              <IconFa name="email-outline" size={20} color="#fff" />
              <Text style={{color: '#fff', fontSize: vf(2)}}>
                Continue with Email
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: 'relative',
              height: vh(5),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: vw(90),
                height: vh(0.1),
                backgroundColor: `rgba(0,0,0,0.5)`,
              }}></View>
            <View
              style={{
                backgroundColor: `#fff`,
                padding: vw(1),
                position: 'absolute',
                paddingHorizontal: vw(10),
              }}>
              <Text>OR</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity>
            <View
              style={{
                height: vh(8),
                backgroundColor: `#F4F4F4`,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: vw(5),
                width: vw(42),
              }}>
              <Image
                source={require('../../images/google.png')}
                resizeMode="contain"
                style={{width: vw(13), height: vh(5)}}
              />
            </View>
            </TouchableOpacity>
           <TouchableOpacity>
           <View
              style={{
                height: vh(8),
                backgroundColor: `#F4F4F4`,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: vw(5),
                width: vw(42),
              }}>
              <Image
                source={require('../../images/face.png')}
                resizeMode="contain"
                style={{width: vw(13), height: vh(5)}}
              />
            </View>
           </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('register')}>
            <Text style={{textAlign: 'center', marginTop: vh(2)}}>
              Don't have an accoun?{' '}
              <Text style={{color: '#204D6C'}}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default UserPage;

const styles = StyleSheet.create({});
