I need you to build a complete application Here's everything:
**Project overview:**
📱 Gym App Product Document (Member Experience Platform)

⸻

1. 🧠 App Type & Purpose

📌 App Type

A mobile-first gym member experience application with an optional admin dashboard.

🎯 Purpose

This app is designed to enhance the gym member experience and streamline gym operations by digitizing key interactions between members and the gym.

❗ Problem It Solves
	•	Members must carry physical barcode cards → inconvenient & easy to lose
	•	Members don’t know their subscription status or expiry
	•	No clear way to check gym crowd levels before visiting
	•	Announcements and updates are not effectively communicated
	•	Booking services (coaching/spa) is manual and inefficient
	•	Gym staff spend time handling repetitive front-desk tasks

✅ Solution

Provide a centralized mobile app where members can:
	•	access the gym digitally
	•	track their membership
	•	receive updates
	•	interact with services
	•	improve their overall gym experience

⸻

2. ⚙️ Core Features

🔑 1. Authentication System
	•	Member login and account access
	•	Secure identity management

🎟️ 2. Digital Entry Pass (QR/Barcode)
	•	Replace physical gym cards
	•	Members scan their phone to enter

💳 3. Membership Tracking
	•	View subscription status (active/expired)
	•	See expiry date and plan details

📢 4. Announcements & Offers
	•	Gym updates (holidays, offers, notices)
	•	Centralized communication system

📊 5. Gym Occupancy Indicator
	•	Shows how crowded the gym is
	•	Helps members decide best time to visit

📅 6. Booking System
	•	Request personal training sessions
	•	Book spa/massage services

⏰ 7. Gym Info & Working Hours
	•	Display daily working hours
	•	Show schedule changes or special timings

⸻

3. 🔄 User Flow

🧭 Main User Journey

Step 1 — Open App
	•	User launches the app
	•	If not logged in → goes to login screen

⸻

Step 2 — Login / Signup
	•	User enters credentials
	•	Authenticated via backend (Supabase)
	•	Redirected to home dashboard

⸻

Step 3 — Home Dashboard

User sees:
	•	Membership status
	•	Quick actions (QR, booking, gym status)
	•	Announcements
	•	Gym hours

⸻

Step 4 — Use Core Features

🔹 Entry Access
	•	User opens QR screen
	•	Shows QR/barcode
	•	Scanned at gym entrance

🔹 Check Membership
	•	User views expiry date and plan
	•	Understands current status

🔹 Check Gym Status
	•	User sees occupancy level (e.g., busy / moderate / empty)

🔹 View Announcements
	•	User reads updates, offers, or notices

🔹 Book Services
	•	User submits request for coaching or spa

⸻

Step 5 — Ongoing Usage
	•	User returns daily to:
	•	scan QR
	•	check crowd
	•	view updates
	•	manage bookings

⸻

4. 📄 Page Structure

🔐 1. Login Screen

Allows users to log in using email/password and access their account.

⸻

🏠 2. Home Dashboard

Main screen showing membership status, quick actions, announcements, and gym information.

⸻

👤 3. Profile Screen

Displays user details and membership information (plan, expiry, status).

⸻

📱 4. QR Code Screen

Shows a large scannable QR/barcode for gym entry.

⸻

📢 5. Announcements Screen

Lists gym updates, offers, and important notifications.

⸻

📊 6. Gym Status / Occupancy Screen

Displays current crowd level and possibly number of members inside.

⸻

📅 7. Booking Screen

Allows users to request coaching sessions or spa/massage appointments.

⸻

🧾 8. Booking History Screen

Shows previous and pending booking requests with status (approved/rejected).

⸻

⏰ 9. Gym Info Screen

Displays working hours, holidays, and general gym information.

**ALL PAGES & DETAILED SPECIFICATIONS:**
Gym App — Detailed Page Breakdown Document

Product Context

This app is a member-facing mobile application for a gym.
Its purpose is to improve the member experience by digitizing entry access, membership visibility, gym communication, occupancy awareness, and service booking.

The document below covers all identified core pages in detail.

⸻

1. Login Screen

Purpose

This page allows an existing member to securely access their account and enter the app.

Layout Structure
	•	Top logo area
	•	Welcome text section
	•	Form section in main content area
	•	Supporting links under form
	•	Bottom secondary action area

A simple mobile layout:
	•	Top header/logo
	•	Centered form content
	•	Bottom helper links

