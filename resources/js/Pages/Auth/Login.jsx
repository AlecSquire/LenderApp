import { motion } from "framer-motion";
import Checkbox from "@/components/Checkbox";
import InputError from "@/components/InputError";
import InputLabel from "@/components/InputLabel";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const itemFadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 sm:p-6 md:p-8">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="w-full max-w-md"
            >
                <div className="mb-8 flex flex-col items-center">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="rounded-full bg-gray-700 p-3 mb-5 shadow-lg border border-gray-600"
                    >
                        <img
                            src="/favicon.ico"
                            alt="Logo"
                            className="h-12 w-12"
                        />
                    </motion.div>
                    <motion.h1 
                        variants={itemFadeIn}
                        className="text-3xl font-light tracking-tight text-white"
                    >
                        Welcome back
                    </motion.h1>
                    <motion.p 
                        variants={itemFadeIn}
                        className="mt-2 text-center text-sm text-gray-400 font-light tracking-wide uppercase"
                    >
                        Borrowed but never forgotten
                    </motion.p>
                </div>

                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 rounded-md bg-green-900 p-4 text-sm font-medium text-green-300 border border-green-800 shadow-sm"
                    >
                        {status}
                    </motion.div>
                )}

                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                    className="rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-lg"
                >
                    <form onSubmit={submit}>
                        <motion.div variants={fadeIn} className="space-y-6">
                            <motion.div variants={itemFadeIn}>
                                <InputLabel 
                                    htmlFor="email" 
                                    value="Email" 
                                    className="text-gray-300 font-medium"
                                />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-20 transition-all"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2 text-rose-400"
                                />
                            </motion.div>

                            <motion.div variants={itemFadeIn} className="mt-4">
                                <div className="flex items-center justify-between">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                        className="text-gray-300 font-medium"
                                    />
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors hover:underline"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}
                                </div>

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white placeholder-gray-400 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-20 transition-all"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2 text-rose-400"
                                />
                            </motion.div>

                            <motion.div variants={itemFadeIn} className="block">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                        className="rounded bg-gray-700 border-gray-600 text-purple-500 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-20"
                                    />
                                    <span className="ml-2 text-sm text-gray-300">
                                        Remember me
                                    </span>
                                </label>
                            </motion.div>

                            <motion.div variants={itemFadeIn} className="flex flex-col space-y-4">
                                <motion.button
                                    whileHover={{ scale: 1.01, backgroundColor: "#9333ea" }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-md bg-purple-600 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 shadow-md"
                                >
                                    {processing ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Logging in...
                                        </span>
                                    ) : (
                                        "Log in"
                                    )}
                                </motion.button>

                                <div className="text-center">
                                    <Link
                                        href={route("register")}
                                        className="text-sm text-gray-400 hover:text-gray-300 transition-colors hover:underline"
                                    >
                                        Need an account? Register
                                    </Link>
                                </div>
                            </motion.div>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}