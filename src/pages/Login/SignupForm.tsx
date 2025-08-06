import ECInputField from "@/components/module/Form/ECInputField";
import { Button } from "@/components/ui/button";
import {
    Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const SignupForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => { 
        console.log(values)
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
