import Counter from '../component/Counter';

const Home = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div>
        <h1 style={{ textAlign: 'center' }}></h1>
        <Counter />
      </div>
    </div>
  );
};

export default Home;