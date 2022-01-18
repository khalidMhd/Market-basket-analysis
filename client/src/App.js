import './App.css';
import { BrowserRouter, Route, Router, Switch, useLocation } from 'react-router-dom'
import StartScreen from './screen/StartScreen';
import DetailScreen from './screen/DetailScreen';
import ContactScreen from './screen/Contact';
import SigninScreen from './screen/auth/singin';
import SignupScreen from './screen/auth/signup';
import DashboardScreen from './screen/admin/Dashboard';
import AdminDetailScreen from './screen/admin/DetailScreen';
import AdminUserScreen from './screen/admin/user';
import AdminMessageScreen from './screen/admin/Message';
import SettingScreen from './screen/admin/Setting';
import ClientSigninScreen from './screen/Signin';
import ClientSignupScreen from './screen/signup';
import ClientForgotPasswordScreen from './screen/forgotPassord';
import ClientNewPasswordScreen from './screen/newPassword';
import ProfileScreen from './screen/Profile';
import UplaodFileScreen from './screen/admin/UplaodFile';
import RequestPremiumScreen from './screen/admin/RequestPremium';

function App() {
  var location = useLocation();
  return (
    <div className="">
      <>
        <Route exact path='/' component={StartScreen} />
        <Route exact path='/detail' component={DetailScreen} />
        <Route exact path='/contact' component={ContactScreen} />
        <Route exact path='/profile' component={ProfileScreen} />
        <Route exact path='/signin' component={ClientSigninScreen} />
        <Route exact path='/signup' component={ClientSignupScreen} />
        <Route exact path='/reset-password' component={ClientForgotPasswordScreen} />
        <Route exact path='/new-password/:token' component={ClientNewPasswordScreen} />
      </>
      <div>
        <Route exact path='/admin/signin' component={SigninScreen} />
        <Route exact path='/admin/add-user' component={SignupScreen} />
        <Route exact path='/admin/dashboard' component={DashboardScreen} />
        <Route exact path='/admin/product-association' component={UplaodFileScreen} />
        <Route exact path='/admin/detail' component={AdminDetailScreen} />
        <Route exact path='/admin/user' component={AdminUserScreen} />
        <Route exact path='/admin/request-premium' component={RequestPremiumScreen} />
        <Route exact path='/admin/message' component={AdminMessageScreen} />
        <Route exact path='/admin/settings' component={SettingScreen} />
      </div>
    </div>
  );
}

export default App;
