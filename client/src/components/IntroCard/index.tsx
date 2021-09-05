import Button from "../Button";
import Moment from "react-moment";

interface Props {
  details:
    | {
        lives_in_city: string;
        from_city: string;
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
      {typeof following === "number" && following > 0 && (
        <p className="mb-4">
          Following <b>{following} People</b>
        </p>
      )}
      {details?.lives_in_city && (
        <p className="mb-4">
          Lives in <b>Basti, Uttar Pradesh</b>
        </p>
      )}
      {details?.from_city && (
        <p className="mb-4">
          From <b>Basti, Uttar Pradesh</b>
        </p>
      )}
      <p className="mb-4">
        Joined{" "}
        <Moment format="MMM YYYY">{new Date(createdAt!)}</Moment>
      </p>
      <Button variant="secondary" text="Edit Intro" className="font-bold p-2" />
    </div>
  );
};

export default IntroCard;
