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
    const { authRoutes, authStackOptions = {} } = this.props;

    return new Promise(async (resolve, reject) => {
      if(this.authStack) resolve(this.authStack);

      try {
        this.authStack = createStackNavigator(authRoutes, authStackOptions);
        resolve(this.authStack);
      } catch (error) {
        reject({ message: 'Error occured while creating auth stack', error })
      }
    });
  }

  createRootStack = async () => {
    const { rootRoutes, rootStackOptions = {} } = this.props;

    return new Promise(async (resolve, reject) => {
      if(this.rootStack) resolve(this.rootStack);

      try {
        this.rootStack = createStackNavigator(rootRoutes, rootStackOptions);
        resolve(this.rootStack);
      } catch (error) {
        reject({ message: 'Error occured while creating root stack', error });
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
          App: await this.createRootStack(),
        }, appStackOptions);
        resolve(this.navigationStack);
      } catch (error) {
        reject({ message: 'Error occured while creating navigation stack', error })
      }
    });
  }
}