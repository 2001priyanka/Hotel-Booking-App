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
import {useRoute} from '@react-navigation/native';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';

const Dashboard = ({navigation}) => {
  const route = useRoute();
  const userData = route?.params?.data;
  console.log(userData);

  const data = [
    {id: 1, title: 'All'},
    {id: 2, title: 'House'},
    {id: 3, title: 'Apartment'},
    {id: 4, title: 'House'},
  ];
  const item = [
    {id: 1, image: require('../images/bali.jpg'), title: 'bali'},
    {id: 2, image: require('../images/jakarta.jpg'), title: 'Jakarta'},
    {id: 3, image: require('../images/temple.jpg'), title: 'Yogyakarta'},
  ];
  const item1 = [
    {id: 1, image: require('../images/image1.jpg'), title: 'Amanda'},
    {id: 2, image: require('../images/image2.jpg'), title: 'Anderson'},
    {id: 3, image: require('../images/image3.jpg'), title: 'Samantha'},
    {id: 4, image: require('../images/image1.jpg'), title: 'Amanda'},
  ];
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <View style={{padding: vw(5)}}>
          <TouchableOpacity onPress={()=>navigation.navigate('profile',{userData})}>
          <View style={{alignItems: 'flex-end', borderRadius: vw(100)}}>
            <Image
              source={require('../images/profile.jpg')}
              style={{width: vw(15), height: vh(6)}}
              resizeMode="contain"
            />
          </View>
          </TouchableOpacity>
          <Text style={{fontSize: vf(3.5), color: '#000', letterSpacing: 0.5}}>
            Hey,{' '}
            <Text style={{color: '#204D6C', fontWeight: '700'}}>
              {`${userData?.email.split('@')[0].slice(0,6)}...`}
            </Text>
          </Text>
          <Text style={{fontSize: vf(3.5), color: '#000', letterSpacing: 0.5}}>
            Let's start exploring
          </Text>
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
              <IconFa name="magnify" size={25} color="#000" />
              <TextInput placeholder="Search House, Apartment etc" />
            </View>
            <View>
              <IconFa name="microphone-outline" size={25} />
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: vh(2),
          }}>
          {data.map(item => (
            <TouchableOpacity key={item.id}>
              <View
                style={{
                  height: vh(6),
                  backgroundColor: '#234F68',
                  paddingHorizontal: vw(6),
                  justifyContent: 'center',
                  borderRadius: vw(4),
                  marginLeft: 5,
                }}>
                <Text style={{color: '#fff'}}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{paddingHorizontal: vw(5), marginVertical: vh(1)}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: vf(2), color: '#000'}}>
              Featured Estates
            </Text>
            <Text style={{color: '#204D6C'}}>View all</Text>
          </View>
          <ScrollView horizontal>
            <View
              style={{
                height: vh(22),
                backgroundColor: `rgba(0,0,0,0.05)`,
                width: vw(70),
                borderRadius: vw(5),
                padding: vw(2),
                marginVertical: vh(2),
                flexDirection: 'row',
                gap: 10,
              }}>
              <View style={{flex: 1, position: 'relative'}}>
                <Image
                  source={require('../images/apart.jpg')}
                  resizeMode="cover"
                  style={{width: '100%', height: '100%', borderRadius: vw(5)}}
                />
                <Text
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    color: '#fff',
                    fontSize: 12,
                    left: 10,
                  }}>
                  Apartment
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{color: '#000', fontWeight: '600', letterSpacing: 1}}>
                  Sky Dendelion Apartment{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: vh(1),
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
                <Text
                  style={{fontSize: vf(2), color: '#000', marginTop: vh(5)}}>
                  $249<Text style={{fontSize: 10, color: 'gray'}}>/month</Text>
                </Text>
              </View>
            </View>
            <View
              style={{
                height: vh(22),
                backgroundColor: `rgba(0,0,0,0.05)`,
                width: vw(70),
                borderRadius: vw(5),
                padding: vw(2),
                marginVertical: vh(2),
                flexDirection: 'row',
                gap: 10,
                marginLeft: 10,
              }}>
              <View style={{flex: 1, position: 'relative'}}>
                <Image
                  source={require('../images/apart.jpg')}
                  resizeMode="cover"
                  style={{width: '100%', height: '100%', borderRadius: vw(5)}}
                />
                <Text
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    color: '#fff',
                    fontSize: 12,
                    left: 10,
                  }}>
                  Apartment
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{color: '#000', fontWeight: '600', letterSpacing: 1}}>
                  Sky Dendelion Apartment{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: vh(1),
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
                <Text
                  style={{fontSize: vf(2), color: '#000', marginTop: vh(5)}}>
                  $249<Text style={{fontSize: 10, color: 'gray'}}>/month</Text>
                </Text>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: vf(2), color: '#000'}}>Top Locations</Text>
            <Text style={{color: '#204D6C'}}>explore</Text>
          </View>
          <ScrollView horizontal>
            <View style={{flexDirection: 'row'}}>
              {item.map(item => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: `rgba(0,0,0,0.05)`,
                    padding: vw(2),
                    marginVertical: vw(2),
                    gap: 5,
                    borderRadius: vw(20),
                    marginRight: 10,
                  }}
                  key={item.id}>
                  <Image
                    source={item.image}
                    resizeMode="contain"
                    style={{height: vh(6), width: vw(15), borderRadius: vw(2)}}
                  />
                  <Text style={{color: '#000'}}>{item.title}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: vh(1),
            }}>
            <Text style={{fontSize: vf(2), color: '#000'}}>
              Top Estate Agent
            </Text>
            <Text style={{color: '#204D6C'}}>explore</Text>
          </View>
          <ScrollView horizontal>
            <View style={{flexDirection: 'row'}}>
              {item1.map(item => (
                <View
                  style={{
                    alignItems: 'center',
                    marginVertical: vw(2),
                    gap: 5,
                    borderRadius: vw(20),
                    marginRight: 10,
                  }}
                  key={item.id}>
                  <Image
                    source={item.image}
                    resizeMode="contain"
                    style={{height: vh(10), width: vw(20), borderRadius: vw(2)}}
                  />
                  <Text style={{color: '#000'}}>{item.title}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
          <Text style={{fontSize: vf(2), color: '#000', marginTop: vh(2)}}>
            Explore Nearby Estate
          </Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 15,
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
                  source={require('../images/house1.jpg')}
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
                  source={require('../images/house2.jpg')}
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
                  $270<Text style={{fontSize: 11}}>/month</Text>
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
                  Mill Sper House
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
                  $330<Text style={{fontSize: 11}}>/month</Text>
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
                  Bungalow House
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
                  $230<Text style={{fontSize: 11}}>/month</Text>
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
                  Sky Dendelion
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

export default Dashboard;

const styles = StyleSheet.create({});
