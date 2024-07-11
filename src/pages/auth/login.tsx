import { useState } from "react";
import MainLayout from "../../layouts/main-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/button";

import { loginSchema, LoginSchema } from "../../utils/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userLogin } from "../../utils/apis/auth/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/contexts/token";

const Login = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { setToken, addNotification } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    console.log("Form submitted with data:", data);
    try {
      const response = await userLogin(data);
      console.log("Response received:", response);
      setServerError(null);
      setToken(response.payload.token);
      addNotification(response.message, "success");
      navigate('/');
    } catch (error: any) {
      console.log("Error occurred:", error);
      addNotification(error.message, "error");
      setServerError(error.message);
    }
  }

  return (
    <MainLayout>
      <div className="flex justify-center">
        <Card className="w-full md:w-3/4 lg:w-1/2 my-8">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to your account using email</CardDescription>
            {serverError && (
              <CardDescription className="text-red-600">
                {serverError}
              </CardDescription>
            )}
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className="w-full"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Password"
                    className="w-full"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid gap-6">
              <Button type="submit" variant="default">
                Login
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>
              <Link
                to="/register"
                className="h-10 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                Register
              </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Login;
