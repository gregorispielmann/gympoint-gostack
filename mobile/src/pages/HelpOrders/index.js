import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ActivityIndicator, Image, RefreshControl } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, Content, List, ButtonHelp } from './styles';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/small_logo.png';

import api from '~/services/api';
import HelpOrderItem from '~/components/HelpOrderItem';

export default function HelpOrders({ navigation }) {
  const dispatch = useDispatch();

  const [helpOrders, setHelpOrders] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loading = useSelector(state => state.helpOrder.loading);
  const id = useSelector(state => state.auth.id);

  function handleLogout() {
    dispatch(signOut());
  }

  async function loadHelpOrders() {
    const res = await api.get(`students/${id}/help-orders`);

    if (res.data.length > 0) {
      setHelpOrders(res.data);
    }
  }

  useEffect(() => {
    loadHelpOrders();
  }, []);

  useEffect(() => {
    navigation.setParams({ handleLogout });
  }, []);

  async function onRefresh() {
    const res = await api.get(`students/${id}/help-orders`);

    if (res.data.length > 0) {
      setHelpOrders(res.data);
    }

    setIsRefreshing(false);
  }

  return (
    <Container>
      <Content>
        <ButtonHelp
          onPress={() => {
            navigation.navigate('HelpOrder');
          }}
          loading={loading}
        >
          Novo pedido de ajuda
        </ButtonHelp>

        <List
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          data={helpOrders}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('HelpOrderView', { item })}
            >
              <HelpOrderItem data={item} />
            </TouchableOpacity>
          )}
        />
      </Content>
    </Container>
  );
}

HelpOrders.navigationOptions = ({ navigation }) => ({
  headerTitle: <Image source={logo} />,
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.getParam('handleLogout')()}>
      <Icon name="exit-run" size={20} color="#EE4E62" />
    </TouchableOpacity>
  ),
});
