
import BookmarkItem from './BookmarkItem';

const BookmarkList = (props) => {

  // const codingBookmarks = [
  //     {
  //       title: "FreeCodeCamp",
  //       url: "https://www.freecodecamp.org/",
  //     },
  //     {
  //       title: "Codecademy",
  //       url: "https://www.codecademy.com/",
  //     },
  //     {
  //       title: "CodeWars",
  //       url: "https://www.codewars.com/",
  //     },
  //     {
  //       title: "CodePen",
  //       url: "https://codepen.io/",
  //     },
  //   ];

    let bookmarkList = props.bookmarkItems.map((bookmark) => {
      return (
        <BookmarkItem
          key={bookmark.title}
          bookmarkTitle={bookmark.title}
          bookmarkURL={bookmark.url}
        />
      );
    });

  return (
    <>
      <div className='flex flex-col w-fit'>{bookmarkList}</div>
    </>
  );
};


export default BookmarkList