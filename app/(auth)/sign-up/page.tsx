"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpFormType, signUpSchema } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/app/components/form/Input";
import { Button } from "@headlessui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUpPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<signUpFormType>({
        resolver: zodResolver(signUpSchema),
        mode: "onBlur",
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });
    const onSubmit: SubmitHandler<signUpFormType> = async (data) => {
        const response = await fetch("/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        if (response.ok) {
            toast.success(res.message);
            router.push("/sign-in");
        } else {
            toast.error(res.message);
        }
    };
    return (
        <div className="flex min-h-screen flex-row items-center justify-center bg-gray-100 p-6">
            <div className="flex w-7/12 flex-col gap-2 px-6 text-center">
                <h1 className="text-3xl font-bold text-sky-500">
                    Welcome to <br /> Myreaa
                </h1>
                <p className="text-lg font-semibold">
                    An application to help you manage your real estate assets.
                </p>
            </div>

            <div className="w-5/12 rounded-lg bg-white p-6 shadow-lg">
                <h4 className="mb-4 text-center text-xl font-semibold text-sky-500">
                    Sign Up
                </h4>

                <div className="mt-6 flex flex-col gap-3 text-center">
                    <form className="space-y-6">
                        <Input
                            name="firstName"
                            label="First Name"
                            type="text"
                            register={register}
                            errors={errors}
                        />
                        <Input
                            name="lastName"
                            label="Last Name"
                            type="text"
                            register={register}
                            errors={errors}
                        />
                        <Input
                            name="email"
                            label="Email"
                            type="text"
                            register={register}
                            errors={errors}
                        />
                        <Input
                            name="password"
                            label="Password"
                            type="password"
                            register={register}
                            errors={errors}
                        />
                        <Button
                            className="btn btn-success btn-sm text-white"
                            onClick={handleSubmit(onSubmit)}
                        >
                            Create Account
                        </Button>
                        <div>
                            <span>Already have an account? </span>
                            <Link className="link text-sky-500" href="/sign-in">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
