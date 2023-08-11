import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Step1Component } from './components/step1_TowedObjectWaterFriction';
import { Step2Component } from './components/step2_TowedObjectOtherFriction';
import { Step3Component } from './components/step3_TowedObjectWindFriction';
import { Step4Component } from './components/step4_WaveFriction';
import { CalculationResultComponent } from './components/CalculationResult';

import { store } from './store';


const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Step1">
                    <Stack.Screen name="Step1" component={Step1Component} />
                    <Stack.Screen name="Step2" component={Step2Component} />
                    <Stack.Screen name="Step3" component={Step3Component} />
                    <Stack.Screen name="Step4" component={Step4Component} />
                    <Stack.Screen name="CalculationResult" component={CalculationResultComponent} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}
