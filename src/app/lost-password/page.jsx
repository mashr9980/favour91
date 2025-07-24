"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-lg shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-center">
              Lost Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-gray-600">
              Please enter your username or email address. You will receive a
              link to create a new password via email.
            </p>
            <div className="space-y-2">
              <Label htmlFor="username-email">
                Username or Email Address{" "}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="username-email"
                placeholder="Enter your username or email"
                type="text"
                required
              />
            </div>
            <motion.button
              className="w-fit rounded-md bg-primary px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
            >
              Get New Password
            </motion.button>
          </CardContent>
          <CardFooter className="flex justify-center pt-4">
            <Link
              href="/login" // You might want to link this back to your login page
              className="text-sm text-primary hover:underline"
            >
              Log In
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
