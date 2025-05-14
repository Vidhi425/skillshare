// components/GlobalMeetingTimers.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { incrementTimer } from '../../redux/timerSlice';

const GlobalMeetingTimers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(incrementTimer());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return null;
};

export default GlobalMeetingTimers;
