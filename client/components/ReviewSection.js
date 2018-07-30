import React from 'react'
import StarRating from './StarRating'

class ReviewSection extends React.Component {
  toDateString = dateStr => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return new Date(dateStr).toLocaleDateString('en-US', options)
  }

  submitReview = event => {
    console.log('submitReview. target:', event.target)
    event.preventDefault()
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
            <textarea
              className="review-input-box"
              placeholder="Write your review here. What did you like most? What did you like the least?"
            />
            <button type="submit">Write Review</button>
          </form>
        </div>
        {reviews &&
          reviews.map(review => {
            return (
              <div key={review.id}>
                <div>
                  <img
                    src={review.user.imageUrl}
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
