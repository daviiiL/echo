import "../../assets/components/UserContentSection.css";
import UserArticleCard from "../UserArticleCard";
import { GrArticle } from "react-icons/gr";
import { FaComments } from "react-icons/fa6";
import EmptyContentCard from "../EmptyContentCard";
import UserCommentCard from "../UserCommentCard";
import { IoMdArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const createCommentSection = (articleComments, navigate) => {
  const { article, comments } = articleComments;
  if (comments.length > 0) {
    return (
      <div
        key={`article${article.id}`}
        className="user-content-comment-article-container"
      >
        <div className="comments-article-container">
          <p
            className="comments-article-title"
            onClick={() => navigate(`/articles/${article.id}`)}
          >
            from article <span>{article.title}</span>
            <IoMdArrowForward />
          </p>
        </div>
        {comments.map((e) => (
          <UserCommentCard comment={e} key={`comment${e.id}`} />
        ))}
      </div>
    );
  } else {
    return <></>;
  }
};

export default function UserContentSection(props) {
  const navigate = useNavigate();
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
              </div>
            ))
          ) : (
            <EmptyContentCard componentName="article" />
          )
        ) : Object.values(props.comments).length ? (
          Object.values(props.comments).map((e) =>
            createCommentSection(e, navigate),
          )
        ) : (
          <EmptyContentCard componentName="comments" />
        )}
      </div>
    </div>
  );
}
