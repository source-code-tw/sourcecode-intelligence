'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TeamMember {
  name: string;
  title: string;
  description: string;
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

const TEAM: TeamMember[] = [
  {
    name: 'Sean',
    title: 'CTO & Co-Founder',
    description: 'AI-Native 產品架構師，量化交易研究者',
    avatar: <HumanAvatar initials="SP" from="#C8A55C" to="#9A7D3A" />,
  },
  {
    name: 'Co-Founder',
    title: 'CEO',
    description: '資金營運行銷，商業策略',
    avatar: <HumanAvatar initials="?" from="#8A8A82" to="#5A5A54" />,
  },
];

function MemberCard({ member, index, inView }: { member: TeamMember; index: number; inView: boolean }) {
  return (
    <motion.div
      className="relative group rounded-[var(--radius-lg)] p-6 flex flex-col items-center text-center gap-4 transition-shadow duration-300"
      style={{
        background: 'var(--bg-card)',
        border: '1.5px solid rgba(200, 165, 92, 0.3)',
        boxShadow: '0 0 0 0 transparent',
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
        boxShadow: '0 8px 32px rgba(200, 165, 92, 0.15)',
      }}
    >
      {member.avatar}

      <div className="flex flex-col gap-1">
        <h3 className="font-display text-lg font-semibold text-text-primary">{member.name}</h3>
        <span className="text-caption text-accent-gold">{member.title}</span>
      </div>

      <p className="text-body-sm text-text-secondary leading-relaxed">{member.description}</p>
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
            創辦團隊
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            以 AI-Native 方法打造產品的創辦團隊
          </p>
        </motion.div>

        {/* Grid — 2 columns for 2 founders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {TEAM.map((member, i) => (
            <MemberCard
              key={member.name}
              member={member}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* AI agent note */}
        <motion.p
          className="text-center text-body-sm text-text-secondary mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          + 我們的 AI Agent 團隊全天候協作
        </motion.p>
      </div>
    </section>
  );
}
