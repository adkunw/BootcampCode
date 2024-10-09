import axios from "axios";

const KEY = "AIzaSyAp2p-FnLRtfQD7r8qyGG2EKSYGp7s1YBM";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    type: "video",
    maxResults: 5,
    key: KEY,
  },
});
