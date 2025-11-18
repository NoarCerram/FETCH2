## Execution Plan (Build Order)

**Phase 1: Foundation (Week 1-2)**

1. **Project Setup & Database Schema**
   - Initialize frontend (Vite + React + TypeScript + Tailwind)
   - Initialize backend (Node.js + Express/Fastify + TypeScript)
   - Set up PostgreSQL database
   - Create all tables from the brief (users, bounties, pledges, claims, verifications, payouts, comments, notifications, hardware_profiles)
   - Write migration scripts
   - Seed with test data
   - Test: Can connect to database, tables exist, constraints work

2. **Authentication System**
   - User registration (email, password, username validation)
   - Login with JWT (access + refresh tokens)
   - Password reset flow
   - Email verification flow
   - Middleware for protected routes
   - Test: Register, login, get tokens, access protected endpoint, refresh token, reset password

3. **Basic User Management**
   - GET /api/users/:id (public profile)
   - PATCH /api/users/me (update own profile)
   - User settings page on frontend
   - Test: Create user, view profile, update profile, verify changes persist

**Phase 2: Core Bounty System (Week 3-4)**

4. **Bounty CRUD**
   - POST /api/bounties (create)
   - GET /api/bounties (list with pagination)
   - GET /api/bounties/:id (single bounty)
   - PATCH /api/bounties/:id (update)
   - DELETE /api/bounties/:id (soft delete)
   - Frontend: bounty listing page, bounty detail page, create bounty form
   - Test: Create bounty, view list, view detail, edit, delete, verify all fields save correctly

5. **Search & Filtering**
   - Full text search with PostgreSQL ts_vector
   - Filter by category, status, complexity
   - Sort by newest, highest bounty, most contributors
   - Frontend: search bar, filter sidebar
   - Test: Search for terms, apply filters, sort results, verify correct bounties returned

6. **Comments System**
   - POST /api/bounties/:id/comments
   - GET /api/bounties/:id/comments (with pagination)
   - PATCH /api/comments/:id (edit own)
   - DELETE /api/comments/:id (soft delete own)
   - Frontend: comments section on bounty detail page
   - Test: Add comment, edit comment, delete comment, thread comments if implemented

**Phase 3: Money Flow (Week 5-6)**

7. **Stripe Setup (Test Mode)**
   - Stripe account setup in test mode
   - Environment variables for keys
   - Basic PaymentIntent creation
   - Webhook endpoint setup (signature verification)
   - Test: Create PaymentIntent, verify webhook signature works with test events

8. **Pledge System**
   - POST /api/bounties/:id/pledges (create pledge + PaymentIntent)
   - Frontend: pledge modal on bounty detail page
   - Stripe.js integration for card collection
   - Webhook handler for payment.succeeded
   - Update bounty total when pledge confirmed
   - GET /api/bounties/:id/pledges (view pledges summary)
   - Test: Add pledge with test card, verify webhook updates database, check bounty total updates

9. **Payout System (Mocked Initially)**
   - Stripe Connect account setup flow for developers
   - POST /api/claims/:id/payout (create transfer)
   - Webhook handler for transfer.paid
   - GET /api/payouts (developer payout history)
   - Frontend: settings page for Stripe Connect onboarding
   - Test: Onboard test developer account, trigger payout, verify transfer created, check webhook updates status

**Phase 4: Claim & Verification (Week 7-8)**

10. **Claim System**
    - POST /api/bounties/:id/claims (claim bounty)
    - PATCH /api/claims/:id (update work notes, add PR links)
    - POST /api/claims/:id/abandon (abandon claim)
    - POST /api/claims/:id/submit (mark ready for verification)
    - Frontend: claim bounty button, claim detail page, work notes editor
    - Test: Claim bounty, update notes, abandon, reclaim by different user, submit for verification

11. **Hardware Profiles**
    - POST /api/users/me/hardware-profiles (add profile)
    - GET /api/users/me/hardware-profiles (list own profiles)
    - DELETE /api/users/me/hardware-profiles/:id
    - Frontend: hardware profiles section in settings
    - Test: Add hardware profile, view list, delete profile

