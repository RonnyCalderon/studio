'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { Flame, ShieldCheck, Trophy } from "lucide-react";

interface Stats {
    completed: number;
    streak: number; // For simplicity, streak is just total completed.
}

interface Preferences {
    public: boolean;
    toys: boolean;
    intense: boolean;
}

export default function ProfilePage() {
    const [stats, setStats] = useState<Stats>({ completed: 0, streak: 0 });
    const [preferences, setPreferences] = useState<Preferences>({
        public: true,
        toys: true,
        intense: true,
    });

    useEffect(() => {
        const storedHistory = localStorage.getItem('challengeHistory');
        if (storedHistory) {
            const history = JSON.parse(storedHistory);
            setStats({ completed: history.length, streak: history.length });
        }

        const storedPrefs = localStorage.getItem('comfortPreferences');
        if (storedPrefs) {
            setPreferences(JSON.parse(storedPrefs));
        }
    }, []);

    const handlePreferenceChange = (key: keyof Preferences, value: boolean) => {
        const newPrefs = { ...preferences, [key]: value };
        setPreferences(newPrefs);
        localStorage.setItem('comfortPreferences', JSON.stringify(newPrefs));
    };

    return (
        <div className="container mx-auto py-8 space-y-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">Profile & Preferences</h1>
            
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Challenges Completed</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.completed}</div>
                        <p className="text-xs text-muted-foreground">Total challenges conquered together</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Passion Streak</CardTitle>
                        <Flame className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.streak}</div>
                         <p className="text-xs text-muted-foreground">Weeks of continuous connection</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2">
                        <ShieldCheck /> Comfort Zone
                    </CardTitle>
                    <CardDescription>
                        Adjust these settings to tailor future challenges. (This is a demo feature)
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="public-switch" className="text-base">Public Places</Label>
                            <p className="text-sm text-muted-foreground">Challenges that might happen outside the home.</p>
                        </div>
                        <Switch id="public-switch" checked={preferences.public} onCheckedChange={(v) => handlePreferenceChange('public', v)} />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="toys-switch" className="text-base">Use of Toys</Label>
                            <p className="text-sm text-muted-foreground">Challenges involving sex toys.</p>
                        </div>
                        <Switch id="toys-switch" checked={preferences.toys} onCheckedChange={(v) => handlePreferenceChange('toys', v)} />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                            <Label htmlFor="intense-switch" className="text-base">High Intensity</Label>
                            <p className="text-sm text-muted-foreground">More adventurous or demanding challenges.</p>
                        </div>
                        <Switch id="intense-switch" checked={preferences.intense} onCheckedChange={(v) => handlePreferenceChange('intense', v)} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