Key Components
	•	Gym logo
	•	Welcome heading
	•	Subtitle / helper text
	•	Email input field
	•	Password input field
	•	Login button
	•	Forgot password text link
	•	Create account / sign up text link
	•	Optional “Remember me” checkbox
	•	Optional show/hide password icon

Interactive Elements
	•	Type email
	•	Type password
	•	Toggle password visibility
	•	Tap login button
	•	Tap forgot password
	•	Tap create account
	•	Optional tap remember me

Navigation

To this page:
	•	App launch for unauthenticated users
	•	Logout from profile/settings
	•	Session expired

From this page:
	•	Successful login → Home Dashboard
	•	Forgot password → Reset Password flow
	•	Create account → Sign Up page

Content

Text:
	•	App/gym logo
	•	Heading: “Welcome Back”
	•	Subtitle: “Log in to access your membership and gym services”
	•	Input placeholders:
	•	“Email”
	•	“Password”
	•	Button text: “Log In”
	•	Link text:
	•	“Forgot Password?”
	•	“Create Account”

Data:
	•	User-entered credentials only

Images:
	•	Gym logo
	•	Optional subtle background pattern/illustration related to fitness

States

Loading
	•	Login button becomes disabled
	•	Spinner appears inside button
	•	Optional text: “Signing in…”

Error
	•	Invalid email/password
	•	Network error
	•	Account not found
	•	Inactive account
	•	Error message shown under form or as alert

Empty / Initial
	•	Empty input fields
	•	Button disabled until required fields are valid

⸻

2. Home Dashboard

Purpose

This is the app’s main page. It gives the member a quick overview of their gym status and fast access to the most important actions.

Layout Structure
	•	Top header
	•	Scrollable main content
	•	Quick summary cards
	•	Quick actions section
	•	Information sections stacked vertically
	•	Optional bottom navigation bar

Suggested mobile structure:
	•	Header
	•	Membership summary card
	•	Quick actions row/grid
	•	Occupancy card
	•	Announcements preview
	•	Working hours card
	•	Bottom navigation

Key Components
	•	Greeting header
	•	User name / profile avatar
	•	Membership status card
	•	Quick action buttons/cards
	•	Occupancy status widget
	•	Announcements preview list/cards
	•	Gym working hours card
	•	Bottom navigation bar
	•	Optional notification icon

Interactive Elements
	•	Tap membership card to open Profile/Membership page
	•	Tap “Show QR” quick action
	•	Tap “Book Session”
	•	Tap “Gym Status”
	•	Tap announcement card for details
	•	Tap working hours section for full gym info
	•	Tap profile/avatar
	•	Tap nav bar items

Navigation

To this page:
	•	Successful login
	•	Tap Home in bottom navigation
	•	Returning from other sections

From this page:
	•	Membership card → Profile Screen
	•	QR action → QR Code Screen
	•	Occupancy widget → Gym Status Screen
	•	Announcement → Announcements Screen/Details
	•	Book session → Booking Screen
	•	Working hours card → Gym Info Screen
	•	Avatar/profile icon → Profile Screen

Content

Text:
	•	Greeting like “Hello, Peter”
	•	Membership status label: “Active” / “Expired”
	•	Plan name
	•	Expiry date
	•	Quick actions labels:
	•	“Show QR”
	•	“Book Session”
	•	“Gym Status”
	•	Occupancy summary:
	•	“Currently Moderately Busy”
	•	Announcement snippets
	•	Today’s working hours

Data:
	•	User name
	•	Membership type/status/expiry
	•	Current occupancy level
	•	Latest 2–3 announcements
	•	Today’s hours

Images:
	•	Profile avatar or placeholder
	•	Gym logo small in header if desired
	•	Optional icons for features

States

Loading
	•	Skeleton cards for membership and announcements
	•	Placeholder widgets for occupancy and hours

Error
	•	Failed to load dashboard data
	•	Partial failures:
	•	membership loads but announcements fail
	•	Retry buttons where useful

Empty
	•	No announcements available
	•	No occupancy data available
	•	Missing membership details
	•	Friendly placeholders:
	•	“No announcements right now”
	•	“Occupancy information is unavailable”

⸻

3. Profile Screen

Purpose

This page lets the member view their account information and detailed membership information.

Layout Structure
	•	Top app bar/header
	•	User information card
	•	Membership details section
	•	Optional actions section
	•	Optional settings/logout section

