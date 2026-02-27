import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  
  // State management
  const [role, setRole] = useState("customer");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    phone: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeField, setActiveField] = useState(null);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [checkingUsername, setCheckingUsername] = useState(false);
  
  // Refs for 3D tilt effect
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

  // 3D tilt effect - FIXED: Proper event listeners with cleanup
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleTilt = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    };

    const handleLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    // Add event listeners
    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', handleLeave);

    // Cleanup function
    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleTilt);
        card.removeEventListener('mouseleave', handleLeave);
      }
    };
  }, []); // Empty dependency array - runs once on mount

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
    
    // Check email availability
    if (e.target.name === 'email' && e.target.value.length > 5) {
      checkEmailAvailability(e.target.value);
    }
    
    // Check username availability
    if (e.target.name === 'username' && e.target.value.length > 3) {
      checkUsernameAvailability(e.target.value);
    }
  };

  const checkEmailAvailability = async (email) => {
    setCheckingEmail(true);
    // Simulate API call - REPLACE WITH YOUR ACTUAL API
    await new Promise(resolve => setTimeout(resolve, 800));
    const isAvailable = !email.includes('used') && !email.includes('taken');
    setEmailAvailable(isAvailable);
    setCheckingEmail(false);
  };

  const checkUsernameAvailability = async (username) => {
    setCheckingUsername(true);
    // Simulate API call - REPLACE WITH YOUR ACTUAL API
    await new Promise(resolve => setTimeout(resolve, 600));
    const isAvailable = !username.includes('admin') && !username.includes('test');
    setUsernameAvailable(isAvailable);
    setCheckingUsername(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!form.name || !form.email || !form.username || !form.password || !form.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (emailAvailable === false) {
      setError("Email is already taken");
      return;
    }

    if (usernameAvailable === false) {
      setError("Username is already taken");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (getPasswordStrength(form.password).strength < 2) {
      setError("Please choose a stronger password");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    try {
      setLoading(true);
      
      // 🔥 YOUR ACTUAL BACKEND CONNECTION - DO NOT CHANGE
      const response = await fetch(
        "http://localhost:5000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            name: form.name, 
            email: form.email, 
            password: form.password,
            username: form.username,
            phone: form.phone || undefined,
            role: role 
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Signup failed");
        setLoading(false);
        return;
      }
      
      setSuccess("Account created successfully! Redirecting...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      console.error(err);
      setError("Server not reachable. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length === 0) return { strength: 0, text: "", color: "#333" };
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const texts = ["WEAK", "FAIR", "GOOD", "STRONG", "EXCELLENT"];
    const colors = ["#ff5555", "#ff8c42", "#ffaa00", "#00b7eb", "#00ff00"];
    
    return { 
      strength, 
      text: texts[strength] || texts[0], 
      color: colors[strength] || colors[0] 
    };
  };

  const passwordStrength = getPasswordStrength(form.password);
  const passwordsMatch = form.password && form.confirmPassword && form.password === form.confirmPassword;

  return (
    <div style={styles.container}>
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

      {/* Main Card with 3D Tilt - FIXED: Added cursor style */}
      <div 
        ref={cardRef} 
        style={{
          ...styles.card,
          cursor: 'pointer' // Makes it clear the card is interactive
        }}
      >
        {/* Animated Border */}
        <div style={styles.cardBorder} />
        
        {/* Glass Morphism Effect */}
        <div style={styles.glassOverlay} />

        {/* Content Container */}
        <div style={styles.content}>
          {/* Logo Section */}
          <div style={styles.logoSection}>
            <div style={styles.logoWrapper}>
              <div style={styles.logoGlow} />
              <div style={styles.logoIcon}>
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="7" r="4" stroke="url(#gradient)" strokeWidth="2"/>
                  <defs>
                    <linearGradient id="gradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6366f1" />
                      <stop offset="1" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div style={styles.logoPulse} />
            </div>
            <h1 style={styles.title}>
              <span style={styles.titleGradient}>Create Account</span>
            </h1>
            <p style={styles.subtitle}>Join the future of digital identity</p>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div style={styles.errorMessage}>
              <div style={styles.errorIcon}>⚠️</div>
              <div style={styles.errorText}>{error}</div>
              <button 
                style={styles.errorClose} 
                onClick={() => setError("")}
                type="button"
              >×</button>
            </div>
          )}
          
          {success && (
            <div style={styles.successMessage}>
              <div style={styles.successIcon}>✓</div>
              <div style={styles.successText}>{success}</div>
            </div>
          )}

          {/* Signup Form - Single Page */}
          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Role Selection - Like Login Page */}
            <div style={styles.roleSection}>
              <div style={styles.roleLabel}>
                <span style={styles.roleLabelIcon}>🎮</span>
                SELECT ACCOUNT TYPE
              </div>
              <div style={styles.roleGrid}>
                <div 
                  style={{
                    ...styles.roleCard,
                    ...(role === "customer" ? styles.roleCardActive : {}),
                  }}
                  onClick={() => setRole("customer")}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'}
                  onMouseLeave={(e) => {
                    if (role === "customer") {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                    } else {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }
                  }}
                >
                  <div style={styles.roleCardGlow}></div>
                  <div style={styles.roleIconContainer}>
                    <div style={styles.roleIconGlow}></div>
                    <span style={styles.roleIcon}>🛒</span>
                  </div>
                  <div style={styles.roleContent}>
                    <div style={styles.roleName}>SHOPPER</div>
                    <div style={styles.roleDesc}>Consumer Account</div>
                    <div style={styles.roleStatus}>
                      {role === "customer" ? 'ACTIVE' : 'INACTIVE'}
                    </div>
                  </div>
                  {role === "customer" && <div style={styles.activePulse}></div>}
                </div>
                
                <div 
                  style={{
                    ...styles.roleCard,
                    ...(role === "admin" ? styles.roleCardActiveAdmin : {}),
                  }}
                  onClick={() => setRole("admin")}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)'}
                  onMouseLeave={(e) => {
                    if (role === "admin") {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                    } else {
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    }
                  }}
                >
                  <div style={styles.roleCardGlow}></div>
                  <div style={styles.roleIconContainer}>
                    <div style={styles.roleIconGlow}></div>
                    <span style={styles.roleIcon}>👑</span>
                  </div>
                  <div style={styles.roleContent}>
                    <div style={styles.roleName}>ADMIN</div>
                    <div style={styles.roleDesc}>Business Account</div>
                    <div style={styles.roleStatus}>
                      {role === "admin" ? 'ACTIVE' : 'INACTIVE'}
                    </div>
                  </div>
                  {role === "admin" && <div style={styles.activePulse}></div>}
                </div>
              </div>
            </div>

            {/* Full Name */}
            <div style={styles.formGroup}>
              <div style={styles.inputLabel}>
                <span style={styles.labelIcon}>👤</span>
                <span style={styles.labelText}>FULL NAME</span>
                <span style={styles.labelRequired}>*</span>
              </div>
              <div style={{
                ...styles.inputContainer,
                ...(activeField === 'name' ? styles.inputContainerActive : {})
              }}>
                <div style={styles.inputGlow}></div>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => setActiveField('name')}
                  onBlur={() => setActiveField(null)}
                  style={styles.input}
                />
                <div style={styles.inputScan}></div>
                {form.name && <span style={styles.inputCheck}>✓</span>}
              </div>
            </div>

            {/* Username */}
            <div style={styles.formGroup}>
              <div style={styles.inputLabel}>
                <span style={styles.labelIcon}>@</span>
                <span style={styles.labelText}>USERNAME</span>
                <span style={styles.labelRequired}>*</span>
              </div>
              <div style={{
                ...styles.inputContainer,
                ...(activeField === 'username' ? styles.inputContainerActive : {}),
                ...(usernameAvailable === false ? styles.inputContainerError : {}),
                ...(usernameAvailable === true ? styles.inputContainerSuccess : {})
              }}>
                <div style={styles.inputGlow}></div>
                <span style={styles.inputPrefix}>@</span>
                <input
                  name="username"
                  type="text"
                  placeholder="johndoe"
                  value={form.username}
                  onChange={handleChange}
                  onFocus={() => setActiveField('username')}
                  onBlur={() => setActiveField(null)}
                  style={{...styles.input, paddingLeft: '40px'}}
                />
                <div style={styles.inputScan}></div>
                {checkingUsername && <div style={styles.inputSpinner} />}
                {!checkingUsername && usernameAvailable === true && <span style={styles.inputCheck}>✓</span>}
                {!checkingUsername && usernameAvailable === false && <span style={styles.inputError}>✗</span>}
              </div>
              {usernameAvailable === false && (
                <div style={styles.inputHintError}>Username already taken</div>
              )}
              {usernameAvailable === true && (
                <div style={styles.inputHintSuccess}>Username available</div>
              )}
            </div>

            {/* Email */}
            <div style={styles.formGroup}>
              <div style={styles.inputLabel}>
                <span style={styles.labelIcon}>📧</span>
                <span style={styles.labelText}>EMAIL ADDRESS</span>
                <span style={styles.labelRequired}>*</span>
              </div>
              <div style={{
                ...styles.inputContainer,
                ...(activeField === 'email' ? styles.inputContainerActive : {}),
                ...(emailAvailable === false ? styles.inputContainerError : {}),
                ...(emailAvailable === true ? styles.inputContainerSuccess : {})
              }}>
                <div style={styles.inputGlow}></div>
                <input
                  name="email"
                  type="email"
                  placeholder="hello@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setActiveField('email')}
                  onBlur={() => setActiveField(null)}
                  style={styles.input}
                />
                <div style={styles.inputScan}></div>
                {checkingEmail && <div style={styles.inputSpinner} />}
                {!checkingEmail && emailAvailable === true && <span style={styles.inputCheck}>✓</span>}
                {!checkingEmail && emailAvailable === false && <span style={styles.inputError}>✗</span>}
              </div>
              {emailAvailable === false && (
                <div style={styles.inputHintError}>Email already registered</div>
              )}
              {emailAvailable === true && (
                <div style={styles.inputHintSuccess}>Email available</div>
              )}
            </div>

            {/* Password */}
            <div style={styles.formGroup}>
              <div style={styles.inputLabel}>
                <span style={styles.labelIcon}>🔐</span>
                <span style={styles.labelText}>PASSWORD</span>
                <span style={styles.labelRequired}>*</span>
              </div>
              <div style={{
                ...styles.inputContainer,
                ...(activeField === 'password' ? styles.inputContainerActive : {})
              }}>
                <div style={styles.inputGlow}></div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setActiveField('password')}
                  onBlur={() => setActiveField(null)}
                  style={styles.input}
                />
                <div style={styles.inputScan}></div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.visibilityButton}
                >
                  <span style={styles.visibilityIcon}>
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                  <span style={styles.visibilityText}>
                    {showPassword ? "HIDE" : "SHOW"}
                  </span>
                </button>
              </div>
              
              {/* Password Strength Meter */}
              {form.password && (
                <div style={styles.strengthContainer}>
                  <div style={styles.strengthHeader}>
                    <span style={styles.strengthLabel}>Password Strength</span>
                    <span style={{...styles.strengthValue, color: passwordStrength.color}}>
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div style={styles.strengthBars}>
                    {[0, 1, 2, 3].map((level) => (
                      <div
                        key={level}
                        style={{
                          ...styles.strengthBar,
                          background: passwordStrength.strength > level ? passwordStrength.color : 'rgba(255,255,255,0.1)',
                          boxShadow: passwordStrength.strength > level ? `0 0 10px ${passwordStrength.color}` : 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div style={styles.formGroup}>
              <div style={styles.inputLabel}>
                <span style={styles.labelIcon}>✓</span>
                <span style={styles.labelText}>CONFIRM PASSWORD</span>
                <span style={styles.labelRequired}>*</span>
              </div>
              <div style={{
                ...styles.inputContainer,
                ...(activeField === 'confirmPassword' ? styles.inputContainerActive : {}),
                ...(form.confirmPassword && passwordsMatch ? styles.inputContainerSuccess : {}),
                ...(form.confirmPassword && !passwordsMatch ? styles.inputContainerError : {})
              }}>
                <div style={styles.inputGlow}></div>
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => setActiveField('confirmPassword')}
                  onBlur={() => setActiveField(null)}
                  style={styles.input}
                />
                <div style={styles.inputScan}></div>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.visibilityButton}
                >
                  <span style={styles.visibilityIcon}>
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </span>
                  <span style={styles.visibilityText}>
                    {showConfirmPassword ? "HIDE" : "SHOW"}
                  </span>
                </button>
                {form.confirmPassword && passwordsMatch && <span style={styles.inputCheck}>✓</span>}
                {form.confirmPassword && !passwordsMatch && <span style={styles.inputError}>✗</span>}
              </div>
              {form.confirmPassword && !passwordsMatch && (
                <div style={styles.inputHintError}>Passwords do not match</div>
              )}
            </div>

            {/* Phone Number (Optional) */}
            <div style={styles.formGroup}>
              <div style={styles.inputLabel}>
                <span style={styles.labelIcon}>📱</span>
                <span style={styles.labelText}>PHONE NUMBER</span>
                <span style={styles.labelOptional}>(OPTIONAL)</span>
              </div>
              <div style={{
                ...styles.inputContainer,
                ...(activeField === 'phone' ? styles.inputContainerActive : {})
              }}>
                <div style={styles.inputGlow}></div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+1 234 567 8900"
                  value={form.phone}
                  onChange={handleChange}
                  onFocus={() => setActiveField('phone')}
                  onBlur={() => setActiveField(null)}
                  style={styles.input}
                />
                <div style={styles.inputScan}></div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div style={styles.termsContainer}>
              <div 
                style={styles.cyberCheckbox}
                onClick={() => setAgreeTerms(!agreeTerms)}
              >
                <div style={{
                  ...styles.checkboxCore,
                  background: agreeTerms ? 
                    'radial-gradient(circle, #6366f1, #4f46e5)' : 
                    'radial-gradient(circle, #333333, #222222)',
                  boxShadow: agreeTerms ? 
                    '0 0 20px #6366f1, inset 0 0 10px #6366f1' : 
                    'inset 0 0 5px #000000'
                }}>
                  {agreeTerms && <div style={styles.checkboxDot}></div>}
                </div>
                <span style={styles.checkboxLabel}>
                  I agree to the <Link to="/terms" style={styles.termsLink}>Terms of Service</Link> and{' '}
                  <Link to="/privacy" style={styles.termsLink}>Privacy Policy</Link>
                </span>
              </div>
              
              <div 
                style={styles.cyberCheckbox}
                onClick={() => setAgreeMarketing(!agreeMarketing)}
              >
                <div style={{
                  ...styles.checkboxCore,
                  background: agreeMarketing ? 
                    'radial-gradient(circle, #a855f7, #9333ea)' : 
                    'radial-gradient(circle, #333333, #222222)',
                  boxShadow: agreeMarketing ? 
                    '0 0 20px #a855f7, inset 0 0 10px #a855f7' : 
                    'inset 0 0 5px #000000'
                }}>
                  {agreeMarketing && <div style={styles.checkboxDot}></div>}
                </div>
                <span style={styles.checkboxLabel}>
                  I want to receive updates and offers (optional)
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={styles.submitButton}
            >
              <div style={styles.buttonGlow}></div>
              <div style={styles.buttonParticles}>
                {[...Array(8)].map((_, i) => (
                  <div key={i} style={{
                    ...styles.buttonParticle,
                    animationDelay: `${i * 0.1}s`
                  }}></div>
                ))}
              </div>
              {loading ? (
                <div style={styles.loadingContainer}>
                  <div style={styles.holographicSpinner}>
                    <div style={styles.spinnerRing1}></div>
                    <div style={styles.spinnerRing2}></div>
                    <div style={styles.spinnerCore}></div>
                  </div>
                  <span style={styles.loadingText}>CREATING ACCOUNT...</span>
                </div>
              ) : (
                <div style={styles.buttonContent}>
                  <span style={styles.buttonIcon}>🚀</span>
                  <span style={styles.buttonText}>
                    CREATE {role === "admin" ? "ADMIN" : "USER"} ACCOUNT
                  </span>
                  <span style={styles.buttonArrow}>➤</span>
                </div>
              )}
            </button>
          </form>

          {/* Social Signup */}
          <div style={styles.socialSection}>
            <div style={styles.socialDivider}>
              <span style={styles.socialDividerText}>OR SIGN UP WITH</span>
            </div>
            <div style={styles.socialGrid}>
              <button 
                style={styles.socialButton}
                type="button"
                onClick={() => console.log('Google signup')}
              >
                <div style={styles.socialButtonGlow}></div>
                <span style={styles.socialIcon}>G</span>
                <span style={styles.socialText}>GOOGLE</span>
              </button>
              <button 
                style={styles.socialButton}
                type="button"
                onClick={() => console.log('Facebook signup')}
              >
                <div style={styles.socialButtonGlow}></div>
                <span style={styles.socialIcon}>f</span>
                <span style={styles.socialText}>FACEBOOK</span>
              </button>
              <button 
                style={styles.socialButton}
                type="button"
                onClick={() => console.log('Apple signup')}
              >
                <div style={styles.socialButtonGlow}></div>
                <span style={styles.socialIcon}>A</span>
                <span style={styles.socialText}>APPLE</span>
              </button>
            </div>
          </div>

          {/* Login Link */}
          <div style={styles.loginPortal}>
            <div style={styles.portalGlow}></div>
            <p style={styles.portalText}>
              ALREADY HAVE AN ACCOUNT?{" "}
              <Link to="/login" style={styles.portalLink}>
                SIGN IN
              </Link>
            </p>
            <p style={styles.portalSubtext}>
              Return to the digital realm
            </p>
          </div>

          {/* Security Status */}
          <div style={styles.securityStatus}>
            <div style={styles.statusIcon}>🛡️</div>
            <div style={styles.statusText}>
              <div style={styles.statusTitle}>SECURITY STATUS: ACTIVE</div>
              <div style={styles.statusDetails}>
                <span>• 256-BIT ENCRYPTION</span>
                <span>• REAL-TIME MONITORING</span>
                <span>• DDOS PROTECTION</span>
              </div>
            </div>
            <div style={styles.statusPulse}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
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
    animation: 'float 15s infinite ease-in-out',
    opacity: 0.3,
  },

  card: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    margin: '20px',
    padding: '40px',
    borderRadius: '40px',
    transition: 'transform 0.1s ease',
    transformStyle: 'preserve-3d',
    zIndex: 10,
    cursor: 'default', // Changed from 'pointer' to 'default' for better UX
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
    marginBottom: '30px',
  },

  logoWrapper: {
    position: 'relative',
    marginBottom: '20px',
  },

  logoGlow: {
    position: 'absolute',
    width: '70px',
    height: '70px',
    top: '-7px',
    left: '-7px',
    background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
    borderRadius: '50%',
    filter: 'blur(15px)',
    animation: 'pulseGlow 3s infinite',
  },

  logoIcon: {
    position: 'relative',
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'float 6s infinite ease-in-out',
  },

  logoPulse: {
    position: 'absolute',
    width: '56px',
    height: '56px',
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

  successMessage: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '16px 20px',
    marginBottom: '24px',
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.3)',
    borderRadius: '16px',
    color: '#d1fae5',
    animation: 'slideIn 0.5s ease',
  },

  successIcon: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(16,185,129,0.2)',
    borderRadius: '50%',
    fontSize: '14px',
  },

  successText: {
    flex: 1,
    fontSize: '14px',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },

  // Role Selection Styles
  roleSection: {
    marginBottom: '10px',
  },

  roleLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#6366f1',
    marginBottom: '15px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },

  roleLabelIcon: {
    fontSize: '20px',
  },

  roleGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
  },

  roleCard: {
    background: 'rgba(20, 20, 40, 0.8)',
    border: '2px solid rgba(99,102,241,0.3)',
    borderRadius: '16px',
    padding: '20px',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },

  roleCardActive: {
    borderColor: '#6366f1',
    background: 'rgba(99,102,241,0.1)',
    transform: 'translateY(-3px) scale(1.02)',
    boxShadow: '0 15px 30px rgba(99,102,241,0.3)',
  },

  roleCardActiveAdmin: {
    borderColor: '#a855f7',
    background: 'rgba(168,85,247,0.1)',
    transform: 'translateY(-3px) scale(1.02)',
    boxShadow: '0 15px 30px rgba(168,85,247,0.3)',
  },

  roleCardGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, rgba(99,102,241,0.2), transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none',
  },

  roleIconContainer: {
    position: 'relative',
  },

  roleIconGlow: {
    position: 'absolute',
    width: '50px',
    height: '50px',
    background: 'radial-gradient(circle, rgba(99,102,241,0.4), transparent 70%)',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    filter: 'blur(15px)',
  },

  roleIcon: {
    fontSize: '40px',
    position: 'relative',
    zIndex: 1,
  },

  roleContent: {
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  },

  roleName: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '4px',
  },

  roleDesc: {
    fontSize: '12px',
    color: '#94a3b8',
    marginBottom: '8px',
  },

  roleStatus: {
    fontSize: '10px',
    fontWeight: '600',
    color: '#ffaa00',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },

  activePulse: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '8px',
    height: '8px',
    background: '#10b981',
    borderRadius: '50%',
    filter: 'blur(1px)',
    boxShadow: '0 0 15px #10b981',
    animation: 'pulse 1.5s infinite',
  },

  // Form Styles
  formGroup: {
    marginBottom: '5px',
  },

  inputLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },

  labelIcon: {
    fontSize: '18px',
    color: '#6366f1',
  },

  labelText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: '1px',
  },

  labelRequired: {
    color: '#ef4444',
    fontSize: '16px',
  },

  labelOptional: {
    color: '#94a3b8',
    fontSize: '12px',
    marginLeft: '8px',
  },

  inputContainer: {
    position: 'relative',
    transition: 'all 0.3s ease',
  },

  inputContainerActive: {
    transform: 'scale(1.02)',
  },

  inputContainerSuccess: {
    '& input': {
      borderColor: '#10b981 !important',
    },
  },

  inputContainerError: {
    '& input': {
      borderColor: '#ef4444 !important',
    },
  },

  inputGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, rgba(99,102,241,0.1), transparent 70%)',
    borderRadius: '12px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    pointerEvents: 'none',
  },

  input: {
    width: '100%',
    padding: '14px 20px',
    paddingRight: '90px',
    border: '2px solid rgba(99,102,241,0.3)',
    borderRadius: '12px',
    fontSize: '16px',
    color: '#ffffff',
    outline: 'none',
    transition: 'all 0.3s ease',
    background: 'rgba(10, 10, 30, 0.8)',
    letterSpacing: '0.5px',
  },

  inputPrefix: {
    position: 'absolute',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    fontSize: '16px',
    zIndex: 2,
  },

  inputScan: {
    position: 'absolute',
    top: '2px',
    left: '2px',
    right: '2px',
    height: '2px',
    background: 'linear-gradient(90deg, transparent, #6366f1, transparent)',
    borderRadius: '12px',
    animation: 'inputScan 2s infinite',
    opacity: 0,
    pointerEvents: 'none',
  },

  inputCheck: {
    position: 'absolute',
    right: '70px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#10b981',
    fontSize: '20px',
    fontWeight: 'bold',
  },

  inputError: {
    position: 'absolute',
    right: '70px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#ef4444',
    fontSize: '20px',
    fontWeight: 'bold',
  },

  inputSpinner: {
    position: 'absolute',
    right: '70px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '18px',
    height: '18px',
    border: '2px solid rgba(99,102,241,0.3)',
    borderTopColor: '#6366f1',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },

  inputHintSuccess: {
    fontSize: '12px',
    color: '#10b981',
    marginTop: '4px',
    marginLeft: '4px',
  },

  inputHintError: {
    fontSize: '12px',
    color: '#ef4444',
    marginTop: '4px',
    marginLeft: '4px',
  },

  visibilityButton: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(99,102,241,0.1)',
    border: '1px solid rgba(99,102,241,0.3)',
    borderRadius: '8px',
    padding: '6px 12px',
    color: '#6366f1',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.3s ease',
    zIndex: 3,
  },

  visibilityIcon: {
    fontSize: '16px',
  },

  visibilityText: {
    letterSpacing: '0.5px',
  },

  // Password Strength
  strengthContainer: {
    marginTop: '10px',
    padding: '12px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
  },

  strengthHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },

  strengthLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  strengthValue: {
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },

  strengthBars: {
    display: 'flex',
    gap: '6px',
  },

  strengthBar: {
    flex: 1,
    height: '4px',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
  },

  // Terms Container
  termsContainer: {
    marginTop: '10px',
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },

  cyberCheckbox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    cursor: 'pointer',
  },

  checkboxCore: {
    width: '22px',
    height: '22px',
    borderRadius: '6px',
    position: 'relative',
    transition: 'all 0.4s ease',
    flexShrink: 0,
  },

  checkboxDot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '10px',
    height: '10px',
    background: '#ffffff',
    borderRadius: '2px',
    boxShadow: '0 0 10px #ffffff',
  },

  checkboxLabel: {
    fontSize: '14px',
    color: '#e2e8f0',
    lineHeight: 1.5,
  },

  termsLink: {
    color: '#6366f1',
    textDecoration: 'none',
    fontWeight: '600',
  },

  // Submit Button
  submitButton: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
    border: 'none',
    borderRadius: '16px',
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    cursor: 'pointer',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginTop: '10px',
  },

  buttonGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
    top: 0,
    left: 0,
  },

  buttonParticles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },

  buttonParticle: {
    position: 'absolute',
    width: '4px',
    height: '4px',
    background: '#ffffff',
    borderRadius: '50%',
    animation: 'buttonParticle 1s infinite ease-out',
    opacity: 0,
  },

  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    position: 'relative',
    zIndex: 1,
  },

  holographicSpinner: {
    position: 'relative',
    width: '30px',
    height: '30px',
  },

  spinnerRing1: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 1.5s linear infinite',
  },

  spinnerRing2: {
    position: 'absolute',
    width: '70%',
    height: '70%',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#a855f7',
    borderRadius: '50%',
    top: '15%',
    left: '15%',
    animation: 'spin 1s linear infinite reverse',
  },

  spinnerCore: {
    position: 'absolute',
    width: '20%',
    height: '20%',
    background: 'radial-gradient(circle, #6366f1, #a855f7)',
    borderRadius: '50%',
    top: '40%',
    left: '40%',
    boxShadow: '0 0 15px rgba(99,102,241,0.5)',
  },

  loadingText: {
    color: '#ffffff',
    fontWeight: '600',
    letterSpacing: '2px',
    fontSize: '14px',
  },

  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    position: 'relative',
    zIndex: 1,
  },

  buttonIcon: {
    fontSize: '20px',
  },

  buttonText: {
    fontSize: '15px',
  },

  buttonArrow: {
    fontSize: '20px',
    animation: 'arrowPulse 1.5s infinite',
  },

  // Social Section
  socialSection: {
    marginTop: '30px',
  },

  socialDivider: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    margin: '20px 0',
  },

  socialDividerText: {
    padding: '0 20px',
    fontSize: '13px',
    color: '#a855f7',
    background: 'rgba(15, 23, 42, 0.8)',
    position: 'relative',
    zIndex: 1,
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },

  socialGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
  },

  socialButton: {
    padding: '12px',
    background: 'rgba(30, 30, 60, 0.8)',
    border: '2px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },

  socialButtonGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, rgba(99,102,241,0.1), transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    top: 0,
    left: 0,
  },

  socialIcon: {
    fontSize: '18px',
    fontWeight: 'bold',
  },

  socialText: {
    fontSize: '12px',
  },

  // Login Portal
  loginPortal: {
    textAlign: 'center',
    padding: '20px',
    background: 'rgba(99,102,241,0.05)',
    borderRadius: '16px',
    border: '2px solid rgba(99,102,241,0.2)',
    marginTop: '25px',
    position: 'relative',
    overflow: 'hidden',
  },

  portalGlow: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at center, rgba(99,102,241,0.1), transparent 70%)',
    top: 0,
    left: 0,
    animation: 'portalPulse 3s infinite',
    pointerEvents: 'none',
  },

  portalText: {
    fontSize: '16px',
    color: '#ffffff',
    marginBottom: '5px',
    position: 'relative',
    zIndex: 1,
  },

  portalLink: {
    color: '#6366f1',
    fontWeight: '700',
    textDecoration: 'none',
    fontSize: '16px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginLeft: '5px',
  },

  portalSubtext: {
    fontSize: '12px',
    color: '#94a3b8',
    position: 'relative',
    zIndex: 1,
  },

  // Security Status
  securityStatus: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '15px',
    background: 'rgba(20, 20, 40, 0.8)',
    borderRadius: '16px',
    border: '2px solid rgba(16,185,129,0.3)',
    position: 'relative',
    overflow: 'hidden',
    marginTop: '25px',
  },

  statusIcon: {
    fontSize: '32px',
    color: '#10b981',
    filter: 'drop-shadow(0 0 10px rgba(16,185,129,0.5))',
  },

  statusText: {
    flex: 1,
  },

  statusTitle: {
    fontSize: '14px',
    fontWeight: '700',
    color: '#10b981',
    marginBottom: '4px',
    letterSpacing: '0.5px',
  },

  statusDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
    fontSize: '10px',
    color: '#94a3b8',
  },

  statusPulse: {
    position: 'absolute',
    width: '12px',
    height: '12px',
    background: '#10b981',
    borderRadius: '50%',
    right: '15px',
    filter: 'blur(2px)',
    boxShadow: '0 0 20px #10b981',
    animation: 'pulse 2s infinite',
  },
};

