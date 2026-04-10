import FormField from "../Forms/FormField";

function AddEntityForm({
  handleSubmit,
  editEntityId,
  handleCancle,
  entity,
  formDataFields,
  formDataButtons,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-(--bg-pop) p-6 rounded-lg w-[90%] max-w-md">
        <FormField
          header={`${editEntityId ? "Update" : "Add"}`}
          fields={formDataFields(editEntityId, entity)}
          onSubmit={handleSubmit}
          buttons={formDataButtons(handleCancle, editEntityId)}
        />
      </div>
    </div>
  );
}

export default AddEntityForm;
