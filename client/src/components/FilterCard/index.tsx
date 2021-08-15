import "../../assets/css/cssgram.css";

const FilterCard = ({
  src,
  filter,
  selected,
  setSelectedFilter,
}: {
  src: string | ArrayBuffer;
  filter: { name: string; label: string };
  selected: boolean;
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<{ label: string; name: string }>
  >;
}) => {
  return (
    <li
      className={`flex cursor-pointer flex-col mr-2 hover:text-black ${
        selected ? "text-black font-semibold" : "text-gray-500"
      }`}
      onClick={() => setSelectedFilter(filter)}
    >
      <span className="text-center w-full">{filter.label}</span>
      <img
        src={src as string}
        alt={filter.name}
        style={{ maxWidth: "100px" }}
        className={`w-48 object-scale-down ${filter.name}`}
      />
    </li>
  );
};

export default FilterCard;
