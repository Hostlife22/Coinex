import { Card, Currency } from '../../components';
import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <Card className="home__wrapper">
        <Currency />
      </Card>
    </div>
  );
};

export default Home;
