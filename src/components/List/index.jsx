import ListItem from './ListItem';

export default function List({ data }) {
  return (
    <div className="list">
      {[...data.values()].map((entry, idx) => (
        <ListItem key={entry.id || idx} {...entry} />
      ))}
    </div>
  );
}
