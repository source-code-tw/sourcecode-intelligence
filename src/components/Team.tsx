'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TeamMember {
  name: string;
  title: string;
  description: string;
  type: 'human' | 'ai';
  avatar: React.ReactNode;
}

function HumanAvatar({ initials, from, to }: { initials: string; from: string; to: string }) {
  return (
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center text-white font-display text-xl font-bold"
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {initials}
    </div>
  );
}

function RobotAvatar({ accent }: { accent: string }) {
  return (
    <div
      className="w-20 h-20 rounded-full flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}44)` }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="12" width="20" height="16" rx="4" stroke={accent} strokeWidth="1.5" />
        <circle cx="14" cy="20" r="2" fill={accent} />
        <circle cx="22" cy="20" r="2" fill={accent} />
        <path d="M14 25h8" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="6" x2="18" y2="12" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="18" cy="5" r="2" stroke={accent} strokeWidth="1.5" />
        <line x1="4" y1="18" x2="8" y2="18" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="18" x2="32" y2="18" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

const TEAM: TeamMember[] = [
  {
    name: 'Sean',
    title: 'CTO & Co-Founder',
    description: 'AI-Native 產品架構師，量化交易研究者',
    type: 'human',
    avatar: <HumanAvatar initials="SP" from="#C8A55C" to="#9A7D3A" />,
  },
  {
    name: 'Co-Founder',
    title: 'CEO',
    description: '資金營運行銷，商業策略',
    type: 'human',
    avatar: <HumanAvatar initials="?" from="#8A8A82" to="#5A5A54" />,
  },
  {
    name: '小柯 (Claude Code)',
    title: 'Senior AI Engineer',
    description: '全端開發、架構設計、程式碼審查',
    type: 'ai',
    avatar: <RobotAvatar accent="#C8A55C" />,
  },
  {
    name: '毛毛 (Cursor)',
    title: 'AI Developer',
    description: '快速原型、UI 開發、即時迭代',
    type: 'ai',
    avatar: <RobotAvatar accent="#E8D9A8" />,
  },
  {
    name: 'Claude',
    title: 'AI Strategist',
    description: '市場研究、文案、策略分析',
    type: 'ai',
    avatar: <RobotAvatar accent="#D4BA78" />,
  },
];

function MemberCard({ member, index, inView }: { member: TeamMember; index: number; inView: boolean }) {
  const isHuman = member.type === 'human';

  return (
    <motion.div
      className="relative group rounded-[var(--radius-lg)] p-6 flex flex-col items-center text-center gap-4 transition-shadow duration-300"
      style={{
        background: 'var(--bg-card)',
        border: isHuman
          ? '1.5px solid rgba(200, 165, 92, 0.3)'
          : '1.5px solid rgba(200, 165, 92, 0.12)',
        boxShadow: isHuman
          ? '0 0 0 0 transparent'
          : '0 0 0 0 transparent',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: isHuman
          ? '0 8px 32px rgba(200, 165, 92, 0.15)'
          : '0 8px 32px rgba(200, 165, 92, 0.1), 0 0 20px rgba(200, 165, 92, 0.06)',
      }}
    >
      {/* AI glow ring */}
      {!isHuman && (
        <div
          className="absolute inset-0 rounded-[var(--radius-lg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: '0 0 24px rgba(200, 165, 92, 0.12)',
          }}
        />
      )}

      {member.avatar}

      <div className="flex flex-col gap-1">
        <h3 className="font-display text-lg font-semibold text-text-primary">{member.name}</h3>
        <span className="text-caption text-accent-gold">{member.title}</span>
      </div>

      <p className="text-body-sm text-text-secondary leading-relaxed">{member.description}</p>

      {/* Type badge */}
      <span
        className="text-xs font-medium px-3 py-1 rounded-full"
        style={{
          background: isHuman
            ? 'rgba(200, 165, 92, 0.1)'
            : 'rgba(200, 165, 92, 0.06)',
          color: isHuman ? 'var(--accent-gold-dark)' : 'var(--accent-gold)',
          border: isHuman
            ? '1px solid rgba(200, 165, 92, 0.2)'
            : '1px solid rgba(200, 165, 92, 0.1)',
        }}
      >
        {isHuman ? 'Human' : 'AI Agent'}
      </span>
    </motion.div>
  );
}

export default function Team() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="team"
      className="w-full"
      style={{ paddingBlock: 'var(--section-gap)' }}
    >
      <div
        ref={ref}
        className="mx-auto"
        style={{
          maxWidth: 'var(--container-max)',
          paddingInline: 'var(--container-padding)',
        }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-display-md font-display gradient-text mb-4">
            人機協作團隊
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            2 位人類創辦人 + 3 位 AI Agent，全球最精實的產品團隊
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* First row: humans centered on larger screens */}
          {TEAM.filter((m) => m.type === 'human').map((member, i) => (
            <MemberCard
              key={member.name}
              member={member}
              index={i}
              inView={inView}
            />
          ))}
          {/* AI agents */}
          {TEAM.filter((m) => m.type === 'ai').map((member, i) => (
            <MemberCard
              key={member.name}
              member={member}
              index={i + 2}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
