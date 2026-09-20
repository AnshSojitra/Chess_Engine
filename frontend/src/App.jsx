import React, { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import WelcomeScreen from './components/WelcomeScreen';
import ExperienceScreen from './components/ExperienceScreen';
import SignUpScreen from './components/SignUpScreen';
import SignInScreen from './components/SignInScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [previousScreen, setPreviousScreen] = useState(1);
  const [userExperience, setUserExperience] = useState(null);

  const handleStartJourney = () => {
    setCurrentScreen(2);
  };

  const handleOpenSignIn = (fromScreen = 1) => {
    setPreviousScreen(fromScreen);
    setCurrentScreen(5);
  };

  const handleSignUp = () => {
    // Navigate to Screen 3: Choose Your Experience Page
    setCurrentScreen(3);
  };

  const handleSelectExperience = (level) => {
    setUserExperience(level);
    console.log('Selected Experience Level:', level);
    // Proceed to Screen 4: Sign Up Page
    setCurrentScreen(4);
  };

  const handleSkipExperience = () => {
    console.log('Skipped Experience selection');
    // Proceed to Screen 4: Sign Up Page
    setCurrentScreen(4);
  };

  const handleSubmitSignUp = (userData) => {
    console.log('User Registered:', userData, 'Experience Level:', userExperience);
    alert(`Account created successfully for ${userData.fullName}!`);
  };

  const handleSignInSuccess = () => {
    alert('Welcome back! You have successfully signed in.');
  };

  return (
    <div style={{ width: '100vw', minHeight: '100vh', minHeight: '100dvh', overflowX: 'hidden' }}>
      {currentScreen === 1 && (
        <LandingScreen 
          onStartJourney={handleStartJourney}
          onSignIn={() => handleOpenSignIn(1)}
        />
      )}

      {currentScreen === 2 && (
        <WelcomeScreen 
          onSignUp={handleSignUp}
          onSignIn={() => handleOpenSignIn(2)}
          onBack={() => setCurrentScreen(1)}
        />
      )}

      {currentScreen === 3 && (
        <ExperienceScreen 
          onSelectExperience={handleSelectExperience}
          onSkip={handleSkipExperience}
          onBack={() => setCurrentScreen(2)}
        />
      )}

      {currentScreen === 4 && (
        <SignUpScreen 
          onBack={() => setCurrentScreen(3)}
          onSignIn={() => handleOpenSignIn(4)}
          onSubmitSignUp={handleSubmitSignUp}
        />
      )}

      {currentScreen === 5 && (
        <SignInScreen 
          onBack={() => setCurrentScreen(previousScreen)}
          onGoToSignUp={() => setCurrentScreen(3)}
          onForgotPassword={() => setCurrentScreen(6)}
          onSignInSuccess={handleSignInSuccess}
        />
      )}

      {currentScreen === 6 && (
        <ForgotPasswordScreen 
          onGoToSignIn={() => setCurrentScreen(5)}
        />
      )}
    </div>
  );
}
