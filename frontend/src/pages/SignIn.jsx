import { signin } from "../presenters/authPresenters";
import FormField from "../components/Forms/FormField";
import { authFields } from "../utils/constants/authFields";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const { setAuthData } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (formData) => {
    await signin(formData, { setAuthData, navigate });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg)">
      <FormField
        header="Sign In"
        fields={authFields.signInFields}
        buttons={authFields.signInButtons}
        onSubmit={handleSubmit}
        footer={authFields.signInFooter(navigate)}
      />
    </div>
  );
}

export default SignIn;
