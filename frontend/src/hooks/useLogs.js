import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogs } from '../features/logs/logsSlice';

export default function useLogs() {
  const dispatch = useDispatch();
  const { logs, summary, loading, error } = useSelector(state => state.logs);

  useEffect(() => {
    dispatch(fetchLogs());
  }, [dispatch]);

  return { logs, summary, loading, error };
}
