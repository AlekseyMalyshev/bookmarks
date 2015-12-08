import React from "react";
import LinkActions from "../actions/LinkActions";

class Link extends React.Component {
  deleteBookmark(e) {
    e.preventDefault();
    LinkActions.deleteBookmark(this.props.link._id);
  }
  toggleLike(e) {
    e.preventDefault();
    if (this.props.link.ilike) {
      LinkActions.unlikeBookmark(this.props.link._id);
    }
    else {
      LinkActions.likeBookmark(this.props.link._id);
    }
  }
  render() {
    let {title, url, safe, likes, ilike} = this.props.link;
    let noLikes = !likes || likes.length === 0;

    return (
      <div className="link">
        <a href={url}
           style={ { color: (safe ? 'green' : 'black') } }
          >{title}</a>
        <span className="like"
              style={ { color: (ilike ? '#ffc0cb' : noLikes ? '#ccc' : '#000') } }
          > &#9829; {noLikes ? 'no likes' : likes.length + ' likes'}</span>
        <span> </span>
        <a className="likeLink" href="#" onClick={this.toggleLike.bind(this)}>
          {ilike ? 'Unlike' : 'Like'}</a>
        <span> </span>
        <a className="deleteLink" href="#" onClick={this.deleteBookmark.bind(this)}>Delete</a>
      </div>
    );
  }
}

export default Link;
