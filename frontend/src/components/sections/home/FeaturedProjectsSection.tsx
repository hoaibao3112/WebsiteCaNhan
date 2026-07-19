'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { featuredProjects } from '@/data/projects';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ui/ScrollReveal';

export default function FeaturedProjectsSection() {
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

        {/* Bento Grid Layout */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4" staggerDelay={0.09}>

          {/* Large featured card */}
          <StaggerItem direction="left" className="md:col-span-2 md:row-span-2">
            <motion.div
              className="project-card group h-72 md:h-full min-h-[300px]"
              whileHover={{ scale: 1.012 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
            >
              <img
                src={featuredProjects[0]?.image}
                alt={featuredProjects[0]?.title ?? 'Dự án tiêu biểu của KABO AGENCY'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                loading="eager"
                fetchPriority="high"
              />
              <div className="project-card-overlay">
                <motion.div
                  initial={{ y: 12, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xs text-white/70 font-medium">
                    {featuredProjects[0]?.categoryLabel}
                  </span>
                  <p className="text-white font-bold text-lg leading-tight">
                    {featuredProjects[0]?.title}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </StaggerItem>

          {/* Small cards */}
          {featuredProjects.slice(1).map((project) => (
            <StaggerItem key={project.id} direction="right">
              <motion.div
                className="project-card group h-56"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="project-card-overlay">
                  <div>
                    <span className="text-xs text-white/70 font-medium">
                      {project.categoryLabel}
                    </span>
                    <p className="text-white font-bold leading-tight">{project.title}</p>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal direction="up" delay={0.25} className="text-center mt-10">
          <Link href="/du-an" className="btn-secondary">
            Xem tất cả dự án →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
