import logo from './logo.svg';
import './App.css';
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    const publicServerUrl = 'http://ec2-18-222-100-185.us-east-2.compute.amazonaws.com';
    const localServerUrl = 'http://localhost';
    // fetch(localServerUrl + ":3000/api/instagram/edsheerantopfivephotourls")
    fetch(publicServerUrl + ":3000/api/instagram/edsheerantopfivephotourls")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.photos
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const error = this.state.error;
    const isLoaded = this.state.isLoaded;
    const items = this.state.items;

    console.log(items)
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
      <div>

        My favorite Images
        <ul>
          {items.map(item => (
            <li key={item}>
              <img src={item} width="500" height="600" />
            </li>
          ))}
        </ul>
      </div>
      );
    }
  }
}

export default App;
