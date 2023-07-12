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
    navigation.navigate('login');
  };
  const onNext2Pressed = () => {
    console.log('login called');
    navigation.navigate('login');
  };
  const [showRealApp, setShowRealApp] = useState(false);

  const onDone = () => {
    setShowRealApp(true);
    onPress = {onNext2Pressed};
  };
  const RenderNextButton = () => {
    return (
      // <View
      //   onPress={onNext2Pressed}
      //   style={{
      //     flexDirection: 'row',
      //     width: vw(30),
      //     justifyContent:'center',
      //     alignSelf: 'center',
      //     alignContent: 'center',
      //   }}>
      //   <Text
      //     style={{
      //       // flexDirection: 'column',
      //       width: vw(30),
      //       height:vh(4.5),
      //       // alignSelf: 'center',
      //       // alignContent: 'center',
      //       color: '#fff',
      //       fontSize: vf(2.5),
      //       textAlign: 'center',
      //       // left: vw(5),
      //       right:vw(30),
      //       bottom: vh(5),
      //       backgroundColor: '#21CC1E',
      //       borderRadius:10
      //     }}>
      //     Let's start
      //   </Text>
      // </View>
      <View
        onPressIn={onNext2Pressed}
        style={{alignItems: 'center', marginVertical: vh(3)}}>
        <View
          style={{
            height: vh(7),
            width: vw(70),
            bottom: vh(10),
            right: vw(10),
            backgroundColor: '#89C93D',
            borderRadius: vw(3),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontWeight: '600', fontSize: vf(2.5)}}>
            Let's Start
          </Text>
        </View>
      </View>
    );
  };
  const RenderDoneButton = () => {
    return (
      <TouchableOpacity onPress={onNext2Pressed}>
        <View style={{alignItems: 'center', marginVertical: vh(3)}}>
          <View
            style={{
              height: vh(7),
              width: vw(70),
              bottom: vh(10),
              right: vw(10),
              backgroundColor: '#89C93D',
              borderRadius: vw(3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              //  onPress={onNext1Pressed} THIS IS WRONG
              style={{color: '#fff', fontWeight: '600', fontSize: vf(2.5)}}>
              Next
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const slides = [
    {
      key: 's1',
      text: 'Skip',
      title: 'Save Food with our new Feature!',
      image: {
        uri: 'https://media.designcafe.com/wp-content/uploads/2022/07/15170350/luxury-home-design-on-budget.jpg',
      },
      // image: {
      //   uri: require('../images/14.jpg'),
      //   // source: require('../images/logo.png')
      // },
      backgroundColor: '#E73D3B',
    },
    {
      key: 's2',
      title:
        'Luxurious and spacious, this dream house for rent offers stunning panoramic views',
      // text: 'Upto 25% off on Domestic Flights',
      text: 'Skip',
      image: {
        uri: 'https://www.mydomaine.com/thmb/bepet4VMGUG70sCLFNQRdZm9bbg=/2048x0/filters:no_upscale():strip_icc()/SuCasaDesign-Modern-9335be77ca0446c7883c5cf8d974e47c.jpg',
      },
      backgroundColor: '#E73D3B',
    },
    {
      key: 's3',
      title:
        'Experience the epitome of elegance and comfort in this meticulously designed dream house for rent, featuring high-end finishes, a gourmet kitchen, and a private pool',
      text: 'Skip',
      image: {
        uri: 'https://www.mydomaine.com/thmb/Lbjq2hM5w_zquM18v3WdNrPriBw=/2048x0/filters:no_upscale():strip_icc()/SuCasaDesign-Modern2-ec89013bd4d74c6693f8247eee10134b.jpg',
      },
      // backgroundColor: '#E73D3B',
    },
  ];

  const RenderItem = ({item}) => {
    return (
      <>
        <View
          style={{
            flex: 1,
            position: 'relative',
            // backgroundColor: item.backgroundColor,
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
              // alignItems: 'center',
              width: vw(100),
            }}>
            <Image
              style={
                item.key == 's1'
                  ? {width: vw(100), height: vh(100)}
                  : {
                      width: vw(100),
                      height: vh(70),
                      position: 'absolute',
                      top: vh(20),
                    }
              }
              source={item.image}
              // source={require('../images/14.jpg')}
              resizeMode={item.key == 's1' ? 'cover' : 'contain'}
              onPress={onNext2Pressed}
            />
            {item.key == 's1' && (
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  width: vw(100),
                  paddingHorizontal: vw(5),
                  height: vh(100),
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../images/logo.png')}
                  resizeMode="contain"
                  style={{height: vh(100), width: vw(50)}}
                />
              </View>
            )}
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
                  onPress={onNext1Pressed}
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
            <View style={item.key != 's2' && styles.textchange}>
              <Text
                style={{
                  fontSize: vf(2.4),
                  color: '#000',
                  letterSpacing: 2,
                  paddingHorizontal: vw(2),
                }}>
                {item.title}
                {/* {item.key == 's3' && (
                  <Text style={{color: '#204D6C', fontWeight: '600'}}>
                    {' '}
                    {item.textcolor} for
                  </Text>
                )} */}
              </Text>
              {/* <Text
                style={{
                  fontSize: vf(2),
                  color: '#000',
                  letterSpacing: 1,
                  marginTop: vh(1),
                }}>
                {item.text1}{' '}
                {item.key == 's2' && (
                  <Text style={{color: '#204D6C', fontWeight: '600'}}>
                    {item.textcolor}
                  </Text>
                )}
              </Text> */}
              {/* <Text
                style={{
                  fontSize: vf(1.5),
                  color: '#000',
                  letterSpacing: 1,
                  marginTop: vh(2),
                }}>
                {item.text2}
              </Text> */}
            </View>
          </View>
        </View>
      </>
    );
  };

  // const RenderItem = ({item}) => {
  //   return (
  //     <>
  //       <View
  //         style={{
  //           flex: 1,
  //           backgroundColor: item.backgroundColor,
  //           alignItems: 'center',
  //           justifyContent: 'space-around',
  //           paddingBottom: 100,
  //         }}>
  //         <Text style={styles.introTitleStyle2} onPress={onNext2Pressed}>
  //           {item.text}
  //         </Text>
  //         <Text style={styles.introTitleStyle}>{item.title}</Text>

  //         <View>
  //           <Image
  //             style={styles.introImageStyle1}
  //             source={item.image}
  //             onPress={onNext2Pressed}
  //           />
  //         </View>
  //       </View>
  //     </>
  //   );
  // };
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

// const styles = StyleSheet.create({
//   titleStyle: {
//     padding: 10,
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   paragraphStyle: {
//     // padding: 20,
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   introImageStyle1: {
//     width: vw(70),
//     height: vh(30),
//     borderRadius: 30,
//     marginBottom: 75,
//   },
//   introImageStyle: {
//     width: vw(80),
//     height: vh(80),
//     borderRadius: 30,
//     marginBottom: 100,
//   },
//   introTextStyle: {
//     fontSize: 18,
//     color: 'white',
//     textAlign: 'center',
//     paddingVertical: 30,
//   },
//   introTitleStyle1: {
//     fontSize: 20,
//     color: 'white',
//     textAlign: 'right',
//     marginLeft: 300,
//     fontWeight: 'bold',
//     margin: 30,
//   },
//   introTitleStyle2: {
//     fontSize: 20,
//     color: 'white',
//     alignSelf: 'flex-end',
//     // marginTop:20,
//     margin: 30,
//   },
//   introTitleStyle: {
//     flex: 1,
//     fontSize: 30,
//     color: 'white',
//     textAlign: 'center',
//     // marginTop: 30,

//     margin: 30,
//   },
//   buttonCircle: {
//     width: 40,
//     height: 40,
//     backgroundColor: 'rgba(0, 0, 0, .2)',
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
