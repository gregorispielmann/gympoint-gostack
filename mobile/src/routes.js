import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Login from '~/pages/Login';
import Checkin from '~/pages/Checkin';
import HelpOrders from '~/pages/HelpOrders';
import HelpOrder from '~/pages/HelpOrder';
import HelpOrderView from '~/pages/HelpOrderView';

export default isSigned =>
  createAppContainer(
    createSwitchNavigator(
      {
        Login,
        App: createBottomTabNavigator(
          {
            First: {
              screen: createStackNavigator(
                {
                  Checkin,
                },
                {
                  defaultNavigationOptions: {
                    headerRightContainerStyle: {
                      marginRight: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Check-in',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="place" size={25} color={tintColor} />
                ),
              },
            },
            Second: {
              screen: createStackNavigator(
                {
                  HelpOrders,
                  HelpOrder,
                  HelpOrderView,
                },
                {
                  defaultNavigationOptions: {
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                    headerRightContainerStyle: {
                      marginRight: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Pedir Ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="help-outline" size={25} color={tintColor} />
                ),
              },
            },
          },
          {
            tabBarOptions: {
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#DDDDDD',
              style: {
                backgroundColor: '#fff',
                borderTopColor: '#ddd',
              },
              labelStyle: {
                fontSize: 14,
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Login',
      }
    )
  );
