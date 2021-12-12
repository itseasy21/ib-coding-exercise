import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const login = async (username, password) => {
    return await axios
      .post(API_URL + "/api/login", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.username) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };
  
  const logout = () => {
    localStorage.removeItem("user");
  };

    
  export default {
    login,
    logout,
  };