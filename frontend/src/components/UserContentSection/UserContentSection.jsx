import "../../assets/components/UserContentSection.css";
import UserArticleCard from "../UserArticleCard";
import { GrArticle } from "react-icons/gr";
import { FaComments } from "react-icons/fa6";
import EmptyContentCard from "../EmptyContentCard";

export default function UserContentSection(props) {
  return (
    <div className="user-content-section-container">
      <div className="content-title">
        {props.articles ? (
          <>
            <h2>your articles</h2>
            <GrArticle />
          </>
        ) : (
          <>
            <h2>your comments</h2>
            <FaComments />
          </>
        )}
      </div>
      <div className="content-cards">
        {props.articles ? (
          props.articles.length ? (
            props.articles.map((article) => (
              <div key={article.id}>
                <UserArticleCard article={article} />
                <hr className="solid"></hr>
              </div>
            ))
          ) : (
            <EmptyContentCard componentName="articles" />
          )
        ) : (
          <p>comments coming soon</p>
        )}
      </div>
    </div>
  );
}
