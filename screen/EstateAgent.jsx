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

const EstateAgent = () => {
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
        <Text
          style={{
            fontSize: vf(3.5),
            color: '#000',
            letterSpacing: 0.5,
            fontWeight: '600',
            marginTop: vh(5),
          }}>
          Top Estate Agent
        </Text>
        <Text style={{marginVertical: vh(1)}}>
          Find the best recommendations place to live
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
              position:'relative',
              padding: 5,
            }}>
            <View style={{position:'absolute',top:10,left:10,backgroundColor:'#89C93D',height:vh(3.5),width:vw(7),zIndex:1,borderRadius:vw(2)}}>
            <Text style={{color:'#fff',fontWeight:'600',textAlign:'center',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:vf(1.5)}}>#</Text>8</Text>
            </View>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/image1.jpg')}
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
                  textAlign: 'center',
                }}>
                Amanda
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="star" color="yellow" size={20} />
                  <Text
                    style={{color: '#000', fontSize: 12, fontWeight: '600'}}>
                    4.9
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="home" size={15} />
                  <Text style={{fontSize: 12}}>
                    <Text style={{color: '#000', fontWeight: '600'}}>112</Text>{' '}
                    sold
                  </Text>
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
              position:'relative',
              padding: 5,
            }}>
            <View style={{position:'absolute',top:10,left:10,backgroundColor:'#89C93D',height:vh(3.5),width:vw(7),zIndex:1,borderRadius:vw(2)}}>
            <Text style={{color:'#fff',fontWeight:'600',textAlign:'center',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:vf(1.5)}}>#</Text>8</Text>
            </View>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/image2.jpg')}
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
                  textAlign: 'center',
                }}>
                Anderson
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="star" color="yellow" size={20} />
                  <Text
                    style={{color: '#000', fontSize: 12, fontWeight: '600'}}>
                    4.9
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="home" size={15} />
                  <Text style={{fontSize: 12}}>
                    <Text style={{color: '#000', fontWeight: '600'}}>112</Text>{' '}
                    sold
                  </Text>
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
              position:'relative',
              padding: 5,
            }}>
            <View style={{position:'absolute',top:10,left:10,backgroundColor:'#89C93D',height:vh(3.5),width:vw(7),zIndex:1,borderRadius:vw(2)}}>
            <Text style={{color:'#fff',fontWeight:'600',textAlign:'center',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:vf(1.5)}}>#</Text>8</Text>
            </View>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/image3.jpg')}
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
                  textAlign: 'center',
                }}>
                Samantha
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="star" color="yellow" size={20} />
                  <Text
                    style={{color: '#000', fontSize: 12, fontWeight: '600'}}>
                    4.9
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="home" size={15} />
                  <Text style={{fontSize: 12}}>
                    <Text style={{color: '#000', fontWeight: '600'}}>112</Text>{' '}
                    sold
                  </Text>
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
              position:'relative',
              padding: 5,
            }}>
            <View style={{position:'absolute',top:10,left:10,backgroundColor:'#89C93D',height:vh(3.5),width:vw(7),zIndex:1,borderRadius:vw(2)}}>
            <Text style={{color:'#fff',fontWeight:'600',textAlign:'center',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:vf(1.5)}}>#</Text>8</Text>
            </View>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/image4.jpg')}
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
                  textAlign: 'center',
                }}>
                John Dow
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="star" color="yellow" size={20} />
                  <Text
                    style={{color: '#000', fontSize: 12, fontWeight: '600'}}>
                    4.9
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="home" size={15} />
                  <Text style={{fontSize: 12}}>
                    <Text style={{color: '#000', fontWeight: '600'}}>112</Text>{' '}
                    sold
                  </Text>
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
              position:'relative',
              padding: 5,
            }}>
            <View style={{position:'absolute',top:10,left:10,backgroundColor:'#89C93D',height:vh(3.5),width:vw(7),zIndex:1,borderRadius:vw(2)}}>
            <Text style={{color:'#fff',fontWeight:'600',textAlign:'center',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:vf(1.5)}}>#</Text>8</Text>
            </View>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/image5.jpg')}
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
                  textAlign: 'center',
                }}>
                Michael
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="star" color="yellow" size={20} />
                  <Text
                    style={{color: '#000', fontSize: 12, fontWeight: '600'}}>
                    4.9
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="home" size={15} />
                  <Text style={{fontSize: 12}}>
                    <Text style={{color: '#000', fontWeight: '600'}}>112</Text>{' '}
                    sold
                  </Text>
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
              position:'relative',
              padding: 5,
            }}>
            <View style={{position:'absolute',top:10,left:10,backgroundColor:'#89C93D',height:vh(3.5),width:vw(7),zIndex:1,borderRadius:vw(2)}}>
            <Text style={{color:'#fff',fontWeight:'600',textAlign:'center',justifyContent:'center',alignItems:'center'}}><Text style={{fontSize:vf(1.5)}}>#</Text>8</Text>
            </View>
            <View style={{position: 'relative'}}>
              <Image
                source={require('../images/image6.jpg')}
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
                  textAlign: 'center',
                }}>
                Tobi
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="star" color="yellow" size={20} />
                  <Text
                    style={{color: '#000', fontSize: 12, fontWeight: '600'}}>
                    4.9
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // marginVertical: vh(1),
                  }}>
                  <IconFa name="home" size={15} />
                  <Text style={{fontSize: 12}}>
                    <Text style={{color: '#000', fontWeight: '600'}}>112</Text>{' '}
                    sold
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default EstateAgent;

const styles = StyleSheet.create({});
