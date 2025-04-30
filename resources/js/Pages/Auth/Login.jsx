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
        <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 sm:p-6 md:p-8">
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="w-full max-w-md"
            >
                <div className="mb-8 flex flex-col items-center">
                    <img
                        src="/favicon.ico"
                        alt="Logo"
                        className="h-12 w-12 mb-4"
                    />
                    <h1 className="text-3xl font-light tracking-tight text-gray-900">
                        Welcome back
                    </h1>
                    <p className="mt-2 text-center text-sm text-gray-500 font-light tracking-wide">
                        BORROWED BUT NEVER FORGOTTEN
                    </p>
                </div>

                {status && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 rounded-md bg-green-50 p-4 text-sm font-medium text-green-600"
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
                    className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm"
                >
                    <form onSubmit={submit}>
                        <motion.div variants={fadeIn} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="email" value="Email" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.email}
                                    className="mt-2"
                                />
                            </div>

                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <InputLabel
                                        htmlFor="password"
                                        value="Password"
                                    />
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-xs font-medium text-gray-600 hover:text-gray-900 transition-colors"
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
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />

                                <InputError
                                    message={errors.password}
                                    className="mt-2"
                                />
                            </div>

                            <div className="block">
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
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Remember me
                                    </span>
                                </label>
                            </div>

                            <div className="flex flex-col space-y-4">
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-md bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50"
                                >
                                    {processing ? "Logging in..." : "Log in"}
                                </motion.button>

                                <div className="text-center">
                                    <Link
                                        href={route("register")}
                                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                                    >
                                        Need an account? Register
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    );
}