12. **Verification System**
    - GET /api/bounties/:id/verification-requests (find matching testers)
    - POST /api/bounties/:id/verification-requests (request specific user)
    - POST /api/verification/:id/results (submit test results)
    - Verification threshold logic (multiple verifications for high complexity)
    - Automatic payout trigger when threshold met
    - Frontend: verification request page, test results form
    - Test: Request verification, submit passing results, verify payout triggered, test failing results

**Phase 5: Communication (Week 9)**

13. **Notification System (Database + Email)**
    - Create notification records for key events
    - GET /api/users/me/notifications (list notifications)
    - PATCH /api/notifications/:id (mark as read)
    - Email templates (new pledge, claim, verification request, payout)
    - SendGrid/Postmark integration
    - Notification preferences in user settings
    - Frontend: notification bell icon, dropdown, notification preferences page
    - Test: Trigger various events, verify notifications created, emails sent, preferences respected

14. **WebSocket Real-time Updates (Optional for MVP)**
    - Socket.io setup
    - User channel subscriptions
    - Push notifications when events occur
    - Frontend: WebSocket connection, toast notifications
    - Test: Connect with multiple clients, trigger event, verify all connected users get update

**Phase 6: Integrations (Week 10)**

15. **GitHub Integration**
    - OAuth flow for connecting GitHub
    - Store access token (encrypted)
    - Link bounty to GitHub issue
    - Link claim to PR
    - Webhook for PR merge events
    - Frontend: GitHub connection in settings, issue/PR linking in forms
    - Test: Connect GitHub, link issue, link PR, trigger PR merge, verify bounty status updates

**Phase 7: Dashboard & Admin (Week 11)**

16. **User Dashboard**
    - GET /api/dashboard/stats (user's stats)
    - Frontend: dashboard page with created bounties, pledges, claims sections
    - Different views for regular users vs developers
    - Test: View dashboard as regular user, as developer, verify correct data shown

17. **Admin Panel**
    - Admin role check middleware
    - GET /api/admin/bounties (all bounties with financial details)
    - POST /api/admin/bounties/:id/resolve (manual resolution)
    - POST /api/admin/refunds/:pledge_id (issue refund)
    - Frontend: admin panel page
    - Test: Access as admin, view sensitive data, manually resolve bounty, issue refund

**Phase 8: Polish & Production Prep (Week 12-13)**

18. **Edge Cases & Error Handling**
    - Abandoned claim auto-handling
    - Stale bounty handling
    - Failed payment handling
    - Dispute system basics
    - Comprehensive error messages
    - Test: Trigger each edge case, verify system handles gracefully

19. **Frontend Polish**
    - Loading states
    - Error states
    - Empty states
    - Responsive design tweaks
    - Accessibility (ARIA labels, keyboard navigation)
    - Test: Navigate entire app, verify no broken states

20. **Security Hardening**
    - Rate limiting on all endpoints
    - Input validation comprehensive review
    - CSRF token implementation
    - Security headers
    - Dependency audit
    - Test: Try to break things (SQL injection attempts, XSS, CSRF, brute force)

21. **Deployment Setup**
    - Docker containers for frontend and backend
    - CI/CD pipeline (GitHub Actions)
    - Production environment variables
    - Monitoring setup (Sentry, DataDog)
    - Database backup automation
    - Test: Deploy to staging, run smoke tests

22. **Documentation & Launch Prep**
    - API documentation
    - User guides (how to post bounty, how to claim, etc)
    - Privacy policy and terms of service
    - FAQ page
    - Test: Have non-technical person try to use platform with just the docs

---

## How to Use This Plan

For each numbered item:

1. Take the relevant section from the technical brief
2. Use the prompt template above, specifying which item you're building
3. Let AI generate the code and tests
4. Run the tests
5. Manually test following AI's provided steps
6. Fix any issues
7. Commit to git
8. Move to next item

Items within a phase can sometimes be parallelized if you have multiple people. Items across phases must be sequential because of dependencies.

The week estimates assume one person working full time. Adjust based on your actual capacity.
