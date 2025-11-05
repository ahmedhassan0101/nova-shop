/* eslint-disable @typescript-eslint/no-explicit-any */
// components/profile/PreferencesSettings.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Bell,
  Mail,
  ShoppingBag,
  Package,
  Heart,
  Megaphone,
  Moon,
  Sun,
  Monitor,
  Globe,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from 'next-themes';

interface PreferencesSettingsProps {
  user: any;
  onUpdate: () => void;
}

export default function PreferencesSettings({ user, onUpdate }: PreferencesSettingsProps) {
  const { theme, setTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Notification Preferences
  const [notifications, setNotifications] = useState({
    newsletter: user?.newsletter || false,
    orderUpdates: true,
    promotions: true,
    newArrivals: false,
    priceDrops: false,
    wishlistAlerts: false,
  });

  // Display Preferences
  const [language, setLanguage] = useState(user?.preferredLanguage || 'ar');

  const handleSavePreferences = async () => {
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/user/preferences', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preferredLanguage: language,
          newsletter: notifications.newsletter,
          notificationPreferences: notifications,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update preferences');
      }

      setSuccess('Preferences updated successfully!');
      onUpdate();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Display Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Monitor className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>Customize how the website looks and feels</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Theme</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg hover:bg-accent transition-colors ${
                  theme === 'light' ? 'border-primary bg-primary/5' : 'border-muted'
                }`}
              >
                <Sun className="h-5 w-5" />
                <span className="text-sm font-medium">Light</span>
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg hover:bg-accent transition-colors ${
                  theme === 'dark' ? 'border-primary bg-primary/5' : 'border-muted'
                }`}
              >
                <Moon className="h-5 w-5" />
                <span className="text-sm font-medium">Dark</span>
              </button>
              <button
                onClick={() => setTheme('system')}
                className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg hover:bg-accent transition-colors ${
                  theme === 'system' ? 'border-primary bg-primary/5' : 'border-muted'
                }`}
              >
                <Monitor className="h-5 w-5" />
                <span className="text-sm font-medium">System</span>
              </button>
            </div>
          </div>

          <Separator />

          {/* Language */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Language
            </Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">
                  <div className="flex items-center gap-2">
                    <span>🇪🇬</span>
                    <span>العربية</span>
                  </div>
                </SelectItem>
                <SelectItem value="en">
                  <div className="flex items-center gap-2">
                    <span>🇬🇧</span>
                    <span>English</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              This will change the language of the entire website
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what updates you want to receive</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Order Updates */}
          <div className="flex items-start justify-between p-4 border rounded-lg">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                <Label htmlFor="orderUpdates" className="text-base font-medium cursor-pointer">
                  Order Updates
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Get notified about your order status, shipping, and delivery
              </p>
            </div>
            <Switch
              id="orderUpdates"
              checked={notifications.orderUpdates}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, orderUpdates: checked })
              }
            />
          </div>

          {/* Newsletter */}
          <div className="flex items-start justify-between p-4 border rounded-lg">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <Label htmlFor="newsletter" className="text-base font-medium cursor-pointer">
                  Newsletter
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Weekly newsletter with curated content and tips
              </p>
            </div>
            <Switch
              id="newsletter"
              checked={notifications.newsletter}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, newsletter: checked })
              }
            />
          </div>

          {/* Promotions */}
          <div className="flex items-start justify-between p-4 border rounded-lg">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-primary" />
                <Label htmlFor="promotions" className="text-base font-medium cursor-pointer">
                  Promotions & Offers
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Exclusive deals, discounts, and special offers
              </p>
            </div>
            <Switch
              id="promotions"
              checked={notifications.promotions}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, promotions: checked })
              }
            />
          </div>

          {/* New Arrivals */}
          <div className="flex items-start justify-between p-4 border rounded-lg">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-primary" />
                <Label htmlFor="newArrivals" className="text-base font-medium cursor-pointer">
                  New Arrivals
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Be the first to know about new products
              </p>
            </div>
            <Switch
              id="newArrivals"
              checked={notifications.newArrivals}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, newArrivals: checked })
              }
            />
          </div>

          {/* Price Drops */}
          <div className="flex items-start justify-between p-4 border rounded-lg">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-primary">💰</span>
                <Label htmlFor="priceDrops" className="text-base font-medium cursor-pointer">
                  Price Drops
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Get alerts when prices drop on items you viewed
              </p>
            </div>
            <Switch
              id="priceDrops"
              checked={notifications.priceDrops}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, priceDrops: checked })
              }
            />
          </div>

          {/* Wishlist Alerts */}
          <div className="flex items-start justify-between p-4 border rounded-lg">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                <Label htmlFor="wishlistAlerts" className="text-base font-medium cursor-pointer">
                  Wishlist Alerts
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Notifications about wishlist items back in stock or on sale
              </p>
            </div>
            <Switch
              id="wishlistAlerts"
              checked={notifications.wishlistAlerts}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, wishlistAlerts: checked })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      {success && (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription className="ml-2">{success}</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button onClick={handleSavePreferences} disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Save Preferences
      </Button>
    </div>
  );
}