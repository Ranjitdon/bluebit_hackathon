
import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Authbar from '@/components/layout/Authbar';
import { BookOpen, Sparkles, User, Mail, Lock, Check } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import AnimatedText from '@/components/ui/AnimatedText';

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Form submitted:", data);
      // Here you would typically handle the signup process with an API
      // For now, we just simulate success and redirect
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setError("An error occurred during sign up. Please try again.");
    }
  };

  // Magical floating elements for the background
  const floatingElements = [
    { id: 1, icon: "✨", x: "10%", y: 50, size: "text-xl", color: "text-yellow-400", delay: 0 },
    { id: 2, icon: "🪄", x: "85%", y: 150, size: "text-2xl", color: "text-purple-500", delay: 0.5 },
    { id: 3, icon: "🧙", x: "25%", y: 250, size: "text-3xl", color: "text-blue-400", delay: 1 },
    { id: 4, icon: "📚", x: "75%", y: 300, size: "text-2xl", color: "text-green-400", delay: 1.5 },
    { id: 5, icon: "🦄", x: "50%", y: 400, size: "text-3xl", color: "text-pink-400", delay: 2 },
    { id: 6, icon: "🔮", x: "15%", y: 450, size: "text-xl", color: "text-indigo-400", delay: 2.5 },
    { id: 7, icon: "🌟", x: "80%", y: 500, size: "text-2xl", color: "text-amber-400", delay: 3 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden relative">
      <Authbar />
      
      {/* Magical floating elements */}
      {floatingElements.map(element => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} ${element.color} opacity-70`}
          style={{ left: element.x, top: element.y }}
          initial={{ y: element.y }}
          animate={{ 
            y: [element.y - 20, element.y + 20],
          }}
          transition={{
            delay: element.delay,
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "reverse" as const,
            ease: "easeInOut"
          }}
        >
          {element.icon}
        </motion.div>
      ))}
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <Card className="bg-white/90 backdrop-blur-lg border-2 border-purple-200 shadow-xl rounded-xl overflow-hidden">
            <CardHeader className="space-y-1 bg-gradient-to-r from-purple-100 to-blue-100 p-6">
              <div className="flex justify-center mb-3">
                <motion.div 
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="bg-primary rounded-full p-3"
                >
                  <BookOpen className="w-7 h-7 text-white" />
                </motion.div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                <AnimatedText text="Join the Adventure!" as="h1" animation="slideUp" />
              </CardTitle>
              <CardDescription className="text-center">
                Create your magical storytelling account
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-8">
              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Wizard Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your wizard name" {...field} />
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
                        <FormLabel className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Magic Mail
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="your@magicmail.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Lock className="w-4 h-4 mr-2" />
                          Secret Spell
                        </FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Your secret spell" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            I agree to the magical <a href="#" className="text-primary underline">terms of adventure</a>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full group" size="lg">
                    <span>Begin Your Journey</span>
                    <Sparkles className="ml-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 bg-gradient-to-r from-purple-50 to-blue-50 p-6 border-t border-purple-100">
              <p className="text-sm text-center text-muted-foreground">
                Already part of our magical world?
              </p>
              <Link to="/signin" className="inline-flex items-center justify-center">
                <Button variant="outline" className="w-full">
                  <span>Sign In with Your Spellbook</span>
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
