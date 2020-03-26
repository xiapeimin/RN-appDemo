import React, {Component} from 'react';
import {View, Text, AsyncStorage, TextInput, TouchableOpacity,BackHandler,ToastAndroid,StyleSheet } from 'react-native';
import {Icon,ActivityIndicator} from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils';
export default class Login extends Component {

  constructor(){
    super();
    this.state = {
      username:'',
      pwd:'',
      isLoading:false,
      uname:'',
      upwd:'',
      flag:0
    }
    AsyncStorage.getItem('uname').then((res)=>{
      if(res){
        console.log(res);
        this.setState({
          username:res,
          uname:res
        });
      }
    });
    AsyncStorage.getItem('upwd').then((res)=>{
      if(res){
        console.log(res);
        this.setState({
          pwd:res,
          upwd:res
        });
      }
    });
      
  }
  componentDidMount(){
    let isExit = false;
    let now = 0;
    BackHandler.addEventListener('back',()=>{  //组件卸载时 记得要取消监听
      if(!isExit){
        now = new Date().getTime();
      }
      if(new Date().getTime()-now<2000 && isExit){
        BackHandler.exitApp();
      }else{
        ToastAndroid.show('确定要退出吗',100);
        console.log('login退出ll');
        now = new Date().getTime();
        isExit = true;
        return true;
      }
    
    });     

  }
      
  userhandle = (text)=>{
    this.setState({username:text})
  }
  pwdhandle = (text)=>{
    this.setState({pwd:text})
  }
  login = ()=>{
    if(this.state.username!=='' && this.state.pwd!==''){
      this.setState({
        isLoading:true,
        flag:0
      });

      //myFetch.get('/topic',{limit:4}).then(res=>console.log(res));
      myFetch.post('/login',{
        username:this.state.username,
        pwd:this.state.pwd}
      ).then(res=>{
        console.log(res);
        //根据返回状态进行判断，正确是跳转到首页
        if(res.data.username===this.state.uname && res.data.pwd===this.state.upwd){
          AsyncStorage.setItem('user',JSON.stringify(res.data))
          .then(()=>{
            this.setState({
              flag:0,
              isLoading:false
            });
            Actions.homePage();
          });

        }else{
          console.log('用户名或密码错误');
          this.setState({
            flag:1,
            isLoading:false
          });
        }         
          
      });
    }else{
      console.log('输入为空');
    }
  }
  register = ()=>{
    Actions.regPage();
    console.log('去注册');
  }
  render() {
    return (
      <View style={{flex: 1,marginTop:50}}>
        <View
          style={{ alignItems: 'center'}}>
          <Text style={{fontSize:25,marginBottom:50}}>登录</Text>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="用户名" 
                onChangeText={this.userhandle}
                value={this.state.username}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="lock" color="red"/>
            <TextInput 
                onChangeText={this.pwdhandle}
                placeholder="密码" 
                value={this.state.pwd}
                secureTextEntry={true}
            />
          </View>
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
                onPress={this.login}>
                <Text style={{color:'#fff',fontSize:16}}>登录</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    borderRadius:25,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={this.register}>
                <Text style={{color:'#fff',fontSize:16}}>注册</Text>
            </TouchableOpacity>
        </View>
        {
          this.state.flag==1?<Text style={{marginTop:50,textAlign:'center',color:'red'}}>用户名或密码错误！</Text>:null
        }
        {
          this.state.isLoading
          ?<View style={{marginTop:50}}>
            <ActivityIndicator text="正在登录..." color="red"/>
          </View>
          :null
        }
      </View>
    );
  }
}

