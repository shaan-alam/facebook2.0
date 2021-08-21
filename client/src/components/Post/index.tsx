import { useState, useRef } from "react";
import { PostType } from "./types";
import PostActions from "./PostActions";
import PostStats from "./PostStats";
import Avatar from "../Avatar";
import PostImage from "./PostImage";
import PostCaption from "./PostCaption";
import { Counters } from "./PostActions/types";
import PostDropdown from "./PostDropdown";
import useUser from "../../hooks/useUser";
import PostComment from "./PostComment";
import { Comment } from "./types";
import { useQuery, useMutation } from "react-query";
import { fetchComments, createComment } from "../../api";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../Button";
import EmojiPicker from "../EmojiPicker";

const Post = ({ post }: { post: PostType }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [offset, setOffset] = useState(3);
  const [counters, setCounters] = useState<Counters[]>(
    post?.reactions?.reactions.map(
      ({ emoji, by: { _id, fullName, avatar } }) => ({
        emoji,
        by: {
          userID: _id,
          fullName,
          avatar,
        },
      })
    )
  );

  // CommentBox Ref to focus on the comment Box when clicked on the comment icon
  const commentBox = useRef<HTMLInputElement>(null);
  const user = useUser();

  // This function will be called once the component is mounted
  // and every time the "View more" button is clicked to fetch +5 more comments
  const fetchMoreComments = async () => {
    try {
      const { data } = await fetchComments(post._id, offset);

      setOffset(offset + 5);

      setComments(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Quering for comments. refetch() will call for fetchMoreComments() to fetch +5 more comments.
  // For ex => (View more button clicked) => refetch() => fetchMoreComments()
  const { refetch } = useQuery(["comments", post._id], fetchMoreComments);

  const mutation = useMutation(
    "createComment",
    (comment: any) => createComment(post._id, comment),
    {
      onSuccess: async (result) => {
        setComments([result.data.comment, ...comments]);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: yup.object({
      comment: yup.string().required(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const newComment = {
        message: values.comment,
        author: user._id,
      };

      try {
        await mutation.mutateAsync(newComment);
        setSubmitting(false);
        formik.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="post mb-3 p-4 bg-white shadow-sm w-full mx-auto rounded-lg">
      <div className="flex items-center justify-between bg-white mb-3 pt-4">
        <Avatar
          src={post?.author?.avatar}
          className="h-7 w-7 rounded-full"
          name={post?.author?.fullName}
          withName
        />
        <PostDropdown post={post} />
      </div>
      <PostImage
        image={post?.imageURL}
        caption={post?.caption}
        filter={post?.filter}
      />
      <PostCaption caption={post?.caption} />
      <PostStats counters={counters} comments={comments.length} />
      <PostActions
        commentBox={commentBox}
        post={post}
        setCounters={setCounters}
      />
      <div className="add-comment flex items-center">
        <Avatar src={user?.avatar} className="h-7 w-7 rounded-full mt-3 mr-2" />
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="w-full rounded-full mt-3 bg-gray-100 flex items-center justify-between">
            <input
              ref={commentBox}
              type="text"
              className="w-full p-2 rounded-full outline-none bg-gray-100"
              placeholder="Comment..."
              {...formik.getFieldProps("comment")}
            />
            <EmojiPicker
              onEmojiSelect={(emoji: string) =>
                formik.setFieldValue(
                  "comment",
                  `${formik.values.comment} ${emoji}`
                )
              }
            />
            <Button
              type="submit"
              text="POST"
              isLoading={formik.isSubmitting}
              className="py-2 px-3 rounded-full flex-shrink text-fb font-semibold hover:bg-gray-200"
            />
          </div>
        </form>
      </div>
      <div className="comments">
        {comments.map((comment) => (
          <PostComment key={comment._id} comment={comment} />
        ))}
      </div>
      {post.commentCount > comments.length ? (
        <span
          className="text-gray-600 cursor-pointer hover:underline flex items-center"
          onClick={() => refetch()}
        >
          View More
        </span>
      ) : null}
    </div>
  );
};

export default Post;
