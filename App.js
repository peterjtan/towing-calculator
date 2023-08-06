import { Text, View, StyleSheet } from 'react-native';

import styles from './components/styles';
import { Step1Component as Step1 } from './components/Step1';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default function App() {
  return (
    <View style={styles.container}>
      <Step1 />
    </View>
  );
}

