import { useState } from "react";
import { Comment } from "../types";
import Skeleton from "react-loading-skeleton";
import { Menu, Transition } from "@headlessui/react";
import User from "../../../assets/svg/user.svg";
import {
  DotsHorizontalIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/outline";

const PostComment = ({
  comment: { message, author },
}: {
  comment: Comment;
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [menu, setMenu] = useState(false);

  

  return (
    <div className="comment flex items-center justify-start my-4">
      {!isLoaded && (
        <Skeleton style={{ borderRadius: "100%" }} height={30} width={30} />
      )}
      <img
        style={{ display: !isLoaded ? "none" : "block" }}
        src={author.avatar ? author.avatar : User}
        alt={author.fullName}
        className="h-7 w-7 rounded-full mr-4"
        onLoad={() => setLoaded(true)}
      />
      {!isLoaded && <Skeleton count={1} />}
      {isLoaded && (
        <div
          className="comment-box flex items-center"
          onMouseOver={() => setMenu(true)}
          onMouseLeave={() => setMenu(false)}
        >
          <div className="py-3 px-5 rounded-2xl bg-gray-200">
            <h1 className="font-semibold">{author.fullName}</h1>
            <p>{message}</p>
          </div>
          {menu && (
            <Menu as="div" className="relative inline-block z-10">
              <Menu.Button>
                <DotsHorizontalIcon className="comment-options-button outline-none ml-3 h-10 w-10 p-2 rounded-full hover:bg-gray-100 cursor-pointer text-gray-500" />
              </Menu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-50 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform  scale-100 opacity-100"
                leaveTo="transform scale-50 opacity-0"
              >
                <Menu.Items className="absolute right-1/2 z-10 bg-white rounded-lg shadow-2xl p-1 w-48 origin-left translate-x-1/2">
                  <div className="border-b p-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`flex justify-start items-center ${
                            active && "bg-gray-300 rounded-lg"
                          } p-1 ${
                            active ? "text-gray-700" : "text-gray-700 "
                          } hover:bg-gray-100 hover:text-gray-700`}
                          href="#!"
                        >
                          <PencilIcon className="h-5 w-5" />
                          &nbsp;Edit Comment
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="p-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`flex justify-start items-center ${
                            active && "bg-gray-300 rounded-lg"
                          } p-1 ${
                            active ? "text-gray-700" : "text-gray-700 "
                          } hover:bg-gray-100 hover:text-gray-700`}
                          href="#!"
                        >
                          <TrashIcon className="h-5 w-5" />
                          &nbsp; Delete Comment
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
      )}
    </div>
  );
};

export default PostComment;
