import React,{Component} from 'react';
import {View,Text,StatusBar,StyleSheet,ScrollView,ToastAndroid} from 'react-native';
import { Icon } from '@ant-design/react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';

export default class Mypublish extends Component {
    constructor(){
        super();
        this.state = {
            tits:[],
            page:1,
            butt:0,
            numarr:[]
        }
        for(var i=0;i<12;i++){
            this.state.numarr.push(Math.random()*10);
        }
    }
    componentDidMount(){
        var page = this.state.page
        fetch('https://cnodejs.org/api/v1/topics?limit=12&page='+page)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                console.log(res.data.length);
                this.setState({
                    tits:res.data,
                    butt:1
            })
        });

    }
    agoPg = () => {
        var page = this.state.page-1;
        var arr = [];
        for(var i=0;i<this.state.numarr.length;i++){
            arr.push(Math.random()*10);
        }
        if(page !== 0){
            fetch('https://cnodejs.org/api/v1/topics?limit=12&page='+page)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                this.setState({
                    tits:res.data,
                    page:page,
                    numarr:arr
                });
            });    
        }else if(page === 0){
            ToastAndroid.show('已经是第一页了哦',100);
        }
    }
    nextPg = () => {
        var page = this.state.page+1;
        var arr = [];
        for(var i=0;i<this.state.numarr.length;i++){
            arr.push(Math.random()*10);
        }
        fetch('https://cnodejs.org/api/v1/topics?limit=12&page='+page)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                this.setState({
                    tits:res.data,
                    page:page,
                    numarr:arr
                });
            });        
    }
   
    render() {
        return (          
            <ScrollView>
            <View style={{flex:1}}>
                <StatusBar backgroundColor='#f23030'/>
                <View style={styles.nav}>
                    <Icon name='left' size='lg' color='white' onPress={()=>Actions.pop()}/>
                    <Text style={styles.ntxt}>我的发布</Text>
                    <Icon name='ellipsis' size='lg' color='white'/>
                </View>
                <View style={styles.tit}>
                    {
                        this.state.tits.map((item,index) =>
                            <View style={styles.msg}>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.titles}>{item.title}</Text>
                                <Text style={styles.time}>{item.create_at.slice(0,10)}</Text>
                                <Text style={[styles.reply,{color:this.state.numarr[index]<5 ? '#f01d1d' : '#4f4e4e'}]}>{this.state.numarr[index]>5 ? '已回复' : '待回复'}</Text>
                            </View>
                        )
                    }
                    <View style={[styles.pages,{display:this.state.butt===1 ? "flex" : "none"}]}>
                        <Button style={styles.change} onPress={this.agoPg}>上一页</Button>
                        <Text style={styles.ptxt}>第{this.state.page}页</Text>
                        <Button style={styles.change} onPress={this.nextPg}>下一页</Button>
                    </View>
                </View>
                
                
            </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    nav:{
        width:'100%',
        height:50,
        backgroundColor:'#f23030',
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
    },
    ntxt:{
        color:'#ffffff',
        fontSize:25,
        width:'80%',
        textAlign:'center'
    },
    tit:{
        backgroundColor:'#ffffff',
        paddingBottom:20,
        paddingLeft:'2%',
        paddingRight:'2%'
    },
    msg:{
        width:'100%',
        height:60,
        paddingLeft:'3%',
        paddingRight:'3%',
        flexDirection:'row'
    },
    titles:{
        width:'50%',
        height: 60,
        fontSize:16,
        color:'#4f4e4e',
        overflow:'hidden',
        lineHeight:60,
        marginRight:'15%'
    },
    pages:{
        width:'100%',
        height:40,
        flexDirection:'row',
        paddingLeft:'3%',
        paddingRight:'3%',
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#ffffff',
        marginTop:20
    },
    change:{
        width:120,
        height:40,
        borderRadius:20,
        lineHeight:40,
        backgroundColor:'#f23030',
        color:'#ffffff'
    },
    ptxt:{
        width:'52%',
        height:40,
        lineHeight:40,
        textAlign:'center',
        fontSize:16,
        color:'#3b3a3a'
    },
    time:{
        width:'18%',
        fontSize:16,
        lineHeight:60,
        color:'#949090',
        marginRight:'1%'
    },
    reply:{
        fontSize:16,
        lineHeight:60
    }
});