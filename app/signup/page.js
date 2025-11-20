"use client";

import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useContext, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, provider } from "../config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UsersContexts } from "../usercontext";

export default function SignupUp() {
  const {users,setUsers}=useContext(UsersContexts)
  console.log(users,"ye usercontext Api hai")
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); 

  const [userInformation, setUserInformation] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const cloudName = "dwwwdxicz";
  const presetName = "frontend";

  const Spinner = () => (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  );

  // Upload image
  const uploadImage = async () => {
    if (!image) return null;

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", presetName);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return null;
    }
  };

  // MAIN SIGNUP SUBMIT
  const handleSubmit = async () => {
    setLoading(true); 

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        userInformation.email,
        userInformation.password
      );

      const imageUrl = await uploadImage();

      await addDoc(collection(db, "users"), {
        uid: userCred.user.uid,
        firstname: userInformation.firstname,
        lastname: userInformation.lastname,
        email: userInformation.email,
        profileImage: imageUrl || "",
      });
      router.replace("/dashboard");

      setUsers({
        uid:userCred.user.uid,
        firstname:userInformation.firstname,
        lastname:userInformation.lastname,
        email:userInformation.email,
        userprofile:imageUrl  || ""
      })

    } catch (error) {
      console.log("Signup error:", error);
    } finally {
      setLoading(false); 
    }
  };

  const handleSubmitGoogle = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      await addDoc(collection(db, "users"), {
        uid: user.uid,
        firstname: user.displayName?.split(" ")[0] || "",
        lastname: user.displayName?.split(" ")[1] || "",
        email: user.email,
        profileImage: user.photoURL,
      });

      router.replace("/dashboard");
    } catch (err) {
      console.log("Google Signin Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(31,27,36)] shadow-2xl">
      <div className="w-full max-w-md rounded-2xl bg-[rgb(31,27,36)] shadow-2xl px-6 py-8">
        <h2 className="text-4xl font-bold text-white mb-2">Create an account</h2>
        <p className="text-sm text-white/60 mb-6">
          Already have an account?{" "}
          <Link href="/login" className="underline text-white/90">Login</Link>
        </p>

        <div className="space-y-4">

          <div className="grid grid-cols-2 gap-3">
            <input
              value={userInformation.firstname}
              onChange={(e) => setUserInformation({ ...userInformation, firstname: e.target.value })}
              placeholder="First name"
              className="px-4 py-3 rounded-lg bg-[#332F37] border border-[#3B3640] placeholder-white/40 text-white"
            />
            <input
              value={userInformation.lastname}
              onChange={(e) => setUserInformation({ ...userInformation, lastname: e.target.value })}
              placeholder="Last name"
              className="px-4 py-3 rounded-lg bg-[#332F37] border border-[#3B3640] placeholder-white/40 text-white"
            />
          </div>

          <input
            value={userInformation.email}
            onChange={(e) => setUserInformation({ ...userInformation, email: e.target.value })}
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-[#332F37] border border-[#3B3640] text-white"
          />

          <div className="relative">
            <input
              value={userInformation.password}
              onChange={(e) => setUserInformation({ ...userInformation, password: e.target.value })}
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              className="w-full px-4 py-3 rounded-lg bg-[#332F37] border border-[#3B3640] text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <div>
            <label className="block text-white/60 mb-1">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-3 rounded-lg bg-[#332F37] border border-[#3B3640] text-white"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full mt-2 rounded-lg py-3 text-white font-semibold shadow-md transition-colors 
              ${loading ? "bg-gray-700 cursor-not-allowed" : "bg-gray-800 hover:bg-gray-700"}`}
          >
            {loading ? <Spinner /> : "Create account"}
          </button>

          <div className="flex items-center gap-3 mt-4">
            <div className="flex-1 h-px bg-white/10"></div>
            <div className="text-white/50 text-sm">Or register with</div>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <button
            onClick={handleSubmitGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-transparent px-4 py-3 text-white"
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
                Google
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
