import { useState } from "react";

const ConnectForm = ({ connectToVideo }) => {
  const [channelName, setChannelName] = useState("");
  const [invalidInputMsg, setInvalidInputMsg] = useState("");

  const handleConnect = (e) => {
    const trimmedChannelName = channelName.trim();

    if (trimmedChannelName === "") {
      e.preventDefault();
      setInvalidInputMsg("Channel name can't be empty.");
      setChannelName("");
      return;
    }

    connectToVideo(trimmedChannelName);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          <span style={{ color: "#61DAFB" }}>React</span>
          <span style={{ color: "#FF7A59" }}>x</span>
          <span style={{ color: "#00AEEF" }}>Agora</span>
        </h2>

        <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleConnect}>
            <div>
              <label
                htmlFor="channelName"
                className="block text-sm font-medium text-gray-700"
              >
                Channel Name
              </label>
              <div className="mt-1">
                <input
                  id="channelName"
                  name="channelName"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-indigo-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out"
                  placeholder="Enter channel name"
                  value={channelName}
                  onChange={(e) => {
                    setChannelName(e.target.value);
                    setInvalidInputMsg("");
                  }}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              >
                Connect
              </button>
            </div>
            {invalidInputMsg && (
              <p className="mt-2 text-sm text-red-600">{invalidInputMsg}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConnectForm;
