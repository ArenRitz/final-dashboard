import React from 'react'
import BookmarkList from './BookmarkList'

const BookmarkCategory = () => {


  const bookmarks = {
    Coding: [
      {
        title: "FreeCodeCamp",
        url: "https://www.freecodecamp.org/",
      },
      {
        title: "Codecademy",
        url: "https://www.codecademy.com/",
      },
      {
        title: "CodeWars",
        url: "https://www.codewars.com/",
      },
      {
        title: "CodePen",
        url: "https://codepen.io/",
      },
    ],
    Design: [
      {
        title: "Dribbble",
        url: "https://dribbble.com/",
      },
      {
        title: "Behance",
        url: "https://www.behance.net/",
      },
      {
        title: "Pinterest",
        url: "https://www.pinterest.com/",
      },
      {
        title: "Canva",
        url: "https://www.canva.com/",
      },
    ],
    Marketing: [
      {
        title: "HubSpot",
        url: "https://www.hubspot.com/",
      },
      {
        title: "Buffer",
        url: "https://buffer.com/",
      },
      {
        title: "MailChimp",
        url: "https://mailchimp.com/",
      },
      {
        title: "Hootsuite",
        url: "https://hootsuite.com/",
      },
    ],
    Productivity: [
      {
        title: "Trello",
        url: "https://trello.com/",
      },
      {
        title: "Todoist",
        url: "https://todoist.com/",
      },
      {
        title: "Google Calendar",
        url: "https://calendar.google.com/",
      },
      {
        title: "Google Keep",
        url: "https://keep.google.com/",
      },
    ],
  };


  let category = Object.keys(bookmarks).map((category, index) => {
   
    return (
   
          <div key={category} className='mx-5 figma-bookmark-back text-center'>
        <h1 className='text-2xl font-bold figma-bookmark-label'>{category}</h1>
        <BookmarkList key={category} category={category} bookmarkItems={bookmarks[category]} index={index} />
      </div>
    );

  });


  return (
    <div className='flex flex-row justify-between w-fit figma-bookmark-container px-5 py-5'>
      {category}
      </div>
  )
}

export default BookmarkCategory