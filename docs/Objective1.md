# WaterWise Admin System – Development Plan

## Development Timeline

| Week | Day | Task Description | Sub-Tasks (Breakdown) | Deliverable(s) | Test Suite / PR Acceptance Criteria |
|------|-----|------------------|------------------------|----------------|-------------------------------------|
| **Week 1** | **Day 1** | **Create Login Module** | • Create Login Forms<br>• Create Header<br>• Create Roles Table UI | • Login Forms<br>• Header<br>• Roles Table | • Allow users to log in using their username and password successfully.<br>• Navigate to the Admin Dashboard if credentials are correct.<br>• Display all available system roles and assigned permissions correctly.<br>• Allow administrators to create, update, and manage role access configurations successfully. |
| **Week 2** | **Day 1** | **Create Dashboard Module** | • Create Admin KPI Card for Overall Consumption<br>• Create Admin KPI Card for Monthly Consumption<br>• Create Admin KPI Card for Yearly Consumption<br>• Create Admin KPI Card for Per Purok Consumption | • Admin KPI Cards | • Render one KPI card for each dashboard data item.<br>• Display the title, metric value, and subtitle for Overall, Monthly, Yearly, and Per Purok Consumption KPI cards.<br>• Render default values when KPI information is missing.<br>• Display KPI cards in the correct order. |
| **Week 2** | **Day 2** | **Create Consumer Management Module** | • Create Consumer Form UI<br>• Create Payment Form UI<br>• Create Consumer List UI<br>  | • Consumer Form<br>• Consumer List Table<br>• Payment Form | • Accept and validate consumer information (Account Name, Full Name, Contact Number, Purok, Email Address).<br>• Retrieve and display all registered consumer records from the database.<br>• Record consumer payment transactions successfully.<br>• Calculate the total amount due accurately.<br>• Generate a payment record and update the consumer's payment status after submission. |
| **Week 3** | **Day 1** | **Create Role-Based Access Control Module** | • Create Consumer Form UI<br>• Create Reading Form UI<br>• Create Roles Table | • Consumer Form<br>• Reading Form | • Render Consumer Management only for users with Consumer Management permissions.<br>• Allow authorized users to create and update consumer records.<br>• Render Meter Reading only for users with Meter Reading permissions.<br>• Allow authorized users to submit, edit, and save meter readings successfully.<br>• Prevent unauthorized access. |
| **Week 3** | **Day 2** | **Create Authentication Backend** | • Configure Supabase Authentication<br>• Implement Login/Logout Logic<br>• Protect Routes | • Authentication Service<br>• Protected Routes<br>• Supabase Configuration | • Authenticate users successfully using valid credentials.<br>• Return appropriate error messages for invalid login attempts.<br>• Establish a user session after login.<br>• Allow access only to authenticated users.<br>• Redirect unauthenticated users to the Login Page.<br>• Prevent direct URL access to restricted modules.<br>• Connect successfully to Supabase and retrieve/store application data correctly. |
| **Week 4** | **Day 1** | **Create Consumer & Meter Reading Backend** | • Create Reading Database<br>• Store Meter Reading Records | • Consumer Database<br>• Reading Database | • Store, retrieve, update, and delete consumer records successfully.<br>• Save meter reading records accurately.<br>• Associate each reading with the correct consumer account.<br>• Retrieve historical meter reading data without errors. |
| **Week 4** | **Day 2** | **Create Billing & Payment Backend** | • Create Billing Computation Logic<br>• Generate Billing Records<br>• Record Payment Transactions | • Billing Computation Service<br>• Billing Records<br>• Payment Transaction Service | • Calculate consumer billing amounts accurately based on water consumption, configured rates, penalties, and applicable charges.<br>• Generate, store, and retrieve billing records successfully.<br>• Record payment transactions successfully.<br>• Update billing status (Paid, Partially Paid, or Unpaid). |
| **Week 5** | **Day 1** | **Create Event Tagging & Announcement Management Module** | • Create Event Form<br>• Store Event Records<br>• Create Announcement Form UI<br>• Broadcast Announcements | • Event Form<br>• Event Records Table<br>• Announcement Form<br>• Announcement Page | • Allow authorized users to create event records with title, description, date, time, location, and tags.<br>• Display event details including title, schedule, location, status, and tags.<br>• Allow authorized users to create announcements.<br>• Display announcement title, content, publication date, and related event information. |
| **Week 5** | **Day 2** | **Create Report Generation Module** | • Create Report Templates<br>• Generate PDF Reports | • PDF Report Generator<br>• Generated Reports | • Support configurable report sections, headers, footers, and data fields.<br>• Allow administrators to view, download, and print generated PDF reports. |
| **Week 6** | **Day 1** | **Overall System Testing and Validation** | • Test All Modules<br>• Validate System Objectives | • Final Tested System<br>• Test Report | • Complete the end-to-end workflow successfully (Authentication, Consumer Management, Meter Reading, Billing, Payment Processing, and Reporting).<br>• Provide evidence that all major system modules have been tested successfully. |

## Technology Stack

| Category | Technology |
|----------|------------|
| Frontend | React, Vite, Tailwind CSS, React Router |
| Backend | Supabase, PostgreSQL |
| Authentication | Supabase Authentication |
| Testing | Vitest, React Testing Library |

## Project Modules

| Module |
|--------|
| Login Module |
| Dashboard Module |
| Consumer Management |
| Payment Management |
| Role-Based Access Control |
| Authentication Backend |
| Consumer Backend |
| Meter Reading Backend |
| Billing & Payment Backend |
| Event Management |
| Announcement Management |
| Report Generation |
| Overall System Testing |

## Final Deliverables

| Deliverable |
|-------------|
| Login Module |
| Admin Dashboard |
| Consumer Management Module |
| Role-Based Access Control |
| Authentication Service |
| Consumer Database |
| Reading Database |
| Billing Computation Service |
| Payment Transaction Service |
| Event Management Module |
| Announcement Management Module |
| PDF Report Generator |
| Final Tested System |
| Test Report |