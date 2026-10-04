import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, LogOut, Play, Zap, ArrowUpRight, ChevronRight, 
  Sparkles, Shield, User, Bell, Grid, CheckCircle, RefreshCw, X, Award
} from 'lucide-react';

export default function DashboardScreen({ user, profile, onLogout }) {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'play', 'puzzles', 'leaderboard', 'profile'
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showPuzzleModal, setShowPuzzleModal] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  // User Profile Data
  const name = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Alex';
  const skill = profile?.skill_level || user?.user_metadata?.skill_level || 'Intermediate';
  const rating = profile?.rating || 1200;

  // Calculate Rank Title based on ELO
  const getRankInfo = (elo) => {
    if (elo >= 2100) return { title: 'GRANDMASTER', nextElo: 2500, prevElo: 2100, icon: '👑', piece: '/Black_King_clean.png' };
    if (elo >= 1850) return { title: 'QUEEN', nextElo: 2100, prevElo: 1850, icon: '♛', piece: '/Black_King_clean.png' };
    if (elo >= 1650) return { title: 'ROOK', nextElo: 1850, prevElo: 1650, icon: '♜', piece: '/experience_king.jpg' };
    if (elo >= 1450) return { title: 'BISHOP', nextElo: 1650, prevElo: 1450, icon: '♝', piece: '/experience_knight.jpg' };
    if (elo >= 1250) return { title: 'KNIGHT', nextElo: 1450, prevElo: 1250, icon: '♞', piece: '/Black_Knight.jpg' };
    return { title: 'PAWN', nextElo: 1250, prevElo: 0, icon: '♟', piece: '/Black_pawn_clean.png' };
  };

  const rankInfo = getRankInfo(rating);
  const progressPercent = Math.min(100, Math.max(10, ((rating - rankInfo.prevElo) / (rankInfo.nextElo - rankInfo.prevElo)) * 100));

  // Dynamic Time Greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Live Formatted Date
  const today = new Date();
  const dayNum = String(today.getDate()).padStart(2, '0');
  const monthName = today.toLocaleDateString('en-US', { month: 'SHORT' }).toUpperCase();
  const weekDay = today.toLocaleDateString('en-US', { weekday: 'LONG' }).toUpperCase();

  return (
    <div style={{
      width: '100vw',
      minHeight: '100vh',
      minHeight: '100dvh',
      backgroundColor: '#050507',
      color: '#FFFFFF',
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      {/* Background Subtle Ambient Glows */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        position: 'absolute',
        bottom: '5%',
        left: '-5%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Main Responsive Viewport Container */}
      <div style={{
        maxWidth: '480px',
        width: '100%',
        margin: '0 auto',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1,
        paddingBottom: '90px' // Space for floating navbar
      }}>

        {/* Top Header App Bar */}
        <header style={{
          padding: '1.25rem 1.25rem 0.75rem 1.25rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000000',
              fontWeight: '900',
              fontSize: '1.2rem',
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.15)'
            }}>
              ♚
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, letterSpacing: '1.5px', lineHeight: 1 }}>STRATEGIC</div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px', color: 'rgba(255,255,255,0.6)', lineHeight: 1, marginTop: '2px' }}>CHESS</div>
            </div>
          </div>

          {/* Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => alert('Notifications: You have no unread messages.')}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <Bell size={18} />
              <span style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '6px',
                height: '6px',
                backgroundColor: '#10B981',
                borderRadius: '50%'
              }} />
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onLogout}
              title="Log Out"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <LogOut size={17} />
            </motion.button>
          </div>
        </header>

        {/* TAB 1: HOME DASHBOARD VIEW */}
        {activeTab === 'home' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ padding: '0.75rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            {/* Header Title Section + Date Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h1 style={{
                  fontFamily: "'Anton', 'Bebas Neue', sans-serif",
                  fontSize: '2.4rem',
                  letterSpacing: '1px',
                  fontWeight: 400,
                  margin: 0,
                  lineHeight: 1
                }}>
                  DASHBOARD
                </h1>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  margin: '0.4rem 0 0 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}>
                  {getGreeting()}, {name} 👋
                </p>
              </div>

              {/* Date Box Widget */}
              <div style={{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                borderRadius: '14px',
                padding: '0.5rem 0.75rem',
                textAlign: 'center',
                minWidth: '76px',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, lineHeight: 1 }}>{dayNum}</div>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', marginTop: '2px' }}>{monthName}</div>
                <div style={{ fontSize: '0.55rem', fontWeight: 700, color: '#666666', letterSpacing: '0.5px' }}>{weekDay}</div>
              </div>
            </div>

            {/* HERO CARD 1: DAILY RATING (Dark Luxury Card) */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              style={{
                backgroundColor: '#0A0A0C',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '24px',
                padding: '1.4rem 1.4rem 1.2rem 1.4rem',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Background 3D Piece Image Render */}
              <img
                src="/Black_King_clean.png"
                alt="Chess King"
                style={{
                  position: 'absolute',
                  right: '-15px',
                  bottom: '-15px',
                  height: '190px',
                  objectFit: 'contain',
                  opacity: 0.9,
                  filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.8))',
                  pointerEvents: 'none'
                }}
              />

              {/* Expand Action Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAnalyticsModal(true)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 2
                }}
              >
                <ArrowUpRight size={20} strokeWidth={2.5} />
              </motion.button>

              <div style={{ position: 'relative', zIndex: 1, maxWidth: '65%' }}>
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '1.5px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  textTransform: 'uppercase'
                }}>
                  DAILY RATING
                </span>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginTop: '0.4rem' }}>
                  <span style={{
                    fontFamily: "'Anton', 'Bebas Neue', sans-serif",
                    fontSize: '3.6rem',
                    lineHeight: 1,
                    letterSpacing: '1px',
                    fontWeight: 400
                  }}>
                    {rating}
                  </span>

                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.15)',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '20px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    +18
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', marginTop: '0.1rem' }}>
                  Your Rating
                </div>

                {/* SVG Rating Sparkline Graph */}
                <div style={{ marginTop: '1.2rem', width: '100%', height: '36px' }}>
                  <svg width="100%" height="36" viewBox="0 0 160 36" fill="none" preserveAspectRatio="none">
                    <path
                      d="M0 28 L25 22 L50 26 L75 14 L100 18 L125 8 L155 4"
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="155" cy="4" r="3.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* HERO CARD 2: CURRENT RANK (White Glass Card) */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                borderRadius: '24px',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 8px 25px rgba(255, 255, 255, 0.1)',
                position: 'relative'
              }}
            >
              {/* 3D Piece Image */}
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '18px',
                backgroundColor: '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img
                  src={rankInfo.piece}
                  alt={rankInfo.title}
                  style={{ width: '85%', height: '85%', objectFit: 'contain' }}
                />
              </div>

              {/* Middle Info */}
              <div style={{ flex: 1 }}>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  letterSpacing: '1.2px',
                  color: '#666666',
                  textTransform: 'uppercase'
                }}>
                  CURRENT RANK
                </span>

                <h3 style={{
                  fontFamily: "'Anton', 'Bebas Neue', sans-serif",
                  fontSize: '1.8rem',
                  lineHeight: 1,
                  margin: '0.2rem 0 0.6rem 0',
                  letterSpacing: '0.5px'
                }}>
                  {rankInfo.title}
                </h3>

                {/* Progress Bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    flex: 1,
                    height: '6px',
                    backgroundColor: '#E5E7EB',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${progressPercent}%`,
                      height: '100%',
                      backgroundColor: '#000000',
                      borderRadius: '10px',
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#333333' }}>
                    {rating} / {rankInfo.nextElo}
                  </span>
                </div>
              </div>

              {/* Top-Right Rank Badge Icon */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                backgroundColor: '#000000',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9rem',
                flexShrink: 0
              }}>
                🎖️
              </div>
            </motion.div>

            {/* HERO CARD 3: TODAY'S TACTICS CHALLENGE */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                borderRadius: '24px',
                padding: '1.35rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: '0 8px 25px rgba(255, 255, 255, 0.08)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, paddingRight: '0.75rem' }}>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    letterSpacing: '1.2px',
                    color: '#666666',
                    textTransform: 'uppercase'
                  }}>
                    TODAY'S CHALLENGE
                  </span>

                  <h3 style={{
                    fontFamily: "'Anton', 'Bebas Neue', sans-serif",
                    fontSize: '1.7rem',
                    lineHeight: 1.1,
                    margin: '0.3rem 0 0.4rem 0',
                    letterSpacing: '0.5px'
                  }}>
                    CHECKMATE IN 2 MOVES
                  </h3>

                  <p style={{
                    fontSize: '0.8rem',
                    color: '#555555',
                    margin: 0,
                    lineHeight: 1.3
                  }}>
                    Solve the puzzle and boost your rating!
                  </p>
                </div>

                {/* Tactical Board Preview Graphic */}
                <div style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '14px',
                  backgroundColor: '#000000',
                  padding: '6px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gridTemplateRows: 'repeat(4, 1fr)',
                  gap: '2px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  flexShrink: 0
                }}>
                  {[...Array(16)].map((_, i) => {
                    const isWhite = (Math.floor(i / 4) + (i % 4)) % 2 === 0;
                    return (
                      <div
                        key={i}
                        style={{
                          backgroundColor: isWhite ? '#FFFFFF' : '#333333',
                          borderRadius: '2px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          color: isWhite ? '#000000' : '#FFFFFF',
                          fontWeight: 'bold'
                        }}
                      >
                        {i === 2 && '♛'}
                        {i === 7 && '♚'}
                        {i === 13 && '♞'}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Start Challenge CTA Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPuzzleModal(true)}
                style={{
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.85rem 1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  marginTop: '0.2rem'
                }}
              >
                <span>{puzzleSolved ? 'SOLVED (+15 ELO)' : 'START CHALLENGE'}</span>
                <span style={{ fontSize: '1.1rem' }}>→</span>
              </motion.button>
            </motion.div>

            {/* QUICK ACTIONS GRID */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.85rem',
              marginTop: '0.2rem'
            }}>
              {/* Play Engine Card */}
              <motion.div
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab('play')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '18px',
                  padding: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Play size={20} fill="#000000" />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>Play Engine</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Python AI Match</div>
                </div>
              </motion.div>

              {/* Leaderboard Card */}
              <motion.div
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab('leaderboard')}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '18px',
                  padding: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(234, 179, 8, 0.2)',
                  color: '#eab308',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Trophy size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 800 }}>Leaderboard</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Global Ranks</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: PLAY ENGINE VIEW */}
        {activeTab === 'play' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div>
              <h1 style={{ fontFamily: "'Anton', 'Bebas Neue', sans-serif", fontSize: '2.2rem', margin: 0 }}>PLAY VS AI ENGINE</h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>Challenge the Strategic Python AI Engine</p>
            </div>

            <div style={{
              backgroundColor: '#0A0A0C',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '20px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>SELECT DIFFICULTY</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginTop: '0.6rem' }}>
                  {['Beginner', 'Intermediate', 'Professional'].map((diff) => (
                    <button
                      key={diff}
                      style={{
                        padding: '0.75rem 0.5rem',
                        borderRadius: '10px',
                        backgroundColor: skill === diff ? '#FFFFFF' : 'rgba(255, 255, 255, 0.05)',
                        color: skill === diff ? '#000000' : '#FFFFFF',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{
                backgroundColor: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                padding: '1rem',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                color: 'rgba(255,255,255,0.8)'
              }}>
                ℹ️ Launching the game will open the Python Pygame window with Zobrist Hashing, Minimax Deep Search, and Transposition Table AI.
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => alert('Opening Python Chess Engine window... (Run python c:/Chess/Chess/ChessMain.py)')}
                style={{
                  backgroundColor: '#FFFFFF',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '1rem',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem'
                }}
              >
                <Play fill="#000000" size={18} />
                <span>LAUNCH CHESS MATCH</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* TAB 3: PUZZLES VIEW */}
        {activeTab === 'puzzles' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div>
              <h1 style={{ fontFamily: "'Anton', 'Bebas Neue', sans-serif", fontSize: '2.2rem', margin: 0 }}>TACTICS PUZZLES</h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>Train your tactical vision & boost ELO</p>
            </div>

            <div style={{
              backgroundColor: '#FFFFFF',
              color: '#000000',
              borderRadius: '20px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', color: '#666666' }}>DAILY PUZZLE #104</span>
                <span style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 700 }}>+15 ELO</span>
              </div>

              <h2 style={{ fontFamily: "'Anton', 'Bebas Neue', sans-serif", fontSize: '1.8rem', margin: 0 }}>WHITE TO MOVE: MATE IN 2</h2>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPuzzleModal(true)}
                style={{
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.9rem',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                SOLVE PUZZLE NOW
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* TAB 4: LEADERBOARD VIEW */}
        {activeTab === 'leaderboard' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div>
              <h1 style={{ fontFamily: "'Anton', 'Bebas Neue', sans-serif", fontSize: '2.2rem', margin: 0 }}>GLOBAL LEADERBOARD</h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>Top Strategic Chess Players</p>
            </div>

            <div style={{
              backgroundColor: '#0A0A0C',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '20px',
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              {[
                { rank: 1, name: 'Magnus C.', rating: 2882, title: 'GM', badge: '🥇' },
                { rank: 2, name: 'Hikaru N.', rating: 2802, title: 'GM', badge: '🥈' },
                { rank: 3, name: 'Fabiano C.', rating: 2795, title: 'GM', badge: '🥉' },
                { rank: 4, name: name, rating: rating, title: rankInfo.title, isUser: true },
                { rank: 5, name: 'Gukesh D.', rating: 2794, title: 'GM' }
              ].map((player) => (
                <div
                  key={player.rank}
                  style={{
                    backgroundColor: player.isUser ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: player.isUser ? '1px solid #FFFFFF' : 'none',
                    borderRadius: '12px',
                    padding: '0.85rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', minWidth: '20px' }}>#{player.rank}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span>{player.name}</span>
                        {player.isUser && <span style={{ fontSize: '0.65rem', backgroundColor: '#FFFFFF', color: '#000000', padding: '0.1rem 0.4rem', borderRadius: '6px', fontWeight: 900 }}>YOU</span>}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>Title: {player.title}</div>
                    </div>
                  </div>

                  <div style={{ fontWeight: 900, fontSize: '1rem' }}>{player.rating} ELO</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 5: PROFILE VIEW */}
        {activeTab === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <div>
              <h1 style={{ fontFamily: "'Anton', 'Bebas Neue', sans-serif", fontSize: '2.2rem', margin: 0 }}>MY PROFILE</h1>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>Account Settings & Stats</p>
            </div>

            <div style={{
              backgroundColor: '#0A0A0C',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '20px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: 800, letterSpacing: '1px' }}>NAME</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '2px' }}>{name}</div>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: 800, letterSpacing: '1px' }}>EMAIL</span>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, marginTop: '2px' }}>{user?.email || 'N/A'}</div>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: 800, letterSpacing: '1px' }}>EXPERIENCE LEVEL</span>
                <div style={{ fontSize: '1rem', fontWeight: 700, marginTop: '2px' }}>{skill}</div>
              </div>

              <button
                onClick={onLogout}
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  color: '#ef4444',
                  borderRadius: '12px',
                  padding: '0.85rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <LogOut size={16} />
                <span>SIGN OUT</span>
              </button>
            </div>
          </motion.div>
        )}

      </div>

      {/* FLOATING BOTTOM NAVIGATION BAR (Matching reference design) */}
      <div style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgba(10, 10, 12, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        zIndex: 100,
        padding: '0.6rem 1rem 0.8rem 1rem'
      }}>
        <div style={{
          maxWidth: '480px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          {[
            { id: 'home', label: 'Home', icon: '🏠' },
            { id: 'play', label: 'Play', icon: '♟️' },
            { id: 'puzzles', label: 'Puzzles', icon: '🧩' },
            { id: 'leaderboard', label: 'Ranks', icon: '🏆' },
            { id: 'profile', label: 'Profile', icon: '👤' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                  color: isActive ? '#000000' : 'rgba(255, 255, 255, 0.6)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '0.45rem 0.85rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '2px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minWidth: '55px'
                }}
              >
                <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{tab.icon}</span>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.5px' }}>{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ANALYTICS MODAL */}
      <AnimatePresence>
        {showAnalyticsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAnalyticsModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.25rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#0A0A0C',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '24px',
                padding: '1.75rem',
                maxWidth: '420px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                color: '#FFFFFF'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontFamily: "'Anton', 'Bebas Neue', sans-serif", fontSize: '1.8rem', margin: 0 }}>RATING ANALYTICS</h2>
                <button onClick={() => setShowAnalyticsModal(false)} style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}>
                  <X size={22} />
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: 800 }}>CURRENT ELO</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, marginTop: '2px' }}>{rating}</div>
                </div>

                <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', fontWeight: 800 }}>WIN RATE</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#10B981', marginTop: '2px' }}>68%</div>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                🏆 You are currently in the top 15% of players in the {rankInfo.title} tier! Keep playing engine matches to reach {rankInfo.nextElo} ELO.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PUZZLE SOLVER MODAL */}
      <AnimatePresence>
        {showPuzzleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPuzzleModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.25rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#000000',
                borderRadius: '24px',
                padding: '1.75rem',
                maxWidth: '420px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#666666', letterSpacing: '1px' }}>DAILY TACTICS</span>
                  <h2 style={{ fontFamily: "'Anton', 'Bebas Neue', sans-serif", fontSize: '1.8rem', margin: 0 }}>WHITE TO MOVE: MATE IN 2</h2>
                </div>
                <button onClick={() => setShowPuzzleModal(false)} style={{ background: 'none', border: 'none', color: '#000000', cursor: 'pointer' }}>
                  <X size={22} />
                </button>
              </div>

              {/* Interactive Tactical Board */}
              <div style={{
                aspectRatio: '1',
                width: '100%',
                backgroundColor: '#000000',
                borderRadius: '16px',
                padding: '8px',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gridTemplateRows: 'repeat(4, 1fr)',
                gap: '3px'
              }}>
                {[...Array(16)].map((_, i) => {
                  const isWhite = (Math.floor(i / 4) + (i % 4)) % 2 === 0;
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 0.95 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (i === 2) {
                          setPuzzleSolved(true);
                          alert('🎉 Correct Move! Queen to H7 Checkmate! (+15 ELO)');
                          setShowPuzzleModal(false);
                        } else {
                          alert('❌ Incorrect move. Try finding Queen to H7 mate!');
                        }
                      }}
                      style={{
                        backgroundColor: isWhite ? '#FFFFFF' : '#222222',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        userSelect: 'none'
                      }}
                    >
                      {i === 2 && '♛'}
                      {i === 7 && '♚'}
                      {i === 13 && '♞'}
                    </motion.div>
                  );
                })}
              </div>

              <div style={{ fontSize: '0.85rem', color: '#555555', textAlign: 'center', fontStyle: 'italic' }}>
                Tap the Queen (♛) to play the winning checkmate move!
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
