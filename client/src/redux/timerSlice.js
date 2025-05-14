
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timers: {
    // [meetingId]: { secondsElapsed: number, isRunning: boolean }
  },
};

const meetingTimersSlice = createSlice({
  name: 'meetingTimers',
  initialState,
  reducers: {
    startTimer(state, action) {
      const id = action.payload;
      if (!state.timers[id]) {
        state.timers[id] = { secondsElapsed: 0, isRunning: true };
      } else {
        state.timers[id].isRunning = true;
      }
    },
    stopTimer(state, action) {
      const id = action.payload;
      if (state.timers[id]) {
        state.timers[id].isRunning = false;
      }
    },
    resetTimer(state, action) {
      const id = action.payload;
      if (state.timers[id]) {
        state.timers[id] = { secondsElapsed: 0, isRunning: false };
      }
    },
    incrementTimer(state) {
      for (const id in state.timers) {
        if (state.timers[id].isRunning) {
          state.timers[id].secondsElapsed += 1;
        }
      }
    },
  },
});

export const { startTimer, stopTimer, resetTimer, incrementTimer } = meetingTimersSlice.actions;
export default meetingTimersSlice.reducer;
