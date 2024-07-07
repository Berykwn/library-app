import Layout from "../../layouts/main-layout";
import { Button } from "../../components/ui/button";
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

const Login = () => {
  return (
    <Layout centerX centerY>
      <Card className="w-full md:w-3/4 lg:w-1/2">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account using email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="w-full"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid gap-6">
          <Button type="submit">Login</Button>
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
          <Button
            data-testid="btn-navigate-register"
            variant="secondary"
            type="submit"
          >
            Register
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  );
};

export default Login;
