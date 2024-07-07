import Layout from "../../layouts/main-layout";
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
// import { Button } from "../../components/ui/button";

const Register = () => {
  return (
    <Layout centerX centerY>
      <Card className="w-full md:w-3/4 lg:w-1/2">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Register your account now to get full access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John doe"
                className="w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@example.com"
                className="w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="*******"
                className="w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Retype Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="*******"
                className="w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                type="text"
                placeholder="abbey road"
                className="w-full"
                required
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber">Phone number</Label>
              <Input
                id="phoneNumber"
                type="text"
                placeholder="628xxxxxxxx"
                className="w-full"
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="grid gap-6">
          <Button type="submit" variant="default">Register</Button>
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
          <Button variant="secondary" type="submit">
            Login
          </Button>
        </CardFooter>
      </Card>
    </Layout>
  );
};

export default Register;
