const BookmarkItem = (props) => {

  //render a component containing the bookmarks for each category

  return (

    <div className="my-1 bg-slate-400/20 w-full rounded-full shadow-md shadow-black/50 ">
      <a className="text-slate-100" href={props.bookmarkURL}> {props.bookmarkTitle} </a>
      </div>

  )
}

export default BookmarkItem
