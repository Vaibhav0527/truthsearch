import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/signup",
        { fullname, email, password },
        { withCredentials: true }
      );
      console.log(data)
      dispatch(setUserData(data));
      navigate("/");
    } catch (error) {
        console.log(error)
      setErr(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/google-auth",
        {
          fullname: result.user.displayName,
          email: result.user.email
        },
        { withCredentials: true }
      );

      dispatch(setUserData(data));
      navigate("/");
    } catch (error) {
      setErr(error?.response?.data?.message || "Google auth failed");
    }
  };

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Full Name"
        value={fullname}
        onChange={(e) => setFullName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      

      <div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </div>

      <button onClick={handleSignUp} disabled={loading}>
        {loading ? <ClipLoader size={20} /> : "Sign Up"}
      </button>

      {err && <p style={{ color: "red" }}>{err}</p>}

      <button onClick={handleGoogleAuth}>
        <FcGoogle /> Sign Up with Google
      </button>
    </div>
  );
};

export default SignUp;
