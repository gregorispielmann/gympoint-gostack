import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ActivityIndicator, Image } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckinItem from '~/components/CheckinItem';

import { checkInRequest } from '~/store/modules/checkin/actions';

import { Container, Content, List, ButtonCheck } from './styles';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/small_logo.png';

import api from '~/services/api';

export default function Checkin({ navigation }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [checkins, setCheckins] = useState([]);

  function handleLogout() {
    dispatch(signOut());
  }

  useEffect(() => {
    navigation.setParams({ handleLogout });
  }, []);

  const loading = useSelector(state => state.checkin.loading);
  const id = useSelector(state => state.auth.id);

  useEffect(() => {
    setIsLoading(true);

    async function loadCheckins() {
      const res = await api.get(`students/${id}/checkins/`);

      setCheckins(res.data);
      setIsLoading(false);
    }

    loadCheckins();
  }, [loading]);

  function handleCheckin() {
    dispatch(checkInRequest(id));
  }

  return (
    <>
      <Container>
        <Content>
          <ButtonCheck onPress={handleCheckin} loading={loading}>
            Novo check-in
          </ButtonCheck>

          {isLoading ? (
            <ActivityIndicator size={50} />
          ) : (
            <List
              data={checkins}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => <CheckinItem data={item} />}
            />
          )}
        </Content>
      </Container>
    </>
  );
}

Checkin.navigationOptions = ({ navigation }) => ({
  headerTitle: <Image source={logo} />,
  headerRight: () => (
    <TouchableOpacity onPress={() => navigation.getParam('handleLogout')()}>
      <Icon name="exit-run" size={20} color="#EE4E62" />
    </TouchableOpacity>
  ),
});
