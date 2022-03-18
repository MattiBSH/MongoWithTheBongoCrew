import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect, React } from "react";
import ReactHtmlParser from "react-html-parser";
import { Plane } from "react-loader-spinner";
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
  const [loading, setLoading] = useState(false);

  const sayHello = async () => {
    setLoading(true);
    await fetch("http://localhost:4000/tweets")
      .then((response) => response.json())
      .then((data) => {
        setTweets(data);
      });
    setLoading(false);
  };

  return (
    <div align="center">
      <h1 class="h1">All Tweets</h1>

      <button class="button" type="button" onClick={sayHello}>
        Get Tweets
      </button>

      {loading == true ? <Plane color="blue" /> : <></>}
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
                  {
                    console.log(tweet);
                  }
                  return (
                    <>
                      <tr>
                        <td>{tweet["_id"]}</td>
                        <td>{tweet["text"]}</td>
                        <td>
                          {tweet["user"] != null
                            ? tweet["user"]["name"].toString()
                            : "No name"}
                        </td>
                        <td>
                          {tweet["user"] != null
                            ? tweet["user"]["verified"].toString()
                            : "false"}
                        </td>
                        <td>
                          {tweet["retweet_count"] != null
                            ? tweet["retweet_count"].toString()
                            : "0"}
                        </td>
                        <td>
                          {tweet["source"] != null
                            ? ReactHtmlParser(tweet["source"])
                            : "No source"}
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          ""
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
