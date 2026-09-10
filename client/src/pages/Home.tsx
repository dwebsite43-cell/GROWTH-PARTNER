import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Bell,
  Box,
  CalendarDays,
  CarFront,
  ChevronDown,
  Check,
  Command,
  Crown,
  CreditCard,
  CircleDollarSign,
  CheckCircle2,
  Gift,
  Laptop,
  MapPin,
  Menu,
  LockKeyhole,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  Shirt,
  Sparkles,
  Tablet,
  Trophy,
  TrendingUp,
  UserRound,
  WalletCards,
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

type EarningsDay = { date: string; label: string; amount: number };
const earningsData: EarningsDay[] = [
  { date: "Mon, 08 Sep", label: "Mon", amount: 110 },
  { date: "Tue, 09 Sep", label: "Tue", amount: 180 },
  { date: "Wed, 10 Sep", label: "Wed", amount: 145 },
  { date: "Thu, 11 Sep", label: "Thu", amount: 240 },
  { date: "Fri, 12 Sep", label: "Fri", amount: 190 },
  { date: "Sat, 13 Sep", label: "Sat", amount: 225 },
  { date: "Sun, 14 Sep", label: "Sun", amount: 160 },
];

function AnalyticsCard({ title, eyebrow, children, className = "" }: { title: string; eyebrow: string; children: React.ReactNode; className?: string }) {
  const id = `${title.toLowerCase().replaceAll(" ", "-")}-title`;
  return <article className={`analytics-card ${className}`} tabIndex={0} aria-labelledby={id}><div className="analytics-card-heading"><div><span className="analytics-eyebrow">{eyebrow}</span><h3 id={id}>{title}</h3></div><span className="card-corner-dot" aria-hidden="true" /></div>{children}</article>;
}

function EarningsChart({ onRetry }: { onRetry: () => void }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "empty" | "error">("loaded");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const total = earningsData.reduce((sum, day) => sum + day.amount, 0);
  const maxAmount = Math.max(...earningsData.map((day) => day.amount));
  function retry() { setStatus("loading"); onRetry(); window.setTimeout(() => setStatus("loaded"), 650); }
  if (status === "loading") return <div className="earnings-skeleton" aria-label="Loading earnings"><span /><span /><span /><span /><span /><span /><span /></div>;
  if (status === "empty") return <div className="analytics-empty"><CircleDollarSign size={20} /><p>No earnings recorded yet</p></div>;
  if (status === "error") return <div className="analytics-empty analytics-error"><CircleDollarSign size={20} /><p>Unable to load earnings</p><button type="button" onClick={retry}><RotateCcw size={13} /> Retry</button></div>;
  return <><div className="earnings-summary"><strong>₹{total.toLocaleString("en-IN")}</strong><span><TrendingUp size={13} /> +18.5% <b>This week</b></span></div><div className="chart-wrap"><div className="chart-tooltip" aria-live="polite" data-visible={activeIndex !== null}>{activeIndex !== null && <><b>{earningsData[activeIndex].date}</b><span>₹{earningsData[activeIndex].amount.toLocaleString("en-IN")}</span></>}</div><svg className="earnings-chart" viewBox="0 0 350 142" role="img" aria-label="Daily earnings bar chart for the last seven days"><line x1="8" y1="112" x2="342" y2="112" className="chart-axis" />{[0, 1, 2].map((line) => <line key={line} x1="8" y1={32 + line * 40} x2="342" y2={32 + line * 40} className="chart-grid" />)}{earningsData.map((day, index) => { const height = Math.max(10, (day.amount / maxAmount) * 76); const x = 17 + index * 47; const y = 112 - height; return <g key={day.date} onMouseEnter={() => setActiveIndex(index)} onMouseLeave={() => setActiveIndex(null)}><rect x={x} y="15" width="31" height="100" fill="transparent" tabIndex={0} aria-label={`${day.date}: ₹${day.amount}`} onFocus={() => setActiveIndex(index)} onBlur={() => setActiveIndex(null)} /><rect className={`chart-bar ${activeIndex === index ? "chart-bar-active" : ""}`} x={x + 7} y={y} width="17" height={height} rx="8.5" /><text x={x + 15.5} y="132" className="chart-label" textAnchor="middle">{day.label}</text></g>; })}</svg></div></>;
}

