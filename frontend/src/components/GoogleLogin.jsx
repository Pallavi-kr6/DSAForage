import React from "react";
import { GoogleLogin as GoogleButton } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (response) => {
    try {
      const idToken = response.credential;

      const res = await fetch("http://localhost:5000/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        navigate("/home");
      } else {
        alert("Login failed. Try again.");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong.");
    }
  };

  return (
    <GoogleButton
      onSuccess={handleGoogleSuccess}
      onError={() => alert("Google Sign In Failed")}
    />
  );
};

export default GoogleLogin;
