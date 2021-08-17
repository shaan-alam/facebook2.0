import Skeleton from "react-loading-skeleton";

const SkeletonPost = () => {
  return (
    <div className="post mb-3 p-4 bg-white shadow-sm w-full mx-auto rounded-lg">
      <div className="flex items-center bg-white mb-3 pt-4">
        <Skeleton style={{ borderRadius: "100%" }} height={30} width={30} />
        <Skeleton style={{ marginLeft: "20px" }} height={30} width={100} />
      </div>
      <Skeleton height={400} />
      <Skeleton count={1} />
    </div>
  );
};

export default SkeletonPost;
