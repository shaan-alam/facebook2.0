import Button from "../Button";
import Moment from "react-moment";
import Skeleton from "react-loading-skeleton";

interface Props {
  details:
    | {
        lives_in_city: string;
        from_city: string;
        works: string[];
        education: string[];
      }
    | undefined;
  followers: number | undefined;
  following: number | undefined;
  createdAt: string | undefined;
}

type IntroCardType = ({
  details,
  followers,
  following,
  createdAt,
}: Props) => JSX.Element;

const IntroCard: IntroCardType = ({
  details,
  followers,
  following,
  createdAt,
}) => {
  return (
    <div className="intro-cardm bg-white p-5 rounded-lg shadow-md mb-4 stikcy top-4">
      <h1 className="font-bold text-3xl mb-5">Intro</h1>
      {typeof followers === "number" && followers > 0 && (
        <p className="mb-4">
          Followed by <b>{followers} People</b>
        </p>
      )}
      {!details && <Skeleton count={5} height={30} />}
      {typeof following === "number" && following > 0 && (
        <p className="mb-4">
          Following <b>{following} People</b>
        </p>
      )}
      {details?.lives_in_city && (
        <p className="mb-4">
          Lives in <b>{details.lives_in_city}</b>
        </p>
      )}
      {details?.from_city && (
        <p className="mb-4">
          From <b>{details.from_city}</b>
        </p>
      )}
      {details?.works && (
        <p className="mb-4">
          Works at <b>{details.works[0]}</b>
        </p>
      )}
      {details?.works && (
        <p className="mb-4">
          Went to <b>{details.education[0]}</b>
        </p>
      )}
      <p className="mb-4">
        Joined&nbsp;
        <Moment format="MMM YYYY">{new Date(createdAt!)}</Moment>
      </p>
      <Button variant="secondary" text="Edit Intro" className="font-bold p-2" />
    </div>
  );
};

export default IntroCard;
