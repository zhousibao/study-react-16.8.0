import React from 'react'
import { Link } from "react-router-dom";

export default function List() {
  return (
    <div>
      <ul>
        <Link to="/detail/1"><li>1</li></Link>
        <Link to="/detail/2"><li>2</li></Link>
        <Link to="/detail/3"><li>3</li></Link>
        <Link to="/detail/4"><li>4</li></Link>
      </ul>
    </div>
  )
}
