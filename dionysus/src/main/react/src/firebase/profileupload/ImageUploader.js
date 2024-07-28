import React, { useState } from "react";
import { storage } from "./ProfileImgUpload";
import styled from "styled-components";

const ImageProfileDiv = styled.div`
  width: 350px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .classimgcircle {
    width: auto;
    height: auto;
    border-radius: 50%;
  }
  & > label {
    cursor: pointer;
    width: 120px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    margin-bottom: 10px;
    margin-left: 40px;
  }

  & > input[type="file"] {
    display: none;
  }

  & > button {
    cursor: pointer;
    width: 120px;
    height: 35px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    margin-left: 47px;
  }

  & > div > img {
    width: 130px;
    height: 130px;
    margin-top: 20px;
    object-fit: cover;
  }
`;

const ImageUploader = ({ setImageUrl, showControls = true }) => {
  //파일 저장 변수
  const [file, setFile] = useState(null);
  //파이어베이스 url 저장변수
  const [url, setUrl] = useState("");
  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 업로드 버튼 클릭시 파이어베이스에서 이미지를 불러오는 이벤트 함수
  const handleUploadClick = () => {
    if (file) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then(() => {
        console.log("File uploaded successfully!");
        fileRef.getDownloadURL().then((url) => {
          console.log("저장경로 확인 : " + url);
          setImageUrl(url);
          //세션에 저장
          sessionStorage.setItem("profile_url", url);
        });
      });
    }
  };

  return (
    <ImageProfileDiv>
      <div className="classimgcircle">
        {/* 이미지 띄워주는 부분 */}
        {url && <img src={url} alt="uploaded" />}
      </div>
      {/* 파일 선택 버튼, 업로드 버튼 */}
      {showControls && (
        <>
          <label htmlFor="fileInput">Choose File</label>
          <input id="fileInput" type="file" onChange={handleFileInputChange} />
          <button onClick={handleUploadClick}>Upload</button>
        </>
      )}
    </ImageProfileDiv>
  );
};

export default ImageUploader;
