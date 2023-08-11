import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { FAB, HelperText, RadioButton, Text, TextInput } from 'react-native-paper';

import styles from './styles';


export const CalculationResultComponent = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text variant="headlineMedium">计算结果</Text>
        </View>
    );
}
