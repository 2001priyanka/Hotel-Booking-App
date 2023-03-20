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
import axios from 'axios';
import {API_URI} from '../../config/Config';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';

const Register = ({navigation}) => {
  const initialState = {
    name: '',
    email: '',
    password: '',
    role:'user',
  };
  const [userData, setUserData] = useState(initialState);

  const submitHandler = async () => {
    try {
      console.log('submithandler click', userData);
      const res = await axios({
        url: API_URI + '/auth/signup',
        method: 'POST',
        data: {...userData, username: userData.email},
      });
      if(res.status==200){
        console.log(res?.data);
        setUserData(initialState)
        navigation.navigate('login')
      }else{
        console.log('some credential issue')
      }
      
    } catch (error) {
      console.log(error);
    }
  };
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
            <TextInput
              placeholder="Full name"
              name="name"
              onChangeText={text => setUserData({...userData, name: text})}
              value={userData.name}
              style={{height:vh(9),width:vw(100)}}
            />
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
            <TextInput
              placeholder="Email"
              onChangeText={text => setUserData({...userData, email: text})}
              value={userData.email}
              style={{height:vh(9),width:vw(100)}}
            />
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
            <TextInput
              placeholder="Password"
              onChangeText={text => setUserData({...userData, password: text})}
              value={userData.password}
              style={{height:vh(9),width:vw(100)}}
            />
            {/* /> */}
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
              }}
              onPress={submitHandler}>
              <Text style={{color: '#fff'}}>Register</Text>
            </TouchableOpacity>
          </View>

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