function TargetRing() {
  const completed = 50;
  const target = 100;
  const percentage = Math.min(100, Math.max(0, Math.round((completed / target) * 100)));
  const remaining = Math.max(0, target - completed);
  const circumference = 2 * Math.PI * 43;
  const dashOffset = circumference - (percentage / 100) * circumference;
  return <div className="target-content"><div className="progress-ring" role="img" aria-label={`${percentage}% monthly target complete`}><svg viewBox="0 0 100 100" aria-hidden="true"><circle className="ring-track" cx="50" cy="50" r="43" /><circle className="ring-value" cx="50" cy="50" r="43" style={{ strokeDasharray: circumference, strokeDashoffset: dashOffset }} /></svg><strong>{percentage}%</strong></div><div className="target-stats"><div><span>Completed</span><strong>{completed}</strong></div><div><span>Remaining</span><strong>{remaining}</strong></div></div><div className="target-period"><CalendarDays size={13} /> September 2026</div></div>;
}

function AnalyticsSection() {
  const [payoutStatus, setPayoutStatus] = useState<"Processing" | "Scheduled" | "Paid" | "Failed" | "No Payout">("Processing");
  const [payoutAmount] = useState(1250);
  const payoutDate = payoutStatus === "Paid" ? "Paid on 12th Aug" : payoutStatus === "Failed" ? "Attempted on 12th Aug" : payoutStatus === "No Payout" ? "No payout scheduled" : payoutStatus === "Scheduled" ? "Scheduled for 12th Aug" : "Processing for 12th Aug";
  return <section className="analytics-section" aria-labelledby="analytics-title"><div className="section-heading-row"><div><span className="section-number">02 · Performance</span><h2 id="analytics-title">Analytics overview</h2></div><p>Signals that keep your growth moving in the right direction.</p></div><div className="analytics-grid"><AnalyticsCard title="7-Day Earnings" eyebrow="Earnings pulse" className="earnings-card"><EarningsChart onRetry={() => undefined} /></AnalyticsCard><AnalyticsCard title="Monthly Target" eyebrow="September goal" className="target-card"><div className="target-headline"><strong>50 <span>/ 100</span></strong><span>Salons onboarded</span></div><TargetRing /></AnalyticsCard><AnalyticsCard title="Lifetime Earnings" eyebrow="Since joining Nexora" className="lifetime-card"><div className="lifetime-amount">₹4,500 <ArrowUpRight size={17} /></div><div className="lifetime-stats"><div><span>Total commissions</span><strong>18</strong></div><div><span>Onboarded salons</span><strong>50</strong></div></div><div className="lifetime-note"><WalletCards size={13} /> Compounding your next milestone</div></AnalyticsCard><AnalyticsCard title="Weekly Payout" eyebrow="Next settlement" className={`payout-card payout-${payoutStatus.toLowerCase().replace(" ", "-")}`}><div className="payout-amount">₹{payoutAmount.toLocaleString("en-IN")}</div><div className="payout-status"><span className="payout-status-dot" />{payoutStatus}</div><div className="payout-details"><span><CalendarDays size={13} /> {payoutDate}</span><span><CreditCard size={13} /> UPI ·•• 7920</span></div><label className="payout-select-label" htmlFor="payout-status">Preview state</label><select id="payout-status" value={payoutStatus} onChange={(event) => setPayoutStatus(event.target.value as typeof payoutStatus)}><option>Processing</option><option>Scheduled</option><option>Paid</option><option>Failed</option><option>No Payout</option></select></AnalyticsCard></div></section>;
}

type Reward = { name: string; required: number; icon: React.ReactNode; accent: string };
const rewards: Reward[] = [
  { name: "Welcome Kit", required: 25, icon: <Gift size={24} />, accent: "rose" },
  { name: "Branded Tablet", required: 100, icon: <Tablet size={24} />, accent: "plum" },
  { name: "Laptop", required: 500, icon: <Laptop size={24} />, accent: "gold" },
];

