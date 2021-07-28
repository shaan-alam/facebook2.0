import { useEffect } from "react";
import { Grid, Container, Message } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../reducers/index";
import Post from "../../components/Post";
import { getPosts } from "../../actions/posts";

import { clearError } from "../../actions/error";

// Interfaces and Types
import { PostContainerProps } from "./types";
import { ChatAltIcon, ThumbUpIcon } from "@heroicons/react/solid";

const Feed = ({ setIsOpen, setCurrentID }: PostContainerProps) => {
  const posts = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(clearError());
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto flex">
        <div className="hidden md:block md:w-1/4 mr-4 p-4 my-3 bg-white shadow-sm rounded-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
          nam sint necessitatibus magnam! Iure dolore voluptatum ex fugiat fugit
          voluptatem.
        </div>
        <div className="wall lg:mr-4 w-full md:w-full">
          <div className="bg-white shadow-sm p-4 my-3 rounded-lg">
            <div className="flex bg-white items-center">
              <img
                src="https://avatars.githubusercontent.com/u/48273777?v=4"
                alt="Shaan Alam"
                className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
              />
              <p className="text-fb font-semibold">Shaan Alam</p>
            </div>
            <div className="border-box">
              <textarea
                className="box-border bg-white border-2 rounded-lg mt-3 p-3 outline-none focus:ring-2 focus:ring-blue-300 w-full h-36"
                placeholder="What's on your mind?"
              ></textarea>
              <button className="block rounded-lg px-6 py-2 bg-fb hover:bg-blue-600 text-white mt-3 focus:ring-2 focus:ring-blue-400">
                Post
              </button>
            </div>
          </div>
          <div className="my-4 bg-white rounded-lg p-4">
            <div className="flex items-center bg-white">
              <img
                src="https://avatars.githubusercontent.com/u/48273777?v=4"
                alt="Shaan Alam"
                className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
              />
              <p className="text-fb font-semibold">Shaan Alam</p>
            </div>
            <div className="post">
              <img
                src="https://avatars.githubusercontent.com/u/48273777?v=4"
                className="my-3 w-full rounded-lg"
              />
              <div className="post-actions flex ">
                <ThumbUpIcon className="w-14 text-gray-400 cursor-pointer px-4 py-2 hover:bg-blue-50 rounded-lg" />
                <ChatAltIcon className="w-14 text-gray-400 cursor-pointer px-4 py-2 hover:bg-blue-50 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block static top-0 lg:w-1/3">
          <div className="sticky top-4 right-persons bg-white p-4 my-3 shadow-sm rounded-lg">
            <h4 className="text-fb font-semibold">People you may know!</h4>
            <div className="person my-4">
              <div className="my-3 flex items-center">
                <img
                  src="https://avatars.githubusercontent.com/u/48273777?v=4"
                  alt="Shaan Alam"
                  className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
                />
                <p className="hidden sm:block">Shaan Alam</p>
              </div>
              <button className="bg-fb focus:ring-2 focus:ring-blue-400 hover:bg-blue-600 text-white px-3 py-2 rounded-lg outline-none">
                Add Friend
              </button>
              <button className="bg-gray-200 ml-3 hover:bg-gray-300 text-black px-3 py-2 rounded-lg outline-none">
                Remove
              </button>
            </div>
            <div className="person my-4">
              <div className="my-3 flex items-center">
                <img
                  src="https://avatars.githubusercontent.com/u/48273777?v=4"
                  alt="Shaan Alam"
                  className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
                />
                <p className="hidden sm:block">Shaan Alam</p>
              </div>
              <button className="bg-fb hover:bg-blue-600 text-white px-3 py-2 rounded-lg outline-none">
                Add Friend
              </button>
              <button className="bg-gray-200 ml-3 hover:bg-gray-300 text-black px-3 py-2 rounded-lg outline-none">
                Remove
              </button>
            </div>
            <div className="person my-4">
              <div className="my-3 flex items-center">
                <img
                  src="https://avatars.githubusercontent.com/u/48273777?v=4"
                  alt="Shaan Alam"
                  className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
                />
                <p className="hidden sm:block">Shaan Alam</p>
              </div>
              <button className="bg-fb hover:bg-blue-600 text-white px-3 py-2 rounded-lg outline-none">
                Add Friend
              </button>
              <button className="bg-gray-200 ml-3 hover:bg-gray-300 text-black px-3 py-2 rounded-lg outline-none">
                Remove
              </button>
            </div>
            <div className="person my-4">
              <div className="my-3 flex items-center">
                <img
                  src="https://avatars.githubusercontent.com/u/48273777?v=4"
                  alt="Shaan Alam"
                  className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
                />
                <p className="hidden sm:block">Shaan Alam</p>
              </div>
              <button className="bg-fb hover:bg-blue-600 text-white px-3 py-2 rounded-lg outline-none">
                Add Friend
              </button>
              <button className="bg-gray-200 ml-3 hover:bg-gray-300 text-black px-3 py-2 rounded-lg outline-none">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
