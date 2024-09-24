import axios from "../../../core/http-config";
import cogoToast from "cogo-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/user-slice";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async (formData) => {
    try {
      const response = await axios.post("users/login", formData);
      const user = response.data.user;
      const token = response.data.token;
      dispatch(
        setUser({
          ...user,
          token,
        }),
      );
      navigate("/admin/products");
    } catch (error) {
      if (!error.response.data.status) {
        cogoToast.error(error.response.data.message, { position: "top-right" });
      }
    }
  };
  return {
    login,
  };
};

export default useLogin;
