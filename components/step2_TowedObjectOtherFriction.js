import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { FAB, HelperText, RadioButton, Text, TextInput } from 'react-native-paper';

import styles from './styles';


export const Step2Component = ({ navigation }) => {
    return (
        <View style={styles.container}>

            <FAB style={styles.fab} icon="arrow-right" onPress={() => navigation.navigate('Step3')} />
        </View>
    );
}
