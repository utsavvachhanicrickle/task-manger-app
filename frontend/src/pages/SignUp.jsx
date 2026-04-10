import FormField from "../components/Forms/FormField";
import { signup } from "../presenters/authPresenters";
import { authFields } from "../utils/constants/authFields";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    await signup(formData, { navigate });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg)">
      <FormField
        header="Sign Up"
        fields={authFields.signupFields}
        buttons={authFields.signUpButtons}
        onSubmit={handleSubmit}
        footer={authFields.signUpFooter(navigate)}
      />
    </div>
  );
}

export default SignUp;
