import React, { useState } from "react";
import { Home, Search, MessageCircle, User, Plus, Flame, Heart, MessageSquare, Share2, Bookmark, Eye, EyeOff, Dumbbell } from "lucide-react";

// ---- Design tokens ----
const C = {
  bg: "#0A0A0B",
  surface: "#1C1B1A",
  text: "#F5F2EA",
  accent: "#E8472B",
  textSecondary: "#8A8580",
  border: "#3D3935",
};

function ChamferCard({ children, className = "" }) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundColor: C.surface,
        border: `1px solid ${C.border}`,
        clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)",
      }}
    >
      {children}
    </div>
  );
}

const MOCK_POSTS = [
  {
    id: 1,
    name: "Carla Reyes",
    handle: "@carla.lifts",
    time: "hace 2 h",
    isCreator: true,
    tag: "PULL DAY",
    caption: "Hoy peso muerto a 120kg x5. La técnica antes que el ego, siempre. 💪",
    likes: 248,
    comments: 32,
    liked: false,
    saved: false,
  },
  {
    id: 2,
    name: "Diego Mora",
    handle: "@diego.fit",
    time: "hace 5 h",
    isCreator: false,
    tag: "PRINCIPIANTE",
    caption: "Tercera semana de rutina. ¿Algún consejo para mejorar mi sentadilla?",
    likes: 56,
    comments: 19,
    liked: true,
    saved: false,
  },
  {
    id: 3,
    name: "Ana Torres",
    handle: "@ana.strength",
    time: "hace 1 d",
    isCreator: true,
    tag: "NUTRICIÓN",
    caption: "3 errores que veo todo el tiempo en principiantes al calcular sus macros.",
    likes: 410,
    comments: 64,
    liked: false,
    saved: true,
  },
];

