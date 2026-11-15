import { motion } from 'motion/react';
import { CREDENTIALS } from '../../data/credentials';

export default function CredentialsGrid() {
  return (
    <section id="credentials" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-mono uppercase tracking-widest text-[#2563EB] font-semibold">
            Academic & Technical Foundation
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#09090B]">
            Engineering & security credentials
            <span className="text-[#2563EB]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CREDENTIALS.map((item, idx) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="rounded-3xl bg-[#F8FAFC] border border-slate-200/90 p-7 flex flex-col justify-between hover:border-[#2563EB]/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-10 h-10 rounded-xl bg-[#2563EB] text-white font-mono text-sm font-bold flex items-center justify-center">
                    {item.number}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{item.period}</span>
                </div>

                <h3 className="text-lg font-bold text-[#09090B] leading-snug">
                  {item.program}
                </h3>
                <p className="text-sm font-semibold text-[#2563EB] mt-1">
                  {item.institution}
                </p>

                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {item.highlight}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-200/80 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-white text-slate-700 font-mono text-[11px] border border-slate-200/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}