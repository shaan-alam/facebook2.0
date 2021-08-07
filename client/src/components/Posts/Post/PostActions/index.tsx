import { ChatAltIcon, ThumbUpIcon } from "@heroicons/react/outline";
import {
  ChatAltIcon as ChatAltIconSolid,
  ThumbUpIcon as ThumbUpIconSolid,
} from "@heroicons/react/solid";

const PostActions = ({
  commentBox,
  likes,
  profile,
}: {
  commentBox: React.RefObject<HTMLInputElement>;
  likes: Array<{ _id: string; fullName: string }>;
  profile: any;
}) => {
  const didCurrentUserLike = likes?.filter(
    ({ _id }: { _id: string }) => _id === profile.user._id
  );

  const LikeComponent = () => {
    if (likes?.length === 1) {
      return (
        <ThumbUpIconSolid className="w-14 mb-2 text-red-600 cursor-pointer px-4 py-2 rounded-lg" />
      );
    } else if (didCurrentUserLike !== null && likes?.length > 2) {
      return (
        <ThumbUpIconSolid className="w-14 mb-2 text-red-600 cursor-pointer px-4 py-2 rounded-lg" />
      );
    } else if (didCurrentUserLike !== null && likes?.length > 2) {
      return (
        <ThumbUpIconSolid className="w-14 mb-2 text-red-600 cursor-pointer px-4 py-2 rounded-lg" />
      );
    } else {
      return (
        <ThumbUpIcon className="w-14 mb-2 text-gray-600  cursor-pointer px-4 py-2 hover:bg-red-100 rounded-lg" />
      );
    }
  };

  const computeLikeText = () => {
    let content = "";
    if (likes?.length === 1) {
      content = "1 Like";
    } else if (didCurrentUserLike !== null && likes?.length > 2) {
      content = `You and ${likes?.length - 1} others like this`;
    } else {
      content = `${likes?.length} likes`;
    }

    return content;
  };

  return (
    <>
      <div className="post-actions flex">
        <LikeComponent />
        <ChatAltIcon
          className="w-14 mb-2 text-gray-600  cursor-pointer px-4 py-2 rounded-lg"
          onClick={() => commentBox?.current?.focus()}
        />
      </div>
      <div
        className={`post-actions-description-text px-4 ${
          didCurrentUserLike?.length !== 0 ? "text-red-600 font-semibold" : ""
        }`}
      >
        {computeLikeText()}
      </div>
    </>
  );
};

export default PostActions;
