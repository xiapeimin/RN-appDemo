import React,{Component} from 'react';
import {View,StyleSheet,Text,Dimensions,Image,ScrollView,TouchableOpacity,AsyncStorage} from 'react-native';
import { Icon,Grid } from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux';

import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    }
};


const {width,scale} = Dimensions.get('window');
const s = width / 640;

const tit1 = ['账户管理','收货地址','我的信息','我的订单','我的二维码','我的积分','我的收藏'];
const imgname1 = ['setting','environment','idcard','profile','qrcode','dollar','star'];
const tit2 = ['居家维修保养','出行接送','我的受赠人','我的住宿优惠','我的活动','我的发布'];
const imgname2 = ['tool','car','user','pay-circle','flag','form'];
const data1 = tit1.map((_val, i) => ({
    icon: <Icon name={imgname1[i]} size={30} color="#aeaeae" />,
    text: <Text style={{fontSize:16,color:'#4f4e4e'}}>{_val}</Text>
}));

const data2 = tit2.map((_val, i) => ({
    icon: <Icon name={imgname2[i]} size={30} color="#aeaeae" />,
    text: <Text style={{fontSize:16,color:'#4f4e4e'}}>{_val}</Text>
}));

export default class Msg extends Component {
    constructor(){
        super();
        this.state = {
            imageUrl:require('../images/head.jpg')
        }
        AsyncStorage.getItem('imgurl').then((res)=>{
            if(res !== null){
                this.setState({
                    imageUrl:JSON.parse(res)
                });
            }
        });
    }
    goout = () => {
        console.log('退出登录');
        AsyncStorage.removeItem('user')
        .then(()=>{
            Actions.login();
        });
    }
    takephoto = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
              const source = { uri: response.uri };
              this.setState({
                imageUrl: source
              });
              AsyncStorage.setItem('imgurl',JSON.stringify(source),(err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log('success');
                }
              });
            }
          });
          
    }
    goMypub = (index) => {
        if(index===5){
            Actions.pub();
        }
    }
    render() {       
        return (      
            <ScrollView>              
                <View style={{flex:1}}>
                    <View style={styles.headbox}>
                        <Image style={styles.back} source={require('../images/back.jpg')} />
                        <TouchableOpacity style={styles.head} onPress={()=>{this.takephoto()}}><Image style={styles.head} source={this.state.imageUrl} /></TouchableOpacity>
                        <Text style={styles.usrname}>BINNU DHILLON</Text>
                    </View>
                    <View style={styles.myhome}>
                        <Icon name='user-add' size='lg' color='#aeaeae'/>
                        <Text style={styles.mytxt}>我的个人中心</Text>
                    </View>
                    <View style={{width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                        <View style={{width:'90%'}}>
                            <Grid
                            data={data1}
                            columnNum={3}
                            itemStyle={{backgroundColor:'#fff',borderColor:'#fff',height:120*s}}
                            />
                        </View>
                    </View>

                    <View style={[styles.myhome,{marginTop:10}]}>
                        <Icon name='tag' size='lg' color='#aeaeae'/>
                        <Text style={styles.mytxt}>E族活动</Text>
                    </View>
                
                    <View style={{width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                        <View style={{width:'90%'}}>
                            <Grid
                            data={data2}
                            columnNum={3}
                            itemStyle={{backgroundColor:'#fff',borderColor:'#fff',height:120*s}}
                            onPress={(_el, index) => this.goMypub(index)}
                            />
                        </View>
                    </View>

                

                <View style={{alignItems:'center',marginBottom:30}}>
                    <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#c00',
                    marginTop: 30,
                    borderRadius:25,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={this.goout}>
                <Text style={{color:'#fff',fontSize:16}}>退出登录</Text>
            </TouchableOpacity></View></View>

            </ScrollView>
           
        )
    }
}

const styles = StyleSheet.create({ 
    headbox:{
        width:'100%',
        height:300*s,
        justifyContent:'center',
        alignItems:'center'
    },
    back:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%'
    },
    head:{
        width:120*s,
        height:120*s,
        position:'absolute',
        borderRadius:60*s,
        top:30*s
    },
    usrname:{
        position:'absolute',
        top:190*s,
        color:'#fff',
        fontSize:20
    },
    myhome:{
        flexDirection:'row',
        width:'100%',
        height:60*s,
        alignItems:'center',
        backgroundColor:'#fff',
        paddingLeft:25*s
    },
    mytxt:{
        fontSize:20,
        color:'#4f4e4e',
        marginLeft:20*s
    },
    out:{
        height:110*s,
        lineHeight:100*s,
        color:'#767676',
        fontSize:15
    }
});


