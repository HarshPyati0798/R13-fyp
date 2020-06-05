import React from 'react';
import Header from './components/Header';
import Content from './components/TryItContent';
import axios from 'axios';
import ResultContainer from './components/ResultContainer';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  retrieveVideo = (file) => {
    return new Promise(resolve => {
      let input = document.createElement('input')
      input.type = 'file';
      input.accept = 'video/*';
      input.onchange = _ => {
        if (file == 'file1') {
          this.setState({
            file1: Array.from(input.files)
          }, () => console.log(this.state))
        } else {
          this.setState({
            file2: Array.from(input.files)
          }, () => console.log(this.state))
        }
      }
      input.click();
    })
  }

  processVideo = () => {
    const { file1, file2 } = this.state
    if (file1 != null && file2 != null) {
      const data = new FormData()
      data.append("fileOne", file1[0])
      data.append("fileTwo", file2[0])
      const options = {
        headers: {
          "Access-Control-Allow-Origin": "*",
        }
      }
      this.setState({
        isProgressVisible: true
      })
      axios.post('http://localhost:5000/uploader', data, options)
        .then(res => {
          console.log(res)
          this.setState({
            data: res.data,
            isProgressVisible: false,
            isResultContainerVisible: true
          })
        })
        .catch(err => {
          console.log(err)
          this.setState({
            isProgressVisible: false
          })
        })
    } else {
      alert("Ensure that you select 2 videos for comparison")
    }
  }

  render() {
    const { isProgressVisible, isResultContainerVisible, data } = this.state
    return (
      <div>
        <Header />
        {
          isResultContainerVisible ? <ResultContainer
            data={data}
          /> : <Content
              isProgressVisible={isProgressVisible}
              processVideo={this.processVideo}
              retrieveVideo={this.retrieveVideo}
            />
        }
      </div>
    );
  }
}

export default App;
