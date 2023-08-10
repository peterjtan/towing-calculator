import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { HelperText, RadioButton, Text, TextInput } from 'react-native-paper';

import { setState } from '../slices/waterAreaSlice';
import styles from './styles';


export const Step1Component = () => {
    const waterAreaValidation = useSelector((state) => state.waterArea.validation);

    const isWaterAreaAllValid = () => {
        return Object.values(waterAreaValidation).every(x => x == true);
    }

    const isTotalWaterFrictionAllValid = () => {
        return Object.values(validation).every(x => x == true);
    }

    return (
        <View style={styles.container}>
            <InputForWaterArea />
            {isWaterAreaAllValid() ? <WaterAreaCalculationResult /> : null}

            <InputForTotalWaterFriction />
            {isTotalWaterFrictionAllValid() ? <TotalWaterFrictionCalculationResult /> : null}
        </View>
    );
}

const InputForWaterArea = () => {
    const dispatch = useDispatch();
    const waterAreaState = useSelector((state) => state.waterArea);
    const validation = useSelector((state) => state.waterArea.validation);

    return (
        <View>
            <Text variant="headlineMedium">第一步：被拖物对水的摩擦力</Text>

            <Text variant="headlineSmall">船舶类型</Text>
            <RadioButton.Group value={waterAreaState.type}
                onValueChange={ value => dispatch(setState({name: 'type', value: value})) }>
                <RadioButton.Item label="正常船舶" value="1" />
                <RadioButton.Item label="运输驳船、有线形变化的箱型船" value="2" />
                <RadioButton.Item label="无线形变化的箱型船、其他水上建筑" value="3" />
            </RadioButton.Group>

            <TextInput label="船长" value={waterAreaState.vesselLength}
                onChangeText={ text => dispatch(setState({name: 'vesselLength', value: text})) } />

            <HelperText type="error" visible={!validation.vesselLength}>请输入有效数字</HelperText>

            <TextInput label="船宽" value={waterAreaState.vesselWidth}
                onChangeText={ text => dispatch(setState({name: 'vesselWidth', value: text})) } />

            <HelperText type="error" visible={!validation.vesselWidth}>请输入有效数字</HelperText>

            <TextInput label="拖航吃水" value={waterAreaState.towingDraft}
                onChangeText={ text => dispatch(setState({name: 'towingDraft', value: text})) } />

            <HelperText type="error" visible={!validation.towingDraft}>请输入有效数字</HelperText>

            <TextInput label="方形系数" value={waterAreaState.delta}
                onChangeText={ text => dispatch(setState({name: 'delta', value: text})) } />

            <HelperText type="error" visible={!validation.delta}>请输入有效数字</HelperText>
        </View>
    );
}


const WaterAreaCalculationResult = () => {
    const waterAreaState = useSelector((state) => state.waterArea);

    return (
        <View>
            <Text variant="bodyMedium">船长{'L = ' + waterAreaState.vesselLength}</Text>
            <Text variant="bodyMedium">船宽{'B = ' + waterAreaState.vesselWidth}</Text>
            <Text variant="bodyMedium">拖航吃水{'d = ' + waterAreaState.towingDraft}</Text>
            <Text variant="bodyMedium">方形系数{'δ = ' + waterAreaState.delta}</Text>

            <Text variant="bodyMedium">根据</Text>
            { waterAreaState.type == '1' ? <Text variant="bodyMedium">A1 = L(1.7d) + δB</Text> : null }
            { waterAreaState.type == '2' ? <Text variant="bodyMedium">A1 = 0.92L(B + 1.81d)</Text> : null }
            { waterAreaState.type == '3' ? <Text variant="bodyMedium">A1 = L(B + 2d)</Text> : null }
            <Text variant="bodyMedium">得 被拖物的湿表面积A1 = {waterAreaState.area} m^2</Text>
        </View>
    );
}


const InputForTotalWaterFriction = () => {
    return (
        <View>
            <Text variant="headlineSmall">被拖物湿表面海生物生长情况 系数F1</Text>
            <RadioButton.Group value={waterAreaState.type}
                onValueChange={ value => dispatch(setState({name: 'type', value: value})) }>
                <RadioButton.Item label="表面清洁，无附着物" value="0.3" />
                <RadioButton.Item label="表面清洁，有粘性物" value="0.4" />
                <RadioButton.Item label="表面有轻微的海生物" value="0.5" />
                <RadioButton.Item label="轻微的海生物 / 小贝壳类附着物" value="0.6" />
                <RadioButton.Item label="轻微的海生物 / 贝壳类附着物" value="0.7" />
                <RadioButton.Item label="中等量的海生物 / 贝壳类附着物" value="0.8" />
                <RadioButton.Item label="大量的海生物 / 贝壳类附着物 / 明显外凸表面" value="0.9" />
            </RadioButton.Group>

            <TextInput label="预设拖航速度（节）" value={waterAreaState.vesselLength}
                onChangeText={ text => dispatch(setState({name: 'vesselLength', value: text})) } />

            <HelperText type="error" visible={!validation.vesselLength}>请输入有效数字</HelperText>
        </View>
    );
}


const TotalWaterFrictionCalculationResult = () => {
    return (
        <View>

        </View>
    );
}