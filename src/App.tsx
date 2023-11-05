import icon from "./assets/Icon.svg";
import edit from "./assets/edit.svg";
import PaperClip from "./assets/paperclip.svg";
import send from "./assets/send-03.svg";
import camera from "./assets/camera-02.svg";
import video from "./assets/video.svg";
import document from "./assets/Document.svg";
import corner from "./assets/Corner.svg";
import { useState, useEffect } from "react";

type ChatItem = {
  id: number;
  sender: {
    self: boolean;
    image: string;
  };
  message: string;
};

function App() {
  const [data, setData] = useState<ChatItem[]>([]);
  const [index, setIndex] = useState(1);
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://qa.corider.in/assignment/chat?page=0")
        .then(async (res) => await res.json())
        .then((res) => setData(res.chats));
    };
    fetchData();
  }, []);

  const fetchMoreData = async () => {
    await fetch(`https://qa.corider.in/assignment/chat?page=${index}`)
      .then(async (res) => await res.json())
      .then((res) => {
        setData((prevItems) => [...prevItems, ...res.chats].reverse());
      })
      .catch((err) => console.log(err));

    setIndex((prev) => prev + 1);
  };
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      fetchMoreData();
    }
  };

  return (
    <div className="flex flex-col  p-4 relative h-screen " >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={icon} alt="previous" className="w-4 h-4" />
          <h1 className="ml-2 text-2xl font-semibold">Trip 1</h1>
        </div>
        <div>
          <img src={edit} alt="Edit" />
        </div>
      </div>
      <div className="flex items-center border-b-2 mt-4">
        <span className="bg-red-400 h-10 w-10 rounded-full mr-4">
          <img
            src={data[0]?.sender?.image}
            alt="img"
            className="rounded-full"
          />
        </span>
        <span className="text-lg font-semibold">
          From IGI Airport, T3 <br />
          To Sector 28
        </span>
      </div>

      <div
        className="flex  flex-col  mt-8 overflow-y-auto h-full " onScrollCapture={(e) => handleScroll(e)}
        
      >
        {data?.map((item) => (
          <div
            key={item.id}
            className={`flex ${
              item.sender.self ? "justify-end " : "items-start"
            } mb-6`}
          >
            {!item.sender.self && (
              <img
                src={item.sender.image}
                alt="profilePhoto"
                className="mb-8 w-6 h-6 rounded-full"
              />
            )}

            <div
              className={`px-4 shadow-lg rounded-2xl ${
                !item.sender.self
                  ? "rounded-tl-none"
                  : "bg-blue-400 rounded-br-none"
              } mx-4`}
            >
              <p>{item.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className=" mt-6 fixed bottom-0  w-full   right-0 bg-white ">
        <div className="flex justify-between border-2 rounded-lg m-2   ">
          <input
            type="text"
            placeholder="Reply to @Rohit Yadav"
            className="border-none  bg-transparent  outline-none w-full p-2 "
          />

          <div className="flex  mr-4 ">
            <img
              src={PaperClip}
              alt="paperClip"
              className="mr-2 cursor-pointer "
              onClick={() => setDisplay((prev) => !prev)}
            />
            <img src={send} alt="send" className="" />
          </div>
        </div>
      </div>

      {display && (
        <div className=" fixed bottom-16 right-4 flex items-center flex-col   p-2 ">
          <div className="flex bg-green-400 p-3 rounded-full">
            <img src={camera} alt="camera" />
            <img src={video} alt="video" className="mx-2" />
            <img src={document} alt="document" />
          </div>
          <img src={corner} alt="corner" className="absolute bottom-0" />
        </div>
      )}
    </div>
  );
}

export default App;
