import type { ProjectItem } from '@/data/profile';
import { ProjectConceptPreview } from '@/components/project-previews';

/**
 * Shows the real product screenshot when the project has one,
 * and falls back to the code-built conceptual interface otherwise.
 */
export function ProjectVisual({ project }: { project: ProjectItem }) {
  const shot = project.screenshot;

  if (!shot) {
    return <ProjectConceptPreview kind={project.previewKind} />;
  }

  return (
    <div className="relative w-full aspect-[2/1] overflow-hidden rounded-md border border-border bg-surface-subtle">
      <img
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.015]"
      />
    </div>
  );
}
