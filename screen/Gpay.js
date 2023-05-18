import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {API_URI, BASE_URL} from '../config/Config';
import axios from 'axios';

const Gpay = ({route}) => {
  // const {data: roomId} = route?.params;
  // console.log('data', roomId);

  const [roomsDetails, setRoomsDetails] = useState({});
  const [allocationData, setAllocationData] = useState({
    message: '',
  });
  const navigation = useNavigation();
  //   const gpayPayemnt = () => {
  //     navigation.navigate('RoomList');
  //   };
  // const [buidingsDetails, setBuidingsDetails] = useState([]);

  // const showRooms = async () => {
  //   try {
  //     const res = await axios({
  //       url: API_URI + `/user/room/`,
  //       method: 'GET',
  //       // data: roomId.key,
  //     });
  //     if (res) {
  //       console.log('showRooms', res);
  //       setRoomsDetails(res?.data?.results);
  //     }
  //   } catch (error) {
  //     console.log('error', error);
  //   }
  // };

  const getAllocationData = async () => {
    try {
      const res = await axios({
        url: API_URI + '/user/allocation',
        method: 'POST',
        // data: {
        //   message:'hello want to see the rooms'
        // }
      });
      if (res) {
        console.log('getAllocationData', res);
        setAllocationData(res?.data?.results);
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  const submitHandler = async () => {
    console.log('submitHandler called');
    if (
      // allocationData.room_id != '' &&
      // allocationData.user_id != '' &&
      // allocationData.owner_id != '' &&
      // allocationData.manager_id != '' &&
      allocationData.message
      // allocationData.rent != '' &&
      // allocationData.deposit
    ) {
      console.log('CALL API');

      try {
        const allocationRes = await axios({
          url: API_URI + '/admin/allocation',
          method: 'POST',
          data: {
            ...allocationData,
          },
        });

        if (allocationRes) {
          console.log('allocationRes ', allocationRes);
          if (allocationRes?.data?.success) {
            // navigate('/allocations');
          }
        }
      } catch (error) {
        console.log('API error', error);
      }
    } else {
      window.alert('Required Fields Missing');
    }
  };

  // useEffect(() => {
  //   if (roomId) {
  //     showRooms();
  //     getAllocationData();
  //   }
  // }, [roomId]);
  // useEffect(() => {
  //   getSingleBuildingDetails();
  // }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: vh(100)}}>
      <ScrollView style={{height: vh(100)}}>
        <View>
          <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate('PaymentOptions');
          // }}
          >
            <View style={{width: 50, height: 50, borderRadius: 25}}>
              <IconFa
                name="chevron-left"
                size={40}
                style={{top: 5, left: 5}}
                color={'black'}
              />
            </View>
          </TouchableOpacity>
          {/* <View
            style={{
              backgroundColor: '#23C562',
              height: 100,
              //   justifyContent: 'center',
              alignItems: 'center',
              borderBottomRightRadius: 40,
              borderBottomLeftRadius: 40,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: '600',
                top: 20,
              }}>
              Scan QR Code
            </Text>
          </View> */}

          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <View style={{backgroundColor: 'white', borderRadius: 15}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABVlBMVEX////t5/ZnOrf/zID/VyL/q0AxG5J4Rxn/z4L/Txr/qGXv6fft6Pn8+/7s6/vy7vn18vrx29T/py7/Twn1rKb/0oT59/xfLLT/SQD/TRdiMbVkNbZbJLJaIrJqPLlxPxD/tVT/ynb/rzv9Zz/l3vL/szf+zonv5Or/vWVfNbEfDJUWAJaBX8J8WMD0s67xys/7fmPv2eP6hW72pZz/s2z/Xij/aTL/xXvtu3PFlFe5ilCpeUJpNQD/YCWCUiL6vH7+rUmPXy7SoWD606P22sKbgs5BJJyvm9fUyOm9rN5WNoiJasY8I47Gg197UH21eGfflVKRdcnzwMH4l4n8clL5inb4k4P/fUP/i07yxsn7fmX/nVzw0dj/bzf2y6vx4uCgmMzFpbVGNZtrO5lLKISPhL93arI/IKT4pUnfk2e1dYOja2/Qw+hzTLygiNCWYnNySYC2pNuQYX/3AAAL+UlEQVR4nO2daXvTxhqGKzl25EiWTIyXeM3iAHEWCGSDsARSLyGFFshpaZu2lG70NA7N//9yRvIiWevMO6ORcy49HwrFy+j28y6jbfTFF7FixYoVK1asWLFixYoVK1asWMTKGIp6K1grUyhkNU2QBatkWday2cK1h81ktUkwpxDodcUsZIPgLJjZQtSbSyjkHTadSXltvMwQmHcNITNZIN01gSyQB6cL5PTmJKV9FmWjRnFThoV9prRpC1bGfFPHGALfdDGGw2cwRo1miF19cVP0NacQKp8Qfe8IL0BNRRmqoRs4VGQ28jBwoGhszHDj0xWBjeGWUKe4F1V+EToS30jNQPcAqcRxisOrhtrFLRl5p6ApTsnIPwVNcUnGSFKQJ2K0gBwQowZEU/H/d8CQEacBMNRAjbKKWhUa4rQAhoZIDago6qSmDJFuJqMDbZ+/3dq6aWqLAjGE2Q3NXBS59fbdWa5UKuWsKp0r8O9kPkeF7+8qqrCF6HLpGbvSP1CYyHxPA7odqnr3vhudISoTGbdFYCOU1btnJQ883cR7NCYyrTbAKqNu3/PhozWRZbWBVRlZfeDPR5uJDKsNaHh1+6zkz2eYqKoUU0FWgKBWr37vVV8mdf/mObz1M0pFUIyqN4MNHARqrrTyQIAaySZOQYDvMAEN5Ur/2Qb6yAIQEqNkgDpj7p0KKqsM4hQSo6iIkgHqjCvnIBvp4xSQIOpbckCUkKW3EETqqQ2g16t3IYBIpQcQRNq+Tz6iIsD4wIh0gIAyo95bgCNCdhmpig1gn0ndAsboABFSbmj2oyCdIkcBODOzy9dEiIXf0hGivkg+KNxEwGWw2zQxqqu0Td6fwCZCLLyPNd320cJ9jiZGYSFfE4kHIs7CdNppee5bgIkwQMihCxJARPfd3L7LvwPGhU1syMdRt7AJDbxEXpKciKC2DwEE7FSoZ3h1Jr0w835HyksJJGnH/hnQwRvILgZ5vuPVGSveANE+y1sA7M8AdjEgreJmYJCmF3bf7+RNPF35ORti6XsuDQOy2/SDf5AaeNIknhtiDrKLQV5ryMcQFD8L0wt7yD3JgWcg/jiBCDsUTgoIqDPKuWca6u7tS+54BuL7SRchhKS1BhKkHr0Cuffjvod7JqI1wEvbgKNSpGFKPoKgvnMhTKcNPD+6AeJ3FsTSXchxNzJA0BE2R6FJL/yEhWdHzIHODpNVU8iMTV2xuYePp0v6aYwIKqaEYQo5yK7uwtwbI+6NEBcgk2/Cpg8YQJBNQGPKSYRnaG/0+8DOnJIAwk4Yjg2cg+AhE+eGJqbPQj/8Dbt0xiQEAZqEMysgQpJEhJ3rYkcIOeJGloggwMgJCRIRePEMO8IZWBDhd0TgpRcMCWEbgJ+IwGv0IifEP+QGPKkeOSF+qYF9v5B2I5R8dppsL5qEkMNtunABgYVGXkk7CfMHDx89PMi78tlfMzv+CjCKcEsN8EJLRRgiWgilw8eNRuPxIzfE/CPjtcO8nTC9IgAvBsOd1UCvlVVuP7ER5h81ZnU9fuGMVOnFY+O1xhh/RPjkNvRqN9xiCiZ8lnxi83AAODv71Gli/unwtYbNwyfJZ2ETApuFcmM+aSCOCaWDhp3CovFrB5KV8EkyOX8DiIjbLoBpjixMJhfRTp4b4YED8MCVML23iL4FaiJuu4B9u6Ae6YSJ3bRLlM46o1SadYnS9G5CJzyCXssXLqGc1AmlxN6CWWkOG7ZqYsnDYRVqHJqVZmEvIemESegmhEuoGB6iFr5r6YdPEUaj8dyt6UvPG/qLT81/mNtNDAiPoKUmZMJnAw+l/R0L0MPD54cuvcIgeoFee2j5/539ISG4mOIBQm88MGrpog5jBZLyec9jGvbXjM8uUtTSkAmRifMDQhohwnmwhZjTNoqbR57NH1ETHlEAhk4oqD8naQkTyZ8p7lAInVBQZFrAhExzC0b4hIJyixLwFg0gF8JjSsLjqSf8cokKcOnLqSf8hZLwFw6E4DvxBoh0hAkqwJBnbUPCYypAujTEJaS66165QWMiZZDi7lvQrStA1S/oegUvQopqSllJsY9i0N54T+EhHSA2IeUaQnATaS0M/WjiGBGaiZRZiE9Iu9AVtOtTFlIB/5g39Wp6yjEEcYlmt2kg7FOktAMJAiROqWOU4DQ39UI7ym2AieCzFWPhnz+kX4iGfGazBD76ZAr/HDCDJedIEVkAEpzHZ7FwJxkiE0CSi6IYjEaESN8nDOEDslnTS7l9C49x6RZ9kdFFck0Um7UfFeEYi/AYelLbJpLr2hgt36ncOMIAPGKSgwLhtexshtTPZNwJ4LtDcZbCJhJARovrGedqEKPnmRnER3MeZlJk1wgzSkSDMJlcXHKBlBJLxslQZoRk13mzWcp6RKhDIifNq2wkaenO4uglVoSEdz4xGdNCaFAu3hlo8cj6z6wIyQDZhKmN0EOMCEnvmWHSL7gSEt9jyaKa8iQkv8WSQZjKMkdC8vsPaauprGm9D78uYxAu/9rTAh9AFyjAogNUY8pa74+PrdZvqxiEq7+3Pv5BCwlZaghea2St+QHhpVKpNSxC9MZW6+OHJg0jaLkoMKD8p4GH9NcnDMJPgze3Wn824YdPIIDQWqM120M+tNV/YyTi3+ujd5cvoYzAxaIAI6EAbRfLnTHhf4MJl/8Z/yBiudiGxSoMEHDITZO7xbJYXxttcuo3DMKXozd36qJYrnZlfmubkDYMWbvoF0Ukk3A9OBE/rVsJRbHYvyC2EbzIEJmJsvCmVtG3UayPCYPDdPnzOEjXjA+LlVqb0Eb4QlFEJmq9fnmwiWJ9nIipVKCH5lvrw48jG3tEPy7FYl8E42hXQwMNmSb+42+ipc50xoTIxhOSoeGA+CbKWrtq8llNDMhEMwtHQTpQ9RI/GanWvcb8JWX5tGjdPkutSb30M9EspFYLjUg9FTARKRf4xAMUNssTm2c1sfV61RNw9XXL3UKk8iYmIh0g1sRGVvo2QGsmptY/eyGufl73slBH3MAipF7zOngUp4O6iZY4bf2bdIvU5eS/poMpxzcYiBij0wJiFBvt1Ak42TFaX71atTMur776ygK45rBQz8U3wXWAwVrJQYNo7aLLxk3EKYrUl6+SyyYk+uurl+uW150xOkC8DBydHjCo2GgnVdeNm6inOmPq9dffIDSk5Ddfv06tT7zq8RViNagvsgD03xWWmx4OTqaiEaut9fWWLv2PFBYgcrHpm4qM1p33+xnlzYrn1tkRPeUNKFY2/EZn9ngEnyG6nhbiI/p8A4rTKx9EVoDecSo3a76bJ4qdQL5OwDcUm56ADJ/E4tX3tTfeMTq0MQjRtU1YVW57mcj0aTrug8g9rzpqQVzzY+yIQYAoTnvuxYbxE5Hcf8SNIAv9GTuBBuqqePR9toCuUxscC30Y8fiQaq4dg/lTSV2qTXAWmoziWsdK2emsYcTnUGW3mU0IzyR1VpsmpoVDyHp9bSj97yQfLSsOE0N5Iqn9h/TvhZ6ggM8UT+yEfB4tp/Wxg5RSjolNaI8HnPglsesMA9m6fohPsbQiwoIUSDgRprwe06md8gpSW0vk9ahVWeFnIapPMi9As9zIF/zS0Dpz4/DI4yGidsXTw3Eicnls9QCRYELDQKNpDRfA4exG89m5Z6/KqUHI6dnqxhxVFjjyIcK+ThjCXNRLGdnnCFQ4iEoIexO+0jjOaHRVm5xS0FSzyDUPq03egMjFDY7z0k3uDhqaOOsboiq1biR8SM0+j3JTrEcQoWOFb2OEBg4kbIabjdWNKA0c6EIML1SL4kXUeIa6VbdTpPQqV7t8m7y3spc19ozlWjuaFuEurc2YEfGFvqtLKKFdY5ePxdrltPHpynYrVRa9o1IVu9x2kwiVudisUU5XK8Xa5nTUTy8J3To8IyvlWr3L+pxSCGpeitUyuZOVYrXejb69Y6rZ7deKBJSVcrW2cXVt8AbSLi77xWowZqWM3rXZ7XE8QsFQ2d5Ju1+rFhGnE7Sis9Vq/fZJ83rSjZVpXlxdnvbrFZ2nWkX/QX8Uxfrmm+5Jbxq7HliFQlZrIgmCls0WpmXCGStWrFixYsWKFStWrFixYsW6Lvof1zGvE2z5cSsAAAAASUVORK5CYII=',
                  }}
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 20,
                    marginTop: 10,
                  }}
                />
                <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
                  {/* Antonius Harold Carvalho */}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{fontSize: 17, fontWeight: '600', color: 'black'}}>
                    Tokens:
                    {tokens}
                  </Text>
                  <Image
                    source={require('../../assets/images/mktcoin.jpg')}
                    style={{width: 40, height: 40}}
                  />
                </View> */}

                <Text style={{fontSize: 17, fontWeight: '600', color: 'black'}}>
                  Amount: 5000Rs
                  {/* ₹{amount} */}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  //   alignContent:'center',
                  alignSelf: 'center',
                  borderWidth: 1.5,
                  borderColor: '#43D90A',
                  padding: 20,
                  width: vw(90),
                  height: vh(30),
                  marginTop: 10,
                  borderRadius: 15,
                }}>
                {/* {imageUri ? ( */}
                {/* <IconFa name="refresh" size={25} /> */}
                {/* ) : ( */}
                {/* <IconFa name="plus" size={25} /> */}
                {/* )} */}
                {/* <Text> Add Screenshot</Text> */}
                {/* {imageUri ? 'Show QR Code' : 'Add Screenshot'} */}
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 1,
                }}>
                {/* <Image
                  source={{
                    uri: imageUri
                      ? imageUri
                      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
                  }}
                  style={{width: 300, height: 300}}
                /> */}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 15,
                }}>
                <TouchableOpacity
                  //   onPress={() => {
                  //     imageUri ? setimageUri(null) : selectAllFiles();
                  //   }}
                  style={{width: 170}}
                  // style={{position: 'absolute', bottom: 10, right: 10, marginTop: 10}}
                >
                  {/* <View
                    style={{
                      borderWidth: 1.5,
                      borderColor: '#43D90A',
                      padding: 10,
                      marginTop: 2,
                      borderRadius: 15,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {imageUri ? (
                      <IconFa name="refresh" size={25} />
                    ) : (
                      <IconFa name="plus" size={25} />
                    )}
                    <Text>{imageUri ? 'Show QR Code' : 'Add Screenshot'}</Text>
                  </View> */}
                </TouchableOpacity>
              </View>
              {/* {imageUri ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 20,
                    // marginRight: 20,
                  }}>
                  <TouchableOpacity
                    // onPress={() => {
                    //   submitTransaction();
                    // }}
                    style={{width: 250}}
                    // style={{position: 'absolute', bottom: 10, right: 10, marginTop: 10}}
                  >
                    <View
                      style={{
                        padding: 15,
                        marginTop: 2,
                        borderRadius: 15,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#43D90A',
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '500',
                          color: 'white',
                        }}>
                        Make Payment
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : null} */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  //   alignContent:'center',
                  alignSelf: 'center',
                  borderWidth: 1.5,
                  borderColor: '#43D90A',
                  padding: 20,
                  width: vw(70),
                  marginTop: 2,
                  borderRadius: 15,
                }}>
                {/* {imageUri ? ( */}
                {/* <IconFa name="refresh" size={25} /> */}
                {/* ) : ( */}
                <IconFa name="plus" size={25} />
                {/* )} */}
                <Text> Add Screenshot</Text>
                {/* {imageUri ? 'Show QR Code' : 'Add Screenshot'} */}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Gpay;

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
  textArea: {
    // height: 100,
    // margin: 12,
    borderWidth: 1,
    // padding: 10,
    width: vw(90),
    // height: vh(30),
    borderRadius: 8,
    textAlignVertical: 'top',
    borderColor: '#A09C9C',
  },
});
