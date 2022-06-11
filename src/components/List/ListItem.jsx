export default function ListItem({ image, title, overview }) {
  return (
    <div className="list-item">
      <img src={image} alt="poster" />
      <div className="info">
        <h3>{title}</h3>
        <p>{overview}</p>
      </div>
    </div>
  );
}
