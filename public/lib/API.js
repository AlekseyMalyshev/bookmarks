import {post, get, ajax} from "jquery";

import ServerActions from "./actions/ServerActions";

let API = {
  saveBookmark(newBookmark) {
    post("/api/links", newBookmark)
      .done(data => ServerActions.receiveOneLink(data));
  },
  deleteBookmark(bookmarkId) {
    ajax({
      url: "/api/links/" + bookmarkId,
      type: 'DELETE'
    }).done(data => ServerActions.deletedOneLink(data._id));
  },
  fetchAllBookmarks() {
    console.log("2. In the API.fetchAllBookmarks()")
    get("/api/links").done(data => ServerActions.receiveLinks(data.links));
  },
  likeBookmark(bookmarkId) {
    console.log("2. In the API.likeBookmark()")
    post("/api/links/" + bookmarkId + "/like").done(data => ServerActions.likedOneLink(data));
  },
  unlikeBookmark(bookmarkId) {
    console.log("2. In the API.unlikeBookmark()")
    ajax({
      url: "/api/links/" + bookmarkId + "/like",
      type: 'DELETE'
    }).done(data => ServerActions.unlikedOneLink(data));
  }
};

export default API;
