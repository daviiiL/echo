import "../../assets/components/EmptyContentCard.css";
export default function EmptyContentCard({ componentName }) {
  return (
    <div className="empty-content-card-container">
      <p>{`You haven't posted any ${componentName}`}</p>
    </div>
  );
}
