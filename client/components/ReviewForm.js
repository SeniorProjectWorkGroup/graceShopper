import React from 'react'

class ReviewForm extends React.Component {
    state = {
      title: '',
      rating: 5,
      text: ''
    }

    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }

  render() {
    return (
      <form onSubmit={this.props.handleReview}>
        <label htmlFor="reviewTitle">Title</label>
        <input onChange={this.handleChange} id="reviewTitle" name="title" type="text" value={this.state.title} />
        <br />
        <label htmlFor="reviewRating">Rating</label>
        <input onChange={this.handleChange} id="reviewRating" name="rating" type="Number" value={this.state.rating} />
        <br />
        <textarea
          onChange={this.handleChange}
          className="review-input-box"
          name="text"
          placeholder="Write your review here. What did you like most? What did you like the least?"
          value={this.state.text}
        />
        <br />
        <button type="submit">Write Review</button>
      </form>
    )
  }
}

export default ReviewForm
