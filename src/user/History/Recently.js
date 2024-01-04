import React from 'react'

const Recently = ({data}) => {
  const data1 = Array.from(new Set(data.map((ele) => ele.book_id))).map(
    (bookId) => data.find((ele) => ele.book_id === bookId)
  );
  return (
    <div>
      {data1?.length ? (
        data1?.map((ele) => {
          return (
            <div key={ele} className="completed">
              <div className="completed_left">
                <img src={ele.image_link} alt="book" />
                <h3>{ele.author}</h3>
              </div>
              <div className="completed_right">
                <h3 className="book_title">{ele.title}</h3>
                <h3 className="desc">{ele.book_desc}</h3>
                <h3 className="book_created_at">{ele.created_at}</h3>
              </div>
            </div>
          );
        })
      ) : (
        <h2>{`There are no books in this RECENTLY Shelf`}</h2>
      )}
      
    </div>
  );
}

export default Recently