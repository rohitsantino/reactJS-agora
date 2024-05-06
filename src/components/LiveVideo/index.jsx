import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  LocalUser,
  RemoteUser,
  useJoin,
  useLocalCameraTrack,
  useLocalMicrophoneTrack,
  usePublish,
  useRemoteAudioTracks,
  useRemoteUsers,
} from "agora-rtc-react";

export const LiveVideo = () => {
  const appId = "d06846d5feb0477194dfab2dec9fdc7d";
  const { channelName } = useParams();

  const [activeConnection, setActiveConnection] = useState(true);
  const [micOn, setMic] = useState(true);
  const [cameraOn, setCamera] = useState(true);

  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn);
  const { localCameraTrack } = useLocalCameraTrack(cameraOn);

  const navigate = useNavigate();

  useJoin(
    {
      appid: appId,
      channel: channelName,
      token: null,
    },
    activeConnection
  );

  usePublish([localMicrophoneTrack, localCameraTrack]);

  const remoteUsers = useRemoteUsers();
  const { audioTracks } = useRemoteAudioTracks(remoteUsers);

  audioTracks.forEach((track) => track.play());

  const localUserStyle = {
    position: "absolute",
    bottom: "10px",
    right: "10px",
    width: "200px",
    height: "150px",
  };

  const remoteUserStyle = {
    width: "100%",
    height: "50vh",
    marginBottom: "10px",
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="h-full bg-gray-100">
        <div className="flex flex-col gap-4 relative">
          {remoteUsers.map((user, index) => (
            <div
              key={user.uid}
              className="bg-gray-200  rounded-lg shadow-md"
              style={remoteUserStyle}
            >
              <RemoteUser user={user} style={{ height: "100vh" }} />
            </div>
          ))}
        </div>
        <div className="bg-white  rounded-lg shadow-md ">
          <LocalUser
            audioTrack={localMicrophoneTrack}
            videoTrack={localCameraTrack}
            cameraOn={cameraOn}
            micOn={micOn}
            playAudio={micOn}
            playVideo={cameraOn}
            style={localUserStyle}
          />
          <div
            className="flex justify-around bg-transparent absolute bottom-12 "
            style={{
              width: "34vw",
              left: "372px",
            }}
          >
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline z-50`}
              onClick={() => setMic((a) => !a)}
            >
              {micOn ? "Turn Mic Off" : "Turn Mic On"}
            </button>
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline z-50`}
              onClick={() => setCamera((a) => !a)}
            >
              {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
            </button>
            <button
              className={` bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline z-50`}
              onClick={() => {
                console.log("disconnected");
                setCamera(false);
                setActiveConnection(false);
                navigate("/");
              }}
            >
              Disconnect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
