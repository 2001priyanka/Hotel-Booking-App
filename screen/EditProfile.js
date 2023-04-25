import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import axios from 'axios';
import {API_URL} from '../../../Config';
import axios from 'axios';
// import {useSelector} from 'react-redux';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {API_URI} from '../config/Config';
const EditProfile = () => {
  const navigation = useNavigation();

  const [usersData, setUsersData] = useState({
    name: '',
    email: '',
    address1: '',
  });
  const token = useSelector(
    reduxsState => reduxsState?.login?.user?.accessToken,
  );
  console.log('token', token);

  // const getUserData = async () => {
  //   // if () {
  //   // console.log('token',token)
  //   try {
  //     const res = await axios({
  //       url: API_URL + 'user/user/getProfile',
  //       method: 'GET',
  //       // headers: {
  //       //   Authorization: `Bearer ${token}`,
  //       // },
  //     });
  //     if (res) {
  //       console.log('users data in edit profile', res?.data?.user);
  //       setUsersData(res?.data?.user);
  //     }
  //   } catch (error) {
  //     console.log('profile data error', error);
  //     // }
  //   }
  // };

  const getUserData = async () => {
    if (token) {
      try {
        const res = await axios({
          url: API_URI + '/user/user/getProfile',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res) {
          console.log('user data in edit profile', res?.data?.user);
          setUsersData(res?.data?.user);
        }
      } catch (error) {
        console.log('profile data error', error);
      }
    }
  };
  // const getRoomData = async () => {
  //   try {
  //     // const token = res?.data?.token;
  //     // console.log('token', token);
  //     const res = await axios({
  //       url: API_URI + '/user/room',
  //       method: 'GET',
  //       // header: {
  //       //   Authorization: `Bearer ${token}`,
  //       // },
  //     });

  //     if (res) {
  //       console.log('roomdata', res?.data?.user);
  //     }
  //   } catch (error) {
  //     console.log('room', error);
  //   }
  // };
  // const updateProfile = async () => {
  //   // if (token) {
  //   try {
  //     const res = await axios({
  //       url: API_URL + 'user/user/_id',
  //       method: 'PUT',
  //       data: {
  //         ...usersData,
  //       },
  //       // headers: {
  //       //   Authorization: `Bearer ${token}`,
  //       // },
  //     });
  //     if (res) {
  //       console.log('update users res', res);
  //       navigation.navigate('Profile');
  //     }
  //   } catch (error) {
  //     console.log('edit profile error', error);
  //   }
  // };

  const updateProfile = async () => {
    if (token) {
      try {
        const res = await axios({
          url: API_URI + '/user/user/_id',
          method: 'PUT',
          data: {
            ...usersData,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res) {
          console.log('update users res', res);
          navigation.navigate('profile');
        }
      } catch (error) {
        console.log('edit profile error', error);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{padding: 20}}>
          <View>
            <Text style={styles.uppersection}>
              <IconFa
                name="arrow-left"
                style={{fontSize: 25, paddingLeft: 10}}
              />
              <Text style={{color: 'black', fontSize: 23, paddingLeft: 10}}>
                Edit Profile
              </Text>
            </Text>
          </View>
          <View>
            <View>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  marginTop: 20,
                  textTransform: 'uppercase',
                }}>
                Full Name:
              </Text>

              <TextInput
                style={styles.input2}
                placeholder="Full Name"
                editable
                maxLength={20}
                onChangeText={e => {
                  console.log(e);
                  setUsersData({
                    usersData,
                    name: e,
                  });
                }}
                value={usersData?.name}
              />
            </View>
          </View>

          <View>
            <View>
              <View>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    marginTop: 20,
                    textTransform: 'uppercase',
                  }}>
                  Address:
                </Text>
                <TextInput
                  placeholder="Address"
                  multiline={true}
                  numberOfLines={10}
                  style={styles.input3}
                  onChangeText={e => {
                    console.log(e);
                    setUsersData({
                      ...usersData,
                      address1: e,
                    });
                  }}
                  value={usersData?.address1}
                />
                {/* <View>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      marginTop: 20,
                      textTransform: 'uppercase',
                    }}>
                    phone number:
                  </Text>
                  <TextInput
                    style={styles.input2}
                    placeholder="Conatct"
                    editable
                    maxLength={20}
                    onChangeText={e => {
                      console.log(e);
                      setUsersData({
                        ...usersData,
                        mobile: e,
                      });
                    }}
                    value={usersData?.mobile}
                  />
                </View> */}
                <View>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      marginTop: 20,
                      textTransform: 'uppercase',
                    }}>
                    Email Address:
                  </Text>

                  <TextInput
                    style={styles.input2}
                    placeholder="Email"
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={e => {
                      console.log(e);
                      setUsersData({
                        ...usersData,
                        email: e,
                      });
                    }}
                    value={usersData?.email}
                  />
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity onPress={updateProfile}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: vh(9),
                margin: 20,
                borderRadius: 30,
                backgroundColor: '#204D6C',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: vf(2.5),
                }}>
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  uppersection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  input2: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#A09C9C',
    height: 50,
    textAlignVertical: 'top',
  },
  input3: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    height: 120,
    textAlignVertical: 'top',
    borderColor: '#A09C9C',
  },
  input1: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    width: 150,
  },
});
export default EditProfile;
