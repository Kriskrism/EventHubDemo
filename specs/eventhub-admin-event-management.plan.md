# EventHub Admin Event Management Test Plan

## Application Overview

The EventHub application allows authenticated users to log in, access the Admin section, manage events by creating new events through the Manage Events page, and verify the newly created events appear in the All Events list. The test plan covers the complete user journey from login through event creation and verification, including happy path scenarios, edge cases, validation checks, and error handling.

---

## Credentials Configuration

**Note:** The following credentials should be stored as GitHub Secrets and referenced in your test execution environment:

- `TEST_EMAIL`: Admin user email address
- `TEST_PASSWORD`: Admin user password

Replace `{{TEST_EMAIL}}` and `{{TEST_PASSWORD}}` placeholders with environment variables or secret references in your actual test implementation.

---

## Test Scenarios

### 1. Admin Event Management Tests

**Seed:** `tests/seed.spec.ts`

#### 1.1. Login to EventHub and access Admin Manage Events page

**File:** `tests/admin/AdminEventManagement.spec.ts`

**Steps:**
  1. Navigate to EventHub login page at https://eventhub.rahulshettyacademy.com/login
    - expect: Login page is displayed
    - expect: Sign In button is visible
    - expect: Email and Password input fields are present
  2. Enter valid email `{{TEST_EMAIL}}` in the Email field
    - expect: Email is entered successfully
    - expect: Email field shows the entered value
  3. Enter valid password `{{TEST_PASSWORD}}` in the Password field
    - expect: Password is entered successfully
    - expect: Password field is populated
  4. Click the Sign In button
    - expect: User is successfully logged in
    - expect: Home page is displayed
    - expect: Navigation menu shows user email from `{{TEST_EMAIL}}`
    - expect: Logout button appears in the top right
  5. Click on the Admin button in the navigation menu
    - expect: Admin dropdown menu opens
    - expect: Two menu options are visible: 'Manage Events' and 'Manage Bookings'
  6. Click on 'Manage Events' option from the Admin dropdown
    - expect: User is navigated to /admin/events page
    - expect: Event management page is displayed
    - expect: '+ New Event' form section is visible
    - expect: 'All Events' section shows existing events in a table

#### 1.2. Create a new event successfully with all required details

**File:** `tests/admin/AdminEventManagement.spec.ts`

**Steps:**
  1. Log in to EventHub with credentials from environment: Email: `{{TEST_EMAIL}}` and Password: `{{TEST_PASSWORD}}`
    - expect: User is logged in successfully
    - expect: Home page is displayed
  2. Navigate to Admin > Manage Events
    - expect: Event management page is displayed
    - expect: New Event form is visible with all input fields
  3. Enter event title 'Tech Innovation Summit 2026' in the Title field
    - expect: Title field shows the entered text
    - expect: No validation errors appear
  4. Enter event description 'Discover cutting-edge technologies and network with industry leaders in a day-long summit featuring keynote speeches, panel discussions, and interactive workshops.' in the Description field
    - expect: Description is entered successfully
    - expect: Description field displays the full text
  5. Select 'Conference' from the Category dropdown
    - expect: Category dropdown shows 'Conference' as selected
    - expect: Other available options are: Concert, Sports, Workshop, Festival
  6. Enter city name 'Bangalore' in the City field
    - expect: City field displays 'Bangalore'
    - expect: No validation error messages appear
  7. Enter venue details 'Bengaluru Convention Center, Outer Ring Road' in the Venue field
    - expect: Venue field shows the entered address
    - expect: Field accepts the complete venue information
  8. Click on the Event Date & Time field and select 'Saturday, 15 November 2026' at '10:00 AM'
    - expect: Date picker calendar is displayed
    - expect: Date is selected successfully
    - expect: Time is set to 10:00 AM
    - expect: Field shows the selected date and time
  9. Enter price '1500' in the Price field
    - expect: Price field displays '1500'
    - expect: Field accepts numeric input
  10. Enter total seats '500' in the Total Seats field
    - expect: Total Seats field shows '500'
    - expect: Field accepts numeric value
  11. Enter image URL 'https://example.com/tech-summit-image.jpg' in the Image URL field (optional)
    - expect: Image URL field displays the entered URL
    - expect: No error appears for optional field
  12. Click the '+ Add Event' button
    - expect: Button click is processed
    - expect: Form submission is initiated
    - expect: Success message or confirmation appears (if applicable)
    - expect: Page refreshes or form is cleared

#### 1.3. Verify newly created event appears in All Events section

