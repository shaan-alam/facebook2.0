import {
  DotsHorizontalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";

const PostDropdown = () => {
  return (
    <Menu as="div" className="relative inline-block z-10">
      <Menu.Button>
        <DotsHorizontalIcon className="h-10 w-10 p-2 rounded-full hover:bg-gray-100 cursor-pointer text-gray-500" />
      </Menu.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-50 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform  scale-100 opacity-100"
        leaveTo="transform scale-50 opacity-0"
      >
        <Menu.Items className="border-2 absolute right-0 z-10 bg-white rounded-lg shadow-2xl p-1 w-72">
          <div className="border-b p-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`flex justify-start items-center ${
                    active && "bg-gray-300 rounded-lg"
                  } p-2 ${
                    active ? "text-white" : "text-gray-700 "
                  } hover:bg-gray-300 hover:text-gray-700`}
                  href="#!"
                >
                  <BookmarkIcon className="h-5 w-5" />
                  &nbsp; Save Post
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
                  } p-2 ${
                    active ? "text-white" : "text-gray-700 "
                  } hover:bg-gray-300 hover:text-gray-700`}
                  href="#!"
                >
                  <EyeIcon className="h-5 w-5" />
                  &nbsp; View Post
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
                  } p-2 ${
                    active ? "text-white" : "text-gray-700 "
                  } hover:bg-gray-300 hover:text-gray-700`}
                  href="#!"
                >
                  <PencilIcon className="h-5 w-5" />
                  &nbsp; Edit Post
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
                  } p-2 ${
                    active ? "text-white" : "text-gray-700 "
                  } hover:bg-gray-300 hover:text-gray-700`}
                  href="#!"
                >
                  <TrashIcon className="h-5 w-5" />
                  &nbsp; Delete Post
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default PostDropdown;
