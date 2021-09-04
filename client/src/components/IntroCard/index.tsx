import Button from "../Button";

const IntroCard = () => {
  return (
    <div className="intro-cardm bg-white p-5 rounded-lg shadow-md mb-4 stikcy top-4">
      <h1 className="font-bold text-3xl mb-5">Intro</h1>
      <p className="mb-4">
        Followed by <b>54 People</b>
      </p>
      <p className="mb-4">
        Following <b>54 People</b>
      </p>
      <p className="mb-4">
        Lives in <b>Basti, Uttar Pradesh</b>
      </p>
      <p className="mb-4">
        From <b>Basti, Uttar Pradesh</b>
      </p>
      <p className="mb-4">Joined December 2015</p>
      <Button variant="secondary" text="Edit Intro" className="font-bold p-2" />
    </div>
  );
};

export default IntroCard;
