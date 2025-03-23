import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MapPin, Calendar, Edit, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
  location: z.string().optional(),
  website: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  name: "Algo Crew",
  email: "algo.crew@example.com",
  bio: "I love creating and reading interactive stories.",
  location: "Pune, India",
  website: "https://example.com",
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    // In a real app, this would update the user profile in the backend
    console.log(data);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto py-10 px-4 max-w-5xl"
    >
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="stories">My Stories</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-8">
          <Card>
            <CardHeader className="relative">
              {/* Profile Header Background */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 to-secondary/30 rounded-t-lg" />

              <div className="relative z-10 flex items-end space-x-4 pt-16">
                <Avatar className="h-24 w-24 border-4 border-background">
                  <AvatarImage src="https://i.pravatar.cc/300" />
                  <AvatarFallback className="text-xl">JD</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold">
                    {form.watch("name")}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    @johndoe
                  </CardDescription>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="self-start mt-4"
                >
                  {isEditing ? (
                    <Save className="mr-2 h-4 w-4" />
                  ) : (
                    <Edit className="mr-2 h-4 w-4" />
                  )}
                  {isEditing ? "Save" : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              {isEditing ? (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Tell us about yourself"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Write a short bio about yourself. Max 160
                            characters.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Your location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="https://example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex justify-end space-x-4">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Save Changes</Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Name</p>
                        <p className="text-sm text-muted-foreground">
                          {form.watch("name")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground">
                          {form.watch("email")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm text-muted-foreground">
                          {form.watch("location") || "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Joined</p>
                        <p className="text-sm text-muted-foreground">
                          January 2023
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="text-sm font-medium mb-2">About</h3>
                    <p className="text-sm text-muted-foreground">
                      {form.watch("bio")}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
              <CardDescription>
                Your recent activity on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <p className="text-sm">Created "The Lost Kingdom" story</p>
                  <span className="ml-auto text-xs text-muted-foreground">
                    2 days ago
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <p className="text-sm">Updated profile information</p>
                  <span className="ml-auto text-xs text-muted-foreground">
                    1 week ago
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <p className="text-sm">Joined the platform</p>
                  <span className="ml-auto text-xs text-muted-foreground">
                    Jan 15, 2023
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Manage your account preferences and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Input id="language" value="English" readOnly />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="stories">
          <Card>
            <CardHeader>
              <CardTitle>My Stories</CardTitle>
              <CardDescription>
                Stories you've created or contributed to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">The Lost Kingdom</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    A fantasy adventure about a hidden kingdom beyond the
                    mountains.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">
                      Created: May 20, 2023
                    </span>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Mystery at Midnight</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    A detective story set in a small town with a big secret.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-muted-foreground">
                      Created: April 12, 2023
                    </span>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create New Story</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
