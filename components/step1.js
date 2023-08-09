import { useSelector, useDispatch } from 'react-redux'
import { ScrollView, View } from 'react-native';
import { RadioButton, Text, TextInput } from 'react-native-paper';

import { setState } from '../slices/waterAreaSlice';
import styles from './styles';


export const Step1Component = () => {
    const validation = useSelector((state) => state.waterArea.validation);

    const isAllValid = () => {
        return Object.values(validation).every(x => x == true);
    }

    return (
        <View style={styles.container}>
            <InputForm />
            {isAllValid() ? <CalculationResult /> : null}
        </View>
    );

}

const InputForm = () => {
    const dispatch = useDispatch();
    const waterAreaState = useSelector((state) => state.waterArea);

    return (
        <View>
            <Text variant="headlineMedium">第一步：被拖物对水的摩擦力</Text>

            <RadioButton.Group value={waterAreaState.type}
                onValueChange={ value => dispatch(setState({name: 'type', value: value})) }>
                <RadioButton.Item label="正常船舶" value="1" />
                <RadioButton.Item label="运输驳船、有线形变化的箱型船" value="2" />
                <RadioButton.Item label="无线形变化的箱型船、其他水上建筑" value="3" />
            </RadioButton.Group>

            <TextInput label="船长" value={waterAreaState.vesselLength}
                onChangeText={ text => dispatch(setState({name: 'vesselLength', value: text})) } />

            <TextInput label="船宽" value={waterAreaState.vesselWidth}
                onChangeText={ text => dispatch(setState({name: 'vesselWidth', value: text})) } />

            <TextInput label="拖航吃水" value={waterAreaState.towingDraft}
                onChangeText={ text => dispatch(setState({name: 'towingDraft', value: text})) } />

            <TextInput label="方形系数" value={waterAreaState.delta}
                onChangeText={ text => dispatch(setState({name: 'delta', value: text})) } />
        </View>
    );
}


const CalculationResult = () => {
    return (
        <View>
            <Text variant="bodyMedium">根据</Text>
        </View>
    );
}
