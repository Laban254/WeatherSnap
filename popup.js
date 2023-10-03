document.addEventListener('DOMContentLoaded', function () {
    const urlInput = document.getElementById('urlInput');
    const bookmarkButton = document.getElementById('bookmarkButton');
  
    bookmarkButton.addEventListener('click', function () {
      const url = urlInput.value;
      chrome.storage.sync.get(['bookmarks'], function (result) {
        let bookmarks = result.bookmarks || [];
        bookmarks.push(url);
        chrome.storage.sync.set({ bookmarks: bookmarks }, function () {
          console.log('Bookmark saved');
        });
      });
    });
  });
  