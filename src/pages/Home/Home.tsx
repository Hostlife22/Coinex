import { Card, Currency, Htag } from '../../components';
import './Home.scss';

const Home = () => {
  return (
    <div className="home" data-testid="home">
      <Card className="home__wrapper">
        <Htag tag="h1" className="home__title">
          Crypto Spreadsheet
        </Htag>
        <Currency />
      </Card>
    </div>
  );
};

export default Home;
