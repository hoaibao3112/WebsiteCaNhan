'use client';

import Link from 'next/link';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { featuredProjects } from '@/data/projects';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';
import { ExternalLink } from 'lucide-react';
import { useRef } from 'react';

function MagneticCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (shouldReduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateX.set(-dy * 4);
    rotateY.set(dx * 4);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default function FeaturedProjectsSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #f4f9f9, white)' }}>
      <div className="container-lumina">

        <ScrollReveal direction="up" className="text-center mb-14">
          <p className="text-sm font-bold text-[#006672] uppercase tracking-widest mb-3">
            Dự án tiêu biểu
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f]">
            Công việc đã thực hiện
          </h2>
        </ScrollReveal>

        {/* Bento Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.1}>

          {/* Large featured card */}
          <StaggerItem direction="left" className="md:col-span-2 md:row-span-2">
            <MagneticCard className="project-card group h-72 md:h-full min-h-[300px] overflow-hidden rounded-2xl">
              <motion.div
                className="w-full h-full relative"
                whileHover={shouldReduce ? {} : { scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                <img
                  src={featuredProjects[0]?.image}
                  alt={featuredProjects[0]?.title ?? 'Dự án tiêu biểu của KABO AGENCY'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                />
                {/* Overlay — slides up on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent flex flex-col justify-end p-6"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    initial={{ y: 16 }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="text-xs text-white/70 font-medium block mb-1">
                      {featuredProjects[0]?.categoryLabel}
                    </span>
                    <p className="text-white font-bold text-xl leading-tight mb-3">
                      {featuredProjects[0]?.title}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <ExternalLink className="size-3" /> Xem dự án
                    </span>
                  </motion.div>
                </motion.div>

                {/* Corner glow */}
                <motion.div
                  className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#6366f1]/30 to-transparent rounded-br-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </motion.div>
            </MagneticCard>
          </StaggerItem>

          {/* Small cards */}
          {featuredProjects.slice(1).map((project, i) => (
            <StaggerItem key={project.id} direction="right">
              <MagneticCard className="project-card group h-56 overflow-hidden rounded-2xl">
                <motion.div
                  className="w-full h-full relative"
                  whileHover={shouldReduce ? {} : { scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Shimmer sweep */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full"
                    whileHover={{ translateX: '300%' }}
                    transition={{ duration: 0.65, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent flex flex-col justify-end p-4"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      initial={{ y: 12 }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="text-xs text-white/70 font-medium block mb-0.5">
                        {project.categoryLabel}
                      </span>
                      <p className="text-white font-bold leading-tight">{project.title}</p>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </MagneticCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal direction="up" delay={0.25} className="text-center mt-10">
          <motion.div
            whileHover={shouldReduce ? {} : { scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link href="/du-an" className="btn-secondary">
              Xem tất cả dự án →
            </Link>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
