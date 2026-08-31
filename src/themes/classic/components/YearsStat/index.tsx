import { useMemo } from 'react';
import YearStat from '../YearStat';
import useActivities from '../../hooks/useActivities';
import { INFO_MESSAGE } from '../../utils/const';

const YearsStat = ({
  year,
  onClick,
}: {
  year: string;
  onClick: (_year: string) => void;
}) => {
  const { years } = useActivities();

  const regularYears = useMemo(
    () =>
      years
        .filter((candidate) => candidate !== 'Total')
        .toSorted((a, b) => Number(b) - Number(a)),
    [years]
  );

  const selectedYearIndex = Math.max(regularYears.indexOf(year), 0);
  const currentDisplayYear = regularYears[selectedYearIndex];
  const canChangeYear = regularYears.length > 1;

  const changeYearByOffset = (offset: number) => {
    if (!canChangeYear) return;
    const nextIndex =
      (selectedYearIndex + offset + regularYears.length) % regularYears.length;
    onClick(regularYears[nextIndex]);
  };

  const infoMessage = useMemo(
    () => INFO_MESSAGE(years.length, year),
    [years.length, year]
  );

  return (
    <div className="w-full pr-16 pb-16 lg:w-full lg:pr-16">
      <section className="mt-0 pt-0 pb-0">
        <p className="text-2xl font-bold">So live a life you will remember!</p>
        <p className="leading-relaxed">
          {infoMessage}
          <br />
        </p>
      </section>
      <hr />
      <YearStat year="Total" onClick={onClick} />
      <hr />
      {currentDisplayYear && (
        <div className="flex items-center justify-between py-2">
          <button
            type="button"
            onClick={() => changeYearByOffset(1)}
            disabled={!canChangeYear}
            className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            title="查看更早的年份"
            aria-label="查看更早的年份"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex-1">
            <YearStat
              key={currentDisplayYear}
              year={currentDisplayYear}
              onClick={onClick}
            />
          </div>

          <button
            type="button"
            onClick={() => changeYearByOffset(-1)}
            disabled={!canChangeYear}
            className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            title="查看更新的年份"
            aria-label="查看更新的年份"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
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
      )}
    </div>
  );
};

export default YearsStat;
