import React from 'react'

export default function Detail({match,history,location}) {
  console.log('match',match)
  console.log('history',history)
  console.log('location',location)
  return (
    <div>
      {match.params.name}

      <button onClick={history.goBack} >后退</button>
    </div>
  )
}
