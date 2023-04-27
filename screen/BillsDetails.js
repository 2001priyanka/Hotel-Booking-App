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

const BillsDetails = ({route}) => {
  const bill = route?.params;
  console.log('route?.params', route?.params);

  //   const [pendingBillsDetails, setpendingBillsDetails] = useState({});
  // const [buidingsDetails, setBuidingsDetails] = useState([]);

  const [pendingBillsDetails, setPendingBillsDetails] = useState({});

  const getPendingBillsDetails = async () => {
    try {
      const res = await axios({
        url: API_URI + '/user/bill',
        method: 'GET',
      });
      if (res) {
        console.log('getPendingBillsDetails', res);
        setPendingBillsDetails(res?.data?.results);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (bill) {
      setPendingBillsDetails(bill);
      //   getPendingBillsDetails();
    }
    // getPendingBillsDetails();
  }, [bill]);

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
          {pendingBillsDetails?.billCopy && (
            <Image
              // source={require('../images/11.jpg')}
              source={{
                uri:
                  BASE_URL +
                  pendingBillsDetails?.billCopy?.replace('Storage\\', ''),
              }}
              style={{height: vh(40), width: vw(90), borderRadius: 40}}
            />
          )}
        </View>
        <View style={{paddingHorizontal:30}}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: vf(3),
                marginTop: vh(5),
                color: '#000',
              }}>
              Pending Bills Details
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <View>
              <Text style={{fontSize: vf(2), color: 'black'}}>Amount </Text>
            </View>
            <View>
              <Text style={{fontSize: vf(2), color: 'black'}}>
                {pendingBillsDetails?.amount}Rs
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <View>
              <Text style={{fontSize: vf(2), color: 'black'}}>Bill Date</Text>
            </View>
            <View>
              <Text style={{fontSize: vf(2), color: 'black'}}>
                {pendingBillsDetails?.billDate}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <View>
              <Text style={{fontSize: vf(2), color: 'black'}}>Due Date</Text>
            </View>
            <View>
              <Text style={{fontSize: vf(2), color: 'black'}}>
                {pendingBillsDetails?.dueDate}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <View>
              <Text style={{fontSize: vf(2), color: 'black'}}>Status</Text>
            </View>
            <View>
              <Text style={{fontSize: vf(2), color: 'black'}}>
                {pendingBillsDetails?.status}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <View>
              <Text style={{fontSize: vf(2), color: 'black'}}>
                Over Due Amount
              </Text>
            </View>
            <View>
              <Text style={{fontSize: vf(2), color: 'black'}}>
                {pendingBillsDetails?.overdueAmount}Rs
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
          }}>
          <View
            style={{
              backgroundColor: '#204D6C',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
              paddingHorizontal: 30,
              height: vh(7),
              width: vw(70),
            }}>
            <Text style={{color: 'white', fontSize: vf(2.5)}}>Pay</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            margin: 20,
          }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillsDetails;

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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30,
    width: vw(40),
    backgroundColor: '#F5F4F8',
    height: vh(7),
  },
});
