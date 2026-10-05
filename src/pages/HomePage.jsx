import React from 'react';
import StoryStage from '../components/StoryStage';
import IdeaSection from '../components/IdeaSection';
import LearningCycleSection from '../components/LearningCycleSection';
import AudiencesSection from '../components/AudiencesSection';
import ResearchSection from '../components/ResearchSection';
import EducatorCohortSection from '../components/EducatorCohortSection';
import FinalCtaSection from '../components/FinalCtaSection';

export default function HomePage({ onOpenConversation }) {
  return (
    <>
      {/* Chapters 01 to 03: Pinned 3D Book Storytelling Stage (To Learn Is An Art) */}
      <StoryStage onOpenConversation={onOpenConversation} />

      {/* Chapter 03: What ReadFirst Adds to Education (Research-Based Teaching & Learning) */}
      <IdeaSection />

      {/* Chapter 04: The 5-Step Learning Cycle (Question -> Read -> Explore -> Reflect -> Create) */}
      <LearningCycleSection onOpenConversation={onOpenConversation} />

      {/* Chapter 05: Three Pathways (Students, Educators, Institutions) */}
      <AudiencesSection onOpenConversation={onOpenConversation} />

      {/* Chapter 06: Building A Research Culture (Evidence in Practice) */}
      <ResearchSection onOpenConversation={onOpenConversation} />

      {/* Chapter 07: The Educator Transformation Program (Selective Cohort Immersion) */}
      <EducatorCohortSection onOpenConversation={onOpenConversation} />

      {/* Chapter 08: Start A Conversation (Final CTA & Global Footer) */}
      <FinalCtaSection onOpenConversation={onOpenConversation} />
    </>
  );
}
