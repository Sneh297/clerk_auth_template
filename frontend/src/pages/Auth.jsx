import React, { useEffect, useRef } from "react";
import { SignedOut, SignInButton, SignUpButton, SignedIn, useUser } from "@clerk/clerk-react";
import {Navigate }from 'react-router-dom'

export default function Auth({companyName}) {


    const { isLoaded, isSignedIn } = useUser();

  // ⛔ Prevent UI from rendering until Clerk is fully ready
  if (!isLoaded) return null;

  // ✅ Instantly redirect if already logged in
  if (isSignedIn) return <Navigate to="/dashboard" replace />;


  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.2 + 0.2,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.4 + 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>

     
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        html, body, #root {
          margin: 0 !important;
          padding: 0 !important;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .auth-wrap {
          font-family: 'Outfit', sans-serif;
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #06060f;
          overflow: hidden;
        }

        .auth-canvas {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(110px);
          z-index: 0;
        }
        .b1 {
          width: 640px; height: 640px;
          background: #3b0ca8;
          top: -200px; left: -180px;
          opacity: 0.5;
          animation: floatA 14s ease-in-out infinite alternate;
        }
        .b2 {
          width: 520px; height: 520px;
          background: #6d28d9;
          bottom: -160px; right: -130px;
          opacity: 0.4;
          animation: floatB 18s ease-in-out infinite alternate;
        }
        .b3 {
          width: 340px; height: 340px;
          background: #0e7490;
          top: 50%; left: 58%;
          opacity: 0.18;
          animation: floatC 22s ease-in-out infinite alternate;
        }
        @keyframes floatA { to { transform: translate(70px, 110px); } }
        @keyframes floatB { to { transform: translate(-60px, -80px); } }
        @keyframes floatC { to { transform: translate(-100px, 60px); } }

        .auth-grid {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 75% 75% at 50% 50%, black 30%, transparent 100%);
        }

        /* Card */
        .auth-card {
          position: relative;
          z-index: 10;
          width: min(400px, 90vw);
          border-radius: 20px;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          box-shadow:
            0 0 0 1px rgba(109,40,217,0.18),
            0 48px 96px rgba(0,0,0,0.65),
            0 0 140px rgba(59,12,168,0.12);
          animation: rise 0.8s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes rise {
          from { opacity: 0; transform: translateY(36px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .card-topbar {
          height: 2px;
          background: linear-gradient(90deg, transparent, #7c3aed 30%, #a855f7 65%, #22d3ee, transparent);
        }

        .card-body {
          padding: 40px 36px 36px;
        }

        .auth-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          animation: rise 0.7s 0.1s cubic-bezier(0.22,1,0.36,1) both;
        }
        .badge-ring {
          width: 52px; height: 52px;
          border-radius: 14px;
          background: linear-gradient(135deg, #4c1d95, #7c3aed);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 0 0 8px rgba(124,58,237,0.1), 0 8px 28px rgba(124,58,237,0.45);
        }
        .badge-ring svg { width: 26px; height: 26px; }

        .auth-title {
          font-size: clamp(2rem, 5vw, 2.4rem);
          font-weight: 800;
          color: #fff;
          text-align: center;
          letter-spacing: -0.04em;
          line-height: 1.12;
          margin-bottom: 10px;
          animation: rise 0.7s 0.15s cubic-bezier(0.22,1,0.36,1) both;
        }
        .auth-title .hi {
          background: linear-gradient(120deg, #c4b5fd, #67e8f9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .auth-sub {
          text-align: center;
          color: rgba(255,255,255,0.32);
          font-size: 0.87rem;
          font-weight: 400;
          margin-bottom: 30px;
          animation: rise 0.7s 0.2s cubic-bezier(0.22,1,0.36,1) both;
        }

        .auth-sep {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
          animation: rise 0.7s 0.25s cubic-bezier(0.22,1,0.36,1) both;
        }
        .auth-sep::before, .auth-sep::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }
        .auth-sep span {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.16);
        }

        .auth-btns {
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: rise 0.7s 0.3s cubic-bezier(0.22,1,0.36,1) both;
        }

        .btn {
          width: 100%;
          padding: 13px 20px;
          border-radius: 10px;
          font-family: 'Outfit', sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          letter-spacing: 0.01em;
          position: relative;
          overflow: hidden;
        }
        .btn:active { transform: scale(0.97) !important; }

        .btn-signin {
          background: linear-gradient(135deg, #5b21b6 0%, #7c3aed 55%, #8b5cf6 100%);
          color: #fff;
          box-shadow: 0 4px 20px rgba(91,33,182,0.45), inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .btn-signin::after {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0);
          transition: background 0.2s;
        }
        .btn-signin:hover::after { background: rgba(255,255,255,0.07); }
        .btn-signin:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(91,33,182,0.6), inset 0 1px 0 rgba(255,255,255,0.14);
        }

        .btn-signup {
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.55);
          border: 1px solid rgba(255,255,255,0.07);
        }
        .btn-signup:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.85);
          border-color: rgba(255,255,255,0.14);
          transform: translateY(-1px);
        }

        .auth-footer {
          margin-top: 22px;
          text-align: center;
          font-size: 0.71rem;
          color: rgba(255,255,255,0.15);
          animation: rise 0.7s 0.35s cubic-bezier(0.22,1,0.36,1) both;
        }
        .auth-footer a {
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.15s;
        }
        .auth-footer a:hover { color: rgba(255,255,255,0.6); }
      `}</style>

      <div className="auth-wrap">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="auth-grid" />
        <canvas className="auth-canvas" ref={canvasRef} />

        <SignedOut>
          <div className="auth-card">
            <div className="card-topbar" />
            <div className="card-body">

              <div className="auth-badge">
                <div className="badge-ring">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <h1 className="auth-title">
                Welcome   <span className="hi">back.</span>
                <br/>
               Access your  <br />{companyName} account.<br />
               
              </h1>
              <p className="auth-sub">Sign in to continue or create a new account</p>

              <div className="auth-sep"><span>continue with</span></div>
        
             <div className="auth-btns">

  <SignInButton mode="modal" forceRedirectUrl="/dashboard">
  <button className="
    w-full flex items-center justify-center gap-2
    py-3 px-4 rounded-xl font-semibold
    bg-violet-600 hover:bg-violet-700
    text-white shadow-lg hover:shadow-xl
    transition-all active:scale-[0.97]
  ">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
      <polyline points="10 17 15 12 10 7"/>
      <line x1="15" y1="12" x2="3" y2="12"/>
    </svg>
    Sign In
  </button>
</SignInButton>

  <SignUpButton mode="modal" forceRedirectUrl="/dashboard">
  <button className="
    w-full flex items-center justify-center gap-2
    py-3 px-4 rounded-xl font-semibold
    bg-white/10 text-white/80
    border border-white/20
    hover:bg-white/20 hover:text-white
    transition-all active:scale-[0.97]
  ">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <line x1="19" y1="8" x2="19" y2="14"/>
      <line x1="22" y1="11" x2="16" y2="11"/>
    </svg>
    Create Account
  </button>
</SignUpButton>

</div>
              <div className="auth-footer">
                By continuing you agree to our{" "}
                <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>
              </div>
            </div>
          </div>
        </SignedOut>  
      </div>
    </>
  );
}