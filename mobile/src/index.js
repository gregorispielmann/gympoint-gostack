import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native';

import './config/ReactotronConfig';

export default function App() {
  console.tron.log('Olá Pessoal!');

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Text>Olá</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