Structure:
	•	Header
	•	Profile summary
	•	Membership information
	•	Actions
	•	Footer actions

Key Components
	•	Profile photo/avatar
	•	Full name
	•	Email
	•	Phone number
	•	Membership info card
	•	Membership status badge
	•	Expiry date row
	•	Membership ID row
	•	Optional renew button
	•	Logout button

Interactive Elements
	•	Tap edit profile (optional future feature)
	•	Tap renew membership (if enabled)
	•	Tap logout
	•	Tap back

Navigation

To this page:
	•	Tap profile avatar on dashboard
	•	Tap membership card on dashboard
	•	Bottom navigation profile item

From this page:
	•	Back to Home Dashboard
	•	Renew action → renewal request flow
	•	Logout → Login Screen

Content

Text:
	•	“Profile”
	•	User full name
	•	Email
	•	Phone
	•	Membership fields:
	•	“Plan”
	•	“Status”
	•	“Start Date”
	•	“Expiry Date”
	•	“Membership ID”
	•	Button text:
	•	“Request Renewal”
	•	“Log Out”

Data:
	•	Full name
	•	Email
	•	Phone number
	•	Membership code
	•	Plan type
	•	Start/end date
	•	Status

Images:
	•	User avatar
	•	Optional badge/icon for active status

States

Loading
	•	Skeleton profile card
	•	Skeleton membership rows

Error
	•	Could not load profile
	•	Could not load membership info

Empty
	•	Missing phone number
	•	No membership assigned
	•	Expired/no active plan

⸻

4. QR Code Screen

Purpose

This page displays the member’s digital gym entry pass so it can be scanned at the entrance.

Layout Structure
	•	Top app bar
	•	Centered main content
	•	Large QR/barcode area
	•	Member info below code
	•	Small instructions
	•	Optional refresh/help area

Structure:
	•	Header
	•	Centered code display
	•	Supporting info
	•	Instruction/footer note

Key Components
	•	Page title
	•	Large QR code or barcode
	•	Member name
	•	Membership ID / code
	•	Status badge
	•	Small helper note
	•	Optional brightness tip
	•	Optional refresh button

Interactive Elements
	•	Tap back
	•	Tap refresh QR (if dynamic code later)
	•	Tap help/info icon
	•	Optional enlarge code

Navigation

To this page:
	•	Quick action on Home Dashboard
	•	Membership/Profile area

From this page:
	•	Back to Dashboard
	•	Help/info modal if needed

Content

Text:
	•	“Your Entry Pass”
	•	“Scan this at the entrance”
	•	Member name
	•	Membership ID / code
	•	Optional note:
	•	“Please increase screen brightness if needed”

Data:
	•	Unique membership code
	•	Member name
	•	Membership status

Images:
	•	QR code image or barcode generated from code
	•	Optional gym logo

States

Loading
	•	Placeholder area where code will appear
	•	“Generating entry pass…”

Error
	•	Failed to generate code
	•	Membership inactive / invalid access
	•	Network issue if code depends on backend

Empty
	•	No valid membership code assigned
	•	User not eligible for access

⸻

5. Announcements Screen

Purpose

This page shows all gym updates, notices, offers, closures, and important communication in one place.

Layout Structure
	•	Header with title
	•	Optional category filters/tabs
	•	Scrollable list of announcement cards
	•	Optional pinned banner

Structure:
	•	Top header
	•	Filter row
	•	Announcement list

Key Components
	•	Page title
	•	Filter chips/tabs:
	•	All
	•	Offers
	•	Notices
	•	Hours
	•	Announcement cards
	•	Optional search bar
	•	Optional pinned announcement section

Interactive Elements
	•	Scroll list
	•	Tap announcement card
	•	Filter by category
	•	Pull to refresh
	•	Optional search

Navigation

To this page:
	•	Tap announcement preview from Dashboard
	•	Bottom nav item if included

From this page:
	•	Announcement detail page/modal
	•	Back to Dashboard

Content

Text:

Each card may contain:
	•	Title
	•	Short description
	•	Date
	•	Category tag
	•	CTA like “Read more”

Examples:
	•	“Holiday Working Hours”
	•	“New Ramadan Offer”
	•	“Spa Services Discount This Week”

Data:
	•	Announcement title
	•	Body
	•	Date range
	•	Category
	•	Active status

Images:
	•	Optional thumbnail/banner image for offers
	•	Icons for categories

States

