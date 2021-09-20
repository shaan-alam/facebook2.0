import { Link } from "react-router-dom";
import { PostType } from "../../components/Post/types";

interface Props {
  photo: PostType;
}

const PhotoThumbnail = ({ photo }: Props) => {
  return (
    <Link to={`/post/${photo._id}`}>
      <div className="photo-thumbnail">
        <img
          src={photo?.thumbnailURL}
          alt={photo?.caption}
          className="hover:opacity-95"
        />
      </div>
    </Link>
  );
};

export default PhotoThumbnail;
