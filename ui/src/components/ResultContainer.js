import React from "react";
import VideoInfoInResults from "./VideoInfoInResults";
import ReportSection from "./ReportSection";
import AccordionContainer from "./AccordionContainer";
import axios from "axios";
import './../styles/ResultContainer.css'
import CircularProgress from '@material-ui/core/CircularProgress'


class ResultContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      loadingCaptions: true,
      captions: [],
      firstVideoCaps: [],
      secondVideoCaps: [],
    };
  }
  componentWillMount() {
    this.fetchCaptionsData();
  }

  fetchCaptionsData = () => {
    const options = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };

    const {
      dissimilar_image_list,
      boxedFramesVideoOnePath,
      boxedFramesVideoTwoPath,
      rawVideoOneFramesPath,
      rawVideoTwoFramesPath
    } = this.state.data;
    // /Users/harshpyati/personal/fyp/api/mark_1/

    let firstVideoImages = []
    dissimilar_image_list.forEach(image => {
      console.log(image)
      console.log(boxedFramesVideoOnePath)
      let temp_path = this.formatPath(rawVideoOneFramesPath) + image
      console.log(temp_path)
      firstVideoImages.push(temp_path)
    })


    let secondVideoImages = []
    dissimilar_image_list.forEach(image => {
      console.log(image)
      console.log(boxedFramesVideoTwoPath)
      let temp_path = this.formatPath(rawVideoTwoFramesPath) + image
      console.log(temp_path)
      secondVideoImages.push(temp_path)
    })


    const data = new FormData();
    data.append("image_paths", firstVideoImages);
    axios
      .post("http://127.0.0.1:5000/captions", data, options)
      .then((res) => {
        const firstVideoCaps = res.data;
        const newData = new FormData();
        newData.append("image_paths", secondVideoImages);
        axios
          .post("http://127.0.0.1:5000/captions", newData, options)
          .then((newRes) => {
            const secondVideoCaps = newRes.data;
            this.setState({
              firstVideoCaps,
              secondVideoCaps,
              loadingCaptions: false,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  };

  formatPath = (path) => {
    return path.split("\\").join("/");
  };

  render() {
    const {
      data,
      loadingCaptions,
      firstVideoCaps,
      secondVideoCaps,
    } = this.state;
    console.log("data:", data);
    let {
      VidOneMarkedDissimilarImageList,
      dissimilar_image_list,
      unique_timestamp,
      markedVideosPath,
      VidTwoMarkedDissimilarImageList,
    } = data;
    // rawVideoOneFramesPath = this.formatPath(rawVideoOneFramesPath);
    const imageList1 = VidOneMarkedDissimilarImageList.map((image, index) => {
      //   console.log(`${rawVideoOneFramesPath}${image}`);
      return (
        <div className="imageDiff">
          <img
            className="imageDisplay"
            src={`data:image/jpeg;base64,${image}`}
            key={index}
          />
        </div>
      );
    });

    const imageList2 = VidTwoMarkedDissimilarImageList.map((image, index) => {
      //   console.log(`${rawVideoOneFramesPath}${image}`);
      return (
        <div className="imageDiff">
          <img
            className="imageDisplay"
            src={`data:image/jpeg;base64,${image}`}
            key={index}
          />
        </div>
      );
    });

    // const imageList = () => {
    //   return <img src={`data:image/jpeg;base64,${data["image"]}`} key="1" />;
    // };

    const captionComparisons = [];
    if (!loadingCaptions) {
      for (let i = 0; i < firstVideoCaps.length; i++) {
        const caption = {};
        caption["differenceNum"] = i + 1;
        for (let j = 0; j < secondVideoCaps.length; j++) {
          if (i == j) {
            const firstCaptionInfo = firstVideoCaps[i];
            const secondCaptionInfo = secondVideoCaps[j];
            caption[
              "content"
            ] = `In the first frame it is ${firstCaptionInfo["caption"]}, in the second frame it is ${secondCaptionInfo["caption"]}`;
            break;
          }
        }
        captionComparisons.push(caption);
      }
    }
    return (
      <div>
        <p className="projectTitleText">Differences</p>
        <div className="container">{imageList1}</div>
        <div className="container">{imageList2}</div>
        {loadingCaptions ? <CircularProgress color='primary' /> : (
          <AccordionContainer captionInfo={captionComparisons} />
        )}
      </div>
    );
  }
}

export default ResultContainer;