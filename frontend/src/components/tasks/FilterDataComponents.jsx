import { useEffect, useState } from "react";
import { buttonInputTypes } from "../../utils/schema";
import InputField from "../Forms/InputField";
import Button from "../Button";

function FilterDataComponents({ data = [], setData, component = [] }) {
  const initalData = Object.fromEntries(
    component.map((dataset) => [dataset.name, dataset.value || ""]),
  );

  const [filterData, setFilterData] = useState(initalData);

  useEffect(() => {
    const filtered = data.filter((item) => {
      return Object.keys(filterData).every((key) => {
        if (!filterData[key]) return true;
        return item[key] === filterData[key];
      });
    });
    setData(filtered);
  }, [filterData]);

  const handleChange = (name, value) => {
    setFilterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFilterData(initalData);
    setData(data);
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
      <div className="">
        <Button className="w-full" onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
}

export default FilterDataComponents;
