import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

const NewPost = () => {
  const user = useSelector((state: RootState) => state.auth.authData.user);

  return (
    <>
      <div className="bg-white shadow-sm p-4 my-3 rounded-lg">
        <div className="flex bg-white items-center">
          <img
            src="https://avatars.githubusercontent.com/u/48273777?v=4"
            alt="Shaan Alam"
            className="mr-2 h-8 w-8 rounded-full object-cover hover:ring-2 hover:ring-blue-700"
          />
          <p className="text-fb font-semibold">{user.fullName}</p>
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
    </>
  );
};

export default NewPost;
