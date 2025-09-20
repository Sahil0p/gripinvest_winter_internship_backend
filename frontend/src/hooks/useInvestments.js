import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPortfolio, createInvestment } from '../features/investments/investmentsSlice';

export default function useInvestments() {
  const dispatch = useDispatch();
  const { portfolio, loading, error } = useSelector(state => state.investments);

  useEffect(() => {
    dispatch(fetchPortfolio());
  }, [dispatch]);

  const invest = (investmentData) => dispatch(createInvestment(investmentData));

  return { portfolio, loading, error, invest };
}
