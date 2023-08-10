import { Provider } from 'react-redux';
import { View } from 'react-native';

import styles from './components/styles';
import { Step1Component as Step1 } from './components/step1_TowedObjectWaterFriction';
import { store } from './store';


export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Step1 />
            </View>
        </Provider>
    );
}
