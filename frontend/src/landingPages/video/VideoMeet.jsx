import { useEffect, useRef, useState } from "react";
import {
  Badge,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { io } from "socket.io-client";
import VideocamIcon from "@mui/icons-material/Videocam";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import JoinCall from "./JoinCall";
import ChatModel from "./ChatModel";
import CtrlBtn from "./CTRLBTN";
import ControlBar from "./ControlBar";
import ShowVideo from "./ShowVideo";
import TopBar from "./TopBar";
const server_url = import.meta.env.VITE_Backend_URL;

const peerConfigConnections = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

const connections = {};

export default function VideoMeet() {
  const navigate = useNavigate();
  const socketRef = useRef();
  const socketIdRef = useRef();
  const localStreamRef = useRef();
  const localVideoRef = useRef();
  const isFirstRender = useRef(true);
  const isJoined = useRef(false);
  const pendingCandidates = useRef({});
  const showModelRef = useRef(false);

  const [videoAvailable, setVideoAvailable] = useState(true);

  const [audioAvailable, setAudioAvailable] = useState(true);

  const [video, setVideo] = useState(false);

  const [audio, setAudio] = useState(false);

  const [screen, setScreen] = useState(false);

  const [showModel, setShowModel] = useState(false);

  const [screenAvailable, setScreenAvailable] = useState(false);

  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState("");

  const [newMessages, setNewMessages] = useState(0);

  const [askForUsername, setAskForUsername] = useState(true);

  const [username, setUsername] = useState("");

  const videoRef = useRef([]);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // getPermissions
  const getPermissions = async () => {
    let hasVideo = false,
      hasAudio = false;
    try {
      // video permission
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: true });
        s.getTracks().forEach((t) => t.stop());
        hasVideo = true;
      } catch {
        hasVideo = false;
      }
      // audio permoission
      try {
        const s = await navigator.mediaDevices.getUserMedia({ audio: true });
        s.getTracks().forEach((t) => t.stop());
        hasAudio = true;
      } catch {
        hasAudio = false;
      }
      setAudioAvailable(hasAudio);
      setVideoAvailable(hasVideo);

      // Screen-share Permission
      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (hasVideo || hasAudio) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: hasVideo,
          audio: hasAudio,
        });

        if (userMediaStream) {
          window.localStream = userMediaStream;
          localVideoRef.current.srcObject = userMediaStream;
          localStreamRef.current = userMediaStream;
        }
      }
    } catch (err) {
      console.log(err);
      setVideoAvailable(false);
      setAudioAvailable(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await getPermissions();
    };
    init();
  }, []);

  // getUserMediaSuccess
  const getUserMediaSuccess = (stream) => {
    try {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    localStreamRef.current = stream;
    localVideoRef.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      const senders = connections[id].getSenders();

      stream.getTracks((track) => {
        const sender = senders.find((s) => s.track?.kind === track.kind);

        if (sender) {
          sender.replaceTrack(track).catch((e) => console.log(e));
        } else {
          connections[id].addTrack(track, localStreamRef.current);
        }
      });

      const needsRenegotiation = stream.getTracks().some((track) => {
        return senders.find((s) => s.track?.kind === track.kind);
      });

      if (!needsRenegotiation) {
        connections[id].createOffer().then((description) => {
          connections[id]
            .setLocalDescription(description)
            .then(() => {
              socketRef.current.emit("signal", id, {
                sdp: connections[id].localDescription,
              });
            })
            .catch((e) => console.log(e));
        });
      }
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          setAudio(false);
          setVideo(false);

          try {
            let tracks = localVideoRef.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
          } catch (e) {
            console.log(e);
          }

          // BlackSilence
          const blackSilence = (...args) =>
            new MediaStream([black(...args), silence()]);
          localStreamRef.current = blackSilence();
          localVideoRef.current.srcObject = localStreamRef.current;

          for (let id in connections) {
            localStreamRef.current.getTracks().forEach((track) => {
              connections[id].addTrack(track, localStreamRef.current);
            });

            connections[id]
              .createOffer()
              .then((description) => {
                connections[id]
                  .setLocalDescription(description)
                  .then(() => {
                    socketRef.current.emit(
                      "signal",
                      id,
                      JSON.stringify({ sdp: connections[id].localDescription }),
                    );
                  })
                  .catch((e) => console.log(e));
              })
              .catch((e) => console.log(e));
          }
        }),
    );
  };

  // silence
  const silence = () => {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();

    const dst = oscillator.connect(ctx.createMediaStreamDestination());

    oscillator.start();
    ctx.resume();

    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };

  // black /Fake video
  const black = ({ width = 640, height = 480 } = {}) => {
    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();

    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  // getUserMedia
  const getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({ video, audio })
        .then(getUserMediaSuccess)
        .catch((err) => console.log(err));
    } else {
      try {
        const tracks = localVideoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!isJoined.current) return;
    getUserMedia();
  }, [audio, video]);

  // gotMessageFromServer
  const gotMessageFromServer = (fromId, message) => {
    let signal = typeof message === "string" ? JSON.parse(message) : message;

    if (fromId !== socketIdRef.current) {
      if (!connections[fromId]) return;
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            const queued = pendingCandidates.current[fromId] || [];
            queued.forEach((candidate) => {
              connections[fromId]
                .addIceCandidate(new RTCIceCandidate(candidate))
                .catch((e) => console.log(e));
            });
            delete pendingCandidates.current[fromId];

            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socketRef.current.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        }),
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }
      if (signal.ice) {
        if (!connections[fromId].remoteDescription) {
          if (!pendingCandidates.current[fromId]) {
            pendingCandidates.current[fromId] = [];
          }
          pendingCandidates.current[fromId].push(signal.ice);
        } else {
          connections[fromId]
            .addIceCandidate(new RTCIceCandidate(signal.ice))
            .catch((e) => console.log(e));
        }
      }
    }
  };

  // TODO  addMessage
  const addMessage = (data, sender, socketIdSender) => {
    setMessages((prevMessages) => [...prevMessages, { sender, data }]);

    if (socketIdSender !== socketIdRef.current) {
      if (showModelRef.current) {
        setNewMessages(0);
      } else {
        setNewMessages((prevMessages) => prevMessages + 1);
      }
    }
  };

  // connectToSocketServer
  const connectToSocketServer = () => {
    socketRef.current = io(server_url, { secure: false });

    socketRef.current.on("signal", gotMessageFromServer);

    socketRef.current.on("connect", () => {
      socketRef.current.emit("join-call", window.location.href);

      socketIdRef.current = socketRef.current.id;
      socketRef.current.on("chat-message", addMessage);

      socketRef.current.on("user-left", (id) => {
        setVideos((prev) => prev.filter((video) => video.socketId !== id));
      });

      socketRef.current.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(
            peerConfigConnections,
          );

          connections[socketListId].onicecandidate = (event) => {
            if (event.candidate !== null) {
              socketRef.current.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate }),
              );
            }
          };

          connections[socketListId].ontrack = (event) => {
            const remoteStream = event.streams[0];

            setVideos((prevVideos) => {
              const videoExist = prevVideos.find(
                (v) => v.socketId === socketListId,
              );

              if (videoExist) {
                const updated = prevVideos.map((v) =>
                  v.socketId === socketListId
                    ? { ...v, stream: remoteStream }
                    : v,
                );
                videoRef.current = updated;
                return updated;
              } else {
                const newVideo = {
                  socketId: socketListId,
                  stream: remoteStream,
                  autoplay: true,
                  playsinline: true,
                };
                const updated = [...prevVideos, newVideo];
                videoRef.current = updated;
                return updated;
              }
            });
          };

          if (
            localStreamRef.current !== undefined &&
            localStreamRef.current !== null
          ) {
            localStreamRef.current.getTracks().forEach((track) => {
              connections[socketListId].addTrack(track, localStreamRef.current);
            });
          } else {
            // Black silence TODO
            const blackSilence = (...args) =>
              new MediaStream([black(...args), silence()]);
            localStreamRef.current = blackSilence();
            localStreamRef.current.getTracks().forEach((track) => {
              connections[socketListId].addTrack(track, localStreamRef.current);
            });
          }
        });

        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue;
            try {
              localStreamRef.current.getTracks().forEach((track) => {
                const isAlreadyAdded = connections[id2]
                  .getSenders()
                  .some((sender) => sender.track === track);
                if (!isAlreadyAdded) {
                  connections[id2].addTrack(track, localStreamRef.current);
                }
              });
            } catch (err) {
              console.log(err);
            }

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription }),
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

  // getMedia
  const getMedia = () => {
    isJoined.current = true;

    navigator.mediaDevices
      .getUserMedia({ video: videoAvailable, audio: audioAvailable })
      .then(getUserMediaSuccess)
      .catch((err) => console.log(err));

    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectToSocketServer();
  };

  // connect
  const connect = (e) => {
    e.preventDefault();
    setAskForUsername(false);
    getMedia();
  };

  // handleVideo
  const handleVideo = () => {
    setVideo(!video);
  };

  // handleAudio
  const handleAudio = () => {
    setAudio(!audio);
  };

  // getDisplayMediaSuccess
  const getDisplayMediaSuccess = (stream) => {
    try {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    localStreamRef.current = stream;
    localVideoRef.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      localStreamRef.current
        .getTracks()
        .forEach((track) =>
          connections[id].addTrack(track, localStreamRef.current),
        );

      connections[id]
        .createOffer()
        .then((description) => {
          connections[id]
            .setLocalDescription(description)
            .then(() => {
              socketRef.current.emit(
                "signal",
                id,
                JSON.stringify({ sdp: connections[id].localDescription }),
              );
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          setScreen(false);

          try {
            let tracks = localVideoRef.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
          } catch (e) {
            console.log(e);
          }

          // BlackSilence
          const blackSilence = (...args) =>
            new MediaStream([black(...args), silence()]);
          localStreamRef.current = blackSilence();
          localVideoRef.current.srcObject = localStreamRef.current;

          getUserMedia();
        }),
    );
  };

  const stopScreenSharing = async () => {
    if (!screenAvailable || !localStreamRef.current) return;
    setScreen(false);

    localStreamRef.current.getTracks().forEach((track) => {
      track.stop();
    });

    getUserMedia();
  };

  // getDisplayMedia
  const getDisplayMedia = () => {
    if (navigator.mediaDevices.getDisplayMedia)
      navigator.mediaDevices
        .getDisplayMedia({ video: true, audio: true })
        .then(getDisplayMediaSuccess)
        .catch((e) => {
          console.log(e);
          setScreen(false);
        });
  };

  // handleScreen
  const handleScreen = () => {
    const nextScreenState = !screen;
    setScreen(nextScreenState);

    if (nextScreenState) {
      getDisplayMedia();
    } else {
      stopScreenSharing();
    }
  };

  const handleChatModule = () => {
    const next = !showModel;
    setShowModel(next);
    showModelRef.current = next;
    setNewMessages(0);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      socketRef.current.emit("chat-message", message, username);
      setMessage("");
    }
  };

  const endCall = (e) => {
    e?.preventDefault();
    Object.values(connections).forEach((pc) => pc.close());
    Object.keys(connections).forEach((k) => delete connections[k]);
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const activeStream =
      localStreamRef.current || localVideoRef.current?.srcObject;

    if (activeStream) {
      activeStream.getTracks().forEach((track) => track.stop());
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }

    localStreamRef.current = null;
    navigate("/home");
  };

  return (
    <Box>
      {askForUsername ? (
        // JoinCall
        <JoinCall
          username={username}
          setUsername={setUsername}
          localVideoRef={localVideoRef}
          connect={connect}
        />
      ) : (
        <Box
          sx={{
            minHeight: "100vh",
            height: "100vh",
            background: "#0d1117",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Top bar */}
          <TopBar videos={videos} />

          {/* Content */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              overflow: "hidden",
              p: "10px",
              gap: "10px",
              minHeight: 0,
            }}
          >
            {/* Video grid */}
            <ShowVideo localVideoRef={localVideoRef} videos={videos} />

            {/* Chat panel */}
            {showModel && (
              <Box
                sx={{
                  width: 300,
                  flexShrink: 0,
                  background: "#111827",
                  border: "1px solid #1e3a5f",
                  borderRadius: "12px",
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <ChatModel
                  messages={messages}
                  sendMessage={sendMessage}
                  message={message}
                  setMessage={setMessage}
                />
              </Box>
            )}
          </Box>

          {/* Control bar */}
          <ControlBar
            handleVideo={handleVideo}
            video={video}
            handleAudio={handleAudio}
            audio={audio}
            endCall={endCall}
            handleScreen={handleScreen}
            screen={screen}
            newMessages={newMessages}
            handleChatModule={handleChatModule}
            showModel={showModel}
          />
        </Box>
      )}
    </Box>
  );
}
