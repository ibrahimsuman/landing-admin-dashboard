import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, type Control, type FieldPath } from "react-hook-form";
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
                <SignupFormField
                    name="email"
                    label="Email"
                    placeholder="Enter email"
                    inputType="email"
                    formControl={form.control}
                />
                <SignupFormField
                    name="password"
                    label="Password"
                    placeholder="Enter password"
                    inputType="password"
                    formControl={form.control}
                />

                <Button type="submit" className="w-full cursor-pointer mt-4">
                    Sign In
                </Button>
            </form>
        </Form>
    );
};

interface SignupFormFieldProps {
    name: FieldPath<z.infer<typeof formSchema>>;
    label: string;
    placeholder: string;
    inputType?: string;
    formControl: Control<z.infer<typeof formSchema>>;
}

const SignupFormField: React.FC<SignupFormFieldProps> = ({
    name,
    label,
    placeholder,
    inputType = "text",
    formControl,
}) => {
    return (
        <FormField
            control={formControl}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} type={inputType} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default SignupForm;
