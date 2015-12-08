import React from "react";
import LinkActions from "../actions/LinkActions";

class Link extends React.Component {
  deleteBookmark(e) {
    e.preventDefault();
    LinkActions.deleteBookmark(this.props.link._id);
  }
  toggleLike(e) {
    e.preventDefault();
    let likes = this.props.link.likes;
    if (likes && likes.length > 0) {
      LinkActions.unlikeBookmark(this.props.link._id);
    }
    else {
      LinkActions.likeBookmark(this.props.link._id);
    }
  }
  render() {
    let {title, url, safe, likes} = this.props.link;

    return (
      <div className="link">
        <a href={url}
           style={ { color: (safe ? 'green' : 'black') } }
          >{title}</a>
        <span> {!likes || likes.length === 0 ? 'no likes' : likes.length + ' likes'}</span><span> </span>
        <a href="#" onClick={this.toggleLike.bind(this)}>Like</a><span> </span>
        <a href="#" onClick={this.deleteBookmark.bind(this)}>Delete</a>
      </div>
    );
  }
}

export default Link;
