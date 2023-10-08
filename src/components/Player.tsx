import { useCallback, useRef, useState } from "react";
import "./Player.css";
import React from "react";

// eslint-disable-next-line react-refresh/only-export-components
const MusicAPI = [
  {
    songAuthor: "Ajr",
    songName: "Ready",
    songSrc: "./public/music/Ajr-Ready.mp3",
  },
  {
    songAuthor: "Eminem",
    songName: "Love the Way You Lie",
    songSrc: "./public/music/Eminem-Love the Way You Lie.mp3",
  },
];

const Player = () => {
  const [currMusic, setCurrMusic] = useState<Record<string, string>>({
    songAuthor: "Ajr",
    songName: "Ready",
    songSrc: "./public/music/Ajr-Ready.mp3",
  });
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [isAudioPlay, setIsAudioPlay] = useState<boolean>(false);
  const [audioIndex, setAudioIndex] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);

  const currAudio = useRef<HTMLAudioElement | null>(null);

  const handleAudioProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempValue = e.target.value;
    const value = Number(tempValue);
    setAudioProgress(value);
    currAudio.current!.currentTime =
      (value * currAudio.current!.duration) / 100;
  };

  const handleAudioPlay = () => {
    if (currAudio.current?.paused) {
      currAudio.current.play();
      setIsAudioPlay(true);
    } else {
      currAudio.current?.pause();
      setIsAudioPlay(false);
    }
  };

  const handleNextSong = () => {
    if (audioIndex >= MusicAPI.length - 1) {
      setAudioIndex(0);
      updateMusic(0);
    } else {
      setAudioIndex(audioIndex + 1);
      updateMusic(audioIndex + 1);
    }
  };

  const handlePrevSong = () => {
    if (audioIndex === 0) {
      setAudioIndex(MusicAPI.length - 1);
      updateMusic(MusicAPI.length - 1);
    } else {
      setAudioIndex(audioIndex - 1);
      updateMusic(audioIndex - 1);
    }
  };

  const updateMusic = (int: number) => {
    const musicSong = MusicAPI[int];
    currAudio.current!.src = musicSong.songSrc;
    currAudio.current?.play();
    setCurrMusic({
      songAuthor: musicSong.songAuthor,
      songName: musicSong.songName,
      songSrc: musicSong.songSrc,
    });
    setIsAudioPlay(true);
  };

  const audioBarProgress = useCallback(() => {
    if (currAudio.current) {
      const progress =
        (currAudio.current.currentTime / currAudio.current.duration) * 100;
      const roundProgress = Math.round(progress);

      if (audioProgress !== roundProgress) {
        setAudioProgress(roundProgress);
      }
    }
  }, [audioProgress]);

  const handleVolumeBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempValue = e.target.value;
    const value = Number(tempValue);
    setVolume(value);
    currAudio.current!.volume = value / 100;
  };

  const handleClickVolumeZero = () => {
    setVolume(0);
    currAudio.current!.volume = 0;
  };

  const handleClickVolumeMax = () => {
    setVolume(100);
    currAudio.current!.volume = 1;
  };

  return (
    <div className="container">
      <div className="player">
        <audio
          src="./public/music/Ajr-Ready.mp3"
          ref={currAudio}
          onEnded={handleNextSong}
          onTimeUpdate={audioBarProgress}
        ></audio>
        <div className="rectangle">
          <div className="author">{currMusic.songAuthor}</div>
          <div className="title">{currMusic.songName}</div>
          <img className="logo_min" src="public/Logo.svg" alt="" />
          <input
            type="range"
            className={`progress_bar ${isAudioPlay ? "" : "progress-hidden"}`}
            value={audioProgress}
            onChange={handleAudioProgress}
          />
        </div>
        <img
          src="./public/risian-X2 1.png"
          alt=""
          className={`spin ${isAudioPlay ? "spin-animation" : ""}`}
        />
        <div className="button-group">
          <img
            className="prev"
            src="public/Playprev.svg"
            alt=""
            onClick={handlePrevSong}
          />
          {isAudioPlay ? (
            <img
              className="play"
              src="public/Play-button.svg"
              alt=""
              onClick={handleAudioPlay}
            />
          ) : (
            <img
              className="play"
              src="public/PlayButton.svg"
              alt=""
              onClick={handleAudioPlay}
            />
          )}
          <img
            className="next"
            src="public/Playnext.svg"
            alt=""
            onClick={handleNextSong}
          />
        </div>

        <div className="volume">
          <img
            className="volume_cross"
            src="public/volume-cross.svg"
            alt=""
            onClick={handleClickVolumeZero}
          />
          <input
            type="range"
            className="slider"
            value={volume}
            onChange={handleVolumeBar}
          />
          <img
            className="volume_loud"
            src="public/volume-loud.svg"
            alt=""
            onClick={handleClickVolumeMax}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Player);
