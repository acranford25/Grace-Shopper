import { postReviewApi } from "../../api/reviews";
import { fetchItem } from "../../api/items";
import { useEffect, useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState("");
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [postReview, setPostReview] = useState({});
  const [refresh, setRefresh] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // pulls reviews for item
    async function fetchReviews(itm) {
      let revHtml = await itm.reviewlist.map((review) => {
        return (
          <div key={review.id} className="review-card">
            <p>author:{review.username}</p>
            <h3>{review.title}</h3>
            <p>rating: {review.rating} out of 5</p>
            <p>{review.review}</p>
          </div>
        );
      });

      setReviews(revHtml);
    }
    async function postUserReview() {
      try {
        const response = await postReviewApi(postReview);
        const result = await response.json();

        setPostReview(null);
        return result;
      } catch (err) {
        console.error(err);
        setPostReview(null);
      }
    }

    getItemById();

    if (postReview != {} || postReview != null) {
      postUserReview();
    }
  }, [reviews]);

  function handleSubmit(e) {
    //sets POSTOBJ

    setPostReview({
      userId: user.id,
      itemId: itemId,
      title: title,
      rating: rating,
      review: review,
    });
    setRefresh(true);
  }
  return (
    <div>
      <div>
        <h2>Write a review:</h2>
        <form id="submit-review-container" action="">
          <label htmlFor="">
            Title
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </label>
          <label htmlFor="">
            rating
            <input
              type="Number"
              min="1"
              max="5"
              placeholder="5"
              style={{ width: "50px" }}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            />
            out of 5
          </label>
          <label htmlFor="">
            body
            <textarea
              type="text"
              placeholder="review"
              onChange={(e) => {
                setReview(e.target.value);
              }}
            />
          </label>
        </form>
        <button
          onClick={(e) => {
            handleSubmit(e);
            console.log(e.target);
          }}
        >
          SUBMIT
        </button>
      </div>
      <br />
      <br />
      <div>
        <h2>Reviews:</h2>
        {reviews}
      </div>
    </div>
  );
}