function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [role, setRole] = useState("beginner");
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="flex flex-col min-h-screen px-6 pt-16 pb-10" style={{ backgroundColor: C.bg, color: C.text }}>
      <div className="flex items-center gap-2 mb-10">
        <div
          className="flex items-center justify-center w-10 h-10"
          style={{ backgroundColor: C.accent, clipPath: "polygon(0 0, 80% 0, 100% 20%, 100% 100%, 0 100%)" }}
        >
          <Dumbbell size={20} color={C.bg} strokeWidth={2.5} />
        </div>
        <span className="text-2xl tracking-tight" style={{ fontFamily: "Archivo Black, sans-serif" }}>
          FITWAL
        </span>
      </div>

      <h1 className="text-xl mb-1" style={{ fontFamily: "Archivo Black, sans-serif" }}>
        {mode === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta"}
      </h1>
      <p className="text-sm mb-8" style={{ color: C.textSecondary }}>
        {mode === "login" ? "Entra y sigue tu progreso." : "Únete a una comunidad que entrena en serio."}
      </p>

      <div className="flex flex-col gap-3">
        {mode === "register" && (
          <input
            placeholder="Nombre completo"
            className="px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, color: C.text }}
          />
        )}
        <input
          placeholder="Correo electrónico"
          className="px-4 py-3 text-sm outline-none"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, color: C.text }}
        />
        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Contraseña"
            className="w-full px-4 py-3 text-sm outline-none"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, color: C.text }}
          />
          <button
            onClick={() => setShowPass((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ color: C.textSecondary }}
            aria-label="Mostrar contraseña"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {mode === "register" && (
          <div className="flex gap-2 mt-1">
            {[
              { key: "beginner", label: "Soy principiante" },
              { key: "creator", label: "Soy creador" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setRole(opt.key)}
                className="flex-1 py-2.5 text-xs uppercase tracking-wide"
                style={{
                  border: `1px solid ${role === opt.key ? C.accent : C.border}`,
                  color: role === opt.key ? C.accent : C.textSecondary,
                  backgroundColor: "transparent",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={onLogin}
          className="mt-4 py-3 text-sm uppercase tracking-wide font-bold"
          style={{ backgroundColor: C.accent, color: C.bg }}
        >
          {mode === "login" ? "Entrar" : "Crear cuenta"}
        </button>
      </div>

      <button
        onClick={() => setMode(mode === "login" ? "register" : "login")}
        className="mt-8 text-xs text-center"
        style={{ color: C.textSecondary }}
      >
        {mode === "login" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
        <span style={{ color: C.text, fontWeight: 600 }}>
          {mode === "login" ? "Regístrate" : "Inicia sesión"}
        </span>
      </button>
    </div>
  );
}

function PostCard({ post, onToggleLike, onToggleSave }) {
  const initials = post.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <ChamferCard className="mb-4">
      <div className="flex items-center gap-3 p-3.5">
        <div
          className="flex items-center justify-center w-9 h-9 text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: C.bg, border: `1px solid ${C.border}`, color: C.textSecondary }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold truncate" style={{ color: C.text }}>{post.name}</span>
            {post.isCreator && (
              <span
                className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 flex-shrink-0"
                style={{ border: `1px solid ${C.border}`, color: C.textSecondary }}
              >
                Creador
              </span>
            )}
          </div>
          <p className="text-xs truncate" style={{ color: C.textSecondary }}>{post.handle} · {post.time}</p>
        </div>
      </div>

      <div className="px-3.5 pb-2">
        <span className="text-[10px] uppercase tracking-wide" style={{ color: C.textSecondary }}>
          {post.tag}
        </span>
        <p className="text-sm mt-1.5 leading-relaxed" style={{ color: C.text }}>{post.caption}</p>
      </div>

      <div className="flex items-center justify-between px-3.5 py-3" style={{ borderTop: `1px solid ${C.border}` }}>
        <button onClick={() => onToggleLike(post.id)} className="flex items-center gap-1.5">
          <Heart size={17} fill={post.liked ? C.accent : "none"} color={post.liked ? C.accent : C.textSecondary} />
          <span className="text-xs" style={{ color: post.liked ? C.accent : C.textSecondary }}>{post.likes}</span>
        </button>
        <button className="flex items-center gap-1.5">
          <MessageSquare size={17} color={C.textSecondary} />
          <span className="text-xs" style={{ color: C.textSecondary }}>{post.comments}</span>
        </button>
        <button>
          <Share2 size={17} color={C.textSecondary} />
        </button>
        <button onClick={() => onToggleSave(post.id)}>
          <Bookmark size={17} fill={post.saved ? C.text : "none"} color={C.text} />
        </button>
      </div>
    </ChamferCard>
  );
}

function FeedScreen({ posts, onToggleLike, onToggleSave }) {
  const [tab, setTab] = useState("para-ti");
  const tabs = [
    { key: "para-ti", label: "Para ti" },
    { key: "siguiendo", label: "Siguiendo" },
    { key: "creadores", label: "Creadores" },
  ];
  return (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="flex items-center justify-between px-4 py-3.5" style={{ borderBottom: `1px solid ${C.border}` }}>
        <span className="text-base tracking-tight" style={{ fontFamily: "Archivo Black, sans-serif", color: C.text }}>
          FITWAL
        </span>
        <div className="flex items-center gap-1.5">
          <Flame size={15} color={C.accent} />
          <span className="text-xs font-bold" style={{ color: C.text }}>23</span>
        </div>
      </div>

      <div className="flex gap-5 px-4 pt-3 pb-1" style={{ borderBottom: `1px solid ${C.border}` }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="text-xs uppercase tracking-wide pb-2.5"
            style={{
              color: tab === t.key ? C.text : C.textSecondary,
              borderBottom: tab === t.key ? `2px solid ${C.accent}` : "2px solid transparent",
              fontWeight: tab === t.key ? 700 : 400,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onToggleLike={onToggleLike} onToggleSave={onToggleSave} />
        ))}
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div className="flex-1 overflow-y-auto pb-24">
      <div className="px-4 py-3.5" style={{ borderBottom: `1px solid ${C.border}` }}>
        <span className="text-base tracking-tight" style={{ fontFamily: "Archivo Black, sans-serif", color: C.text }}>
          PERFIL
        </span>
      </div>

      <div className="flex flex-col items-center px-4 pt-6 pb-4">
        <div
          className="flex items-center justify-center w-20 h-20 text-xl font-bold mb-3"
          style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, color: C.text }}
        >
          IS
        </div>
        <h2 className="text-base font-bold" style={{ color: C.text }}>Isaac</h2>
        <p className="text-xs mb-1.5" style={{ color: C.textSecondary }}>@isaac.fitwal</p>
        <span
          className="text-[10px] uppercase tracking-wide px-2 py-0.5 mb-4"
          style={{ border: `1px solid ${C.border}`, color: C.textSecondary }}
        >
          Principiante
        </span>

        <div className="flex gap-8 mb-5">
          <div className="text-center">
            <p className="text-sm font-bold" style={{ color: C.text, fontFamily: "JetBrains Mono, monospace" }}>12</p>
            <p className="text-[10px]" style={{ color: C.textSecondary }}>POSTS</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold" style={{ color: C.text, fontFamily: "JetBrains Mono, monospace" }}>340</p>
            <p className="text-[10px]" style={{ color: C.textSecondary }}>SEGUIDORES</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-bold" style={{ color: C.text, fontFamily: "JetBrains Mono, monospace" }}>89</p>
            <p className="text-[10px]" style={{ color: C.textSecondary }}>SIGUIENDO</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-0.5 px-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square flex items-center justify-center" style={{ backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
            <Dumbbell size={18} color={C.textSecondary} />
          </div>
        ))}
      </div>
    </div>
  );
}

