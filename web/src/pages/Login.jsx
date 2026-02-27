import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  
  // State management
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeField, setActiveField] = useState(null);
  
  // Refs for 3D tilt effect
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  // Mouse move parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3D tilt effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleTilt = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20; 
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', handleLeave);

    return () => {
      card.removeEventListener('mousemove', handleTilt);
      card.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      
      // Simulated API call for demo
      // await new Promise(resolve => setTimeout(resolve, 2000));
       const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({  
            email:email, 
            password:password,
          }),
        }
      );

      // Mock successful login
      // const mockData = {                          
      //   token: "mock_jwt_token_" + Date.now(),
      //   user: {
      //     id: 1,
      //     email,
      //     name: email.split('@')[0],
      //     role: role
      //   }
      // };

      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      // Navigate based on role
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={containerRef} style={styles.container}>
      {/* Dynamic Background */}
      <div style={styles.dynamicBackground}>
        <div style={{
          ...styles.gradientOrb1,
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }} />
        <div style={{
          ...styles.gradientOrb2,
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
        }} />
        <div style={{
          ...styles.gradientOrb3,
          transform: `translate(${mousePosition.y}px, ${-mousePosition.x}px)`,
        }} />
      </div>

      {/* Animated Grid */}
      <div style={styles.gridOverlay} />
      
      {/* Floating Particles */}
      <div style={styles.particles}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.particle,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              background: `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.3})`,
            }}
          />
        ))}
      </div>

      {/* Main Card with 3D Tilt */}
      <div
        ref={cardRef}
        style={styles.card}
      >
        {/* Animated Border */}
        <div style={styles.cardBorder} />
        
        {/* Glass Morphism Effect */}
        <div style={styles.glassOverlay} />

        {/* Content Container */}
        <div style={styles.content}>
          {/* Logo Section with Animated Icon */}
          <div style={styles.logoSection}>
            <div style={styles.logoWrapper}>
              <div style={styles.logoGlow} />
              <div style={styles.logoIcon}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366f1" />
                      <stop offset="1" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div style={styles.logoPulse} />
            </div>
            <h1 style={styles.title}>
              <span style={styles.titleGradient}>Welcome Back</span>
            </h1>
            <p style={styles.subtitle}>Sign in to continue your journey</p>
          </div>

          {/* Role Selector with Animation */}
          <div style={styles.roleSelector}>
            <div style={styles.roleIndicator}>
              <div style={{
                ...styles.roleIndicatorActive,
                left: role === 'customer' ? '4px' : 'calc(50% + 4px)',
              }} />
            </div>
            <button
              onClick={() => setRole("customer")}
              style={{
                ...styles.roleButton,
                ...(role === "customer" && styles.roleButtonActive),
              }}
            >
              <span style={styles.roleIcon}>👤</span>
              <span style={styles.roleText}>User</span>
            </button>
            <button
              onClick={() => setRole("admin")}
              style={{
                ...styles.roleButton,
                ...(role === "admin" && styles.roleButtonActive),
              }}
            >
              <span style={styles.roleIcon}>⚡</span>
              <span style={styles.roleText}>Admin</span>
            </button>
          </div>

          {/* Error Message with Animation */}
          {error && (
            <div style={styles.errorMessage}>
              <div style={styles.errorIcon}>⚠️</div>
              <div style={styles.errorText}>{error}</div>
              <button style={styles.errorClose} onClick={() => setError("")}>×</button>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Email Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>📧</span>
                Email Address
              </label>
              <div style={{
                ...styles.inputWrapper,
                ...(activeField === 'email' && styles.inputWrapperActive),
              }}>
                <input
                  type="email"
                  placeholder="hello@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  style={styles.input}
                />
                {email && <span style={styles.inputCheck}>✓</span>}
              </div>
            </div>

            {/* Password Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <span style={styles.labelIcon}>🔒</span>
                Password
              </label>
              <div style={{
                ...styles.inputWrapper,
                ...(activeField === 'password' && styles.inputWrapperActive),
              }}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setActiveField('password')}
                  onBlur={() => setActiveField(null)}
                  style={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Options */}
            <div style={styles.options}>
              <label style={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={styles.checkboxInput}
                />
                <span style={styles.checkboxCustom} />
                <span style={styles.checkboxLabel}>Remember me</span>
              </label>
              <Link to="/forgot-password" style={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            {/* Submit Button with Loading State */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                ...(loading && styles.submitButtonLoading),
              }}
            >
              {loading ? (
                <div style={styles.loader}>
                  <div style={styles.loaderRing} />
                  <span style={styles.loaderText}>Signing in...</span>
                </div>
              ) : (
                <span style={styles.submitText}>
                  Sign In
                  <span style={styles.submitArrow}>→</span>
                </span>
              )}
            </button>
          </form>

          {/* Social Login */}
          <div style={styles.socialSection}>
            <div style={styles.divider}>
              <span style={styles.dividerText}>Or continue with</span>
            </div>
            
            <div style={styles.socialButtons}>
              <button style={styles.socialButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              
              <button style={styles.socialButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" fill="#1877F2"/>
                </svg>
                Facebook
              </button>
              
              <button style={styles.socialButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.52-3.2 0-1.4.66-2.14.57-2.98-.4C4.12 15.86 5.02 9.37 9.1 9.1c1.26.02 2.14.7 2.88.7.73 0 1.88-.7 3.17-.7.52 0 2.41.23 3.56 1.8-.09.06-2.12 1.24-2.1 3.71.03 3.09 2.71 4.12 2.74 4.13-.03.08-.43 1.47-1.42 2.54h.02zM12.03 7.25c-.48-1.13.43-2.14.92-2.57.58-.51 1.48-.86 2.24-.88.1 1.04-.56 2.1-1.12 2.66-.56.57-1.46.96-2.04.79z" fill="black"/>
                </svg>
                Apple
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div style={styles.signup}>
            <p style={styles.signupText}>
              Don't have an account?{' '}
              <Link to="/signup" style={styles.signupLink}>
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Animated Stats */}
      <div style={styles.stats}>
        <div style={styles.statItem}>
          <span style={styles.statValue}>2.5M+</span>
          <span style={styles.statLabel}>Active Users</span>
        </div>
        <div style={styles.statDivider} />
        <div style={styles.statItem}>
          <span style={styles.statValue}>99.9%</span>
          <span style={styles.statLabel}>Uptime</span>
        </div>
        <div style={styles.statDivider} />
        <div style={styles.statItem}>
          <span style={styles.statValue}>24/7</span>
          <span style={styles.statLabel}>Support</span>
        </div>
      </div>

      {/* Decorative Elements */}
      <div style={styles.decorativeCircle1} />
      <div style={styles.decorativeCircle2} />
      <div style={styles.decorativeLine} />
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
  },

  dynamicBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },

  gradientOrb1: {
    position: 'absolute',
    width: '800px',
    height: '800px',
    left: '-200px',
    top: '-200px',
    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.05) 50%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    transition: 'transform 0.5s ease-out',
  },

  gradientOrb2: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    right: '-100px',
    bottom: '-100px',
    background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(99,102,241,0.05) 50%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    transition: 'transform 0.5s ease-out',
  },

  gradientOrb3: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, rgba(168,85,247,0.05) 50%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(80px)',
    transition: 'transform 0.5s ease-out',
  },

  gridOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
    `,
    backgroundSize: '50px 50px',
    pointerEvents: 'none',
  },

  particles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    pointerEvents: 'none',
  },

  particle: {
    position: 'absolute',
    borderRadius: '50%',
    pointerEvents: 'none',
    animation: 'float 10s infinite ease-in-out',
    opacity: 0.5,
  },

  card: {
    position: 'relative',
    width: '100%',
    maxWidth: '480px',
    margin: '20px',
    padding: '48px',
    borderRadius: '40px',
    transition: 'transform 0.1s ease',
    transformStyle: 'preserve-3d',
    zIndex: 10,
  },

  cardBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '40px',
    padding: '2px',
    background: 'linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.1))',
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    maskComposite: 'exclude',
    pointerEvents: 'none',
  },

  glassOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '40px',
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
  },

  content: {
    position: 'relative',
    zIndex: 2,
  },

  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '40px',
  },

  logoWrapper: {
    position: 'relative',
    marginBottom: '24px',
  },

  logoGlow: {
    position: 'absolute',
    width: '80px',
    height: '80px',
    top: '-8px',
    left: '-8px',
    background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(20px)',
    animation: 'pulseGlow 3s infinite',
  },

  logoIcon: {
    position: 'relative',
    width: '64px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'float 6s infinite ease-in-out',
  },

  logoPulse: {
    position: 'absolute',
    width: '64px',
    height: '64px',
    top: 0,
    left: 0,
    border: '2px solid rgba(99,102,241,0.5)',
    borderRadius: '50%',
    animation: 'pulse 2s infinite',
  },

  title: {
    fontSize: '32px',
    fontWeight: '700',
    margin: '0 0 8px 0',
    textAlign: 'center',
  },

  titleGradient: {
    background: 'linear-gradient(135deg, #fff, #94a3b8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },

  subtitle: {
    fontSize: '16px',
    color: '#94a3b8',
    margin: 0,
    textAlign: 'center',
  },

  roleSelector: {
    position: 'relative',
    display: 'flex',
    gap: '8px',
    padding: '4px',
    marginBottom: '32px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '40px',
  },

  roleIndicator: {
    position: 'absolute',
    top: '4px',
    left: '4px',
    right: '4px',
    bottom: '4px',
  },

  roleIndicatorActive: {
    position: 'absolute',
    width: 'calc(50% - 4px)',
    height: '100%',
    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
    borderRadius: '32px',
    transition: 'left 0.3s ease',
  },

  roleButton: {
    flex: 1,
    padding: '12px 24px',
    border: 'none',
    borderRadius: '32px',
    background: 'transparent',
    color: '#94a3b8',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    position: 'relative',
    zIndex: 2,
    transition: 'all 0.3s ease',
  },

  roleButtonActive: {
    color: '#ffffff',
  },

  roleIcon: {
    fontSize: '20px',
  },

  roleText: {
    fontWeight: '600',
  },

  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    marginBottom: '24px',
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '16px',
    color: '#fecaca',
    animation: 'shake 0.5s ease',
  },

  errorIcon: {
    fontSize: '20px',
  },

  errorText: {
    flex: 1,
    fontSize: '14px',
  },

  errorClose: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(239,68,68,0.2)',
    border: 'none',
    borderRadius: '50%',
    color: '#fecaca',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },

  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },

  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#e2e8f0',
  },

  labelIcon: {
    fontSize: '16px',
  },

  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },

  inputWrapperActive: {
    transform: 'scale(1.02)',
  },

  input: {
    width: '100%',
    padding: '16px 20px',
    paddingRight: '48px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    fontSize: '16px',
    color: '#ffffff',
    outline: 'none',
    transition: 'all 0.3s ease',
  },

  inputCheck: {
    position: 'absolute',
    right: '20px',
    color: '#10b981',
    fontSize: '20px',
    fontWeight: 'bold',
  },

  passwordToggle: {
    position: 'absolute',
    right: '20px',
    padding: '8px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    color: '#94a3b8',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  options: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '8px',
  },

  checkbox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    position: 'relative',
  },

  checkboxInput: {
    position: 'absolute',
    opacity: 0,
    cursor: 'pointer',
  },

  checkboxCustom: {
    width: '20px',
    height: '20px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
  },

  checkboxLabel: {
    fontSize: '14px',
    color: '#94a3b8',
  },

  forgotLink: {
    fontSize: '14px',
    color: '#6366f1',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'all 0.3s ease',
  },

  submitButton: {
    position: 'relative',
    padding: '18px 32px',
    marginTop: '8px',
    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
    border: 'none',
    borderRadius: '32px',
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffffff',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },

  submitButtonLoading: {
    background: 'linear-gradient(135deg, #4f52e0, #8b45d1)',
    cursor: 'not-allowed',
  },

  submitText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
  },

  submitArrow: {
    transition: 'transform 0.3s ease',
  },

  loader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },

  loaderRing: {
    width: '24px',
    height: '24px',
    border: '3px solid rgba(255,255,255,0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },

  loaderText: {
    fontSize: '16px',
    fontWeight: '500',
  },

  socialSection: {
    marginTop: '32px',
  },

  divider: {
    position: 'relative',
    textAlign: 'center',
    marginBottom: '24px',
  },

  dividerText: {
    padding: '0 16px',
    fontSize: '14px',
    color: '#64748b',
    background: 'rgba(15, 23, 42, 0.8)',
    position: 'relative',
    zIndex: 2,
  },

  socialButtons: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
  },

  socialButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '14px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  signup: {
    marginTop: '32px',
    textAlign: 'center',
  },

  signupText: {
    fontSize: '15px',
    color: '#94a3b8',
  },

  signupLink: {
    color: '#6366f1',
    textDecoration: 'none',
    fontWeight: '600',
    marginLeft: '8px',
    transition: 'all 0.3s ease',
  },

  stats: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '32px',
    marginTop: '48px',
    padding: '24px 32px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '40px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.05)',
    zIndex: 10,
  },

  statItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },

  statValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#ffffff',
  },

  statLabel: {
    fontSize: '12px',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },

  statDivider: {
    width: '1px',
    height: '30px',
    background: 'rgba(255,255,255,0.1)',
  },

  decorativeCircle1: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    left: '10%',
    bottom: '10%',
    border: '1px solid rgba(99,102,241,0.1)',
    borderRadius: '50%',
    animation: 'rotateSlow 60s linear infinite',
  },

  decorativeCircle2: {
    position: 'absolute',
    width: '500px',
    height: '500px',
    right: '5%',
    top: '5%',
    border: '1px solid rgba(168,85,247,0.1)',
    borderRadius: '50%',
    animation: 'rotateSlow 80s linear infinite reverse',
  },

  decorativeLine: {
    position: 'absolute',
    width: '200px',
    height: '2px',
    left: '5%',
    top: '20%',
    background: 'linear-gradient(90deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
    transform: 'rotate(45deg)',
  },
};

// Global animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  @keyframes pulseGlow {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.5;
      transform: scale(1.1);
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes rotateSlow {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes shake {
    0%, 100% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
  }

  /* Interactive styles */
  input:hover {
    border-color: rgba(99, 102, 241, 0.5);
  }

  input:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .roleButton:hover {
    color: #ffffff;
  }

  .checkbox:hover .checkboxCustom {
    border-color: #6366f1;
  }

  .checkboxInput:checked ~ .checkboxCustom {
    background: #6366f1;
    border-color: #6366f1;
    position: relative;
  }

  .checkboxInput:checked ~ .checkboxCustom::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
  }

  .submitButton:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.5);
  }

  .submitButton:hover .submitArrow {
    transform: translateX(5px);
  }

  .socialButton:hover {
    background: rgba(255,255,255,0.1);
    transform: translateY(-2px);
    border-color: rgba(99, 102, 241, 0.5);
  }

  .forgotLink:hover {
    color: #a855f7;
  }

  .signupLink:hover {
    color: #a855f7;
  }

  .errorClose:hover {
    background: rgba(239,68,68,0.3);
    transform: scale(1.1);
  }

  .passwordToggle:hover {
    color: #6366f1;
  }
`;

document.head.appendChild(styleSheet);

export default Login;