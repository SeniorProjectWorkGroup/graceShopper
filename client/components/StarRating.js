import React from 'react'

const stars = ({num}) => {
  // Output number of stars
  const numWhole = Math.floor(num)
  const rem = num - numWhole
  const numHalf = rem > 0 ? 1 : 0
  let imgDataArr = []
  let count = 0
  for (let i = 0; i < numWhole; i++) {
    imgDataArr.push({ key: count, url: '/icons/whole_star.png'})
    count++
  }
  if (numHalf) {
    imgDataArr.push({ key: count, url: '/icons/half_star.png'})
  }
  return (
    <span>
      {imgDataArr.map(obj => (<img key={obj.key} src={obj.url}/>))}
    </span>
  )
}

export default stars
