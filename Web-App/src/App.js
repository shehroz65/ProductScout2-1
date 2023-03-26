import React, { useState } from 'react';
import Graph from './graph';
import './App.css';
import './login_page.css';
import './search_page.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const handleTryProductScout = () => {
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const [showSearchBar, setSearchBar] = useState(false);
  const handleSearchBar = () => {
    setSearchBar(true);
  };

  const handleCloseAndSearch = () => {
    handleSearchBar();
    handleLoginClose();
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    // code to perform search
    // code to perform search
    // code to perform search
    // code to perform search
    // code to perform search
    // code to perform search
    // code to perform search
  };

  return (
    <div className="App">
      {showLogin && !showSearchBar &&(
        <div className="login-page">
          <div className='login-greet'>Login to ProductScout</div>
          <form>
            <label>
              <div className='email-header'>Email</div>
              <input type="email" name="email" required />
            </label>
            <br />
              <label>
                <div className='password-header'>Password</div>
                <input type="password" name="password" required />
              </label>
            <br />
            <button type="submit" onClick={handleCloseAndSearch} >Login</button>
          </form>
        </div>
      )}

      {!showLogin && !showSearchBar &&(
        <div>
          <div className="header">
            <h1 className="title">ProductScout</h1>
            <button className="about-us-button">About Us</button>
            <button className="payment-plan-button">Payment Plan</button>
            <button className="login-button" onClick={handleTryProductScout}>
              Login/Signup
            </button>
          </div>
          <div className="graph">
            <Graph />
          </div>

          <div className="overview">
            Welcome to ProductScout - your one-stop solution for e-commerce trend forecasting.
            With our advanced recommendation system, we use publicly available data to provide insightful predictions on future trends in the market.
            Our goal is to empower e-commerce businesses to make informed decisions and stay ahead of the curve.
            Join us on this journey as we revolutionize the e-commerce industry with data-driven solutions.
            Start using ProductScout today and take your business to the next level!
          </div>

          <button className="try-productscout-button" onClick={handleTryProductScout}>
            Try ProductScout
          </button>

          <div className="technologies">
            <h1>Technologies</h1>
          </div>

          <div className="images">
            <img src={require('./images/d3.png')} className="D3" alt="d3" />
            <img src={require('./images/python.png')} className="python" alt="python" />
            <img src={require('./images/pytorch.png')} className="pytorch" alt="pytorch" />
            <img src={require('./images/node.png')} className="node" alt="node" />
            <img src={require('./images/skit.png')} className="skit" alt="skit" />
            <img src={require('./images/selenium.png')} className="selenium" alt="selenium" />
            <img src={require('./images/mongodb.png')} className="mongo" alt="mongo" />
            <img src={require('./images/aws.png')} className="aws" alt="aws" />
            <img src={require('./images/react.png')} className="react" alt="react" />
          </div>
        </div>
      )}

      {!showLogin && showSearchBar && (
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />

          <button type="submit" className="search-button">
            Search
          </button>

          <div className="product-scout">
            <h1>ProductScout</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;