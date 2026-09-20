import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Trophy, User, Zap, Play } from 'lucide-react';
import Header from './Header';

export default function DashboardScreen({ user, profile, onLogout }) {
  const name = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Player';
  const skill = profile?.skill_level || user?.user_metadata?.skill_level || 'Not Specified';
  const rating = profile?.rating || 1200;

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      backgroundColor: '#050505',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      fontFamily: 'Inter, system-ui, sans-serif'
    }}>
      <Header />

      <main style={{
        flex: 1,
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        zIndex: 2
      }}>
        {/* Top Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(16px)',
            borderRadius: '20px',
            padding: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem'
          }}
        >
          <div>
            <span style={{ fontSize: '0.85rem', letterSpacing: '2px', color: 'rgba(255, 255, 255, 0.5)', textTransform: 'uppercase', fontWeight: 600 }}>
              DASHBOARD
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0.2rem 0 0.5rem 0' }}>
              Welcome back, {name}!
            </h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', margin: 0, fontSize: '0.95rem' }}>
              Logged in as <span style={{ color: '#FFFFFF', fontWeight: 600 }}>{user?.email}</span>
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#ef4444',
              padding: '0.75rem 1.25rem',
              borderRadius: '12px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </motion.button>
        </motion.div>

        {/* 3 Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          {/* Card 1: Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem'
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: 'rgba(234, 179, 8, 0.15)',
              color: '#eab308',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Trophy size={26} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600, letterSpacing: '1px' }}>CHESS RATING</span>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0.2rem 0 0 0' }}>{rating} ELO</h3>
            </div>
          </motion.div>

          {/* Card 2: Skill Level */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem'
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: 'rgba(59, 130, 246, 0.15)',
              color: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={26} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600, letterSpacing: '1px' }}>EXPERIENCE LEVEL</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0.2rem 0 0 0' }}>{skill}</h3>
            </div>
          </motion.div>

          {/* Card 3: Account Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem'
            }}
          >
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              color: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={26} />
            </div>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.5)', fontWeight: 600, letterSpacing: '1px' }}>DATABASE STATUS</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0.2rem 0 0 0', color: '#22c55e' }}>Connected</h3>
            </div>
          </motion.div>
        </div>

        {/* Quick Start Play Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '2.5rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.25rem',
            marginTop: '1rem'
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.2)'
          }}>
            <Play size={28} style={{ marginLeft: '4px' }} />
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>Ready to Play Chess?</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '480px', margin: 0 }}>
            Your profile and rating are synced with Supabase. Click below to launch your next match!
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => alert('Launching Pygame Chess Engine...')}
            style={{
              backgroundColor: '#FFFFFF',
              color: '#000000',
              border: 'none',
              padding: '0.9rem 2.2rem',
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(255, 255, 255, 0.15)',
              marginTop: '0.5rem'
            }}
          >
            START CHESS ENGINE
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