type RewardStatus = "Locked" | "Almost unlocked" | "Reward Unlocked" | "Claimed";

function MilestoneRewardCard({ reward, currentActiveShops, claimed, onClaim }: { reward: Reward; currentActiveShops: number; claimed: boolean; onClaim: (reward: Reward) => void }) {
  const progress = Math.min(100, Math.max(0, Math.round((currentActiveShops / reward.required) * 100)));
  const remaining = Math.max(0, reward.required - currentActiveShops);
  const status: RewardStatus = claimed ? "Claimed" : currentActiveShops >= reward.required ? "Reward Unlocked" : currentActiveShops >= reward.required * 0.8 ? "Almost unlocked" : "Locked";
  const isEligible = status === "Reward Unlocked";
  return <article className={`milestone-card milestone-${reward.accent} milestone-${status.toLowerCase().replace(" ", "-")}`} tabIndex={0} aria-labelledby={`reward-${reward.name.toLowerCase().replaceAll(" ", "-")}`}><div className="milestone-card-top"><div className="milestone-icon">{status === "Locked" ? <LockKeyhole size={22} /> : reward.icon}</div><span className="reward-status-chip"><span className="reward-status-dot" />{status}</span></div><div className="milestone-card-copy"><h3 id={`reward-${reward.name.toLowerCase().replaceAll(" ", "-")}`}>{reward.name}</h3><p><strong>{reward.required} Active Shops</strong> required</p></div><div className="milestone-progress-meta"><span>Current progress</span><strong>{currentActiveShops} / {reward.required}</strong></div><div className="milestone-progress-track" role="progressbar" aria-label={`${reward.name} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}><span style={{ width: `${progress}%` }} /></div><div className="milestone-footer"><span>{progress}% complete</span>{status === "Almost unlocked" && <b>{remaining} shops remaining</b>}{status === "Locked" && <b>Keep growing to unlock</b>}{status === "Reward Unlocked" && <b>Ready to claim</b>}{status === "Claimed" && <b>Claimed ✓</b>}</div>{isEligible && <button type="button" className="claim-button" onClick={() => onClaim(reward)}><CheckCircle2 size={15} /> Claim Reward</button>}</article>;
}

function ClaimModal({ reward, state, onClose, onConfirm }: { reward: Reward; state: "confirm" | "submitting" | "success" | "error"; onClose: () => void; onConfirm: () => void }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target && state === "confirm") onClose(); }}><section className="claim-modal" role="dialog" aria-modal="true" aria-labelledby="claim-modal-title"><button className="modal-close" type="button" onClick={onClose} aria-label="Close claim dialog">×</button>{state === "success" ? <><div className="modal-icon modal-success"><CheckCircle2 size={26} /></div><span className="modal-kicker">Milestone complete</span><h2>Reward claimed</h2><p>Your <strong>{reward.name}</strong> has been added to your partner rewards.</p><button type="button" className="modal-primary" onClick={onClose}>Done</button></> : state === "error" ? <><div className="modal-icon modal-error"><MessageCircle size={26} /></div><span className="modal-kicker">Something went wrong</span><h2>Unable to claim reward</h2><p>We couldn’t complete your claim right now. Please try again.</p><div className="modal-actions"><button type="button" className="modal-secondary" onClick={onClose}>Cancel</button><button type="button" className="modal-primary" onClick={onConfirm}><RotateCcw size={14} /> Retry</button></div></> : <><div className="modal-icon"><Box size={26} /></div><span className="modal-kicker">Claim milestone reward</span><h2 id="claim-modal-title">Claim {reward.name}?</h2><p>Are you ready to claim this milestone reward?</p><div className="modal-actions"><button type="button" className="modal-secondary" onClick={onClose} disabled={state === "submitting"}>Cancel</button><button type="button" className="modal-primary" onClick={onConfirm} disabled={state === "submitting"}>{state === "submitting" ? "Claiming…" : "Confirm Claim"}</button></div></>}</section></div>;
}

function MilestoneSection() {
  const [currentActiveShops] = useState(95);
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [claimState, setClaimState] = useState<"confirm" | "submitting" | "success" | "error">("confirm");
  function openClaim(reward: Reward) { setSelectedReward(reward); setClaimState("confirm"); }
  function confirmClaim() { if (!selectedReward) return; setClaimState("submitting"); window.setTimeout(() => { setClaimedRewards((claimed) => [...claimed, selectedReward.name]); setClaimState("success"); }, 700); }
  return <section className="milestone-section" aria-labelledby="milestone-title"><div className="section-heading-row"><div><span className="section-number">03 · Recognition</span><h2 id="milestone-title">Milestone Rewards</h2></div><p>Reach milestones and unlock exclusive partner rewards.</p></div><div className="milestone-grid">{rewards.map((reward) => <MilestoneRewardCard key={reward.name} reward={reward} currentActiveShops={currentActiveShops} claimed={claimedRewards.includes(reward.name)} onClaim={openClaim} />)}</div>{selectedReward && <ClaimModal reward={selectedReward} state={claimState} onClose={() => setSelectedReward(null)} onConfirm={confirmClaim} />}</section>;
}

function GrowthPartnerRewardsPoster() {
  return <section className="growth-rewards-section" aria-labelledby="growth-rewards-title"><div className="growth-rewards-heading"><div><span className="section-number">Partner rewards</span><h2 id="growth-rewards-title">Growth Partner Rewards</h2></div><p>Explore the rewards waiting as your salon network grows.</p></div><figure className="growth-rewards-poster"><img src="/manus-storage/a_polished_promotional_poster_design_flat_3d_real_7a6eb049.png" alt="Nexora Growth Partner Rewards poster showing rewards for 25, 50, 100, 250, 500, 750, and 1000 plus active shops" loading="lazy" /><figcaption>Rewards shown are subject to the applicable Nexora partner programme terms.</figcaption></figure></section>;
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
            <div className="reward-ladder" aria-label="Nexora partner reward ladder">
              <div className="reward-ladder-intro">
                <span className="reward-intro-icon"><Gift size={15} /></span>
                <div>
                  <span className="panel-caption">Milestone rewards</span>
                  <strong>Grow your way to more.</strong>
                </div>
              </div>
              <div className="reward-list">
                <div className="reward-row reward-row-featured">
                  <span className="reward-icon"><Shirt size={15} /></span>
                  <span className="reward-copy"><b>25 shops</b><small>Business Associate</small></span>
                  <span className="reward-prize">Official T-shirt</span>
                </div>
                <div className="reward-row">
                  <span className="reward-icon"><Tablet size={15} /></span>
                  <span className="reward-copy"><b>50 shops</b><small>Silver Partner</small></span>
                  <span className="reward-prize">Tablet</span>
                </div>
                <div className="reward-row">
                  <span className="reward-icon"><Laptop size={15} /></span>
                  <span className="reward-copy"><b>100 shops</b><small>Gold Partner</small></span>
                  <span className="reward-prize">Branded laptop</span>
                </div>
                <div className="reward-row">
                  <span className="reward-icon"><Laptop size={15} /></span>
                  <span className="reward-copy"><b>500 shops</b><small>Platinum Partner</small></span>
                  <span className="reward-prize">Premium laptop</span>
                </div>
                <div className="reward-row reward-row-supreme">
                  <span className="reward-icon"><CarFront size={16} /></span>
                  <span className="reward-copy"><b>1000+ shops</b><small><Crown size={11} /> Supreme Leader</small></span>
                  <span className="reward-prize">District partner car</span>
                </div>
              </div>
              <div className="reward-ladder-footer"><Trophy size={14} /> Every milestone moves you up.</div>
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

        <GrowthPartnerRewardsPoster />

        <AnalyticsSection />

        <MilestoneSection />

        <footer className="dashboard-footer">
          <div className="footer-note"><span className="footer-spark">✦</span> A focused foundation for your next chapter.</div>
          <div className="footer-meta"><span>Last synced just now</span><span className="footer-separator" /><span>v1.0 foundation</span></div>
        </footer>
      </main>
    </div>
  );
}
