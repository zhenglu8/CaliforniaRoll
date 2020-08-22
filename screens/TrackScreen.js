import React, { Component } from 'react';
import {TouchableOpacity, Image,StyleSheet,Dimensions, View, Text, Animated, Easing, PanResponder, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
//import DateTimePicker from 'react-native-modal-datetime-picker';

//const { width, height  } = Dimensions.get('window');
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const halfHeight = height / 2;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.006339428281933124;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

console.disableYellowBox = true;

const iconSize = Math.round(height/10);

// impoart your own icon.
const carIcon = require('../assets/car.jpg');

const initCoordinates = {
  latitude: 37.791736,
  longitude: -122.427362,
  latitudeDelta: 5,
  longitudeDelta: 5,
};

export default class SmoothAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routeData: {},
      bearing: 0,
      speed: 0,
      time: "N/A",
      isMapReady: false,
      coordinate: new MapView.AnimatedRegion({
        latitude: 37.791736,
        longitude: -122.427362,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }), 
    };
    this.indx = 0;

  }

  onMapLayout = () => {
    this.setState({ isMapReady: true });
  }

  handleAnimation = () => {
    /*
    const data = this.data[this.indx]  
    const coord = data.loc.coordinates
    const markerCoord = {
      latitude: coord[1],
      longitude: coord[0]
    }
    console.log("data ==>",data);
    this.indx = this.indx + 1;  
    const duration = 100
    const region = {
      ...markerCoord,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA        
    };
    */
   const coord = [
    -122.425141, 37.804159, //Bay St
    -122.424956, 37.803224, //Francisco St
    -122.424768, 37.802287, //Chestnut
    -122.424567, 37.801352, //Lombard
    -122.424385, 37.800432, //Greenwich
    -122.424189, 37.799502, //Filbert
    -122.424004, 37.798561, //Union
    -122.423808, 37.797624, //Green
    -122.423618, 37.796689, //Vallejo
    -122.423425, 37.795744, //Broadway
    -122.423259, 37.794814, //Pacific
    -122.423082, 37.793943, //Jackson
    -122.422889, 37.793068, //Washington
    -122.422704, 37.792186, //Clay
    -122.422540, 37.791317, //Sacramento
    -122.422355, 37.790374, //California
    -122.422157, 37.789407, // Pine
    -122.422066, 37.788960, //Austin
    -122.421967, 37.788489, //Bush
    -122.421878, 37.788029, //Fern
    -122.421773, 37.787561, //Sutter
    -122.421676, 37.787090, //Hemlock
    -122.421577, 37.786638, //Post
    -122.421483, 37.786163, //Cedar
    -122.421389, 37.785688, //Geary
    -122.421298, 37.785230, //Myrtle
    -122.421215, 37.784766, //O'Farrel
    -122.421118, 37.784293 //Olive St

  ];
  if (this.indx <= 55){
   const markerCoord = {
    latitude: coord[1+this.indx],
    longitude: coord[this.indx]
  }
  
  this.indx = this.indx + 2; 
  
  const duration = 100
   
    const region ={
      ...markerCoord,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      userNativeDriver: false 
    }
    
    
    this.map.animateToRegion(region,1000*2)
    this.state.coordinate.timing(markerCoord,1000).start();
    }
    else{
      Alert.alert("Delivered")
    }
  
    
    // if (Platform.OS === 'android') {
    //   if (this.marker) {
    //     this.state.coordinate.timing(markerCoord,500*2).start();
    //     // console.log("===>",this.marker._component)
    //     // this.marker._component.animateMarkerToCoordinate(
    //     //   markerCoord,
    //     //   duration
    //     // );
    //   }
    // } else {
    //   console.log("markerCoord",markerCoord)
      

    // }

    //this.setState({time: data.time, bearing: data.bearing})
  }
  countDonw  = () => {
    console.log("countDonw function");
  }
  componentDidMount = async () => {
    //const result = await (await fetch('https://my-json-server.typicode.com/zhenglu8/demo')).json()
    const result = [
      "-121.892276", "37.325465",
      "-121.892277", "37.325466",
      "-121.892278", "37.325467",
      "-121.892279", "37.325468",
      
    ];
    //this.data = result.data
    
    //this.handleAnimation()
    setInterval(this.handleAnimation,3000)
    
    
  
  }

  

  render(){ 
    
    return (
      <View style={{flex:1}}>        
          <MapView
            style={styles.map}
            
            initialRegion = {initCoordinates}
            ref={ref => { this.map = ref; }}
          >
            
            <MapView.Marker.Animated
              coordinate={this.state.coordinate}
              ref={marker => { this.marker = marker; }}
              >
              
              <Image
                style={{
                width: 40,
                height: 40,
                resizeMode: 'contain',
                transform: [
                    { rotate: `${this.state.bearing}deg` }
                ],
                zIndex:3
                }}                
                source={carIcon}
              />
            </MapView.Marker.Animated>
                    
          </MapView>  
      </View>
    )
  }
}



var styles = StyleSheet.create({
   container: {
     // flex: 1,
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,      
      //justifyContent: 'flex-end'
   },
   panview: {
    position: "absolute",    
   },
   box: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      height: height, // let's make panview height is equal to screen height
      width: width,
      borderRadius: 10,
      //position: 'absolute'
   },
   map: {
    height: height,
     width: width,
   },

});