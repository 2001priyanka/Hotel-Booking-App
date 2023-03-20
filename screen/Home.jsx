import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
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

import {slides} from './slides';

const Home = () => {
  const navigation = useNavigation();
  const onNext1Pressed = () => {
    navigation.navigate('user');
  };
  const onNext2Pressed = () => {
    navigation.navigate('login');
  };
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
    onPress = {onNext2Pressed};
  };
  const RenderNextButton = () => {
    return (
      <View onPress={onNext2Pressed} style={{}}>
        <Text style={{width:vw(100),color: '#fff', fontSize: vf(2.5),textAlign:'center',left:vw(5),bottom:vh(4)}}>
          Let's start
        </Text>
      </View>
    );
  };
  const RenderDoneButton = () => {
    return (
      <View onPress={onNext2Pressed}>
        <View style={{bottom: vh(4), borderRadius: vw(3),left:vw(5)}}>
          <TouchableOpacity
            style={{
              width: vw(90),
              // height: vh(5),
              borderRadius: vw(3),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={onNext1Pressed}>
            <Text style={{color: '#fff', fontSize: vf(2.5)}}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const RenderItem = ({item}) => {
    return (
      <>
        <View
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: item.backgroundColor,
            // alignItems: 'center',
            justifyContent: 'center',
            // paddingBottom: 100,
          }}>
          {/* <TouchableOpacity> */}
          <View
            style={{
              // position: 'relative',
              // justifyContent: 'center',
              height: vh(100),
              alignItems: 'center',
              width: vw(100),
            }}>
            <Image
              style={
                item.key == 's1'
                  ? {width: vw(100), height: vh(100)}
                  : {
                      width: vw(97),
                      height: vh(100),
                      position: 'absolute',
                      top: vh(13),
                    }
              }
              source={item.image}
              resizeMode="contain"
              onPress={onNext2Pressed}
            />
            {item.key != 's1' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: vw(100),
                  paddingHorizontal: vw(5),
                }}>
                <Image
                  source={require('../images/logo.jpg')}
                  resizeMode="contain"
                  style={{height: vh(10), width: vw(10)}}
                />
                <Text
                  style={{
                    marginTop: vh(4),
                    backgroundColor: `rgba(0,0,0,0.1)`,
                    color: '#000',
                    height: vh(4),
                    fontSize: vf(1.3),
                    fontWeight: '400',
                    letterSpacing: 2,
                    width: vw(17),
                    borderRadius: vw(20),
                    textAlign: 'center',
                    paddingTop: vh(1),
                  }}>
                  {item.text}
                </Text>
              </View>
            )}
            <View style={item.key != 's1' && styles.textchange}>
              <Text style={{fontSize: vf(3), color: '#000', letterSpacing: 1}}>
                {item.title}{item.key=='s3'&& <Text style={{color: '#204D6C', fontWeight: '600'}}> {item.textcolor} for</Text>}
              </Text>
              <Text style={{fontSize: vf(3), color: '#000', letterSpacing: 1,marginTop:vh(1)}}>
                {item.text1}{' '}
                {item.key=='s2'&&<Text style={{color: '#204D6C', fontWeight: '600'}}>
                  {item.textcolor}
                </Text>}
              </Text>
              <Text
                style={{
                  fontSize: vf(1.5),
                  color: '#000',
                  letterSpacing: 1,
                  marginTop: vh(2),
                }}>
                {item.text2}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  };
  return (
    <>
      {showRealApp ? (
        <SafeAreaView>
          <View></View>
        </SafeAreaView>
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onPress={onNext2Pressed}
          onDone={onDone}
          renderDoneButton={RenderDoneButton}
          renderNextButton={RenderNextButton}
        />
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  textStyle: {
    // color: '#fff',
    position: 'absolute',
    textAlign: 'center',
    width: vw(100),
    top: vh(40),
    fontSize: vf(10),
    fontWeight: '500',
    letterSpacing: -3,
  },
  textchange: {
    //   position: 'absolute',
    textAlign: 'center',
    width: vw(100),
    //   bottom: vh(19),
    //   fontSize: vf(10),
    fontWeight: '500',
    letterSpacing: 2,
    paddingHorizontal: vw(5),
  },
});
