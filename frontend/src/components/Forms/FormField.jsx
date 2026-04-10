import { useState } from "react";
import InputField from "./InputField";
import Button from "../Button";
import { buttonInputTypes } from "../../utils/schema";

function FormField({ header = {}, fields, onSubmit, buttons, footer = {} }) {
  const initalData = Object.fromEntries(
    fields.map((field) => [
      field.name,
      field.type === buttonInputTypes.CHECKBOX_GROUP
        ? field.value || []
        : field.value || "",
    ]),
  );
  const [formData, setFormData] = useState(initalData);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData(initalData);
  };

  const handleChange = (name, value, type = buttonInputTypes.TEXT) => {
    setFormData((prev) => {
      if (type === buttonInputTypes.CHECKBOX_GROUP) {
        const current = prev[name] || [];
        return {
          ...prev,
          [name]: current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value],
        };
      } else if (type === buttonInputTypes.DATETIME_LOCAL) {
        return { ...prev, [name]: new Date(value).toISOString() };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-(--bg-card) shadow-lg text-(--text-primary) rounded-xl p-6 w-[90%] max-w-md"
    >
      <h2 className="text-2xl font-bold text-center mb-5">{header}</h2>
      {fields.map((field) => (
        <InputField
          key={field.name}
          type={field.type || buttonInputTypes.TEXT}
          name={field.name}
          value={formData[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
          required={field.required || false}
          options={field.options}
        />
      ))}

      <div className="flex gap-2 mt-4">
        {buttons.map((button, index) => (
          <Button
            key={index}
            type={button.type}
            variant={button.variant}
            className={`w-full ${button.className}`}
            onClick={() => {
              if (button.type === buttonInputTypes.SUBMIT) return;
              if (button.type === buttonInputTypes.RESET)
                return button.onChange?.(handleReset, formData);
              button.onClick();
            }}
          >
            {button.label}
          </Button>
        ))}
      </div>

      <p className="text-sm text-center mt-4">
        {footer.message}{" "}
        <span
          className="text-(--primary) cursor-pointer"
          onClick={footer.onClick}
        >
          {footer.spanText}
        </span>
      </p>
    </form>
  );
}

export default FormField;
