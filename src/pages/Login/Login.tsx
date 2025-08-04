import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import SignupForm from "./SignupForm"

export function Login() {
  return (
    <div className="flex flex-col  mx-auto h-screen items-center justify-center" >
      <Card className="max-w-lg w-full">
        <CardHeader>
          <CardTitle>Login to Admin Account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent> 
         <SignupForm /> 
        </CardContent>
      </Card>
    </div>
  )
}
