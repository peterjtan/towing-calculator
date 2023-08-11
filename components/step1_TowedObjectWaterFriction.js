import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { HelperText, RadioButton, Text, TextInput } from 'react-native-paper';

import { setState } from '../slices/towedObjectWaterFrictionSlice';
import styles from './styles';


export const Step1Component = () => {
    const validation = useSelector((state) => state.towedObjectWaterFriction.validation);

    return (
        <View style={styles.container}>
            <InputForWaterArea />
            {validation.waterAreaFieldsValid ? <WaterAreaCalculationResult /> : null}

            <InputForTotalWaterFriction />
            {validation.allFieldsValid ? <TotalWaterFrictionCalculationResult /> : null}
        </View>
    );
}

const InputForWaterArea = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.towedObjectWaterFriction);
    const validation = useSelector((state) => state.towedObjectWaterFriction.validation);

    return (
        <View>
            <Text variant="headlineMedium">第一步：被拖物对水的摩擦力</Text>

            <Text variant="headlineSmall">船舶类型</Text>
            <RadioButton.Group value={state.type}
                onValueChange={ value => dispatch(setState({name: 'type', value: value})) }>
                <RadioButton.Item label="正常船舶" value="1" />
                <RadioButton.Item label="运输驳船、有线形变化的箱型船" value="2" />
                <RadioButton.Item label="无线形变化的箱型船、其他水上建筑" value="3" />
            </RadioButton.Group>

            <TextInput label="船长" value={state.vesselLength}
                onChangeText={ text => dispatch(setState({name: 'vesselLength', value: text})) } />

            <HelperText type="error" visible={!validation.vesselLength}>请输入有效数字</HelperText>

            <TextInput label="船宽" value={state.vesselWidth}
                onChangeText={ text => dispatch(setState({name: 'vesselWidth', value: text})) } />

            <HelperText type="error" visible={!validation.vesselWidth}>请输入有效数字</HelperText>

            <TextInput label="拖航吃水" value={state.towingDraft}
                onChangeText={ text => dispatch(setState({name: 'towingDraft', value: text})) } />

            <HelperText type="error" visible={!validation.towingDraft}>请输入有效数字</HelperText>

            <TextInput label="方形系数" value={state.delta}
                onChangeText={ text => dispatch(setState({name: 'delta', value: text})) } />

            <HelperText type="error" visible={!validation.delta}>请输入有效数字</HelperText>
        </View>
    );
}


const WaterAreaCalculationResult = () => {
    const state = useSelector((state) => state.towedObjectWaterFriction);

    return (
        <View>
            <Text variant="bodyMedium">船长{'L = ' + state.vesselLength}</Text>
            <Text variant="bodyMedium">船宽{'B = ' + state.vesselWidth}</Text>
            <Text variant="bodyMedium">拖航吃水{'d = ' + state.towingDraft}</Text>
            <Text variant="bodyMedium">方形系数{'δ = ' + state.delta}</Text>

            <Text variant="bodyMedium">根据</Text>
            { state.type == '1' ? <Text variant="bodyMedium">A1 = L(1.7d) + δB</Text> : null }
            { state.type == '2' ? <Text variant="bodyMedium">A1 = 0.92L(B + 1.81d)</Text> : null }
            { state.type == '3' ? <Text variant="bodyMedium">A1 = L(B + 2d)</Text> : null }
            <Text variant="bodyMedium">得 被拖物的湿表面积A1 = {state.area} m^2</Text>
        </View>
    );
}


const InputForTotalWaterFriction = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.towedObjectWaterFriction);
    const validation = useSelector((state) => state.towedObjectWaterFriction.validation);

    return (
        <View>
            <Text variant="headlineSmall">被拖物湿表面海生物生长情况 系数F1</Text>
            <RadioButton.Group value={state.f1Coefficient}
                onValueChange={ value => dispatch(setState({name: 'f1Coefficient', value: value})) }>
                <RadioButton.Item label="表面清洁，无附着物" value="0.3" />
                <RadioButton.Item label="表面清洁，有粘性物" value="0.4" />
                <RadioButton.Item label="表面有轻微的海生物" value="0.5" />
                <RadioButton.Item label="轻微的海生物 / 小贝壳类附着物" value="0.6" />
                <RadioButton.Item label="轻微的海生物 / 贝壳类附着物" value="0.7" />
                <RadioButton.Item label="中等量的海生物 / 贝壳类附着物" value="0.8" />
                <RadioButton.Item label="大量的海生物 / 贝壳类附着物 / 明显外凸表面" value="0.9" />
            </RadioButton.Group>

            <TextInput label="预设拖航速度（节）" value={state.speed}
                onChangeText={ text => dispatch(setState({name: 'speed', value: text})) } />

            <HelperText type="error" visible={!validation.speed}>请输入有效数字</HelperText>
        </View>
    );
}


const TotalWaterFrictionCalculationResult = () => {
    const state = useSelector((state) => state.towedObjectWaterFriction);

    return (
        <View>
            <Text variant="bodyMedium">根据</Text>
            <Text variant="bodyMedium">Rf = 1.3566 * A1 * F1 * V^2 * 10^(-4)</Text>
            <Text variant="bodyMedium">得 被拖物对水的摩擦阻力Rf = {state.towedObjectWaterFriction} 吨</Text>
        </View>
    );
}