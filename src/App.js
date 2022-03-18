import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect, React } from "react";
import ReactHtmlParser from 'react-html-parser';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/add">Add</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => {
  const [tweets, setTweets] = useState([]);

  const Button = ({ handleClick = () => console.log("Default") }) => (
    <button class="button" type="button" onClick={handleClick}>
      Get Tweets
    </button>
  );

  const sayHello = () =>
    fetch("http://localhost:4000/tweets")
      .then((response) => response.json())
      .then((data) => setTweets(data));

  return (
    <div align="center">
      <h1 class="h1">All Tweets</h1>
      <Button handleClick={sayHello} />
      <h1>
        {tweets[0] != null ? (
          <div>
            <table id="tweets">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Text</th>
                  <th>User name</th>
                  <th>User verified</th>
                  <th>Retweet Count</th>
                  <th>Source</th>
                </tr>
              </thead>
              <tbody>
                {tweets.map((tweet) => {
                  {console.log(tweet)}
                    return <>
                    <tr>
                      <td>{tweet["_id"]}</td>
                      <td>{tweet["text"]}</td>
                      <td>{tweet['user']!=null?tweet["user"]['name'].toString():"No name"}</td>
                      <td>{tweet['user']!=null?tweet["user"]['verified'].toString():"false"}</td>
                      <td>{tweet['retweet_count']!=null?tweet["retweet_count"].toString():"0"}</td>
                      <td>{tweet['source']!=null?ReactHtmlParser(tweet["source"]):"No source"}</td>

                      </tr>
                    </>
                  
                })}
              </tbody>
            </table>
          </div>
        ) : (
          "ok"
        )}
      </h1>
    </div>
  );
};

function About() {
  return (
    <div align="center">
      <h1>About</h1>
      <h3>gg</h3>
    </div>
  );
}

function Add() {
  return (
    <div align="center">
      <h1>Add</h1>
      <h3>gg</h3>
    </div>
  );
}

export default App;
