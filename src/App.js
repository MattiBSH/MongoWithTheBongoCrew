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
              <Link to="/hashtags">Hashtags</Link>
            </li>
            <li>
              <Link to="/add">Add</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/hashtags">
            <Hashtags />
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

const Hashtags = () => {
  const [hash, setHash] = useState([]);
  const [loading, setLoading] = useState(false);

  const sayHello = async () => {
    setLoading(true);
    await fetch("http://localhost:4000/tweets/hashtags")
      .then((response) => response.json())
      .then((data) => {
        setHash(data);
      });
    setLoading(false);
  };

  return (
    <div align="center">
      <h1 class="h1">All Hashtags</h1>

      <button class="button" type="button" onClick={sayHello}>
        Get Hashtags
      </button>

      {loading == true ? <Plane /> : <></>}
      <h1>
        {hash[0] != null ? (
          <div>
            <table id="tweets">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Count</th>
                 
                </tr>
              </thead>
              <tbody>
                {hash.map((hash) => {
                  {
                    console.log(hash);
                  }
                  return (
                    <>
                      <tr>
                        <td>{hash["_id"]}</td>
                        <td>{hash["count"]}</td>
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

function Add() {
  const [tweet, setTweet] = useState({ text: "" });

  const handleSubmit = async () => {
    await fetch("http://localhost:4000/tweets", {
      method: "POST",
      body: JSON.stringify(tweet),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleChange = (event) => {
    setTweet({ text: event.target.value });
    var data = JSON.stringify(tweet);
    console.log(data);
  };
  return (
    <div align="center">
      <div align="center">
        <h1 class="h1">Add a tweet</h1>
      </div>
      <form className="mb-3" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          value={tweet.text}
          onChange={handleChange}
        />
        <input type="submit" value="Send tweet" />
      </form>
    </div>
  );
}

export default App;
