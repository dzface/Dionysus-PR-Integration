import styled from "styled-components";
import video from "../../img/mainpageimg/video/video.mp4";

const VideoBack = styled.video`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const VideoBackgroundWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const VideoBackground = ({ children }) => {
  return (
    <VideoBackgroundWrapper>
      <VideoBack src={video} autoPlay loop muted />
      {children}
    </VideoBackgroundWrapper>
  );
};

export default VideoBackground;
