import React,{useState,useEffect} from 'react';
import {StyleSheet,View,Text,AsyncStorage, Image, BackHandler,ToastAndroid } from 'react-native';
import {Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal, Actions} from 'react-native-router-flux';
import { Icon } from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';
import Home from './src/home/Home';
import Goods from './src/goods/Goods';
import Userinfor from './src/userinfor/Userinfor';
import Login from './src/common/Login';
import SwiperPage from './src/common/SwiperPage';
import Rgister from './src/common/Register';
import Mypublish from './src/userinfor/Mypublish';


console.disableYellowBox = true;

const rootUrl = 'https://www.fastmock.site/mock/65721c49c01f167ea082d0dc81fb0c41/api';

const App = () => {
    let [isLogin,setLogin] = useState(false);
	let now = 0;
	let [isInstall,setInstall] = useState(true);
    
	let init = () => {
		AsyncStorage.getItem('isInstall').then((res)=>{
			if(res){
				setInstall(false);
			}
			console.log(res,'lll');
		});
		AsyncStorage.getItem('user').then((res)=>{
			console.log(res);
			let user = JSON.parse(res);
			if(user&&user.token){
				setLogin(true);
				SplashScreen.hide();         
			}
			if(!user){
				setTimeout(() => {
					SplashScreen.hide();  
				}, 2000); 
			}
			
		});
	}
	useEffect(()=>{
		init();
	},[]);

	let afterInstall = () => {
		console.log('after install');
		setInstall(false);
	}
	if(isInstall){
		return <View style={{flex:1}}>
		    <SwiperPage afterInstall={afterInstall} />
	    </View>
	}
	
	return (
		<Router
			backAndroidHandler={()=>{
				console.log(Actions.currentScene,'lll');
				if(Actions.currentScene === 'login'){
					if(new Date().getTime()-now<2000){
						BackHandler.exitApp();
					}else{
						ToastAndroid.show('确定要退出吗',100);
						now = new Date().getTime();
						return true;
					}
				}
				if(Actions.currentScene != 'home'){
					Actions.pop();
					return true;
				}else{
					if(new Date().getTime()-now<2000){
						BackHandler.exitApp();
					}else{
						ToastAndroid.show('确定要退出吗',100);
						now = new Date().getTime();
						return true;
					}
				}
				
			}}
		>
			<Overlay>
			<Modal key="modal" hideNavBar>
                {/**<Scene key="login" initial={true} component={Login}/> */}
				<Lightbox key="lightbox">
					<Drawer 
						key="drawer"
						contentComponent={()=><Text>drawer</Text>}
						drawerIcon={()=><Icon name="menu"/>}
						drawerWidth={400}
					>
						<Scene key="root">
							<Tabs 
								key='tabbar'
								hideNavBar
								activeTintColor="red"
								inactiveTintColor="black"
								tabBarStyle={{backgroundColor:'#fff'}}
							>
								{/* 首页 */}
								<Scene key='homePage'
									title='首页'
									icon={
										({focused})=><Icon 
											color={focused?'red':'black'} 
											name="home"
										/>
									}
								>
									<Scene key='home' hideNavBar={false} component={Home} hideNavBar/>
								</Scene>
								{/* 商品分类 */}
								<Scene key='goodsPage'
									title='商品分类'
									icon={
										({focused})=><Icon 
											color={focused?'red':'black'} 
											name="appstore"
										/>
									}
									
								>
									<Scene key="goods" component={Goods} hideNavBar/>
								</Scene>
								{/* 用户中心 */}
								<Scene 
									key='userkey'
									hideDrawerButton
									icon={({focused})=>
										<Icon 
											color={focused?'red':'black'} 
											name='user'/>
										}
									title="用户中心"
									hideNavBar
								>
									<Scene key="userPage" component={Userinfor} hideNavBar/>
                                    <Scene key='pub' component={Mypublish} hideTabBar/>
								</Scene>
							</Tabs>
						</Scene>
					</Drawer>
					{/* <Scene key='light' component={Mybox}/> */}
				</Lightbox>
				<Scene key="regPage" initial={!isLogin} component={Rgister}/>
                <Scene key="login" initial={!isLogin} component={Login}/>
				
				{/* <Scene key="login" component={ShowMyName}/> */}
				{/* <Scene key="login1" component={Login}/> */}
			</Modal>
			
			{/* <Scene component={Message}/> */}
			</Overlay>
		</Router>
	);
};

export default App;