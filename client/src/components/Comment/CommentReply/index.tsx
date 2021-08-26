import { useState } from "react";
import loader from "../../../assets/svg/loader-dark.svg";

interface CommentReply {
  _id: string;
  message: string;
  author: {
    _id: string;
    avatar: string;
    fullName: string;
  };
  date: string;
}

const CommentReply = ({ commentReply }: { commentReply: CommentReply }) => {
  const [isLoaded, setLoaded] = useState(false);

  return (
    <>
      <div className="my-4 ml-20 comment-box flex items-center">
        <img
          style={{ display: !isLoaded ? "none" : "block" }}
          src="https://lh3.googleusercontent.com/a-/AOh14GiT6UU67nTYHdy1z2D2JcI5W6O6L8N6bgQHjp8zTA=s96-c"
          alt={commentReply.author?.fullName}
          className="h-7 w-7 rounded-full mr-4"
          onLoad={() => setLoaded(true)}
        />
        <div className="py-3 px-5 rounded-2xl bg-gray-200">
          <h1 className="font-semibold">Shaan Alam</h1>
          {true && <p>{commentReply.message}</p>}
          {/* for editing comment reply */}
          {/* {false && (
            <span className="flex justify-center">
              <img src={loader} />
            </span>
          )} */}
        </div>
      </div>
    </>
  );
};

export default CommentReply;
