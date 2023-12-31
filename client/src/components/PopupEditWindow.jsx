import { updateReview } from "../api/reviews";
import { useState, useEffect } from "react";
/// A popup window to input the update info for review
export default function pupupEditWindow(props) {
  const [update, setUpdate] = useState({});
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const rvw = props.review;
  const postId = rvw.id;

  useEffect(() => {
    /// when submit is clicked and the update state
    ///isnt null, then it will run the PATCH
    if (update != {}) {
      async function postUpdate() {
        try {
          const response = await updateReview(update);
          const result = await response.json();
          return result;
        } catch (err) {
          console.error(err);
        }
      }

      postUpdate();
    }
  }, [update]);
  function handleSubmit(e) {
    ///starts PATCH,sends refresh for parent, removes popup
    setUpdate({ id: postId, title: title, rating: rating, review: review });
    const popUp = document.getElementById("popup-root");
    props.setRefresh(true);
    popUp.remove();
  }

  return (
    <div className="popup-container">
      <form action="">
        <label htmlFor="">
          Title
          <input
            type="text"
            placeholder={rvw.title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <label htmlFor="">
          Rating
          <input
            type="Number"
            min="1"
            max="5"
            placeholder={rvw.rating}
            style={{ width: "50px" }}
            onChange={(e) => {
              setRating(e.target.value);
            }}
          />
          out of 5
        </label>
        <label htmlFor="">
          Description
          <textarea
            type="text"
            placeholder={rvw.review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />
        </label>
      </form>
      <button
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        SUBMIT
      </button>
    </div>
  );
}