**File:** `tests/admin/AdminEventManagement.spec.ts`

**Steps:**
  1. Complete the event creation workflow by filling all required fields and clicking '+ Add Event'
    - expect: Event creation form is submitted successfully
  2. Scroll down to the 'All Events' section at the bottom of the Manage Events page
    - expect: All Events table is visible
    - expect: Table shows list of all events
  3. Search or locate the newly created event 'Tech Innovation Summit 2026' in the All Events table
    - expect: New event appears in the table with Title column showing 'Tech Innovation Summit 2026'
    - expect: Event row is visible and not empty
  4. Verify the event details in the table row match the entered information
    - expect: Title shows: 'Tech Innovation Summit 2026'
    - expect: Category shows: 'Conference'
    - expect: City shows: 'Bangalore'
    - expect: Date shows: '15 Nov 2026'
    - expect: Price shows: '$1,500'
    - expect: Seats shows: '500/500' (format may vary with available/total)
  5. Verify the event counter at the top of All Events section has increased
    - expect: Event count has incremented from previous total (e.g., from '3 total' to '4 total' or similar)
    - expect: Counter reflects the newly added event

#### 1.4. Create event with only required fields (minimal data)

**File:** `tests/admin/AdminEventManagement.spec.ts`

**Steps:**
  1. Log in and navigate to Admin > Manage Events
    - expect: Event management page is displayed
    - expect: New Event form is visible
  2. Enter only the required fields: Title 'Summer Festival 2026', Category 'Festival', City 'Mumbai', Venue 'Marine Drive', Date/Time 'Friday, 30 August 2026 at 6:00 PM', Price '800', Total Seats '1000'
    - expect: All required fields are filled
    - expect: No validation errors appear
    - expect: Description and Image URL remain empty (optional fields)
  3. Click the '+ Add Event' button
    - expect: Event is created successfully with only required information
    - expect: Form submission succeeds
  4. Verify the event 'Summer Festival 2026' appears in the All Events section
    - expect: Event appears in the table with Title: 'Summer Festival 2026'
    - expect: Category shows 'Festival'
    - expect: City shows 'Mumbai'
    - expect: Event is displayed with complete information despite missing optional fields

#### 1.5. Attempt to create event without required Title field

**File:** `tests/admin/AdminEventManagement.spec.ts`

**Steps:**
  1. Log in and navigate to Admin > Manage Events
    - expect: Event management page is displayed
  2. Leave Title field empty and fill other required fields: Category 'Concert', City 'Delhi', Venue 'India Gate', Date/Time 'Sunday, 25 August 2026 at 7:00 PM', Price '2000', Total Seats '500'
    - expect: Title field remains empty
    - expect: Other required fields are populated
  3. Click the '+ Add Event' button
    - expect: Form submission is blocked
    - expect: Validation error message appears for Title field (e.g., 'Title is required' or similar)
    - expect: Button remains active for retry
    - expect: Event is not created or added to All Events

#### 1.6. Attempt to create event without required Category field

**File:** `tests/admin/AdminEventManagement.spec.ts`

**Steps:**
  1. Log in and navigate to Admin > Manage Events
    - expect: Event management page is displayed
  2. Fill all required fields except Category: Title 'Art Exhibition 2026', City 'Chennai', Venue 'Government Museum', Date/Time 'Monday, 10 September 2026 at 10:00 AM', Price '300', Total Seats '200'
    - expect: Title, City, Venue, Date/Time, Price, and Seats are filled
    - expect: Category field is left unchanged or empty
  3. Click the '+ Add Event' button
    - expect: Form validation fails
    - expect: Error message appears for Category field
    - expect: Form is not submitted

#### 1.7. Attempt to create event with negative price value

**File:** `tests/admin/AdminEventManagement.spec.ts`

**Steps:**
  1. Log in and navigate to Admin > Manage Events
    - expect: Event management page is displayed
  2. Fill all required fields with Title 'Music Festival', Category 'Concert', City 'Bangalore', Venue 'Lal Bagh', Date/Time 'Saturday, 20 July 2026 at 5:00 PM', Price '-500' (negative value), Total Seats '1500'
    - expect: All fields are filled
    - expect: Price field shows negative value '-500'
  3. Click the '+ Add Event' button
    - expect: Either validation error appears preventing negative price entry
    - expect: Or validation prevents form submission
    - expect: Error message indicates price must be a positive value
    - expect: Event is not created

#### 1.8. Attempt to create event with zero seats

