import styled from "styled-components";
import { useEffect, useState } from "react";
import { getSecretCampAlbum } from "../utils/google_api";

const Index = () => {
  const [currentIndex, setIndex] = useState(0);
  const mediaArray = ["test", "test2", "test3", "test4"];

  useEffect(() => {
    let shouldCancel = false;
    const call = async () => {
      const data = await getSecretCampAlbum();

      if (!shouldCancel && data) {
        console.log(data);
      }
    };
    call();
    return () => (shouldCancel = true);
  }, []);

  const backIndex = () => {
    if (currentIndex > 0) {
      setIndex(currentIndex - 1);
    } else {
      setIndex(Math.max(mediaArray.length - 1, 0));
    }
  };

  const nextIndex = () => {
    if (currentIndex < mediaArray.length - 1) {
      setIndex(currentIndex + 1);
    } else {
      setIndex(0);
    }
  };

  return (
    <>
      <Header>
        <h1>SecretCamp 2020 Story</h1>
      </Header>
      <Container>
        <button onClick={backIndex}>Back</button>
        <p>{mediaArray[currentIndex]}</p>
        <button onClick={nextIndex}>Next</button>
      </Container>
    </>
  );
};

const Header = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  height: 56px;
  width: 100%;
`;

const Container = styled.div`
  margin-top: 56px;
`;

export default Index;
