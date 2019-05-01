import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPost } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import isEmpty from "lodash/isEmpty";
import PostItem from "../posts/PostItem";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }
  render() {
    let postContent = "";
    const { post, loading } = this.props.post;
    if (isEmpty(post) || loading) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/feed" className="btn btn-light mb-3">
                Go Back
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  post: state.post
});

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  {
    getPost
  }
)(Post);
