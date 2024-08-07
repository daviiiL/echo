import "../../assets/components/UserContentSection.css";
import UserArticleCard from "../UserArticleCard";
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
        <div>
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
    <div className="mt-3">
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