function PlaceholderScreen({ title }) {
  return (
    <div className="flex-1 flex items-center justify-center pb-24">
      <p className="text-sm" style={{ color: C.textSecondary }}>{title} — próximamente</p>
    </div>
  );
}

function BottomNav({ active, onChange }) {
  const items = [
    { key: "feed", icon: Home, label: "Feed" },
    { key: "buscar", icon: Search, label: "Buscar" },
    { key: "crear", icon: Plus, label: "" },
    { key: "mensajes", icon: MessageCircle, label: "Mensajes" },
    { key: "perfil", icon: User, label: "Perfil" },
  ];
  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3 max-w-md mx-auto"
      style={{ backgroundColor: C.surface, borderTop: `1px solid ${C.border}` }}
    >
      {items.map((it) => {
        const isActive = active === it.key;
        const color = isActive || it.key === "crear" ? C.accent : C.textSecondary;
        return (
          <button key={it.key} onClick={() => onChange(it.key)} className="flex flex-col items-center gap-1 flex-1">
            <it.icon size={20} color={color} />
            {it.label && (
              <span className="text-[9px] uppercase tracking-wide" style={{ color }}>
                {it.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function FitwalApp() {
  const [authed, setAuthed] = useState(false);
  const [screen, setScreen] = useState("feed");
  const [posts, setPosts] = useState(MOCK_POSTS);

  const toggleLike = (id) =>
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p))
    );
  const toggleSave = (id) =>
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, saved: !p.saved } : p)));

  if (!authed) return <AuthScreen onLogin={() => setAuthed(true)} />;

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto relative" style={{ backgroundColor: C.bg, color: C.text }}>
      {screen === "feed" && <FeedScreen posts={posts} onToggleLike={toggleLike} onToggleSave={toggleSave} />}
      {screen === "perfil" && <ProfileScreen />}
      {screen === "buscar" && <PlaceholderScreen title="Buscar" />}
      {screen === "mensajes" && <PlaceholderScreen title="Mensajes" />}
      {screen === "crear" && <PlaceholderScreen title="Crear publicación" />}
      <BottomNav active={screen} onChange={setScreen} />
    </div>
  );
  }
