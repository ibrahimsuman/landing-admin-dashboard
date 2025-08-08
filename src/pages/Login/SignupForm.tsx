import useAxiosPublic from "@/API-axios/axiosPublic";
import ECInputField from "@/components/module/Form/ECInputField";
import { Button } from "@/components/ui/button";
import {
    Form,
} from "@/components/ui/form";
import { useUserStore } from "@/store/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from 'js-cookie';
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignupForm = () => {
    const axiosPublic = useAxiosPublic()
    const {setUser, user} = useUserStore()
    // const setUser = useUserStore((state)=>state.setUser)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "admin.test@gmail.com",
            password: "password123",
        },
    });
console.log(user)
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const data = {
            email: values.email,
            password: values.password
        }
        try {
            const response  = await axiosPublic.post(`/auth/login-admin`, data, { withCredentials: true })
            const token = response.data.data.token;
            setUser(response.data.data)
            Cookies.set('accessToken', token, { expires: 7, secure: true, sameSite: 'Strict' });

        } catch (error: any) {
            console.log(error.message || "Login fail")
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <ECInputField
                    name="email"
                    title="Email"
                    placeholder=""
                    inputType="email"
                    control={form.control}
                />
                <ECInputField
                    name="password"
                    title="Enter password"
                    placeholder=""
                    inputType="password"
                    control={form.control}
                />
                <Button type="submit" className="w-full cursor-pointer mt-4">
                    Sign In
                </Button>
            </form>
        </Form>
    );
};


export default SignupForm;
