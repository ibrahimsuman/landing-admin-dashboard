import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignupForm from "./SignupForm"
import { cn } from "@/lib/utils"

export function Login({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col  mx-auto h-screen items-center justify-center", className)} {...props}>
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Login to Admin Account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>


         <SignupForm></SignupForm> 


        </CardContent>
      </Card>
    </div>
  )
}
