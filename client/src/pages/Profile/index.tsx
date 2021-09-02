const Profile = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center h-1/2">
        <div className="relative w-full h-96 justify-center items-end">
          <img
            src="https://scontent.fknu1-2.fna.fbcdn.net/v/t1.6435-9/p720x720/48426632_764502247253446_6953128864801357824_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=e3f864&_nc_ohc=cKPvwQiherwAX-DAUdu&_nc_ht=scontent.fknu1-2.fna&oh=c4e877ca013e2934a768f4f42c93aafa&oe=6154ED41"
            alt="Cover Cicture"
            className="w-full h-full object-cover rounded-b-lg"
          />
          <img
            src="https://scontent.fknu1-2.fna.fbcdn.net/v/t1.6435-1/c0.33.200.200a/p200x200/79597679_1011806192523049_5924937106005688320_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=4B1NusLw04gAX8v_MgO&tn=PvADey7lODyy414G&_nc_ht=scontent.fknu1-2.fna&oh=f8273c580f9b2558b216f90752192678&oe=6157F5CB"
            alt="Profile Picture"
            className="border-4 border-white rounded-full absolute -bottom-3 left-1/2 right-1/2 transform -translate-x-1/2"
          />
        </div>
        <div className="w-full text-center">
          <h1 className="font-bold text-4xl mt-4">Shaan Alam</h1>
          <a href="#!" className="text-fb font-bold mt-4 inline-block">
            Add Bio
          </a>
        </div>
        <div
          className="bg-gray-200 w-full mt-4"
          style={{ height: "2px" }}
        ></div>
        <div className="nav-menu w-full">
          <ul className="flex">
            <li className="text-fb font-semibold text-lg mr-6 border-b-4 p-4 border-fb">Posts</li>
            <li className="text-gray-400 font-semibold text-lg mr-6 p-4">About</li>
            <li className="text-gray-400 font-semibold text-lg mr-6 p-4">Friends</li>
            <li className="text-gray-400 font-semibold text-lg mr-6 p-4">Photos</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
