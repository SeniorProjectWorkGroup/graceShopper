import React from 'react'
import StarRating from './StarRating'
import {postReview} from '../store/reviews'

class ReviewSection extends React.Component {

  toDateString = dateStr => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return new Date(dateStr).toLocaleDateString('en-US', options)
  }

  submitReview = event => {
    console.log('submitReview. target:', event.target)
    event.preventDefault()

    const formData = new FormData(event.target);
    console.log('FormData:', formData, 'reviewText:', formData.get('reviewText'))
    const reviewText = formData.get('reviewText')
    // let campusToSubmit = { id: this.props.match.params.id };
    // ['name', 'address', 'imageUrl', 'description'].forEach(key => {
    //   campusToSubmit[key] = formData.get(key);
    // });
    // console.log('In EditCampus. campusToSubmit:', campusToSubmit);
    // this.props.putCampus(campusToSubmit);
    this.props.postReview(productId, review)
  }

  render() {
    const reviews = this.props.reviews
    return (
      <div>
        <div>
          <h1>Reviews</h1>
        </div>
        <div>
          Leave a review
          <form onSubmit={this.submitReview}>
            {/* <label htmlFor="reviewTitle">Title</label> */}
            <input id="reviewTitle" name="title" type="text" value="Title" />
            <br/>
            {/* <label htmlFor="reviewRating">Rating</label> */}
            <input id="reviewRating" name="rating" type="" value="Rating (0 - 5)"/>
            <br/>
            <textarea
              className="review-input-box"
              name="reviewText"
              placeholder="Write your review here. What did you like most? What did you like the least?"
            />
            <br/>
            <button type="submit">Write Review</button>
          </form>
        </div>
        {reviews &&
          reviews.map(review => {
            return (
              <div key={review.id}>
                <div>
                  <img
                    src={review.user.imageUrl || '/icons/default-user.svg'}
                    className="user-review-icon"
                  />{' '}
                  {review.user.name}
                </div>
                <div>
                  <StarRating num={review.rating} />&nbsp;&nbsp;{' '}
                  <b>{review.title}</b>
                </div>
                <div>{this.toDateString(review.createdAt)}</div>
                <div>
                  <p>{review.text}</p>
                </div>
                <br />
              </div>
            )
          })}
      </div>
    )
  }
}

export default ReviewSection
