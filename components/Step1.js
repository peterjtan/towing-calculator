import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { RadioButton, Text, TextInput } from 'react-native-paper';

import styles from './styles';


export const Step1Component = () => {

  // 湿表面积
  const [waterAreaState, setWaterAreaState] = React.useState({
    type: '1', 
    vessel_length: null,
    vessel_width: null,
    towing_draft: null, // 拖航吃水
    delta: null, // 方形系数

    calculate: () => {

    },

    // No field should be null or empty in order to be valid.
    isValid: () => {
      var result = this.vessel_length != null && this.vessel_width != null && this.towing_draft != null && this.delta != null;
      console.log(waterAreaState.vessel_length);

      return result;
    },
  });

  const handleWaterAreaStateChange = (key, value) => {
    setWaterAreaState({...waterAreaState, [key]: value});
    waterAreaState.calculate();
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text variant="headlineMedium">第一步：被拖物对水的摩擦力</Text>

        <RadioButton.Group value={waterAreaState.type}
                          onValueChange={value => handleWaterAreaStateChange('type', value)}>
          <RadioButton.Item label="正常船舶" value="1" />
          <RadioButton.Item label="运输驳船、有线形变化的箱型船" value="2" />
          <RadioButton.Item label="无线形变化的箱型船、其他水上建筑" value="3" />
        </RadioButton.Group>

        <TextInput label="船长" value={waterAreaState.vessel_length}
                  onChangeText={text => handleWaterAreaStateChange('vessel_length', text)} />

        <TextInput label="船宽" value={waterAreaState.vessel_width}
                  onChangeText={text => handleWaterAreaStateChange('vessel_width', text)} />

        <TextInput label="拖航吃水" value={waterAreaState.towing_draft}
                  onChangeText={text => handleWaterAreaStateChange('towing_draft', text)} />

        <TextInput label="方形系数" value={waterAreaState.delta}
                  onChangeText={text => handleWaterAreaStateChange('delta', text)} />
      </View>

      { waterAreaState.isValid() ? <CalculationResult /> : null }
    </ScrollView>
  );

}


const CalculationResult = () => {
  return (
      <View>
        <Text variant="bodyMedium">根据</Text>
      </View>
  );
}
