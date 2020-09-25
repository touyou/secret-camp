import styled from "styled-components";
import { useEffect, useState } from "react";
import { getSecretCampAlbum } from "../utils/google_api";
import { useInterval, useWindowSize } from "../utils/customHook";
import { Line } from "rc-progress";

const Index = () => {
  const [currentIndex, setIndex] = useState(0);
  const [mediaItems, setMediaItems] = useState([]);
  const size = useWindowSize();

  useEffect(() => {
    let shouldCancel = false;
    console.log('use size effect');
    const call = async () => {
      const data = await getSecretCampAlbum(size.width);
      console.log(data);
      if (!shouldCancel && data) {
        setMediaItems(data);
      }
    };
    call();
    return () => (shouldCancel = true);
  }, [size]);

  let time = 0;
  let delay = 1000;

  const update = () => {
    time++;
    if (time == 10) {
      time = 0;
      nextIndex();
    }
  };

  // useInterval(update, delay);

  const backIndex = () => {
    if (currentIndex > 0) {
      setIndex(currentIndex - 1);
    } else {
      setIndex(Math.max(mediaItems.length - 1, 0));
    }
  };

  const nextIndex = () => {
    if (currentIndex < mediaItems.length - 1) {
      setIndex(currentIndex + 1);
    } else {
      setIndex(0);
    }
  };

  const currentValue = () => {
    return (
      ((10 * currentIndex + time) * 100) / Math.max(10 * mediaItems.length, 1)
    );
  };

  return (
    <>
      <Line
        percent={currentValue()}
        strokeColor="#eeeeee"
        style={{ margin: "4px" }}
      />
      <Container>
        <LeftButton onClick={backIndex} />
        <Image src={mediaItems[currentIndex]} />
        <RightButton onClick={nextIndex} />
      </Container>
    </>
  );
};

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
`;

const Progress = styled.progress`
  margin-top: 4px;
  z-index: 5;
  width: 100%;
  color: #eeeeee;
`;

const LeftButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
  width: 40px;
  border-style: none;
  background-color: rgba(0, 0, 0, 0);

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    transition: 0.2s ease;
  }
`;

const RightButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  height: 100%;
  width: 40px;
  border-style: none;
  background-color: rgba(0, 0, 0, 0);

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    transition: 0.2s ease;
  }
`;

const Image = styled.img`
  height: auto;
  width: 100%;
`;

export default Index;