// Global animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }

  @keyframes pulseGlow {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.1); }
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(1.5); opacity: 0; }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes rotateSlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-4px); }
    75% { transform: translateX(4px); }
  }

  @keyframes slideIn {
    0% { opacity: 0; transform: translateY(-8px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateX(8px); }
    100% { opacity: 1; transform: translateX(0); }
  }

  @keyframes inputScan {
    0%, 100% { opacity: 0; transform: translateX(-100%); }
    50% { opacity: 1; }
    100% { opacity: 0; transform: translateX(100%); }
  }

  @keyframes buttonParticle {
    0% { opacity: 0; transform: translate(0, 0); }
    10% { opacity: 1; }
    100% { opacity: 0; transform: translate(var(--tx, 100px), var(--ty, -100px)); }
  }

  @keyframes arrowPulse {
    0%, 100% { opacity: 0.5; transform: translateX(0); }
    50% { opacity: 1; transform: translateX(5px); }
  }

  @keyframes portalPulse {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.2; }
  }

  /* Button Particles */
  .buttonParticle:nth-child(1) { --tx: 80px; --ty: -80px; top: 20%; left: 20%; }
  .buttonParticle:nth-child(2) { --tx: -80px; --ty: -80px; top: 20%; left: 80%; }
  .buttonParticle:nth-child(3) { --tx: 80px; --ty: 80px; top: 80%; left: 20%; }
  .buttonParticle:nth-child(4) { --tx: -80px; --ty: 80px; top: 80%; left: 80%; }
  .buttonParticle:nth-child(5) { --tx: 0; --ty: -80px; top: 10%; left: 50%; }
  .buttonParticle:nth-child(6) { --tx: 0; --ty: 80px; top: 90%; left: 50%; }
  .buttonParticle:nth-child(7) { --tx: 80px; --ty: 0; top: 50%; left: 10%; }
  .buttonParticle:nth-child(8) { --tx: -80px; --ty: 0; top: 50%; left: 90%; }

  /* Interactive Styles */
  input:hover {
    border-color: rgba(99, 102, 241, 0.6) !important;
  }

  input:focus {
    border-color: #6366f1 !important;
    box-shadow: 0 0 20px rgba(99, 102, 241, 0.2);
  }

  input:focus ~ .inputGlow {
    opacity: 1;
  }

  input:focus ~ .inputScan {
    opacity: 1;
  }

  .roleCard:hover .roleCardGlow {
    opacity: 1;
  }

  .visibilityButton:hover {
    background: rgba(99, 102, 241, 0.2);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
  }

  .cyberCheckbox:hover .checkboxCore {
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
  }

  .submitButton:hover:not(:disabled) .buttonGlow {
    transform: translateX(100%);
  }

  .submitButton:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(99, 102, 241, 0.4);
  }

  .socialButton:hover .socialButtonGlow {
    opacity: 1;
  }

  .socialButton:hover {
    border-color: rgba(99, 102, 241, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.2);
  }

  .portalLink:hover {
    text-shadow: 0 0 15px rgba(99, 102, 241, 0.8);
  }

  .termsLink:hover {
    color: #a855f7;
  }

  .errorClose:hover {
    background: rgba(239,68,68,0.3);
    transform: scale(1.1);
  }

  /* Divider Lines */
  .socialDivider::before,
  .socialDivider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(168,85,247,0.3), transparent);
  }
`;

// Only add styleSheet if it doesn't exist
if (!document.head.querySelector('#signup-styles')) {
  styleSheet.id = 'signup-styles';
  document.head.appendChild(styleSheet);
}

export default Signup;