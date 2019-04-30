import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { deletePost } from "../../actions/postActions";

class PostItem extends Component {
  onDeleteComment = id => () => {
    this.props.deletePost(id);
  };

  render() {
    const { post, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/feed/`}>
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{auth.user.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-info fas fa-thumbs-up" />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button type="button" className="btn btn-light mr-1">
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user._id === auth.user._id && (
              <button
                onClick={this.onDeleteComment(post._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  {
    deletePost
  }
)(PostItem);
