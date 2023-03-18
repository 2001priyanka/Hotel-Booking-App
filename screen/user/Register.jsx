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

const Register = ({navigation}) => {
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: vh(6),
            width: vw(12),
            backgroundColor: `rgba(0,0,0,0.1)`,
            borderRadius: vw(5),
            margin: vw(5),
          }}>
          <IconFa name="chevron-left" size={20} />
        </View>
        <View style={{paddingHorizontal: vw(5), marginVertical: vh(3)}}>
          <Text style={{fontSize: vf(3), color: '#000', letterSpacing: 0.5}}>
            Create your{' '}
            <Text style={{color: '#204D6C', fontWeight: '700'}}>account</Text>
          </Text>
          <Text style={{marginVertical: vh(2)}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: vh(9),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(2),
              paddingHorizontal: vw(5),
              gap: 5,
              marginTop: vh(2),
            }}>
            <IconFa name="account-outline" size={20} />
            <TextInput placeholder="Full name" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: vh(9),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(2),
              paddingHorizontal: vw(5),
              gap: 5,
              marginTop: vh(2),
            }}>
            <IconFa name="email-outline" size={20} />
            <TextInput placeholder="Email" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: vh(9),
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(2),
              paddingHorizontal: vw(5),
              gap: 5,
              marginTop: vh(2),
            }}>
            <IconFa name="lock-outline" size={20} />
            <TextInput placeholder="Password" />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity>
              <Text style={{color: '#204D6C', marginVertical: vh(1)}}>
                Terms of service
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{color: '#204D6C', marginVertical: vh(1)}}>
                Show password
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', marginVertical: vh(5)}}>
            <TouchableOpacity
              style={{
                height: vh(7),
                width: vw(70),
                backgroundColor: '#89C93D',
                borderRadius: vw(3),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>Register</Text>
            </TouchableOpacity>
          </View>
          {/* <View
              style={{
                position: 'relative',
                height: vh(20),
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
                  padding: vw(2),
                  position: 'absolute',
                  paddingHorizontal: vw(10),
                }}>
                <Text>OR</Text>
              </View>
            </View> */}
          {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View
                style={{
                  height: vh(8),
                  backgroundColor: `#F4F4F4`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: vw(5),
                  width:vw(42)
                }}>
                <Image
                  source={require('../../images/google.png')}
                  resizeMode="contain"
                  style={{width: vw(13), height: vh(5)}}
                />
              </View>
              <View
                style={{
                  height: vh(8),
                  backgroundColor: `#F4F4F4`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: vw(5),
                  width:vw(42)
                }}>
                <Image
                  source={require('../../images/face.png')}
                  resizeMode="contain"
                  style={{width: vw(13), height: vh(5)}}
                />
              </View>
             
            </View> */}
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={{textAlign: 'center', marginTop: vh(1)}}>
              Already have an accoun?{' '}
              <Text style={{color: '#204D6C'}}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({});