Loading
	•	Skeleton announcement cards

Error
	•	Failed to load announcements
	•	Retry CTA

Empty
	•	“No announcements at the moment”
	•	“No offers available right now”

⸻

6. Gym Status / Occupancy Screen

Purpose

This page helps members understand how crowded the gym currently is, so they can decide the best time to come.

Layout Structure
	•	Header
	•	Main occupancy summary card
	•	Crowd level visual
	•	Supporting text/details
	•	Optional historical trend section

Structure:
	•	Header
	•	Current occupancy card
	•	Visual indicator
	•	Optional info section

Key Components
	•	Current occupancy card
	•	Occupancy status text
	•	Numeric estimate of people inside
	•	Visual bar/gauge/progress indicator
	•	Peak time note
	•	Last updated timestamp
	•	Optional trend chart

Interactive Elements
	•	Pull to refresh
	•	Tap info icon to explain crowd levels
	•	Optional switch between “Now” and “Peak hours”

Navigation

To this page:
	•	Dashboard quick action
	•	Occupancy widget on dashboard

From this page:
	•	Back to Dashboard

Content

Text:
	•	“Gym Status”
	•	“Current Crowd Level”
	•	“Low / Moderate / Busy”
	•	“18 members currently inside”
	•	“Last updated 2 mins ago”
	•	Optional note:
	•	“Best time to visit today: 2:00 PM – 4:00 PM”

Data:
	•	Current occupancy count
	•	Crowd category
	•	Last update time
	•	Optional historical averages

Images:
	•	Icons or gauge visuals
	•	Optional chart

States

Loading
	•	Loading gauge/skeleton card

Error
	•	Occupancy data unavailable
	•	Last known data unavailable

Empty
	•	No occupancy tracking active
	•	“Live crowd data is currently unavailable”

⸻

7. Booking Screen

Purpose

This page allows members to request a service such as personal training, spa, or massage.

Layout Structure
	•	Header
	•	Service selection section
	•	Date/time preference form
	•	Notes input
	•	Submit button

Structure:
	•	Header
	•	Form
	•	Primary action button

Key Components
	•	Service type selector
	•	Coach or service selector
	•	Date picker
	•	Time picker
	•	Notes text area
	•	Submit request button
	•	Optional service description cards

Interactive Elements
	•	Choose service type
	•	Choose date
	•	Choose time
	•	Enter notes/preferences
	•	Submit request
	•	Go back

Navigation

To this page:
	•	Dashboard quick action
	•	Button from coach/spa section
	•	Bottom navigation if included

From this page:
	•	Submit → confirmation state or Booking History
	•	Back → Home Dashboard

Content

Text:
	•	“Book a Session”
	•	“Choose Service”
	•	Service labels:
	•	“Personal Training”
	•	“Spa”
	•	“Massage”
	•	“Preferred Date”
	•	“Preferred Time”
	•	“Notes”
	•	Button: “Submit Request”

Data:
	•	Available services
	•	Available coaches (optional)
	•	Available dates/times if supported

Images:
	•	Optional service icons/images
	•	Optional coach thumbnails

States

Loading
	•	Service list loading
	•	Availability loading
	•	Submit button loading state

Error
	•	Failed to submit request
	•	Invalid date/time
	•	Service unavailable

Empty
	•	No services available
	•	No available slots
	•	No coaches available

⸻

8. Booking History Screen

Purpose

This page allows members to view their current and past booking requests and track their status.

Layout Structure
	•	Header
	•	Filter tabs
	•	List of booking cards

Structure:
	•	Header
	•	Filter row
	•	Scrollable list

Key Components
	•	Tabs or filter chips:
	•	All
	•	Pending
	•	Approved
	•	Rejected
	•	Completed
	•	Booking cards
	•	Status badges
	•	Date/time info
	•	Service type labels

Interactive Elements
	•	Filter list by status
	•	Tap booking for details
	•	Pull to refresh

Navigation

To this page:
	•	From Booking Screen after submit
	•	From dashboard quick action or profile section

From this page:
	•	Back to Dashboard
	•	Tap item → Booking Details modal/page

Content

Text:

Each item should show:
	•	Service type
	•	Requested date/time
	•	Status
	•	Notes preview
	•	Optional assigned coach

Example:
	•	“Personal Training”
	•	“Tuesday, 7:00 PM”
	•	“Pending”

Data:
	•	Booking records tied to member
	•	Status history

