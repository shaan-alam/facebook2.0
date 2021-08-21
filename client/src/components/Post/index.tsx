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
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchComments, createComment } from "../../api";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "../Button";
import loader from "../../assets/svg/loader-dark.svg";

const Post = ({ post }: { post: PostType }) => {
  const queryClient = useQueryClient();
  const [offset, setOffset] = useState(3); // How much comments to fetch each time....
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

  // This function will be called by the refetch() function
  // This function will fetch +5 more comments when clicked on the View more button
  const fetchMoreComments = async () => {
    try {
      const result = await fetchComments(post._id, offset);

      setOffset(offset + 5);

      return result.data;
    } catch (err) {
      console.log(err);
    }
  };

  // Quering for comments. refetch() will call for fetchMoreComments() to fetch +5 more comments.
  // For ex => (View more button clicked) => refetch() => fetchMoreComments()
  const { data, refetch, isLoading } = useQuery<Comment[]>(
    "comments",
    fetchMoreComments
  );

  // const mutation = useMutation(
  //   "createComment",
  //   (comment: any) => createComment(post._id, comment),
  //   {
  //     onMutate: async (variables) => {
  //       await queryClient.cancelQueries("comments");

  //       const newComment = {
  //         _id: Math.random(),
  //         postId: post._id,
  //         message: variables.message,
  //         author: {
  //           _id: user._id,
  //           fullName: user.fullName,
  //           avatar: user.avatar,
  //         },
  //       };

  //       queryClient.setQueryData("comments", (oldComments) => [
  //         newComment,
  //         ...(oldComments as Array<Comment>),
  //       ]);

  //       return { newComment };
  //     },
  //     onSuccess: (result) => {
  //       queryClient.setQueryData("comments", (oldComments) => [
  //         result.data.comment,
  //         ...(oldComments as Array<Comment>),
  //       ]);
  //     },
  //   }
  // );

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

      // try {
      //   const { data } = await mutation.mutateAsync(newComment);
      //   setSubmitting(false);
      //   // setComments([data.comment, ...comments]);
      //   formik.resetForm();
      // } catch (err) {
      //   console.log(err);
      // }
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
      <PostStats counters={counters} comments={(data ? data : []).length} />
      <PostActions
        commentBox={commentBox}
        post={post}
        setCounters={setCounters}
      />
      <div className="comments">
        {!isLoading &&
          (data ? data : []).map((comment: Comment) => (
            <PostComment key={comment._id} comment={comment} />
          ))}
        {post.commentCount > (data ? data : []).length ? (
          <span
            className="text-gray-600 cursor-pointer hover:underline"
            onClick={() => refetch()}
          >
            View More
          </span>
        ) : null}
        {isLoading && (
          <span className="flex items-center justify-center h-12 w-full my-4">
            <img src={loader} />
          </span>
        )}
      </div>
      <div className="add-comment flex items-center">
        <Avatar src={user?.avatar} className="h-7 w-7 rounded-full mt-3 mr-2" />
        <form onSubmit={formik.handleSubmit} className="w-full">
          <div className="w-full rounded-full mt-3 bg-gray-100 flex justify-between">
            <input
              ref={commentBox}
              type="text"
              className="w-full p-2 rounded-full outline-none bg-gray-100"
              placeholder="Comment..."
              {...formik.getFieldProps("comment")}
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
    </div>
  );
};

export default Post;
