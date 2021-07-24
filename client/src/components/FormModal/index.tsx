import React, { useState, useEffect } from "react";
import {
  Button,
  Header,
  Icon,
  Modal,
  Message,
  Progress,
} from "semantic-ui-react";
import { Form } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers/index";
import { storage } from "../../firebase";
import { createPost, editPost } from "../../actions/posts";
import { ToastContainer, toast, Flip } from "react-toastify";

// Interfaces and types
import { IProps, PostType } from "./types";

const FormModal = ({
  isOpen,
  setOpen,
  currentID,
  setCurrentID,
}: IProps): JSX.Element => {
  const post = useSelector((state: RootState) =>
    currentID ? state?.posts?.find((post) => post._id == currentID) : null
  );
  const currentUser = useSelector(
    (state: RootState) => (state.auth as any).authData.profileObj
  );

  const dispatch = useDispatch();

  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string>();
  const [postData, setPostData] = useState<PostType>({
    file: null,
    title: "",
    description: "",
    tags: [],
    imgURL: "",
    creator: "",
  });

  useEffect(() => {
    const clear = setTimeout(() => {
      setError("");
    }, 3000);

    return () => clearTimeout(clear);
  }, [error]);

  useEffect(() => {
    if (currentID) {
      setPostData({
        title: post?.title as string,
        description: post?.description as string,
        tags: post?.tags as string[],
        creator: post?.creator ? post.creator : "",
      });
    }
  }, [currentID]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) =>
    setPostData({ ...postData, [e.currentTarget.name]: e.currentTarget.value });

  const uploadAndCreatePost = () => {
    const allowedTypes: string[] = ["jpeg", "png", "jpg"];

    if (!allowedTypes.includes(postData.file.name.split(".")[1])) {
      return setError("Please include a JPG, JPEG, or a PNG File.");
    }

    const storageRef = storage.ref().child(postData.file.name);

    const uploadTask = storageRef.put(postData.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },

      (err) => {
        console.log(err);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url: string) => {
          const newPost = {
            ...postData,
            imgURL: url,
          };

          dispatch(createPost(newPost, currentUser._id));
          clear();
        });
      }
    );
  };

  const editAndUploadPost = () => {
    const { title, description, tags } = postData;
    const newPost = { title, description, tags };

    dispatch(editPost(currentID, newPost));
    toast.success("Your post has been saved successfully!!", {
      position: toast.POSITION.TOP_RIGHT,
      transition: Flip,
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentID) {
      editAndUploadPost();
    } else {
      uploadAndCreatePost();
    }
  };

  const clear = () =>
    setPostData({
      file: {},
      title: "",
      description: "",
      tags: [],
      imgURL: "",
      creator: "",
    });

  return (
    <>
      <Modal
        closeIcon
        open={isOpen}
        onClose={() => {
          setOpen(false);
          setCurrentID("");
        }}
        onOpen={() => setOpen(true)}
      >
        <Header icon="plus" content="Add a new post" />
        <Modal.Content>
          {error && (
            <Message negative>
              <Message.Header>{error}</Message.Header>
            </Message>
          )}
          {progress && (
            <Progress percent={Math.floor(progress)} success>
              {progress < 100
                ? `Uploading ${Math.floor(progress)}%`
                : "Done Uploading!!"}
            </Progress>
          )}
          {successMsg && (
            <Message positive>
              <Message.Header>Success!</Message.Header>
              <p>{successMsg}</p>
            </Message>
          )}
          <Form onSubmit={handleFormSubmit}>
            {!currentID && (
              <Form.Field>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPostData({
                      ...postData,
                      file: e.currentTarget.files
                        ? e.currentTarget.files[0]
                        : {},
                    })
                  }
                />
              </Form.Field>
            )}
            <Form.Field>
              <label>Post Title</label>
              <input
                type="text"
                name="title"
                placeholder="Post Title"
                value={postData.title}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Post description</label>
              <textarea
                name="description"
                cols={30}
                rows={10}
                value={postData.description}
                onChange={handleChange}
              ></textarea>
            </Form.Field>
            <Form.Field>
              <label>Post Tags</label>
              <input
                type="text"
                name="tags"
                placeholder="Post tags separated with commas"
                value={postData.tags}
                onChange={handleChange}
              />
            </Form.Field>

            <Modal.Actions>
              <Button color="red" onClick={() => setOpen(false)}>
                <Icon name="remove" /> Cancel
              </Button>
              <Button color="green">
                <Icon name="checkmark" /> Submit
              </Button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default FormModal;