Images:
	•	Optional service or coach icons

States

Loading
	•	Skeleton cards

Error
	•	Failed to load bookings

Empty
	•	“You have no bookings yet”
	•	CTA: “Book your first session”

⸻

9. Gym Info Screen

Purpose

This page provides static and semi-static information about the gym such as working hours, holiday hours, location, and contact information.

Layout Structure
	•	Header
	•	Working hours section
	•	Contact section
	•	Location/map section
	•	Additional info section

Structure:
	•	Header
	•	Cards stacked vertically

Key Components
	•	Working hours card
	•	Special notices card
	•	Contact information card
	•	Address/location block
	•	Optional embedded map placeholder
	•	Social/contact buttons
	•	Optional FAQs

Interactive Elements
	•	Tap phone number
	•	Tap email
	•	Tap address / open map
	•	Tap social/contact links

Navigation

To this page:
	•	Dashboard working hours card
	•	Info/help menu
	•	Bottom navigation if present

From this page:
	•	Back to Dashboard
	•	External apps:
	•	phone
	•	maps
	•	email

Content

Text:
	•	“Gym Info”
	•	“Working Hours”
	•	Daily schedule:
	•	Saturday: 8 AM – 12 AM
	•	Sunday: 8 AM – 12 AM
	•	“Holiday Hours”
	•	“Contact Us”
	•	Phone number
	•	Address
	•	Optional note:
	•	“Working hours may change during holidays”

Data:
	•	Weekly opening/closing hours
	•	Holiday exceptions
	•	Contact info
	•	Address

Images:
	•	Gym logo
	•	Small map preview if desired

States

Loading
	•	Skeleton cards

Error
	•	Failed to load gym info
	•	Contact details unavailable

Empty
	•	Missing hours
	•	Missing address/contact data

⸻

10. Optional Sign Up Screen

This may or may not be included depending on whether the gym wants self-registration.

Purpose

Allows a new member to create an account or activate app access.

Layout Structure
	•	Header/logo
	•	Form section
	•	Bottom CTA

Key Components
	•	Full name input
	•	Email input
	•	Password input
	•	Confirm password
	•	Phone input
	•	Optional membership code input
	•	Sign up button

Interactive Elements
	•	Fill fields
	•	Submit registration
	•	Switch to login page

Navigation

To this page:
	•	Login screen “Create Account”

From this page:
	•	Successful sign up → Home or onboarding
	•	Back to Login

Content
	•	“Create Account”
	•	“Join MIZ Gym digitally”
	•	Form field placeholders

States
	•	Loading while submitting
	•	Error for duplicate email / invalid code
	•	Empty initial state

⸻

11. Optional Forgot Password Screen

Purpose

Allows users to begin the password reset process.

Layout Structure
	•	Header
	•	Short instructions
	•	Email input
	•	Send/reset button

Key Components
	•	Email input
	•	Reset button
	•	Success message area

Interactive Elements
	•	Enter email
	•	Tap reset

Navigation

To this page:
	•	Login screen “Forgot password?”

From this page:
	•	Back to login
	•	Success confirmation

Content
	•	“Reset Password”
	•	“Enter your email and we’ll send reset instructions”

States
	•	Loading during request
	•	Error if email not found
	•	Success state after submission

⸻

Global Navigation Structure

Recommended Mobile Navigation

For the member app, a bottom navigation bar is ideal.

Suggested bottom nav items:
	•	Home
	•	QR Pass
	•	Bookings
	•	Announcements
	•	Profile

This keeps the most important flows always accessible.

Secondary Navigation

Some pages are reached through quick actions or cards:
	•	Gym Status from Home
	•	Gym Info from Home
	•	Booking History from Bookings/Profile

⸻

Global Design/UX Notes

Visual Direction
	•	Dark premium theme
	•	Gold accent color matching the gym logo
	•	High contrast for readability
	•	Rounded cards and clean spacing
	•	Luxury/focused fitness feel

Reusable Components

These should be reused across screens for consistency:
	•	App bar/header
	•	Membership status badge
	•	Card component
	•	Primary button
	•	Secondary text button
	•	Empty state card
	•	Loading skeleton
	•	Error alert/snackbar
	•	Section title row

⸻

Global States Across the App

Loading States

Needed almost everywhere:
	•	Page skeletons
	•	Card skeletons
	•	Button spinner on submit actions

Error States

