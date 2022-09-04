const BookmarkItem = (props) => {

  //render a component containing the bookmarks for each category

  return (
    <>
      <a href={props.bookmarkURL}> {props.bookmarkTitle} </a>
    </>
  )
}

export default BookmarkItem
