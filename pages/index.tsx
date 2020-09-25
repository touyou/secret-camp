import styled from "styled-components";
import { useEffect, useState } from "react";
import { getSecretCampAlbum } from "../utils/google_api";
import { useInterval, useWindowSize } from "../utils/customHook";
import { Line } from "rc-progress";

const Index = () => {
  const [currentIndex, setIndex] = useState(0);
  const [mediaItems, setMediaItems] = useState([]);
  const [time, setTime] = useState(0);
  const size = useWindowSize();

  useEffect(() => {
    let shouldCancel = false;
    console.log("use size effect");
    const call = async () => {
      const data = await getSecretCampAlbum();
      console.log(data);
      if (!shouldCancel && data) {
        setMediaItems(data);
      }
    };
    call();
    return () => (shouldCancel = true);
  }, [size]);

  let delay = 1000;
  let interval = 5;

  const update = () => {
    if (time + 1 == interval) {
      setTime(0);
      nextIndex();
    } else {
      setTime(time + 1);
    }
  };

  useInterval(update, delay);

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
      ((interval * currentIndex + time) * 100) /
      Math.max(interval * mediaItems.length, 1)
    );
  };

  const selectSize = () => {
    if (size) {
      if (size.width > size.height) {
        return `=w${size.width}`;
      } else {
        return `=h${size.height}`;
      }
    }
    return "";
  };

  return (
    <>
      <Container>
        <LeftButton
          onClick={() => {
            backIndex();
            setTime(0);
          }}
        />
        <Image
          src={mediaItems[currentIndex] + selectSize()}
          width={size ? `${size.width}px` : "100%"}
          height={size ? `${size.height}px` : "100%"}
        />
        <RightButton
          onClick={() => {
            nextIndex();
            setTime(0);
          }}
        />
        <Line
          percent={currentValue()}
          strokeColor="rgba(250, 250, 250, 0.7)"
          trailColor="rgba(0, 0, 0, 0.2)"
          style={{
            position: "absolute",
            top: 4,
            marginLeft: "4px",
            marginRight: "4px",
            width: size ? `${size.width - 8}px` : "100%",
          }}
        />
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

const LeftButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
  width: 40px;
  border-style: none;
  background-color: rgba(0, 0, 0, 0);

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
    transition: 0.2s ease;
  }

  &:focus {
    outline: none;
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

  &:active {
    background-color: rgba(0, 0, 0, 0.2);
    transition: 0.2s ease;
  }

  &:focus {
    outline: none;
  }
`;

type ImageProps = {
  width: string;
  height: string;
};

const Image = styled.img<ImageProps>`
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  object-fit: cover;
`;

export default Index;
