const TEAM = [
  {
    initials: 'SP',
    name: 'Sean Peng',
    role: 'CTO & Co-Founder',
    description: 'AI-Native 產品架構師，量化交易研究者。擅長從 0 到 1 打造 AI 驅動的軟體產品。',
  },
  {
    initials: '?',
    name: 'Co-Founder',
    role: 'CEO',
    description: '資金營運與商業策略。負責市場拓展與客戶關係管理。',
  },
]

export default function Team() {
  return (
    <section id="team" className="section-padding">
      <div className="container-optimus">
        <p className="section-label mb-6">團隊</p>
        <h2 className="text-section-title mb-16">創辦團隊</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          {TEAM.map((member) => (
            <div key={member.name} className="flex flex-col gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-sm font-semibold">
                {member.initials}
              </div>
              <div>
                <h3 className="font-semibold text-gray-950">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-400 mt-10">
          + AI Agent 團隊全天候協作
        </p>
      </div>
    </section>
  )
}
