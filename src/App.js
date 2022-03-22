import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useState, useEffect, React } from "react";
import ReactHtmlParser from "react-html-parser";
import { Plane } from "react-loader-spinner";
import Form from "react-bootstrap/Button";

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
  const [tweet, setTweet] = useState({ text: "" });

  const handleSubmit = (e) => {
    console.log(JSON.stringify(tweet));

    fetch("http://localhost:4000/tweets", {
      method: "POST",
      body: JSON.stringify({ text: "testteset" }),
      headers: {
        "Content-Type": "text/plain",
        accept: "application/json",
      },
    })
      .then((data) => console.log(data))
      .catch((err) => {
        if (err.status) {
          err.fullError.then((e) => console.log(e.detail));
        }
      });
  };

  /* try {
      let res = await fetch("http://localhost:4000/tweets", {
        method: "POST",
        body: JSON.stringify(tweet),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      let resJson = await res.json();
      if (res.status === 200) {
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
  */

  const handleChange = (event) => {
    setTweet({ ...tweet, [event.target.id]: event.target.value });
    var data = JSON.stringify(tweet);
    console.log(data);
  };
  return (
    <div align="center">
      <div align="center">
        <h1 class="h1">Add a tweet</h1>
      </div>

      <form className="form-horizontal" onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          id="text"
          value={tweet.text}
          onChange={handleChange}
        />
        <button type="Submit" value="Send tweet" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
