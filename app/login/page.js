"use client";

import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { auth, provider } from "../config";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });

    const handlesubmit = () => {
        signInWithEmailAndPassword(auth, loginInfo.email, loginInfo.password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) {
                    alert("User has been logged in successfully");
                    router.replace("/dashboard");
                }
            })
            .catch(() => {
                alert("Provide a correct email or password");
            });
    };

    const handlesubmitGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                console.log(user, token);
                router.replace("/dashboard")
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[rgb(31,27,36)] shadow-2xl">
            <div className="w-full max-w-md rounded-2xl bg-[rgb(31,27,36)] shadow-2xl px-6 py-8">

                <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-sm text-white/60 mb-6">
                    Don't have an account?{" "}
                    <Link href="/signup" className="underline text-white/90">
                        Sign up
                    </Link>
                </p>

                <div className="space-y-4">
                    <input
                        value={loginInfo.email}
                        onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
                        placeholder="Email"
                        className="w-full px-4 py-3 rounded-lg bg-[#332f37] border border-[#3b3640] placeholder-white/40 text-white focus:outline-none"
                    />

                    <div className="relative">
                        <input
                            value={loginInfo.password}
                            onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                            placeholder="Enter your password"
                            type={showPassword ? "text" : "password"}
                            className="w-full px-4 py-3 rounded-lg bg-[#332f37] border border-[#3b3640] placeholder-white/40 text-white focus:outline-none"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 p-1"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>

                    <button
                        onClick={handlesubmit}
                        className="w-full mt-2 rounded-lg bg-gray-800 hover:bg-gray-700 py-3 text-white font-semibold shadow-md transition-colors"
                    >
                        Log In
                    </button>

                    <div className="flex items-center gap-3 mt-4">
                        <div className="flex-1 h-px bg-white/10"></div>
                        <div className="text-white/50 text-sm">Or continue with</div>
                        <div className="flex-1 h-px bg-white/10"></div>
                    </div>

                    <button
                        onClick={handlesubmitGoogle}
                        className="w-full flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-transparent px-4 py-3 text-white"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
                        Google
                    </button>
                </div>
            </div>
        </div>
    );
}
