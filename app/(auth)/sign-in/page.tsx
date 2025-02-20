"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { signInSchema, signInFormType } from "../../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/app/components/form/Input";
import { Button } from "@headlessui/react";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const SignInPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<signInFormType>({
        resolver: zodResolver(signInSchema),
        mode: "onBlur",
        defaultValues: {
            email: "test@myreaa.com",
            password: "test",
        },
    });
    const onSubmit: SubmitHandler<signInFormType> = async (data) => {
        const signInData = await signIn("credentials", {
            redirect: false,
            ...data,
        });
        if (signInData?.error) {
            toast.error(signInData.error);
        } else {
            router.push("/");
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
                    Sign In
                </h4>

                <div className="mt-6 flex flex-col gap-3 text-center">
                    <form className="space-y-6">
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
                            Sign In
                        </Button>
                        {/* <Button
              className="btn btn-sm text-sky-500"
              onClick={() => signIn("google")}
            >
              Google
            </Button> */}
                        <div>
                            <span> No account? </span>
                            <Link className="link text-sky-500" href="/sign-up">
                                Sign Up
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
