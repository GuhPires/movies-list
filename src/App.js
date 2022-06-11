import { useContext } from 'react';
import { DataContext } from './contexts/data';
import List from './components/List';

function App() {
  const { list } = useContext(DataContext);

  return (
    <section className="page">{list && <List data={list.content} />}</section>
  );
}

export default App;
