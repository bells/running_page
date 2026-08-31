import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import ActivityList from '../components/ActivityList';
import { useTheme } from '../hooks/useTheme';

const Total = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <Helmet>
        <html lang="zh-CN" data-theme={theme} />
      </Helmet>
      <ActivityList />
    </>
  );
};

export default Total;
