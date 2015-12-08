import API from "../API";

let LinkActions = {
  saveBookmark(newBookmark) {
    API.saveBookmark(newBookmark);
  },
  deleteBookmark(bookmarkId) {
    API.deleteBookmark(bookmarkId);
  },
  likeBookmark(bookmarkId) {
    API.likeBookmark(bookmarkId);
  },
  unlikeBookmark(bookmarkId) {
    API.unlikeBookmark(bookmarkId);
  },
  getAllBookmarks() {
    API.fetchAllBookmarks();
  }
};

export default LinkActions;
