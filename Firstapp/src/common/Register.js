import React, {Component} from 'react';
import {View, Text, AsyncStorage, TextInput, TouchableOpacity } from 'react-native';
import { Icon,ActivityIndicator } from '@ant-design/react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils';


export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            isLoading:false,
            islogin:false,
        }
    }
    setusername = (text) => {
        console.log('设置用户名',text);
        this.setState({username:text})
    }
    setpwd = (text) => {
        console.log('设置密码',text);
        this.setState({pwd:text})
    }
    register = () => {
        var u=false,p=false;
        if(this.state.username !== '' && this.state.pwd != ''){
            this.setState({
                isLoading:true
            });

            myFetch.post('/register',{
                username:this.state.username,
                pwd:this.state.pwd}
            ).then(res=>{
                console.log(res.desc);
                this.setState({
                    isLoading:false
                });
                if(res.desc==='ok'){
                    AsyncStorage.setItem('uname',this.state.username)
                    .then(u=true);
                    AsyncStorage.setItem('upwd',this.state.pwd)
                    .then(()=>{
                        p=true;
                        if(u&&p){
                            this.setState({
                                islogin:true
                            });
                            setTimeout(function(){
                                Actions.login();
                            },1000);
                        }
                        
                    });
                }            
            });
        }else{
            console.log('注册为空');
        }
            
    }
    
    render() {
        
        return (          
            <View style={{flex: 1,marginTop:50}}>
                <View style={{ alignItems: 'center'}}>
                    <Text style={{fontSize:25,marginBottom:50}}>注册</Text>
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
                        <TextInput placeholder="设置用户名" 
                        onChangeText={this.setusername}
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
                        onChangeText={this.setpwd}
                        placeholder="设置密码" 
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
                    justifyContent: 'center'}}
                    onPress={this.register}>
                        <Text style={{color:'#fff',fontSize:16}}>注册</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    borderRadius:25,
                    alignItems: 'center',
                    justifyContent: 'center'}}
                    onPress={()=>Actions.pop()}>
                        <Text style={{color:'#fff',fontSize:16}}>有账号？去登录</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.isLoading
                    ?<View style={{marginTop:50}}>
                        <ActivityIndicator text="正在注册..." color="red"/>
                    </View>
                    :null
                }
                {
                    this.state.islogin
                    ?<View style={{marginTop:50,alignItems:'center'}}>
                        <Text>注册成功！即将跳转至登录页...</Text>
                    </View>
                    :null
                }
            </View>
        )
    }
}
