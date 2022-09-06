const BookmarkItem = (props) => {

  //render a component containing the bookmarks for each category

  return (
    <div >
      <a className="text-slate-100" href={props.bookmarkURL}> {props.bookmarkTitle} </a>
      </div>

  )
}

export default BookmarkItem
