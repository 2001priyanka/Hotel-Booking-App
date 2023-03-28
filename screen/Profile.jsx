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
import React, {useState,useEffect} from 'react';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import { API_URI } from '../config/Config';
import { useRoute } from '@react-navigation/native';
import DocumentPicker from "react-native-document-picker";


const Profile = () => {
  const route=useRoute()
  const user_data=route.params?.userData
  const userImage=async()=>{
    try {
      const res=await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      })
      console.log(res)
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log("error -----", error);
      } else {
        throw error;
      }
    }
  }
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
              backgroundColor: `rgba(0,0,0,0.1)`,
              borderRadius: vw(5),
              // margin: vw(5),
            }}>
            <IconFa name="chevron-left" size={20} />
          </View>
          <Text style={{color: '#000', fontSize: vf(2.5)}}>Profile</Text>
          <Text style={{color: '#fff'}}>hhhhhhg</Text>
        </View>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontWeight: '700',
            fontSize: vf(2.5),
            marginTop: vh(2),
            letterSpacing:1
          }}>
          {user_data?.email.split('@')[0]}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#000',
            fontWeight: '400',
            fontSize: vf(2),
            letterSpacing:1
          }}>
          {user_data?.email}
        </Text>
        <View style={{position: 'relative'}}>
         <TouchableOpacity onPress={()=>userImage()}>
         <Image
            source={require('../images/image5.jpg')}
            style={{height: vh(20), marginTop: vh(2)}}
            resizeMode="contain"
          />
         </TouchableOpacity>
          
          <View
            style={{
              position: 'absolute',
              top: vh(18),
              right: vw(30),
              backgroundColor: '#89C93D',
              height: vh(3.5),
              width: vw(7),
              zIndex: 1,
              borderRadius: vw(2),
            }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '600',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: vf(1.5)}}>#</Text>8
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontWeight: '700',
            fontSize: vf(2),
            color: '#000',
            marginTop: vh(2),
          }}>
          140
          <Text
            style={{
              color: `rgba(0,0,0,0.7)`,
              fontSize: vf(1.8),
              letterSpacing: 1,
            }}>
            {' '}
            listings
          </Text>
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
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              position: 'absolute',
              bottom: vh(18),
              height: vh(9),
              backgroundColor: '#89C93D',
              width: vw(80),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: vw(5),
            }}>
            <Text style={{fontSize: vf(2.5), color: '#fff'}}>Start Chat</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
