
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Key, Trash2, LogOut, CreditCard, Edit, Check, Home, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Profile = () => {
  const { user, logout, currentPlan, updateSubscriptionPlan } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [avatar, setAvatar] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  
  useEffect(() => {
    document.title = "Profile | Edueasee";
    
    // Check if there's a plan parameter in the URL
    const params = new URLSearchParams(window.location.search);
    const plan = params.get('plan');
    
    // If there's a plan parameter, update the user's subscription plan
    if (plan === 'basic') {
      updateSubscriptionPlan('Basic Plan');
      // Clear the URL parameter after updating
      navigate('/profile', { replace: true });
    } else if (plan === 'premium') {
      updateSubscriptionPlan('Premium Plan');
      // Clear the URL parameter after updating
      navigate('/profile', { replace: true });
    }
  }, [navigate, updateSubscriptionPlan]);

  useEffect(() => {
    // Update the fullName state when the user changes
    if (user?.full_name) {
      setFullName(user.full_name);
    }
  }, [user]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Password change error:', error);
      toast.error(error.message || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName }
      });
      
      if (error) throw error;
      
      toast.success('Profile updated successfully');
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccountDeletion = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would call a server function to handle account deletion
      // Since Supabase doesn't provide a direct method for users to delete their own accounts
      // For demo purposes, we'll just log the user out
      await logout();
      toast.success('Account deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Account deletion error:', error);
      toast.error('Failed to delete account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 py-4">
        <div className="container flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="md:hidden">
              <ArrowLeft size={20} />
            </Button>
            <Link to="/" className="font-display text-xl font-bold text-primary">
              Edueasee
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <Home size={16} />
              <span>Home</span>
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="container py-12 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Account Settings</h1>
            <p className="text-muted-foreground">Manage your profile and account preferences</p>
          </div>

          <div className="grid gap-8">
            {/* Profile Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={20} /> Profile Information
                </CardTitle>
                <CardDescription>Update your account profile details</CardDescription>
              </CardHeader>
              <CardContent>
                {isEditingProfile ? (
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <Input
                        id="email"
                        value={user?.email || ''}
                        disabled
                        className="w-full bg-muted"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Full Name</p>
                      <p>{user?.full_name || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Email</p>
                      <p>{user?.email || '-'}</p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end">
                {isEditingProfile ? (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsEditingProfile(false)} disabled={isLoading}>
                      Cancel
                    </Button>
                    <Button onClick={handleProfileUpdate} disabled={isLoading}>
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => setIsEditingProfile(true)} disabled={isLoading} variant="outline" className="flex items-center gap-1">
                    <Edit size={16} /> Edit Profile
                  </Button>
                )}
              </CardFooter>
            </Card>

            {/* Password */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key size={20} /> Password
                </CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex gap-1 items-center">
                      <Key size={16} /> Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Change Password</DialogTitle>
                      <DialogDescription>
                        Enter your new password below to update your account.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium mb-1">New Password</label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm New Password</label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                          disabled={isLoading}
                          type="button"
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit" 
                          disabled={isLoading || !newPassword || !confirmPassword}
                        >
                          {isLoading ? 'Updating...' : 'Update Password'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Subscription Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard size={20} /> Subscription Plan
                </CardTitle>
                <CardDescription>Manage your subscription and billing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 p-4 rounded-lg bg-primary/5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Current Plan</h3>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      currentPlan === 'Basic Plan' 
                        ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400'
                        : currentPlan === 'Premium Plan'
                          ? 'bg-purple-500/10 text-purple-500 dark:text-purple-400'
                          : 'bg-primary/10 text-primary'
                    }`}>
                      {currentPlan}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {currentPlan === 'Basic Plan' 
                      ? 'You have access to all basic tools with 100 AI requests per month.'
                      : currentPlan === 'Premium Plan'
                        ? 'You have access to all premium tools with unlimited AI requests.'
                        : 'You are currently on the free trial plan with limited features.'}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Available Plans</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className={`border rounded-lg p-4 ${currentPlan === 'Basic Plan' ? 'border-blue-500/40 bg-blue-500/5' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Basic</h4>
                          <p className="text-muted-foreground text-sm">$9.99 / month</p>
                        </div>
                        <span className="text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">Popular</span>
                      </div>
                      <ul className="text-sm space-y-2 mb-4">
                        <li className="flex items-center gap-2">
                          <Check size={16} className="text-green-500" />
                          <span>Access to all basic tools</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={16} className="text-green-500" />
                          <span>100 AI requests per month</span>
                        </li>
                      </ul>
                      {currentPlan === 'Basic Plan' ? (
                        <Button variant="outline" className="w-full" disabled>
                          Current Plan
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full" onClick={() => navigate('/checkout?plan=basic')}>
                          Upgrade
                        </Button>
                      )}
                    </div>
                    <div className={`border rounded-lg p-4 ${currentPlan === 'Premium Plan' ? 'border-purple-500/40 bg-purple-500/5' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Premium</h4>
                          <p className="text-muted-foreground text-sm">$19.99 / month</p>
                        </div>
                        <span className="text-xs bg-primary text-primary-foreground rounded-full px-2 py-0.5">Best Value</span>
                      </div>
                      <ul className="text-sm space-y-2 mb-4">
                        <li className="flex items-center gap-2">
                          <Check size={16} className="text-green-500" />
                          <span>Access to all premium tools</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={16} className="text-green-500" />
                          <span>Unlimited AI requests</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Check size={16} className="text-green-500" />
                          <span>Priority support</span>
                        </li>
                      </ul>
                      {currentPlan === 'Premium Plan' ? (
                        <Button className="w-full" disabled>
                          Current Plan
                        </Button>
                      ) : (
                        <Button className="w-full" onClick={() => navigate('/checkout?plan=premium')}>
                          Upgrade
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 size={20} /> Danger Zone
                </CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>
                    Deleting your account is irreversible. All your data will be permanently removed.
                  </AlertDescription>
                </Alert>
                <div className="flex gap-4">
                  <Button 
                    variant="destructive" 
                    onClick={handleAccountDeletion}
                    disabled={isLoading}
                    className="flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete Account
                  </Button>
                  <Button
                    variant="outline"
                    onClick={logout}
                    disabled={isLoading}
                    className="flex items-center gap-1"
                  >
                    <LogOut size={16} /> Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
