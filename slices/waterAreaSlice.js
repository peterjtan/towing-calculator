import { createSlice } from '@reduxjs/toolkit'

// 湿表面积
export const waterAreaSlice = createSlice({
    name: 'waterArea',

    initialState: {
        type: '1',
        vesselLength: '',
        vesselWidth: '',
        towingDraft: '', // 拖航吃水
        delta: '', // 方形系数

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
        }
    },
});

export const { setState } = waterAreaSlice.actions;
export default waterAreaSlice.reducer;
