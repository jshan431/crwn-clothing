import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';   // removed addCollectionAndDocuments after intial upload of data to firestore
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector} from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component';
//import { selectCollectionsForPreview} from './redux/shop/shop.selectors';     // // removed selectCollectionsForPreview after intial upload of data to firestore
class App extends React.Component {
  
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;    // removed collectioinsArray after intial upload of data to firestore
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          setCurrentUser({
              id : snapshot.id,
              ...snapshot.data()
          });
        });
      }
      else{
        setCurrentUser(userAuth);
        //addCollectionAndDocuments('collections', collectionsArray.map(({title, items})=> ({title, items})));
      }
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render(){
   return (
    <div>
    <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)}/>
      </Switch>
    </div>
   );
  }
}
/*
//destructure user from our state... so now we have access to this.props.currentUser
const mapStateToProps = ( { user }) => ({
  currentUser: user.currentUser
});
*/

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  //collectionsArray: selectCollectionsForPreview   // removed after intial upload of data to firestore
});

// so we can use setCurrent action creater to our props
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
