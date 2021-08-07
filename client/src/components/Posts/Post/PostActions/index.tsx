import { ChatAltIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { ThumbUpIcon as ThumbUpIconSolid } from "@heroicons/react/solid";
import { useMutation } from "react-query";
import { likePost } from "../../../../api";
import { PostType } from "../types";

const PostActions = ({
  commentBox,
  post,
  profile,
}: {
  commentBox: React.RefObject<HTMLInputElement>;
  post: PostType;
  profile: any;
}) => {
  const { likes } = post?.likes;

  // Mutation for liking the post
  const mutation = useMutation((userID: string) =>
    likePost(post?._id, profile.user._id)
  );

  // To determine if the current logged in user has liked the post
  const didCurrentUserLike = likes?.filter(
    ({ _id }: { _id: string }) => _id === profile.user._id
  );

  // To determing how the like button will be displayed in the UI,
  // depending upon if the user has liked the post or not.
  const LikeComponent = () => {
    return didCurrentUserLike.length !== 0 ? (
      <ThumbUpIconSolid className="w-14 mb-2 text-red-600 cursor-pointer px-4 py-2 rounded-lg" />
      ) : (
        <ThumbUpIcon className="w-14 mb-2 text-gray-600 cursor-pointer px-4 py-2 rounded-lg" />
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
        <a href="#!" onClick={() => mutation.mutate(profile._id)}>
          <LikeComponent />
        </a>

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
