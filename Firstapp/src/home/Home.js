import React,{Component} from 'react';
import {View,StyleSheet,TextInput,Text,Dimensions,Image,ScrollView,StatusBar} from 'react-native';
import { Icon,Carousel } from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux';

const {width,height} = Dimensions.get('window');
const s = width / 640;

export default class Msg extends Component {
    
    render() {       
        return (      
           <ScrollView>
            <View style={{flex:1}}>
                <StatusBar backgroundColor='#f23030'/>
                <View style={styles.sbox}>
                    <View style={styles.search}>
                        <Icon name='search' size='md' color='#fff' />
                        <TextInput style={styles.inp} />
                    </View>
                    <Icon name='shopping-cart' size='lg' color='#fff' />
                </View>
                <View style={styles.car}>
                    <Carousel
                        style={styles.wrapper}
                        selectedIndex={0}
                        autoplay
                        infinite
                        afterChange={this.onHorizontalSelectedIndexChange}
                    >
                        <View
                            style={styles.containerHorizontal}
                        >
                            <Image source={require('../images/banner1.jpg')} />
                        </View>
                        <View
                            style={styles.containerHorizontal}
                        >
                            <Image source={require('../images/banner2.jpg')} />
                        </View>                     
                        <View
                            style={styles.containerHorizontal}
                        >
                            <Image source={require('../images/banner1.jpg')} />
                        </View>
                        
                    </Carousel>
                </View>

                <View>
                    <View style={styles.acv}>
                        <View style={[styles.sicon,{backgroundColor:'#ffcccc'}]}><Image style={styles.imgs} source={require('../images/sicon1.jpg')} /></View>
                        <Text style={styles.txt}>居家维修保养</Text>
                        <Icon name='right' size='lg' color='#cecece' />
                    </View>
                    <View style={styles.acv}>
                        <View style={[styles.sicon,{backgroundColor:'#ffe1b1'}]}><Image style={styles.imgs} source={require('../images/sicon2.jpg')} /></View>
                        <Text style={styles.txt}>住宿优惠</Text>
                        <Icon name='right' size='lg' color='#cecece' />
                    </View>
                    <View style={styles.acv}>
                        <View style={[styles.sicon,{backgroundColor:'#bfe6a8'}]}><Image style={styles.imgs} source={require('../images/sicon3.jpg')} /></View>
                        <Text style={styles.txt}>出行接送</Text>
                        <Icon name='right' size='lg' color='#cecece' />
                    </View>
                    <View style={styles.acv}>
                        <View style={[styles.sicon,{backgroundColor:'#c3ddf2'}]}><Image style={styles.imgs} source={require('../images/sicon4.jpg')} /></View>
                        <Text style={styles.txt}>E族活动</Text>
                        <Icon name='right' size='lg' color='#cecece' />
                    </View>
                </View>

                <Text style={styles.need}>发布需求</Text>

                <View style={styles.allbox}>
                    <Icon name='copyright' size='sm' color='#767676' />
                    <Text style={styles.all}>E族之家 版权所有</Text>
                </View>

            </View>
           </ScrollView>
        )
    }
}

const styles = StyleSheet.create({ 
    sbox:{
        backgroundColor:'#f23030',
        width:'100%',
        height:75*s,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    search:{
        flexDirection:'row',
        width:'75%',
        height: 50*s,
        marginRight:'5%',
        borderRadius:30*s,
        backgroundColor:'#fff',
        opacity:0.7,
        paddingLeft:'4%',
        alignItems:'center'
    },
    inp:{
        fontSize:17,
        color:'#fff',
        height:50*s,
        marginLeft:10*s
    },
    wrapper: {
        backgroundColor: '#fff'
    },
    containerHorizontal: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 270*s,
        width:'100%'
    },
    car:{
        marginBottom:10*s,
        width:'100%'
    },
    acv:{
        flexDirection:'row',
        width:'100%',
        height:110*s,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10*s
    },
    sicon:{
        width:80*s,
        height:80*s,
        borderRadius:40*s,
        backgroundColor:'#ffcccc',
        justifyContent:'center',
        alignItems:'center',
        marginRight:30*s
    },
    txt:{
        width:'64%',
        height:100*s,
        color:'#333333',
        fontSize:22,
        lineHeight:100*s
    },
    imgs:{
        width:50*s,
        height:50*s
    },
    need:{
        width:'70%',
        height:55*s,
        backgroundColor:'#f23030',
        lineHeight:55*s,
        textAlign:'center',
        color:'#fff',
        fontSize:22,
        borderRadius:12*s,
        marginTop:50*s,
        marginLeft:'15%'
    },
    allbox:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:25*s,
        paddingBottom:40*s
    },
    all:{
        textAlign:'center',
        color:'#767676',
        fontSize:15*s
    }
      
});

