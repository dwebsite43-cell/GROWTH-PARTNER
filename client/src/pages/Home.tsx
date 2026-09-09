import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  Check,
  Command,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

function NexoraMark() {
  return (
    <svg
      aria-hidden="true"
      className="nexora-mark"
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 29.75V14.25L31.5 29.75V14.25"
        stroke="currentColor"
        strokeWidth="5.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 14.25L31.5 29.75"
        stroke="currentColor"
        strokeWidth="5.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatusBadge({ tone, label, value, icon }: { tone: "green" | "violet"; label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className={`status-badge status-badge-${tone}`}>
      <span className="status-badge-icon">{icon}</span>
      <span className="status-badge-copy">
        <span className="status-badge-label">{label}</span>
        <span className="status-badge-value">{value}</span>
      </span>
    </div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (profileRef.current && !profileRef.current.contains(target)) setIsMenuOpen(false);
      if (notificationsRef.current && !notificationsRef.current.contains(target)) setIsNotificationsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function handleRefresh() {
    if (isRefreshing) return;
    setIsRefreshing(true);
    window.setTimeout(() => setIsRefreshing(false), 900);
  }

  return (
    <div className="dashboard-shell">
      <div className="ambient-glow ambient-glow-left" aria-hidden="true" />
      <div className="ambient-glow ambient-glow-right" aria-hidden="true" />

      <main className="dashboard-container">
        <header className="dashboard-header">
          <div className="brand-lockup">
            <button className="brand-button" type="button" aria-label="Nexora home" title="Nexora home">
              <span className="brand-mark-wrap"><NexoraMark /></span>
              <span className="brand-wordmark">nexora<span>.</span></span>
            </button>
            <span className="header-divider" aria-hidden="true" />
            <div className="title-lockup">
              <p className="eyebrow">Partner workspace</p>
              <h1>Nexora Partner Dashboard</h1>
              <p>Your Growth Partner Hub</p>
            </div>
          </div>

          <button
            type="button"
            className="mobile-menu-button icon-button"
            aria-label={isMobileNavOpen ? "Close dashboard controls" : "Open dashboard controls"}
            aria-expanded={isMobileNavOpen}
            onClick={() => setIsMobileNavOpen((open) => !open)}
          >
            {isMobileNavOpen ? <X size={19} /> : <Menu size={19} />}
          </button>

          <div className={`header-controls ${isMobileNavOpen ? "header-controls-open" : ""}`}>
            <div className="status-group" aria-label="Partner account status">
              <StatusBadge tone="green" label="Partner status" value="Active" icon={<span className="pulse-dot" />} />
              <StatusBadge tone="violet" label="KYC status" value="Verified" icon={<ShieldCheck size={15} />} />
              <div className="district-indicator">
                <MapPin size={15} aria-hidden="true" />
                <span>
                  <span className="district-label">District</span>
                  <strong>Jaipur</strong>
                </span>
              </div>
            </div>

            <div className="control-actions">
              <div className="popover-anchor" ref={notificationsRef}>
                <button
                  type="button"
                  className={`icon-button notification-button ${isNotificationsOpen ? "is-active" : ""}`}
                  aria-label="View notifications"
                  aria-expanded={isNotificationsOpen}
                  aria-controls="notifications-popover"
                  onClick={() => {
                    setIsNotificationsOpen((open) => !open);
                    setIsMenuOpen(false);
                  }}
                >
                  <Bell size={18} strokeWidth={1.8} />
                  <span className="notification-dot" aria-label="1 unread notification" />
                </button>
                {isNotificationsOpen && (
                  <section className="popover-card notification-popover" id="notifications-popover" aria-label="Notifications">
                    <div className="popover-heading">
                      <div>
                        <p className="popover-kicker">Inbox</p>
                        <h2>Notifications</h2>
                      </div>
                      <span className="unread-count">1 new</span>
                    </div>
                    <div className="notification-item">
                      <span className="notification-item-icon"><Sparkles size={15} /></span>
                      <div>
                        <p>Welcome to your partner workspace.</p>
                        <span>Just now</span>
                      </div>
                    </div>
                    <button className="text-button" type="button" onClick={() => setIsNotificationsOpen(false)}>Mark all as read</button>
                  </section>
                )}
              </div>

              <div className="popover-anchor" ref={profileRef}>
                <button
                  type="button"
                  className={`profile-button ${isMenuOpen ? "is-active" : ""}`}
                  aria-label="Open profile menu"
                  aria-expanded={isMenuOpen}
                  aria-controls="profile-popover"
                  onClick={() => {
                    setIsMenuOpen((open) => !open);
                    setIsNotificationsOpen(false);
                  }}
                >
                  <span className="avatar" aria-hidden="true">AK</span>
                  <span className="profile-copy">
                    <strong>Arjun Kapoor</strong>
                    <span>Partner account</span>
                  </span>
                  <ChevronDown className={`profile-chevron ${isMenuOpen ? "profile-chevron-open" : ""}`} size={16} aria-hidden="true" />
                </button>
                {isMenuOpen && (
                  <section className="popover-card profile-popover" id="profile-popover" aria-label="Profile menu">
                    <div className="profile-popover-heading">
                      <span className="avatar avatar-large" aria-hidden="true">AK</span>
                      <div>
                        <h2>Arjun Kapoor</h2>
                        <p>Jaipur partner account</p>
                      </div>
                    </div>
                    <div className="profile-menu-list">
                      <button type="button" className="profile-menu-item"><UserRound size={16} /> Account settings</button>
                      <button type="button" className="profile-menu-item"><Command size={16} /> Keyboard shortcuts</button>
                    </div>
                    <button type="button" className="profile-signout" disabled>Sign out unavailable in preview</button>
                  </section>
                )}
              </div>
            </div>
          </div>
        </header>

        <section className="foundation-content" aria-labelledby="foundation-title">
          <div className="welcome-column">
            <div className="welcome-kicker"><span className="kicker-line" />Section 01 <span>·</span> Workspace foundation</div>
            <h2 id="foundation-title">A clear place to<br /><em>grow together.</em></h2>
            <p className="welcome-copy">Your partner workspace is ready. Everything you need to build momentum with Nexora will live here, with a calm view of what matters next.</p>
            <div className="welcome-actions">
              <button type="button" className="primary-button" onClick={handleRefresh} disabled={isRefreshing}>
                <span>{isRefreshing ? "Refreshing…" : "Refresh workspace"}</span>
                {isRefreshing ? <span className="button-loader" aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}
              </button>
              <button type="button" className="secondary-button" onClick={() => setIsNotificationsOpen(true)}>
                <Bell size={16} aria-hidden="true" />
                View notifications
              </button>
            </div>
          </div>

          <aside className="foundation-panel" aria-label="Workspace readiness">
            <div className="panel-topline">
              <span className="panel-label">Workspace readiness</span>
              <span className="panel-status"><span className="pulse-dot" /> Live</span>
            </div>
            <div className="readiness-visual" aria-hidden="true">
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="readiness-core"><NexoraMark /></div>
              <span className="orbit-node node-one" />
              <span className="orbit-node node-two" />
              <span className="orbit-node node-three" />
            </div>
            <div className="panel-footer">
              <div>
                <span className="panel-caption">Foundation status</span>
                <strong>Ready for growth</strong>
              </div>
              <div className="panel-check"><Check size={17} strokeWidth={2.3} /></div>
            </div>
          </aside>
        </section>

        <footer className="dashboard-footer">
          <div className="footer-note"><span className="footer-spark">✦</span> A focused foundation for your next chapter.</div>
          <div className="footer-meta"><span>Last synced just now</span><span className="footer-separator" /><span>v1.0 foundation</span></div>
        </footer>
      </main>
    </div>
  );
}
