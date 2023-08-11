import { createSlice } from '@reduxjs/toolkit';

// 计算湿表面积的数据
export const slice = createSlice({
    name: 'towedObjectWaterFriction',

    initialState: {
        type: '1',
        vesselLength: '',
        vesselWidth: '',
        towingDraft: '', // 拖航吃水
        delta: '', // 方形系数
        area: 0, // 湿表面积

        f1Coefficient: '0.3',
        speed: '',
        towedObjectWaterFriction: 0,

        validation: {
            // Water area fields
            vesselLength: false,
            vesselWidth: false,
            towingDraft: false,
            delta: false,
            waterAreaFieldsValid: false,

            // Total towed object water friction fields
            speed: false,

            allFieldsValid: false
        }
    },

    reducers: {
        setState: (state, action) => {
            let { name, value } = action.payload;
            state[name] = value;

            if (name in state.validation && value !== '' && Number(value) >= 0) {
                state.validation[name] = true;
            } else {
                state.validation[name] = false;
            }

            // If all fields related to area calculation are valid, calculate the area
            // Reference: https://www.docin.com/p-190361967.html

            if (state.validation.vesselLength &&
                state.validation.vesselWidth &&
                state.validation.towingDraft &&
                state.validation.delta) {

                state.validation.waterAreaFieldsValid = true;

                switch(state.type) {
                    case '1':
                        // 正常船舶
                        // A1 = L(1.7d + delta * B)
                        state.area = state.vesselLength * (1.7 * state.towingDraft + state.delta * state.vesselWidth);
                        break;

                    case '2':
                        // 运输驳船
                        // A1 = 0.92L(B + 1.81d)
                        state.area = 0.92 * state.vesselLength * (state.vesselWidth + 1.81 * state.towingDraft);
                        break;

                    case '3':
                        // 无线性变化的箱型船
                        // A1 = L(B + 2d)
                        state.area = state.vesselLength * (state.vesselWidth + 2 * state.towingDraft);
                        break;

                    default:
                        state.area = 0;
                        break;
                }

            } else {
                state.validation.waterAreaFieldsValid = false;
                state.area = 0;
            }

            if (state.validation.waterAreaFieldsValid && state.validation.speed) {
                state.validation.allFieldsValid = true;
                state.towedObjectWaterFriction = 1.3566 * state.area * state.f1Coefficient * Math.pow(state.speed, 2) * Math.pow(10, -4);
            } else {
                state.validation.allFieldsValid = false;
                state.towedObjectWaterFriction = 0;
            }
        }
    },
});

export const { setState } = slice.actions;
export default slice.reducer;
