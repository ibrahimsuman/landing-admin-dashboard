import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserStore } from "@/store/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";

function Login() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user !== null) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  if (user !== null) {
    // optionally return null or a loader while redirecting
    return null;
  }
  return (
    <div className="flex flex-col mx-auto h-screen items-center justify-center" >
      <Card className="max-w-lg w-full hover:shadow-[0_0_12px_4px_theme(colors.purple.500/30%)]">
        <CardHeader>
          <CardTitle className="text-secondary">Login to Admin Account</CardTitle>
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

export default Login