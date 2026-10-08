# ReadFirst content update

## Source priority
The user's requested hero line and minimal homepage take priority over the draft documents' suggested question headline and ten-section architecture. The homepage combines the source narrative into five sections (including the closing contact section): hero, question/beliefs/difference, SMILE, audience offerings, and final invitation.

Content is grounded in READFIRST.docx, ReadFirst keywords.docx, and ReadFirst_Final_Website_Wireframe_Review.docx. Draft leadership approval notes are reference material, not separate tasks. The VistaJet reference supplied through the Google share link informs the image-led, centered mobile hero. Existing ReadFirst imagery and brand colours are retained.

## Secondary pages
The source review's thirteen secondary URLs are available, including programme pages and the full FAQ framework. Existing /institutions and /approach URLs remain available. Shared copy lives in src/content/siteContent.js. Previously displayed unsupported SMILE stages and research studies are excluded from the routed experience.

## Enquiries
Set VITE_CONTACT_ENDPOINT using .env.example to connect an enquiry API. It must accept JSON POST requests and return a successful HTTP response only after accepting the enquiry. No destination was supplied, so submission is disabled with a visible explanation until configured. There is no simulated success state. No personal information is stored locally.

## Verification
Production build, lint, desktop and mobile browser inspection, mobile navigation, audience selection, FAQ expansion, and secondary route checks. Legacy unused components remain in the repository to preserve existing work; their lint warnings are outside the routed experience.
