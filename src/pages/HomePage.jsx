import React from 'react';
import StoryStage from '../components/StoryStage';
import IdeaSection from '../components/IdeaSection';
import LearningCycleSection from '../components/LearningCycleSection';
import AudiencesSection from '../components/AudiencesSection';
import ResearchSection from '../components/ResearchSection';
import FinalCtaSection from '../components/FinalCtaSection';

export default function HomePage({ scrollProgress, onOpenConversation }) {
  return (
    <>
      {/* Chapters 01 to 04: Pinned 3D Book Storytelling Stage */}
      <StoryStage
        scrollProgress={scrollProgress}
        onOpenConversation={onOpenConversation}
      />

      {/* Section 04 Continues: The 5 Foundational Shifts */}
      <IdeaSection />

      {/* Section 05: The ReadFirst Learning Cycle */}
      <LearningCycleSection onOpenConversation={onOpenConversation} />

      {/* Section 06: Three Levels of Change (Students, Educators, Institutions) */}
      <AudiencesSection onOpenConversation={onOpenConversation} />

      {/* Section 07: Research Begins With A Question */}
      <ResearchSection onOpenConversation={onOpenConversation} />

      {/* Section 08: Final Conversation & Global Footer */}
      <FinalCtaSection onOpenConversation={onOpenConversation} />
    </>
  );
}