**File:** `tests/admin/AdminEventManagement.spec.ts`

**Steps:**
  1. Log in and navigate to Admin > Manage Events
    - expect: Event management page is displayed
  2. Fill all required fields with Title 'Corporate Workshop', Category 'Workshop', City 'Pune', Venue 'Business Park', Date/Time 'Tuesday, 12 August 2026 at 2:00 PM', Price '1200', Total Seats '0'
    - expect: All fields except seats are properly filled
    - expect: Total Seats field shows '0'
  3. Click the '+ Add Event' button
    - expect: Either form validation prevents submission
    - expect: Or system returns error message
    - expect: Error indicates seats must be greater than zero
    - expect: Event is not created in the system

#### 1.9. Create multiple events sequentially and verify all appear in All Events

**File:** `tests/admin/AdminEventManagement.spec.ts`

**Steps:**
  1. Log in and navigate to Admin > Manage Events
    - expect: Event management page is displayed
    - expect: Current event count is noted (e.g., '3 total')
  2. Create first event: Title 'Jazz Night', Category 'Concert', City 'Goa', Venue 'Beach Resort', Date 'Friday, 5 July 2026 at 8:00 PM', Price '1800', Seats '800'
    - expect: First event is created successfully
    - expect: Event appears in All Events section
  3. Create second event: Title 'Yoga Retreat', Category 'Workshop', City 'Rishikesh', Venue 'Yoga Ashram', Date 'Monday, 15 July 2026 at 6:00 AM', Price '2500', Seats '100'
    - expect: Second event is created successfully
    - expect: Second event appears in All Events section
  4. Create third event: Title 'Sports Championship', Category 'Sports', City 'Kolkata', Venue 'Eden Gardens', Date 'Saturday, 25 July 2026 at 3:00 PM', Price '500', Seats '50000'
    - expect: Third event is created successfully
    - expect: All three newly created events are visible in All Events table
    - expect: Event count at top shows increased number
  5. Verify all three events are displayed in correct order or retrievable in the All Events section
    - expect: Jazz Night is visible with all correct details
    - expect: Yoga Retreat is visible with all correct details
    - expect: Sports Championship is visible with all correct details
    - expect: No events are missing from the list

#### 1.10. Verify All Events section displays newly created event at correct position

**File:** `tests/admin/AdminEventManagement.spec.ts`

**Steps:**
  1. Log in and navigate to Admin > Manage Events, noting the current number of events in All Events section
    - expect: All Events section displays current events
    - expect: Event counter shows total (e.g., '3 total')
  2. Create a new event with Title 'Photography Exhibition 2026', Category 'Festival', City 'Lucknow', Venue 'State Gallery', Date 'Sunday, 20 August 2026 at 11:00 AM', Price '250', Seats '500'
    - expect: Event creation form is filled and submitted
  3. Scroll to the All Events table and locate the newly created event
    - expect: Event 'Photography Exhibition 2026' is visible in the table
    - expect: Event appears with correct category 'Festival'
    - expect: Event shows correct city 'Lucknow'
    - expect: Event displays correct date '20 Aug 2026'
    - expect: Event shows correct price '$250'
    - expect: Event shows correct seat capacity '500/500' or similar format
  4. Verify the event counter has incremented by 1
    - expect: Counter shows new total (previous + 1)
    - expect: If previously '3 total', now shows '4 total'

#### 1.11. Verify event details accuracy in All Events table after creation

**File:** `tests/admin/AdminEventManagement.spec.ts`

**Steps:**
  1. Log in and navigate to Admin > Manage Events page
    - expect: Event management page loads successfully
  2. Create event with specific details: Title 'Heritage Walk Tour', Category 'Workshop', City 'Jaipur', Venue 'City Palace', Date/Time 'Wednesday, 18 September 2026 at 9:00 AM', Price '450', Total Seats '200'
    - expect: Event creation form is submitted successfully
  3. Locate 'Heritage Walk Tour' in the All Events table and compare displayed information with entered values
    - expect: Table column 'Title' matches: 'Heritage Walk Tour'
    - expect: Table column 'Category' matches: 'Workshop'
    - expect: Table column 'City' matches: 'Jaipur'
    - expect: Table column 'Date' displays: '18 Sep 2026' (formatted date)
    - expect: Table column 'Price' displays: '$450'
    - expect: Table column 'Seats' displays: '200/200' (total seats format)
  4. Verify no data truncation or formatting errors in any field
    - expect: All event details are fully visible
    - expect: No text is cut off
    - expect: All columns display complete information
