'use client';

import { useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Users, TrendingUp, Calendar, Award } from 'lucide-react';

interface StatItem {
  value: string;
  labelKey: string;
  icon: React.ElementType;
  numericValue: number;
  suffix: string;
}

const STATS: StatItem[] = [
  { value: '2000', suffix: '+', numericValue: 2000, labelKey: 'students', icon: Users },
  { value: '95', suffix: '%', numericValue: 95, labelKey: 'successRate', icon: TrendingUp },
  { value: '15', suffix: '+', numericValue: 15, labelKey: 'experience', icon: Calendar },
  { value: '1500', suffix: '+', numericValue: 1500, labelKey: 'certifications', icon: Award },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const spring = useSpring(inView ? value : 0, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (v) =>
    `${Math.round(v).toLocaleString('fr-FR')}${suffix}`
  );

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function Stats() {
  const t = useTranslations('Stats');

  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #12080a 100%)' }}>
      <div className="container-ids">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map(({ numericValue, suffix, labelKey, icon: Icon }, i) => (
            <motion.div
              key={labelKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative text-center p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.07] transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-ids-gold-400/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon className="w-6 h-6 text-ids-gold-400" />
              </div>
              <div className="text-4xl font-black text-white mb-2 tabular-nums">
                <AnimatedCounter value={numericValue} suffix={suffix} />
              </div>
              <p className="text-white/40 text-sm">{t(labelKey as Parameters<typeof t>[0])}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
