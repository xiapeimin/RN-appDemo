import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  View,
  TextInput,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { Icon } from '@ant-design/react-native';

const data = [1,2,3,4,5,6];
const {width,scale} = Dimensions.get('window');
const s = width / 640;


export default class Test extends Component {
  
  render(){
    return (
        <>
          <StatusBar backgroundColor='#f23030'/>
          <SafeAreaView>
    
            <ScrollView>
              <View style={styles.backcolor}>
                <View style={styles.inpBox}>
                  <TextInput style={styles.inp} />
                  <Icon name="search" size="md" color="#a9a9a9" />           
                </View>
                <View style={styles.kind}>             
                  <TouchableOpacity>
                        <Text style={[styles.kindtxt,styles.txtcolor]}>综合</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.kindtxt}>销量</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.kindtxt}>新品</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.kindtxt}>价格</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.kindtxt}>信用</Text>
                    </TouchableOpacity>
                </View>
              </View>
    
              <View style={styles.food}>
                <FlatList 
                data={data} 
                numColumns={2} 
                renderItem={({item})=>
                  <View style={styles.foodBox}>
                    <View style={{alignItems:'center',width:'100%'}}><Image resizeMode="contain" style={{height:180*s,marginTop: 50*s}} source={item%2==1 ? require('../images/food1.jpg') : require('../images/food2.jpg')} /></View>
                    <Text style={styles.fp}>36.00</Text>
                  </View>} 
                />           
              </View>
            
            </ScrollView>
    
        </SafeAreaView>
        </>
         
      );

  }
  
};

const styles = StyleSheet.create({  
  backcolor:{
    height:140*s,
    paddingTop:12*s,
    backgroundColor:'#fff'
  },
  inpBox:{
    width:'84%',
    height:50*s,
    marginLeft:'8%',
    paddingLeft:'3%',
    borderRadius:5*s,
    alignItems:'center',
    backgroundColor:'#eeeeee',
    flexDirection:'row'
  },
  inp:{
    width:'90%',
    height:'100%',
    fontSize:18
  },
  search:{
    width:'10%',
    height:'100%',
    backgroundColor:'#eeeeee'
  },
  kind:{
    width:'100%',
    height:70*s,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  kindtxt:{
    fontSize:20,
    color:'#424141',
    textAlign:'center'
  },
  txtcolor:{
    color:'red'
  },
  food:{
    height:1120*s,
    backgroundColor: '#F4F4F4',
    paddingTop: 12*s
  },
  foodBox:{
    width:'46%',
    height:360*s,
    backgroundColor:'#fff',
    marginBottom:10*s,
    marginLeft:'2.5%'
  },
  foodtxt:{
    fontSize:16,
    color:'#888787',
    marginLeft:'5%',
    lineHeight:25*s,
    marginTop:20*s
  },
  fp:{
    color:'red',
    fontSize:17,
    marginLeft:'5%',
    marginTop:15*s
  }
  
});


