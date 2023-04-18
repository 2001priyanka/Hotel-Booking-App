import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
const Details = () => {
  const [rooms, setRooms] = useState([
    {
      icon: <IconFa name="bed" style={{fontSize: vf(4), color: '#8BC83F'}} />,
      name: '2 Bedroom',
    },
    {
      icon: (
        <IconFa name="bathtub" style={{fontSize: vf(3), color: '#8BC83F'}} />
      ),
      name: '1 Bathroom',
    },
    {
      icon: (
        <IconFa name="hoop-house" style={{fontSize: vf(3), color: '#8BC83F'}} />
      ),
      name: '1 Hall',
    },
  ]);
  return (
    <SafeAreaView style={{backgroundColor: 'white', height: vh(100)}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            borderRadius: 20,
          }}>
          <Image
            source={require('../images/11.jpg')}
            style={{height: vh(50), width: vw(90), borderRadius: 40}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
          }}>
          <View>
            <Text style={{fontSize: vf(3), color: 'black'}}>Wings Tower</Text>
            <Text style={{fontSize: vf(2)}}>
              <IconFa name="map-marker" style={{fontSize: vf(2)}} />
              Jakarta, Indonesia
            </Text>
          </View>
          <View>
            <Text style={{fontSize: vf(3), color: 'black'}}>$220</Text>
            <Text style={{fontSize: vf(2)}}>per month</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 30,
          }}>
          <View
            style={{
              backgroundColor: '#8BC83F',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              paddingHorizontal: 30,
              height: vh(7),
            }}>
            <Text style={{color: 'white'}}>Rent</Text>
          </View>
          <View
            style={{
              backgroundColor: '#F5F4F8',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              paddingHorizontal: 40,
            }}>
            <Text>Buy</Text>
          </View>
        </View>
        <View style={styles.uppersection1}>
          <View>
            <Image
              source={require('../images/image5.jpg')}
              //   resizeMode="contain"
              style={{
                height: vh(4),
                width: vw(14),
                height: vh(7),
                borderRadius: vw(10),
              }}
            />
          </View>
          <View>
            <Text
              style={{
                paddingLeft: 20,
                fontSize: vf(2.5),
                color: 'black',
                // marginTop: 4,
              }}>
              Anderson
            </Text>
            <Text
              style={{
                paddingLeft: 20,
                fontSize: vf(2),
                color: 'black',
                // marginTop: 4,
              }}>
              Real Estate Agency
            </Text>
          </View>
          <View>
            <IconFa
              name="chat-processing-outline"
              style={{fontSize: vf(3.5), paddingLeft: 70}}
            />
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {rooms.map(item => (
            <View style={styles.uppersection2}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {item.icon}
                <Text
                  style={{
                    fontSize: vf(2),
                    paddingLeft: 10,
                    color: 'black',
                  }}>
                  {item.name}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View>
          <Text
            style={{
              fontSize: vf(2.5),
              marginTop: 20,
              color: 'black',
              paddingLeft: 20,
            }}>
            Location & Public Facilities
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            margin: 20,
          }}>
          {/* <View>
                <Text>hello</Text>
            </View> */}
          <IconFa name="map-marker" />
          <View>
            <Text style={{paddingLeft: 10,color:'black'}}>
              St. Cikoko Timur, Kec. Pancoran, Jakarta Selatan, Indonesia 12770
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems:'center',
            borderRadius:30,
            paddingLeft:20,
            margin: 20,
            borderWidth:0.4,
            height:vh(7)
          }}>
          {/* <View>
                <Text>hello</Text>
            </View> */}
          <IconFa name="map-marker" />
          <View>
            <Text style={{paddingLeft: 10,color:'black'}}>2.5km from Location</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  uppersection1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 30,
    marginTop: 30,
    width: vw(90),
    paddingLeft: 20,
    backgroundColor: '#F5F4F8',
    height: vh(10),
  },
  uppersection2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30,
    width: vw(40),
    backgroundColor: '#F5F4F8',
    height: vh(7),
  },
});
