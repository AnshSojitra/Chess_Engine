import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import LandingScreen from './components/LandingScreen';
import WelcomeScreen from './components/WelcomeScreen';
import ExperienceScreen from './components/ExperienceScreen';
import SignUpScreen from './components/SignUpScreen';
import SignInScreen from './components/SignInScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import DashboardScreen from './components/DashboardScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [previousScreen, setPreviousScreen] = useState(1);
  const [userExperience, setUserExperience] = useState(null);

  // Supabase Auth State
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  // Fetch profile row from public.profiles table
  const fetchProfile = async (userId) => {
    if (!userId) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (!error && data) {
        setProfile(data);
      }
    } catch (err) {
      console.warn('Could not fetch user profile:', err);
    }
  };

  useEffect(() => {
    // 1. Initial session check on app load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
        setCurrentScreen(7); // Authenticated Dashboard Screen
      }
      setLoadingSession(false);
    });

    // 2. Auth state listener for sign in / sign out / token refreshes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchProfile(session.user.id);
        setCurrentScreen(7); // Directly navigate to Dashboard
      } else {
        setProfile(null);
      }
      setLoadingSession(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleStartJourney = () => {
    setCurrentScreen(2);
  };

  const handleOpenSignIn = (fromScreen = 1) => {
    setPreviousScreen(fromScreen);
    setCurrentScreen(5);
  };

  const handleSignUp = () => {
    setCurrentScreen(3);
  };

  const handleSelectExperience = (level) => {
    setUserExperience(level);
    setCurrentScreen(4);
  };

  const handleSkipExperience = () => {
    setUserExperience('Skip');
    setCurrentScreen(4);
  };

  const handleSubmitSignUpSuccess = ({ user, session }) => {
    if (session) {
      setSession(session);
      setUser(user);
      fetchProfile(user.id);
      setCurrentScreen(7);
    } else {
      alert('Account created! Please check your email if confirmation is required, or sign in.');
      setCurrentScreen(5);
    }
  };

  const handleSignInSuccess = ({ user, session }) => {
    setSession(session);
    setUser(user);
    if (user?.id) {
      fetchProfile(user.id);
    }
    setCurrentScreen(7);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error('Logout Error:', err);
    } finally {
      setSession(null);
      setUser(null);
      setProfile(null);
      setCurrentScreen(1); // Return to Landing Screen
    }
  };

  // Prevent flash of landing page while initial session check is running
  if (loadingSession) {
    return (
      <div style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            border: '3px solid rgba(255,255,255,0.1)',
            borderTopColor: '#FFFFFF',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', minHeight: '100vh', minHeight: '100dvh', overflowX: 'hidden' }}>
      {/* Screen 1: Landing Page */}
      {currentScreen === 1 && !session && (
        <LandingScreen 
          onStartJourney={handleStartJourney}
          onSignIn={() => handleOpenSignIn(1)}
        />
      )}

      {/* Screen 2: Welcome Page */}
      {currentScreen === 2 && !session && (
        <WelcomeScreen 
          onSignUp={handleSignUp}
          onSignIn={() => handleOpenSignIn(2)}
          onBack={() => setCurrentScreen(1)}
        />
      )}

      {/* Screen 3: Choose Your Experience Page */}
      {currentScreen === 3 && !session && (
        <ExperienceScreen 
          onSelectExperience={handleSelectExperience}
          onSkip={handleSkipExperience}
          onBack={() => setCurrentScreen(2)}
        />
      )}

      {/* Screen 4: Sign Up Page */}
      {currentScreen === 4 && !session && (
        <SignUpScreen 
          onBack={() => setCurrentScreen(3)}
          onSignIn={() => handleOpenSignIn(4)}
          onSubmitSignUp={handleSubmitSignUpSuccess}
          selectedExperience={userExperience}
        />
      )}

      {/* Screen 5: Sign In Page */}
      {currentScreen === 5 && !session && (
        <SignInScreen 
          onBack={() => setCurrentScreen(previousScreen)}
          onGoToSignUp={() => setCurrentScreen(3)}
          onForgotPassword={() => setCurrentScreen(6)}
          onSignInSuccess={handleSignInSuccess}
        />
      )}

      {/* Screen 6: Forgot Password Page */}
      {currentScreen === 6 && !session && (
        <ForgotPasswordScreen 
          onGoToSignIn={() => setCurrentScreen(5)}
        />
      )}

      {/* Screen 7: Authenticated Dashboard View */}
      {(currentScreen === 7 || session) && (
        <DashboardScreen 
          user={user}
          profile={profile}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
