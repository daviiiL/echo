import "../../assets/components/AuthorCard.css";

export default function AuthorCard({ owner, readtime, publishDate }) {
  if (!owner) return <h1>loading</h1>;
  return (
    <div className="author-card-container">
      <img
        src={`https://eu.ui-avatars.com/api/?name=${owner.first_name}+${owner.last_name}&size=250`}
      ></img>
      <div className="author-card-info">
        <div>
          <p>{`${owner.first_name} ${owner.last_name}`}</p>
          {"•"}
          <p className="follow-button">Follow</p>
        </div>
        <div>
          <p>
            Published on <span style={{ color: "black" }}>echo</span>
          </p>
          {"•"}
          <p>{`${Math.ceil(readtime.length / 1200)} min read`}</p>
          {"•"}
          <p>{publishDate}</p>
        </div>
      </div>
    </div>
  );
}
