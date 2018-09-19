const WITHOUT_HEADER = {header: null, headerMode: 'none'};
const MODAL_DEFAULT_STACK_OPTIONS = { mode: 'modal',headerMode: 'none', initialRouteName: 'Root' };

import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

export class Navigation {

  constructor(props){
    this.navigationStack = null;
    this.authStack = null;
    this.rootStack = null;
    this.tabStack = null;
    this.modalStack = null;
    this.props = props;
  }

  createAuthStack = async () => {
    const { authRoutes, authStackOptions = WITHOUT_HEADER } = this.props;

    return new Promise((resolve, reject) => {
      if(this.authStack) resolve(this.authStack);

      try {
        this.authStack = createStackNavigator(authRoutes, authStackOptions);
        resolve(this.authStack);
      } catch (error) {
        reject({ message: 'Error occured while creating auth stack', error })
      }
    });
  }

  createTabStack = async () => {
    const { tabRoutes, tabStackOptions } = this.props;

    return new Promise((resolve, reject) => {
      if(this.tabStack) resolve(this.tabStack);

      try {
        this.tabStack = createBottomTabNavigator(tabRoutes, tabStackOptions);
        resolve(this.tabStack);
      } catch (error) {
        reject({ message: 'Error occured while creating tab stack', error });
      }
    });
  }

  createRootStack = async () => {
    const { rootRoutes, rootStackOptions = {}, tabRoutes } = this.props;

    return new Promise(async (resolve, reject) => {
      if(this.rootStack) resolve(this.rootStack);

      try {
        if(tabRoutes){
          rootRoutes['Tabs'] = await this.createTabStack();
        }
        
        this.rootStack = createStackNavigator(rootRoutes, rootStackOptions);
        resolve(this.rootStack);
      } catch (error) {
        reject({ message: 'Error occured while creating root stack', error });
      }
    });
  }

  createModalStack = async () => {
    const { modalRoutes, modalRoutesOptions = MODAL_DEFAULT_STACK_OPTIONS } = this.props;

    return new Promise(async (resolve, reject) => {
      if(this.modalStack) resolve(this.modalStack);

      try {
        const rootStack = await this.createRootStack();
        modalRoutes['Root'] = rootStack;
        this.modalStack = createStackNavigator(modalRoutes, modalRoutesOptions);
        resolve(this.modalStack);
      } catch (error) {
        reject({ message: 'Error occured while creating modal stack', error });
      }
    });
  }

  getNavigationStack = async () => {
    const { appStackOptions  } = this.props;

    return new Promise(async (resolve, reject) => {
      if(this.navigationStack) resolve(this.navigationStack);

      try {
        this.navigationStack = createSwitchNavigator({
          Auth: await this.createAuthStack(),
          App: await this.createModalStack(),
        }, appStackOptions);
        resolve(this.navigationStack);
      } catch (error) {
        reject({ message: 'Error occured while creating navigation stack', error })
      }
    });
  }
}