import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Lock, Mail, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onAddHelper: () => void;
}

export const LoginForm = ({ onAddHelper }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Login Successful",
      description: "Welcome to Cyber Essentials Portal",
    });
  };

  return (
    <Card className="w-full max-w-md shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
      <CardHeader className="space-y-6 pb-6">
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-cyber-navy">InfoSec</h2>
            <p className="text-sm text-muted-foreground">Governance Ltd</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-cyber-blue">Cyber Essentials</h2>
            <p className="text-sm text-muted-foreground">Portal</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center pb-2">
          <h3 className="text-xl font-semibold text-foreground mb-1">
            Adding Helpers to the Cyber Essentials Portal
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-11 bg-background border-input focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-11 bg-background border-input focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold bg-cyber-navy hover:bg-cyber-navy/90 text-primary-foreground"
          >
            LOG IN
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={onAddHelper}
          className="w-full h-12 text-base font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <UserPlus className="mr-2 h-5 w-5" />
          Add Helper
        </Button>
      </CardContent>
    </Card>
  );
};
