import './App.css';
import Truncator from './components/Truncator';
import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <Truncator
        tailLength={0}
        title="my title"
        className="customClass"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit consequatur qui, aliquid labore numquam vero corporis sequi obcaecati accusamus ea quae aspernatur enim! Tempore enim similique porro, sit eius repellendus?
      </Truncator>
      <Table/>
    </div>
  );
}

export default App;
