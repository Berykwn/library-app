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

import { registerSchema, RegisterSchema } from "../../utils/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userRegister } from "../../utils/apis/auth/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/contexts/token";

const Register = () => {
  const { addNotification } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      repassword: "",
      address: "",
      phone_number: "",
    },
  });

  async function onSubmit(data: RegisterSchema) {
    console.log("Form submitted with data:", data);
    try {
      const response = await userRegister(data);
      console.log("Response received:", response);
      setServerError(null);
      addNotification(response.message, "success");
      navigate('/login')
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
            <CardTitle>Register</CardTitle>
            <CardDescription>Register for a new account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    type="text"
                    placeholder="Full Name"
                    className="w-full"
                    {...register("full_name")}
                  />
                  {errors.full_name && (
                    <p className="text-red-500 text-sm">
                      {errors.full_name.message}
                    </p>
                  )}
                </div>
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
                <div>
                  <Label htmlFor="repassword">Confirm Password</Label>
                  <Input
                    id="repassword"
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full"
                    {...register("repassword")}
                  />
                  {errors.repassword && (
                    <p className="text-red-500 text-sm">
                      {errors.repassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Address"
                    className="w-full"
                    {...register("address")}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    type="text"
                    placeholder="Phone Number"
                    className="w-full"
                    {...register("phone_number")}
                  />
                  {errors.phone_number && (
                    <p className="text-red-500 text-sm">
                      {errors.phone_number.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="grid gap-6">
              <Button type="submit" variant="default">
                Register
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
              {serverError && (
                <p className="text-red-500 text-sm">{serverError}</p>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Register;
