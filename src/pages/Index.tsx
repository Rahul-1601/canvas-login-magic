import { LoginForm } from "@/components/LoginForm";
import { useToast } from "@/hooks/use-toast";
import securityBackground from "@/assets/security-background.png";

const Index = () => {
  const { toast } = useToast();

  const handleAddHelper = () => {
    toast({
      title: "Add Helper",
      description: "Helper management feature coming soon",
    });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${securityBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/50 to-background/70 backdrop-blur-[2px]" />
      
      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md">
        <LoginForm onAddHelper={handleAddHelper} />
      </div>
    </div>
  );
};

export default Index;
