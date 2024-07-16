import "../../assets/components/EmptyContentCard.css";
export default function EmptyContentCard({ componentName }) {
  return (
    <div className="empty-content-card-container">
      <p>{`You don't have any ${componentName}`}</p>
    </div>
  );
}
