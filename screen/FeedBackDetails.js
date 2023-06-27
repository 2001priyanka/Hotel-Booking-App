import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {API_URI, BASE_URL} from '../config/Config';
import axios from 'axios';
const FeedBackDetails = ({}) => {
  const route = useRoute();

  const {data: roomId} = route?.params;
  console.log('data', roomId.key);
  
  const userId = useSelector(reduxsState => reduxsState?.login?.user);
  // console.log(userData);
  const navigation = useNavigation();
  
 
  const [feedbackData, setFeedbackData] = useState([]);
  const [originalRoom, setOriginalRoom] = useState([]);
 

  const getSingleFeedbackData = async () => {
    try {
      const res = await axios({
        url: API_URI + `/user/feedback/${roomId.key}`,
        method: 'GET',
      });
      if (res) {
        console.log('getSingleFeedbackData', res);
        setFeedbackData(res?.data?.results);
        // setOriginalRoom(res?.data?.results);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getSingleFeedbackData();
  }, [roomId]);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: vw(5),
            marginVertical: vh(1),
          }}>
          <Text style={{fontSize: vf(3), color: '#000', marginTop: vh(2)}}>
            Feedbacks
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
            }}>
            <Text
              style={{
                // paddingRight: 30,
                fontSize: vf(3),
                color: 'black',
                // marginTop: 4,
              }}>
              Need services for plumbing
            </Text>
            <Text
              style={{
                // paddingRight: 30,
                fontSize: vf(1.8),
                color: 'black',
                marginTop: 10,
              }}>
              Admin reply:-
            </Text>
            <Text
              style={{
                // paddingRight: 30,
                fontSize: vf(2.5),
                color: 'black',
                marginTop: 10,
              }}>
              {feedbackData.remarks}
            </Text>
          </View>
        </View>
      </View>

      {/* <FlatList
          data={feedbackData}
          renderItem={_renderItem}
          //   numColumns={2}
          //   contentContainerStyle={{padding: vw(1.5)}}
        /> */}
    </ScrollView>
  );
};

export default FeedBackDetails;

const styles = StyleSheet.create({
  root: {
    alignItems: 'stretch',
    padding: 5,

    flex: 1,
    backgroundColor: '#555',
  },
  slider: {
    marginVertical: 20,
  },
  button: {},
  header: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 12,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 10,
    paddingHorizontal: 30,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  valueText: {
    // width: 50,
    color: 'black',
    fontSize: 20,
  },
  card: {
    // flex: 1,
    // flexDirection: 'column',
    borderRadius: 10,
    // paddingHorizontal: 10,
    // paddingTop: 10,
    alignSelf: 'center',
    // margin: 10,
    width: vw(90),
    backgroundColor: '#F5F4F8',
    elevation: 2,
    marginBottom: 20,
  },
  detailsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: vw(90),
    padding: 20,
  },
});