Common error scenarios:
	•	Network unavailable
	•	Server request failed
	•	Unauthorized session expired
	•	Missing membership/booking data

Empty States

Use friendly, useful empty states:
	•	No announcements
	•	No bookings yet
	•	No occupancy info
	•	No active membership assigned

Every empty state should ideally include:
	•	short message
	•	supportive tone
	•	action if relevant

**DESIGN SYSTEM:**

🎨 Gym App Design System (MIZ Gym Style)

⸻

1. 🎨 Color Palette

🏆 Design Direction
	•	Luxury / Premium gym
	•	Dark theme first (primary)
	•	Gold accent (matches your logo)
	•	High contrast, clean UI

⸻

🎯 Primary Color (Brand)

🥇 Gold
	•	Primary: #D4AF37
	•	Use for:
	•	Buttons
	•	Highlights
	•	Active states
	•	Important UI elements

⸻

🧩 Secondary Color

⚫ Deep Black
	•	Secondary: #0D0D0D

Use for:
	•	Main background
	•	Cards (with slight variation)
	•	App base

⸻

✨ Accent Color

🌑 Soft Gold / Hover
	•	Accent: #C49B2C

Use for:
	•	Button hover
	•	Pressed states
	•	Subtle highlights

⸻

🧱 Background Colors

🌙 Dark Mode (Primary Mode)
	•	Main Background: #0D0D0D
	•	Secondary Background (cards): #1A1A1A
	•	Elevated Surface: #222222
	•	Divider: #2C2C2C

⸻

☀️ Light Mode (Optional later)

(You can skip for now, but here’s base)
	•	Background: #F8F8F8
	•	Card: #FFFFFF
	•	Text: #111111

👉 Focus on dark mode only for now

⸻

🔤 Text Colors

Primary Text
	•	#FFFFFF (white)

Secondary Text
	•	#B3B3B3 (light gray)

Disabled Text
	•	#6C6C6C

Inverse Text (on gold buttons)
	•	#000000

⸻

🚦 Status Colors

✅ Success
	•	#28C76F (green)

❌ Error
	•	#EA5455 (red)

⚠️ Warning
	•	#FF9F43 (orange)

ℹ️ Info
	•	#00CFE8 (cyan)

⸻

🎯 Color Usage Rules
	•	Gold = action / importance
	•	Black = background
	•	White = content
	•	Gray = secondary info

👉 Don’t overuse gold — keep it premium

⸻

2. 🔤 Typography

🎯 Font Families

🥇 Headings
	•	Poppins
OR
	•	Montserrat

👉 modern, clean, premium

⸻

🥈 Body
	•	Inter

👉 best for readability

⸻

🧠 Monospace (optional)
	•	JetBrains Mono

👉 only if needed (IDs, codes)

⸻

📏 Font Sizes

Type	Size	Usage
H1	32px	Screen titles
H2	24px	Section titles
H3	20px	Card titles
Body Large	16px	Main text
Body	14px	Normal text
Small	12px	Labels / captions
Tiny	10px	Metadata


⸻

💪 Font Weights

Name	Weight
Regular	400
Medium	500
Semi-bold	600
Bold	700


⸻

📐 Line Heights

Type	Line Height
Headings	1.2
Body	1.5
Small text	1.4


⸻

✨ Typography Rules
	•	Headings → bold or semi-bold
	•	Body → regular
	•	Important text → medium
	•	Avoid too many font sizes

⸻

3. 📏 Spacing System

🎯 Base Unit

👉 4px system

Everything = multiple of 4

⸻

📦 Spacing Scale

Token	Size
XS	4px
SM	8px
MD	16px
LG	24px
XL	32px
XXL	40px
XXXL	48px


⸻

📐 Usage Examples

Padding
	•	Small cards → 12–16px
	•	Large cards → 16–24px

Between elements
	•	Inputs spacing → 12–16px
	•	Sections → 24–32px

Screen margins
	•	Left/right → 16px

⸻

🧱 Component Spacing

Buttons
	•	Padding: 12px 16px

Cards
	•	Padding: 16px
	•	Gap between cards: 16–24px

Forms
	•	Input spacing: 12–16px

⸻

💡 Design System Summary

Colors
	•	Black base
	•	Gold highlight
	•	White text

Typography
	•	Poppins (headings)
	•	Inter (body)

Spacing
	•	4px grid system



Build out all pages as separate page components with full functionality , content and styling according to the design system. Make this a complete, working prototype.
