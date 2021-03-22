import React from 'react';
import { Link } from "react-router-dom";

function HomePage() {

  return (
    <div>
      <h1>Welcome to Disc Buds!</h1>
      <Link className="navLink" to='/courseSearch'>Start Game</Link>
      <div>
      <Link className="navLink" to='/friendsList'>Add a friend</Link>
      </div>
    </div>
  )
}

export default HomePage;