import React from 'react'
import StarRating from './StarRating'
import {postReview} from '../store/reviews'
import ReviewForm from './ReviewForm'
import {connect} from 'react-redux'

class ReviewSection extends React.Component {
  toDateString = dateStr => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    return new Date(dateStr).toLocaleDateString('en-US', options)
  }

  handleReview = event => {
    console.log('submitReview. target:', event.target)
    event.preventDefault()

    const formData = new FormData(event.target)
    console.log(
      'FormData:',
      formData,
      'reviewText:',
      formData.get('reviewText')
    )
    const review = {
      title: formData.get('title'),
      rating: formData.get('rating'),
      text: formData.get('text')
    }
    console.log('in handlereview. review:', review)
    const productId = this.props.productId //this.props.match.params.id
    this.props.postReview(productId, review)
  }

  render() {
    const reviews = this.props.reviews
    return (
      <div>
        <div>
          <h1 className="text-white">Reviews</h1>
        </div>
        {/* Only display review form if the user is logged in */}
        {this.props.user.id && (
          <div className="text-white">
            Leave a review
            <ReviewForm handleReview={this.handleReview} />
            <br />
          </div>
        )}
        {reviews &&
          reviews.map(review => {
            return (
              <div key={review.id}>
                <div className="text-white">
                  <img
                    src={review.user.imageUrl || '/icons/default-user.svg'}
                    className="user-review-icon"
                  />{' '}
                  {review.user.name}
                </div>
                <div>
                  <StarRating num={review.rating} />&nbsp;&nbsp;{' '}
                  <b className="text-white">{review.title}</b>
                </div>
                <div className="text-white">
                  {this.toDateString(review.createdAt)}
                </div>
                <div>
                  <p className="text-white">{review.text}</p>
                </div>
                <br />
              </div>
            )
          })}
      </div>
    )
  }
}

const mapStateToProps = ({user}) => ({user})

const mapDispatchToProps = dispatch => ({
  postReview: (productId, review) => dispatch(postReview(productId, review))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReviewSection)
