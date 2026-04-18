import { useMemo, useState, useEffect } from 'react';
import YearStat from '@/components/YearStat';
import useActivities from '@/hooks/useActivities';
import { INFO_MESSAGE } from '@/utils/const';

const YearsStat = ({
  year,
  onClick,
}: {
  year: string;
  onClick: (_year: string) => void;
}) => {
  const { years } = useActivities();

  // 分离 Total 和其他年份（不包含 Total），按倒序排列（最新年份在前）
  const regularYears = useMemo(() => {
    return years
      .filter((y) => y !== 'Total')
      .sort((a, b) => parseInt(b) - parseInt(a));
  }, [years]);

  // 当前显示的年份索引
  const [currentYearIndex, setCurrentYearIndex] = useState(0);

  // 当父组件传入的 year prop 变化时，同步更新当前索引
  useEffect(() => {
    if (year === 'Total') {
      setCurrentYearIndex(0);
    } else {
      const index = regularYears.findIndex((y) => y === year);
      if (index !== -1) {
        setCurrentYearIndex(index);
      }
    }
  }, [year, regularYears]);

  // 循环切换下一个年份（向右箭头）
  const handleNextYear = () => {
    const nextIndex = (currentYearIndex + 1) % regularYears.length;
    setCurrentYearIndex(nextIndex);
    onClick(regularYears[nextIndex]);
  };

  // 当前显示的具体年份
  const currentDisplayYear = regularYears[currentYearIndex];

  const infoMessage = useMemo(() => {
    return INFO_MESSAGE(years.length, year);
  }, [years.length, year]);

  return (
    <div className="w-full pb-16 pr-16 lg:w-full lg:pr-16">
      <section className="pb-0">
        <p className="text-2xl font-bold">So live a life you will remember!</p>
        <p className="leading-relaxed">
          {infoMessage}
          <br />
        </p>
      </section>
      <hr />
      {/* Total 单独展示 */}
      <YearStat key="Total" year="Total" onClick={onClick} />
      <hr />
      {/* 年份切换区域 */}
      <div className="flex items-center justify-between py-2">
        <div className="flex-1">
          <YearStat
            key={currentDisplayYear}
            year={currentDisplayYear}
            onClick={onClick}
          />
        </div>
        <button
          onClick={handleNextYear}
          className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
          title="查看上一年"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default YearsStat;
