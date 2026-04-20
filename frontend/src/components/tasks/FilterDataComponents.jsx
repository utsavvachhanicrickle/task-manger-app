import { useEffect, useState } from "react";
import { buttonInputTypes } from "../../utils/schema";
import InputField from "../Forms/InputField";
import Button from "../Button";

function FilterDataComponents({ setData, component = [] }) {
  const initialData = Object.fromEntries(
    component.map((dataset) => [dataset.name, dataset.value || ""]),
  );

  const [filterData, setFilterData] = useState(initialData);

  useEffect(() => {
    setData(filterData);
  }, [filterData]);

  const handleChange = (name, value) => {
    setFilterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFilterData(initialData);
  };

  return (
    <div className="grid md:flex gap-4">
      <div className="grid md:flex gap-3 rounded-lg shadow">
        {component.map((subcomponent, index) => (
          <InputField
            key={index}
            type={buttonInputTypes.SELECT}
            name={subcomponent.name}
            value={filterData[subcomponent.name] || ""}
            onChange={handleChange}
            placeholder={subcomponent.placeholder}
            options={subcomponent.options}
          />
        ))}
      </div>

      <div>
        <Button className="w-full" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default FilterDataComponents;
