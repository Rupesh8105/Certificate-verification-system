import { useState } from "react";

const certDB = {
  "CERT-2026-001": { title: "Full Stack Web Development",      issued: "15 Jan 2026" },
  "CERT-2026-042": { title: "Data Science & Machine Learning", issued: "20 Mar 2026" },
  "CERT-2025-118": { title: "Cybersecurity Fundamentals",      issued: "10 Aug 2025" },
};

export default function App() {
  const [page, setPage]       = useState("hero");
  const [users, setUsers]     = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  const [regForm, setRegForm] = useState({
    fname:"", lname:"", email:"", dob:"", certno:"", phone:"", pass:"", cpass:""
  });
  const [loginForm, setLoginForm] = useState({ email:"", pass:"" });
  const [regErr,   setRegErr]   = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [regOk,    setRegOk]    = useState(false);

  const handleReg = (e) => setRegForm({ ...regForm, [e.target.name]: e.target.value });
  const handleLog = (e) => setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  function doRegister() {
    const { fname, lname, email, dob, certno, phone, pass, cpass } = regForm;
    const cn = certno.trim().toUpperCase();
    setRegErr("");
    if (!fname||!lname||!email||!dob||!cn||!pass) return setRegErr("Please fill in all required fields.");
    if (!certDB[cn])       return setRegErr("Invalid Certificate Number. Try: CERT-2026-001");
    if (pass !== cpass)    return setRegErr("Passwords do not match.");
    if (pass.length < 6)   return setRegErr("Password must be at least 6 characters.");
    if (users[email])      return setRegErr("This email is already registered.");

    const today = new Date();
    const newUser = {
      fname, lname, email, dob, certno: cn, phone, pass,
      joined: today.toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })
    };
    setUsers(prev => ({ ...prev, [email]: newUser }));
    setRegOk(true);
    setTimeout(() => {
      setRegOk(false);
      setLoginForm({ email, pass: "" });
      setPage("login");
    }, 1500);
  }

  function doLogin() {
    const { email, pass } = loginForm;
    setLoginErr("");
    if (!email || !pass) return setLoginErr("Please enter your email and password.");
    const user = users[email];
    if (!user || user.pass !== pass) return setLoginErr("Incorrect email or password.");
    setCurrentUser(user);
    setPage("dashboard");
  }

  function doLogout() {
    setCurrentUser(null);
    setLoginForm({ email: "", pass: "" });
    setPage("hero");
  }

  const styles = {
    body:      { fontFamily:"'Segoe UI',Tahoma,sans-serif", background:"linear-gradient(160deg,#e8f0fe 0%,#dbeafe 40%,#eff6ff 100%)", minHeight:"100vh" },
    abar:      { background:"#1a1a2e", color:"#fff", textAlign:"center", padding:"10px 16px", fontSize:13, fontWeight:500 },
    navbar:    { background:"rgba(255,255,255,0.95)", borderBottom:"1.5px solid #bfdbfe", padding:"0 32px", height:64, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100 },
    logoWrap:  { display:"flex", alignItems:"center", gap:8 },
    logoIcon:  { width:34, height:34, position:"relative", display:"grid", gridTemplateColumns:"1fr 1fr", gridTemplateRows:"1fr 1fr", gap:3 },
    q1: { background:"#e74c3c", borderRadius:"4px 4px 0 0" },
    q2: { background:"#3498db", borderRadius:"4px 4px 0 0" },
    q3: { background:"#2ecc71", borderRadius:"0 0 4px 4px" },
    q4: { background:"#e67e22", borderRadius:"0 0 4px 4px" },
    cdot: { position:"absolute", width:11, height:11, background:"#fff", borderRadius:"50%", top:"50%", left:"50%", transform:"translate(-50%,-50%)" },
    logoText:  { fontSize:21, fontWeight:800, letterSpacing:"-0.02em" },
    btnNav:    { padding:"9px 22px", background:"transparent", border:"2px solid #1a1a2e", borderRadius:22, fontSize:13, fontWeight:700, cursor:"pointer", color:"#1a1a2e" },
    hero:      { textAlign:"center", padding:"64px 24px 44px" },
    heroSm:    { textAlign:"center", padding:"32px 24px 18px" },
    badge:     { display:"inline-block", border:"2px solid #1a1a2e", borderRadius:22, padding:"8px 22px", fontSize:13, fontWeight:600, color:"#1a1a2e", marginBottom:26 },
    h1:        { fontSize:32, fontWeight:900, color:"#0f172a", lineHeight:1.2, marginBottom:18 },
    h2:        { fontSize:22, fontWeight:800, color:"#0f172a" },
    heroPara:  { fontSize:15, color:"#475569", maxWidth:520, margin:"0 auto 34px", lineHeight:1.8 },
    heroBtns:  { display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:22 },
    btnPrimary:{ padding:"14px 34px", background:"#2563eb", color:"#fff", border:"none", borderRadius:9, fontSize:15, fontWeight:700, cursor:"pointer" },
    btnSec:    { padding:"14px 34px", background:"#fff", color:"#0f172a", border:"2px solid #cbd5e1", borderRadius:9, fontSize:15, fontWeight:600, cursor:"pointer" },
    trust:     { fontSize:12, color:"#94a3b8" },
    formWrap:  { padding:"8px 16px 44px", maxWidth:530, margin:"0 auto" },
    card:      { background:"#fff", border:"1.5px solid #bfdbfe", borderRadius:18, padding:"1.8rem", boxShadow:"0 6px 32px rgba(37,99,235,0.09)" },
    field:     { marginBottom:"1rem" },
    lbl:       { display:"block", fontSize:13, color:"#475569", marginBottom:6, fontWeight:600 },
    input:     { width:"100%", height:44, padding:"0 14px", fontSize:14, border:"1.5px solid #bfdbfe", borderRadius:9, background:"#f0f7ff", color:"#0f172a", outline:"none", fontFamily:"'Segoe UI',Tahoma,sans-serif" },
    row2:      { display:"grid", gridTemplateColumns:"1fr 1fr", gap:13 },
    hint:      { fontSize:11, color:"#94a3b8", marginTop:5 },
    btnSub:    { width:"100%", height:46, background:"#2563eb", color:"#fff", border:"none", borderRadius:9, fontSize:15, fontWeight:700, cursor:"pointer", marginTop:8, fontFamily:"'Segoe UI',Tahoma,sans-serif" },
    btnOut:    { width:"100%", height:46, background:"#fff", color:"#2563eb", border:"1.5px solid #bfdbfe", borderRadius:9, fontSize:14, fontWeight:600, cursor:"pointer", marginTop:10, fontFamily:"'Segoe UI',Tahoma,sans-serif" },
    swTxt:     { textAlign:"center", fontSize:13, color:"#64748b", marginTop:15 },
    swLink:    { color:"#2563eb", cursor:"pointer", fontWeight:700 },
    err:       { fontSize:12, color:"#dc2626", marginTop:10, background:"#fef2f2", padding:"10px 14px", borderRadius:8, border:"1px solid #fecaca" },
    okMsg:     { fontSize:13, color:"#16a34a", background:"#f0fdf4", padding:"11px 14px", borderRadius:9, border:"1px solid #bbf7d0", marginBottom:"1rem" },
    secLbl:    { fontSize:11, fontWeight:800, color:"#2563eb", marginBottom:10, textTransform:"uppercase", letterSpacing:"0.08em" },
    divider:   { border:"none", borderTop:"1.5px solid #e2e8f0", margin:"1.2rem 0" },
    steps:     { display:"flex", alignItems:"flex-start", justifyContent:"center", gap:6, marginBottom:"1.4rem" },
    swWrap:    { display:"flex", flexDirection:"column", alignItems:"center", gap:5 },
    step:      { width:33, height:33, borderRadius:"50%", border:"2px solid #bfdbfe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#93c5fd", background:"#fff" },
    stepActive:{ width:33, height:33, borderRadius:"50%", border:"2px solid #2563eb", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", background:"#2563eb" },
    stepDone:  { width:33, height:33, borderRadius:"50%", border:"2px solid #86efac", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#16a34a", background:"#f0fdf4" },
    sLbl:      { fontSize:11, color:"#94a3b8" },
    sLblA:     { fontSize:11, color:"#2563eb", fontWeight:700 },
    sLine:     { width:46, height:2, background:"#bfdbfe", marginTop:15 },
    dashTop:   { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.3rem" },
    dashH3:    { fontSize:21, fontWeight:800, color:"#0f172a" },
    btnLo:     { padding:"9px 20px", background:"#fff", border:"1.5px solid #bfdbfe", borderRadius:9, fontSize:13, cursor:"pointer", color:"#2563eb", fontWeight:700, fontFamily:"'Segoe UI',Tahoma,sans-serif" },
    pcard:     { background:"#fff", border:"1.5px solid #bfdbfe", borderRadius:18, padding:"1.6rem", marginBottom:"1.1rem", boxShadow:"0 6px 32px rgba(37,99,235,0.09)" },
    ptop:      { display:"flex", alignItems:"center", gap:15, marginBottom:"1.3rem" },
    avatar:    { width:56, height:56, borderRadius:"50%", background:"#dbeafe", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, fontWeight:800, color:"#2563eb", flexShrink:0 },
    pname:     { fontSize:17, fontWeight:800, color:"#0f172a" },
    pid:       { fontSize:12, color:"#64748b", fontFamily:"'Courier New',monospace", marginTop:3 },
    igrid:     { display:"grid", gridTemplateColumns:"1fr 1fr", gap:15 },
    iLbl:      { fontSize:10, color:"#94a3b8", display:"block", marginBottom:3, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:700 },
    iSpan:     { fontSize:14, color:"#0f172a", fontWeight:700 },
    ccard:     { background:"linear-gradient(135deg,#eff6ff,#dbeafe)", border:"1.5px solid #bfdbfe", borderRadius:18, padding:"1.3rem", marginBottom:"1rem" },
    cch:       { display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:11 },
    cct:       { fontSize:15, fontWeight:800, color:"#0f172a" },
    validBadge:{ background:"#f0fdf4", color:"#16a34a", fontSize:12, padding:"5px 14px", borderRadius:22, fontWeight:700, border:"1px solid #86efac" },
    cmeta:     { display:"flex", gap:18, flexWrap:"wrap" },
    cmi:       { fontSize:12, color:"#64748b" },
    cmiSpan:   { color:"#0f172a", fontWeight:700 },
  };

  const cert = currentUser ? certDB[currentUser.certno] : null;
  const dob  = currentUser ? currentUser.dob.split('-') : [];

  return (
    <div style={styles.body}>
      {/* Announcement Bar */}
      <div style={styles.abar}>🚀 New Announcement: Certificate Verification System is now live!</div>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>
            <div style={styles.q1}></div><div style={styles.q2}></div>
            <div style={styles.q3}></div><div style={styles.q4}></div>
            <div style={styles.cdot}></div>
          </div>
          <div style={styles.logoText}>
            <span style={{color:"#e74c3c"}}>m</span>
            <span style={{color:"#e67e22"}}>a</span>
            <span style={{color:"#2ecc71"}}>t</span>
            <span style={{color:"#3498db"}}>n</span>
            <span style={{color:"#9b59b6"}}>i</span>
            <span style={{color:"#1a1a2e"}}>te</span>
          </div>
        </div>
        <div style={{display:"flex",gap:4}}>
          <button style={{padding:"7px 15px",fontSize:14,color:"#1a1a2e",border:"none",background:"transparent",cursor:"pointer",borderRadius:8,fontWeight:500}}>Product ∨</button>
          <button style={{padding:"7px 15px",fontSize:14,color:"#1a1a2e",border:"none",background:"transparent",cursor:"pointer",borderRadius:8,fontWeight:500}}>Company ∨</button>
        </div>
        <button style={styles.btnNav} onClick={() => setPage("login")}>Sign In →</button>
      </nav>

      {/* HERO */}
      {page === "hero" && (
        <div style={styles.hero}>
          <div style={styles.badge}>India's Trusted Certificate Verification Platform</div>
          <h1 style={styles.h1}>Verify • Register • Authenticate<br/>Your Certificates Instantly</h1>
          <p style={styles.heroPara}>A powerful and secure platform for organizations to issue and verify certificates.</p>
          <div style={styles.heroBtns}>
            <button style={styles.btnPrimary} onClick={() => setPage("register")}>Get Started →</button>
            <button style={styles.btnSec}     onClick={() => setPage("login")}>Sign In</button>
          </div>
          <div style={styles.trust}>Trusted by 500+ Organizations • Secure Verification • AI Powered</div>
        </div>
      )}

      {/* REGISTER */}
      {page === "register" && (
        <>
          <div style={styles.heroSm}>
            <div style={styles.badge}>Create Account</div>
            <h2 style={styles.h2}>Register to Verify Your Certificate</h2>
          </div>
          <div style={styles.steps}>
            <div style={styles.swWrap}><div style={styles.stepActive}>1</div><span style={styles.sLblA}>Register</span></div>
            <div style={styles.sLine}></div>
            <div style={styles.swWrap}><div style={styles.step}>2</div><span style={styles.sLbl}>Login</span></div>
            <div style={styles.sLine}></div>
            <div style={styles.swWrap}><div style={styles.step}>3</div><span style={styles.sLbl}>Dashboard</span></div>
          </div>
          <div style={styles.formWrap}>
            <div style={styles.card}>
              {regOk && <div style={styles.okMsg}>✅ Registration successful! Redirecting...</div>}
              <div style={styles.secLbl}>Personal Information</div>
              <div style={styles.row2}>
                <div style={styles.field}><label style={styles.lbl}>First Name *</label><input style={styles.input} name="fname" placeholder="John" value={regForm.fname} onChange={handleReg}/></div>
                <div style={styles.field}><label style={styles.lbl}>Last Name *</label><input style={styles.input} name="lname" placeholder="Doe" value={regForm.lname} onChange={handleReg}/></div>
              </div>
              <div style={styles.field}><label style={styles.lbl}>Email Address *</label><input style={styles.input} type="email" name="email" placeholder="john@example.com" value={regForm.email} onChange={handleReg}/></div>
              <div style={styles.row2}>
                <div style={styles.field}><label style={styles.lbl}>Date of Birth *</label><input style={styles.input} type="date" name="dob" value={regForm.dob} onChange={handleReg}/></div>
                <div style={styles.field}><label style={styles.lbl}>Mobile Number</label><input style={styles.input} type="tel" name="phone" placeholder="9876543210" value={regForm.phone} onChange={handleReg}/></div>
              </div>
              <div style={styles.divider}></div>
              <div style={styles.secLbl}>Certificate Details</div>
              <div style={styles.field}>
                <label style={styles.lbl}>Certificate Number *</label>
                <input style={styles.input} name="certno" placeholder="CERT-2024-001" value={regForm.certno} onChange={handleReg}/>
                <p style={styles.hint}>Valid: CERT-2024-001 / CERT-2024-042 / CERT-2023-118</p>
              </div>
              <div style={styles.divider}></div>
              <div style={styles.secLbl}>Account Security</div>
              <div style={styles.row2}>
                <div style={styles.field}><label style={styles.lbl}>Password *</label><input style={styles.input} type="password" name="pass" placeholder="Min. 6 characters" value={regForm.pass} onChange={handleReg}/></div>
                <div style={styles.field}><label style={styles.lbl}>Confirm Password *</label><input style={styles.input} type="password" name="cpass" placeholder="Repeat password" value={regForm.cpass} onChange={handleReg}/></div>
              </div>
              {regErr && <div style={styles.err}>{regErr}</div>}
              <button style={styles.btnSub} onClick={doRegister}>Create Account</button>
              <button style={styles.btnOut} onClick={() => setPage("hero")}>← Back to Home</button>
              <p style={styles.swTxt}>Already have an account? <span style={styles.swLink} onClick={() => setPage("login")}>Sign in</span></p>
            </div>
          </div>
        </>
      )}

      {/* LOGIN */}
      {page === "login" && (
        <>
          <div style={styles.heroSm}>
            <div style={styles.badge}>Welcome Back</div>
            <h2 style={styles.h2}>Sign in to Your Account</h2>
          </div>
          <div style={styles.steps}>
            <div style={styles.swWrap}><div style={styles.stepDone}>✓</div><span style={styles.sLbl}>Register</span></div>
            <div style={styles.sLine}></div>
            <div style={styles.swWrap}><div style={styles.stepActive}>2</div><span style={styles.sLblA}>Login</span></div>
            <div style={styles.sLine}></div>
            <div style={styles.swWrap}><div style={styles.step}>3</div><span style={styles.sLbl}>Dashboard</span></div>
          </div>
          <div style={styles.formWrap}>
            <div style={styles.card}>
              <div style={styles.field}><label style={styles.lbl}>Email Address *</label><input style={styles.input} type="email" name="email" placeholder="john@example.com" value={loginForm.email} onChange={handleLog}/></div>
              <div style={styles.field}><label style={styles.lbl}>Password *</label><input style={styles.input} type="password" name="pass" placeholder="Enter your password" value={loginForm.pass} onChange={handleLog} onKeyPress={e => e.key==="Enter" && doLogin()}/></div>
              {loginErr && <div style={styles.err}>{loginErr}</div>}
              <button style={styles.btnSub} onClick={doLogin}>Sign In</button>
              <button style={styles.btnOut} onClick={() => setPage("register")}>← Back to Register</button>
              <p style={styles.swTxt}>Don't have an account? <span style={styles.swLink} onClick={() => setPage("register")}>Register now</span></p>
            </div>
          </div>
        </>
      )}

      {/* DASHBOARD */}
      {page === "dashboard" && currentUser && (
        <div style={{...styles.formWrap, maxWidth:560, paddingTop:28}}>
          <div style={styles.dashTop}>
            <h3 style={styles.dashH3}>My Dashboard</h3>
            <button style={styles.btnLo} onClick={doLogout}>Logout</button>
          </div>
          <div style={styles.steps}>
            <div style={styles.swWrap}><div style={styles.stepDone}>✓</div><span style={styles.sLbl}>Register</span></div>
            <div style={styles.sLine}></div>
            <div style={styles.swWrap}><div style={styles.stepDone}>✓</div><span style={styles.sLbl}>Login</span></div>
            <div style={styles.sLine}></div>
            <div style={styles.swWrap}><div style={styles.stepActive}>3</div><span style={styles.sLblA}>Dashboard</span></div>
          </div>
          <div style={styles.pcard}>
            <div style={styles.ptop}>
              <div style={styles.avatar}>{(currentUser.fname[0]+currentUser.lname[0]).toUpperCase()}</div>
              <div>
                <div style={styles.pname}>{currentUser.fname} {currentUser.lname}</div>
                <div style={styles.pid}>{currentUser.certno}</div>
              </div>
            </div>
            <div style={styles.divider}></div>
            <div style={styles.secLbl}>Personal Details</div>
            <div style={styles.igrid}>
              <div><label style={styles.iLbl}>Email</label><span style={styles.iSpan}>{currentUser.email}</span></div>
              <div><label style={styles.iLbl}>Date of Birth</label><span style={styles.iSpan}>{dob[2]}/{dob[1]}/{dob[0]}</span></div>
              <div><label style={styles.iLbl}>Mobile</label><span style={styles.iSpan}>{currentUser.phone || "Not provided"}</span></div>
              <div><label style={styles.iLbl}>Member Since</label><span style={styles.iSpan}>{currentUser.joined}</span></div>
            </div>
          </div>
          <div style={styles.ccard}>
            <div style={styles.cch}>
              <div style={styles.cct}>{cert.title}</div>
              <span style={styles.validBadge}>✓ Valid</span>
            </div>
            <div style={styles.cmeta}>
              <div style={styles.cmi}>Certificate No: <span style={styles.cmiSpan}>{currentUser.certno}</span></div>
              <div style={styles.cmi}>Issued On: <span style={styles.cmiSpan}>{cert.issued}</span></div>
              <div style={styles.cmi}>Issued By: <span style={styles.cmiSpan}>TechCorp India Pvt. Ltd.</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}