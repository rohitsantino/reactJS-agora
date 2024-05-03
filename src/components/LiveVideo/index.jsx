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
  console.log(remoteUsers);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow grid grid-cols-2 gap-4 p-4 bg-gray-100">
        <div className="flex flex-col gap-4">
          {remoteUsers.map((user) => (
            <div
              key={user.uid}
              className="bg-gray-200 p-4 rounded-lg shadow-md"
            >
              <RemoteUser user={user} />
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <LocalUser
            audioTrack={localMicrophoneTrack}
            videoTrack={localCameraTrack}
            cameraOn={cameraOn}
            micOn={micOn}
            playAudio={micOn}
            playVideo={cameraOn}
            style={{ height: "60vh" }}
          />
          <div className="flex justify-between mt-4">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              onClick={() => setMic((a) => !a)}
            >
              {micOn ? "Turn Mic Off" : "Turn Mic On"}
            </button>
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              onClick={() => setCamera((a) => !a)}
            >
              {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
            </button>
          </div>
          <button
            className={`mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            onClick={() => {
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
  );
};
