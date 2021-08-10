const FilterCard = ({
  src,
  filter,
  selected,
  setSelectedFilter,
}: {
  src: string | ArrayBuffer;
  filter: { name: string; filter: string };
  selected: boolean;
  setSelectedFilter: React.Dispatch<
    React.SetStateAction<{ name: string; filter: string }>
  >;
}) => {
  return (
    <li
      className={`flex cursor-pointer flex-col mr-1 hover:text-black ${
        selected ? "text-black" : "text-gray-500"
      }`}
      onClick={() => setSelectedFilter(filter)}
    >
      <span className="text-center w-full">{filter.name}</span>
      <img
        src={src as string}
        alt={filter.name}
        style={{ filter: filter.filter }}
        className="w-48"
      />
    </li>
  );
};

export default FilterCard;