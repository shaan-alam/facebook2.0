import { ChatAltIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { ThumbUpIcon as ThumbUpIconSolid } from "@heroicons/react/solid";
import { useMutation } from "react-query";
import { likePost } from "../../../../api";
import { PostType } from "../types";

const PostActions = ({
  commentBox,
  post,
  user,
}: {
  commentBox: React.RefObject<HTMLInputElement>;
  post: PostType;
  user: any;
}) => {
  const { likes } = post?.likes;

  // Mutation for liking the post
  const mutation = useMutation((userID: string) =>
    likePost(post?._id, user._id)
  );

  // To determine if the current logged in user has liked the post
  const didCurrentUserLike = likes?.filter(
    ({ _id }: { _id: string }) => _id === user._id
  );

  // To determing how the like button will be displayed in the UI,
  // depending upon if the user has liked the post or not.
  const LikeComponent = () => {
    return didCurrentUserLike.length !== 0 ? (
      <ThumbUpIconSolid className="h-10 w-10 ml-2 mb-2 text-red-600 cursor-pointer p-2 mt-5 rounded-full hover:bg-red-100" />
    ) : (
      <ThumbUpIcon className="h-10 w-10 ml-2 mb-2 text-gray-600 cursor-pointer p-2 mt-5 rounded-full hover:bg-red-100" />
    );
  };

  // To determing how the like button text will be displayed in the UI,
  // depending upon if the user has liked the post or not.
  // For example - 1 Like, 3 Likes, or You and {X} others like this.
  const computeLikeText = () => {
    let content = "";
    if (likes?.length === 1 && didCurrentUserLike !== null) {
      content = "You Like this";
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
        <a href="#!" onClick={() => mutation.mutate(user._id)}>
          <LikeComponent />
        </a>

        <ChatAltIcon
          className="h-10 w-10 mb-2 ml-2 text-gray-600 mt-5 cursor-pointer p-2  rounded-full hover:bg-blue-200 "
          onClick={() => commentBox?.current?.focus()}
        />
      </div>
      <div
        className={`post-actions-description-text ml-4 ${
          didCurrentUserLike?.length !== 0 ? "text-red-600 font-semibold" : ""
        }`}
      >
        {computeLikeText()}
      </div>
    </>
  );
};

export default PostActions;
