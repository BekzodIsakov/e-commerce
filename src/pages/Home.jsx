import Aside from "../components/aside/Aside";
import Main from "../components/main/Main";

export default function Home({
  selectedBrand,
  setSelectedBrand,
  selectedColor,
  setSelectedColor,
  sortBy,
}) {
  return (
    <div className='main-wrapper'>
      <Aside
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />
      <Main
        sortBy={sortBy}
        selectedBrand={selectedBrand}
        selectedColor={selectedColor}
      />
    </div>
  );
}
