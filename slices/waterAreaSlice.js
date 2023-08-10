import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// 计算湿表面积的数据
export const waterAreaSlice = createSlice({
    name: 'waterArea',

    initialState: {
        type: '1',
        vesselLength: '',
        vesselWidth: '',
        towingDraft: '', // 拖航吃水
        delta: '', // 方形系数
        area: 0, // 湿表面积

        validation: {
            vesselLength: false,
            vesselWidth: false,
            towingDraft: false,
            delta: false
        }
    },

    reducers: {
        setState: (state, action) => {
            let { name, value } = action.payload;
            state[name] = value;
            
            if (value !== '' && Number(value) >= 0) {
                state.validation[name] = true;
            } else {
                state.validation[name] = false;
            }

            // If all states are valid, calculate the area
            // Reference: https://www.docin.com/p-190361967.html

            if (Object.values(state.validation).every(x => x == true)) {

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
                state.area = 0;
            }

            useDispatch(setWaterArea(state.area));
        }
    },
});

export const { setState } = waterAreaSlice.actions;
export default waterAreaSlice.reducer;
