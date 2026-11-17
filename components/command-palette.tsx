'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Check, Compass, Copy, FileText, FlaskConical, FolderGit2, Github, Linkedin, Mail, Moon, PenLine, Sun } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useTheme } from '@/components/theme-provider';
import { profile } from '@/data/profile';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    const onCustomOpen = () => setOpen(true);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('open-command-palette', onCustomOpen);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('open-command-palette', onCustomOpen);
    };
  }, []);

  const navigate = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const openExternal = (url: string) => {
    setOpen(false);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Jump to section, project, CV, or action..." />
      <CommandList>
        <CommandEmpty>No matching command found.</CommandEmpty>

        <CommandGroup heading="Sections">
          <CommandItem onSelect={() => navigate('/#work')}>
            <span className="flex items-center gap-2.5">
              <Compass className="h-4 w-4 text-accent" />
              Selected Work
            </span>
            <CommandShortcut>01</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/#research')}>
            <span className="flex items-center gap-2.5">
              <FlaskConical className="h-4 w-4 text-accent" />
              Research in Progress (FYDP)
            </span>
            <CommandShortcut>02</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/#experience')}>
            <span className="flex items-center gap-2.5">
              <Compass className="h-4 w-4 text-muted-foreground" />
              Experience & Leadership
            </span>
            <CommandShortcut>03</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/#about')}>
            <span className="flex items-center gap-2.5">
              <Compass className="h-4 w-4 text-muted-foreground" />
              About & Education
            </span>
            <CommandShortcut>04</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/#toolkit')}>
            <span className="flex items-center gap-2.5">
              <Compass className="h-4 w-4 text-muted-foreground" />
              Technical Toolkit
            </span>
            <CommandShortcut>05</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/#contact')}>
            <span className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-accent" />
              Send Message (message.sh)
            </span>
            <CommandShortcut>06</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Pages & Case Studies">
          <CommandItem onSelect={() => navigate('/projects')}>
            <span className="flex items-center gap-2.5">
              <FolderGit2 className="h-4 w-4 text-accent" />
              All Projects (index)
            </span>
            <CommandShortcut>/projects</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/blog')}>
            <span className="flex items-center gap-2.5">
              <PenLine className="h-4 w-4 text-accent" />
              Writing & Notes
            </span>
            <CommandShortcut>/blog</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/research')}>
            <span className="flex items-center gap-2.5">
              <FlaskConical className="h-4 w-4 text-accent" />
              Echocardiography MI Research Page
            </span>
            <CommandShortcut>/research</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigate('/resume')}>
            <span className="flex items-center gap-2.5">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Interactive Resume & CV
            </span>
            <CommandShortcut>/resume</CommandShortcut>
          </CommandItem>
          {profile.projects.map((proj) => (
            <CommandItem key={proj.slug} onSelect={() => navigate(`/projects/${proj.slug}`)}>
              <span className="flex items-center gap-2.5">
                <FolderGit2 className="h-4 w-4 text-muted-foreground" />
                {proj.shortTitle}
              </span>
              <CommandShortcut>{proj.category}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links & Actions">
          <CommandItem onSelect={() => openExternal(profile.links.github)}>
            <span className="flex items-center gap-2.5">
              <Github className="h-4 w-4" />
              Open GitHub (@NurNazim21)
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
          </CommandItem>
          <CommandItem onSelect={() => openExternal(profile.links.linkedin)}>
            <span className="flex items-center gap-2.5">
              <Linkedin className="h-4 w-4" />
              Open LinkedIn Profile
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
          </CommandItem>
          <CommandItem onSelect={() => openExternal(profile.cvPath)}>
            <span className="flex items-center gap-2.5">
              <FileText className="h-4 w-4" />
              Download CV (PDF)
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
          </CommandItem>
          <CommandItem onSelect={copyEmail}>
            <span className="flex items-center gap-2.5">
              {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
              {copied ? 'Copied email address' : `Copy email (${profile.email})`}
            </span>
          </CommandItem>
          <CommandItem
            onSelect={() => {
              toggleTheme();
              setOpen(false);
            }}
          >
            <span className="flex items-center gap-2.5">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Theme
            </span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
