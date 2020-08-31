import React from 'react';
import { useHistory } from 'react-router-dom';
import { VideoCardContainer, VideoCardBanner } from './styles';
import json from '../../../../data/watch.json';

function getYouTubeId(youtubeURL) {
  return youtubeURL
    .replace(
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/,
      '$7',
    );
}

function VideoCard({ videoTitle, videoURL, categoryColor }) {
  const image = `https://img.youtube.com/vi/${getYouTubeId(videoURL)}/hqdefault.jpg`;
  const videoId = `${getYouTubeId(videoURL)}`;
  const history = useHistory();
  const navigateTo = () => {
    json.id = videoId;
    history.push('/watch');
  };

  return (
    <VideoCardContainer
      url={image}
      onClick={navigateTo}
      style={{ borderColor: categoryColor || 'red' }}
      title={videoTitle}
    >

      <VideoCardBanner style={{ backgroundColor: categoryColor || 'red' }}>

        {videoTitle}

      </VideoCardBanner>
    </VideoCardContainer>
  );
}

export default VideoCard;
