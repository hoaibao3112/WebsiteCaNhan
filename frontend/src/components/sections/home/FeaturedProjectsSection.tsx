import Link from 'next/link';
import { featuredProjects } from '@/data/projects';

export default function FeaturedProjectsSection() {
  return (
    <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #f4f9f9, white)' }}>
      <div className="container-lumina">
        <div className="text-center mb-14">
          <p className="text-sm font-bold text-[#006672] uppercase tracking-widest mb-3">
            Dự án tiêu biểu
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0f0f0f]">
            Công việc đã thực hiện
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Large featured card */}
          <div className="md:col-span-2 md:row-span-2 project-card group h-72 md:h-auto min-h-[300px]">
            <img
              src={featuredProjects[0]?.image}
              alt={featuredProjects[0]?.title ?? 'Dự án tiêu biểu của KABO AGENCY'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="eager"
              fetchPriority="high"
            />
            <div className="project-card-overlay">
              <div>
                <span className="text-xs text-white/70 font-medium">
                  {featuredProjects[0]?.categoryLabel}
                </span>
                <p className="text-white font-bold text-lg leading-tight">
                  {featuredProjects[0]?.title}
                </p>
              </div>
            </div>
          </div>

          {/* Small cards */}
          {featuredProjects.slice(1).map((project) => (
            <div key={project.id} className="project-card group h-56">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/du-an" className="btn-secondary">
            Xem tất cả dự án →
          </Link>
        </div>
      </div>
    </section>
  );
}
