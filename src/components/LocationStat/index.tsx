import YearStat from '@/components/YearStat';
import {
  CHINESE_LOCATION_INFO_MESSAGE_FIRST,
  CHINESE_LOCATION_INFO_MESSAGE_SECOND,
} from '@/utils/const';
import CitiesStat from './CitiesStat';
import LocationSummary from './LocationSummary';
import PeriodStat from './PeriodStat';

interface ILocationStatProps {
  changeYear: (_year: string) => void;
  changeCity: (_city: string) => void;
  changeTitle: (_title: string) => void;
}

const LocationStat = ({
  changeYear,
  changeCity,
  changeTitle,
}: ILocationStatProps) => (
  <div className="w-full pb-16 lg:w-full lg:pr-16">
    <section className="pb-0">
      <p className="leading-relaxed">
        {CHINESE_LOCATION_INFO_MESSAGE_FIRST}
        .
        <br />
        <br /> 
        {CHINESE_LOCATION_INFO_MESSAGE_SECOND}
        .
        <br />

      </p>
    </section>
    <hr />
    <YearStat year="Total" onClick={changeYear} />
    <LocationSummary />
    <CitiesStat onClick={changeCity} />
    <PeriodStat onClick={changeTitle} />
  </div>
);

export default LocationStat;
