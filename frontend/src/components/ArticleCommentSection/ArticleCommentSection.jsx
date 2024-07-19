import React from "react";
import { connect } from "react-redux";
import { fetchArticleComments } from "../../store/comment";
import CommentCard from "../CommentCard/CommentCard";
import "../../assets/components/ArticleCommentSection.css";
import CommentForm from "../CommentForm/CommentForm";
export class ArticleCommentsSection extends React.Component {
  componentDidMount() {
    this.props.fetchArticleComments(this.props.articleId);
  }

  constructCommentTree(arr) {
    const unrootedArr = arr.reduce((acc, el) => {
      const comment = { ...el, children: [] }; //the original object is immutable. so...
      if (comment.parent_comment === null) comment.parent_comment = 0; //since multiplle root comments, need another root to combine subtrees
      acc.push(comment);
      return acc;
    }, []);
    unrootedArr.unshift({ id: 0, parent_comment: null, children: [] }); //add root to tree node arr
    const indexMapping = unrootedArr.reduce((acc, el, ind) => {
      acc[el.id] = ind;
      return acc;
    }, {});
    let root;
    unrootedArr.forEach((e, _, arr) => {
      if (e.parent_comment === null) {
        root = e;
        return;
      }
      // console.log(e.parent_comment);
      const parentIndex = indexMapping[e.parent_comment];
      const parentComment = arr[parentIndex];
      parentComment.children = [...parentComment.children, e];
    });
    return root;
  }

  flattenPreOrderNTree(comments) {
    const result = [];
    const commentTree = this.constructCommentTree(comments, result);

    const traverse = (node) => {
      if (!node) return;
      result.push(node);

      if (node.children?.length) {
        for (const child of node.children) {
          traverse(child);
        }
      }
    };

    traverse(commentTree);
    return result;
  }

  render() {
    return (
      <>
        <p className="comment-section-header">
          {`${this.props.comments?.length} Comments`}
        </p>
        <div className="comment-form-container">
          <CommentForm
            articleId={this.props.articleId}
            authenticated={this.props.sessionUser !== null}
          />
        </div>
        {this.flattenPreOrderNTree(this.props.comments)
          .slice(1) //dispose fake root
          .map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              sessionUserId={this.props.sessionUser?.id}
            />
          ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.comments?.articleComments,
  sessionUser: state.session?.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchArticleComments: (articleId) => {
      dispatch(fetchArticleComments(articleId));
    },
  };
};

const ArticleCommentsSectionConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleCommentsSection);
ArticleCommentsSectionConnected.displayName = "ArticleView";
export default ArticleCommentsSectionConnected;
