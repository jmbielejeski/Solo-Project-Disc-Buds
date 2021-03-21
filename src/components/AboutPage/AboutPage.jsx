import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <h2>Welcome to Disc Buds</h2>
        <p>Disc Buds let you play disc golf against your friend's round history. This allows you to compete against them even when you can't be on the course at the same time.</p>
      </div>
    </div>
  );
}

export default AboutPage;
