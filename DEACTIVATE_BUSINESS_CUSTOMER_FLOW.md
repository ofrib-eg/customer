# Deactivate Business Customer Flow - Design Specification

## Overview
This document describes the complete user flow and design specifications for deactivating a business customer in the Customer module.

---

## Entry Point

### Location: Customer Detail Page (Business Customer)
**URL Pattern:** `/customer/customer/:id`

### Trigger: Footer "More" Menu
- **Element:** Three-dot "More" button in the footer (right side)
- **Icon:** Three horizontal dots (svg icon)
- **Styling:** 
  - Height: 30px
  - Padding: 15px horizontal
  - Background: #EAEAEA
  - Text/Icon color: #1A1A1A
  - Border-radius: Full (rounded-full)
  - Hover: Background changes to #E0E0E0
- **Behavior:** Opens a popover menu on click

### Popover Menu
- **Appearance:** 
  - Appears above the button (side="top")
  - Aligned to start (left edge of button)
  - Offset: 4px from button
  - Background: White
  - Border: 1px solid #CCCCCC
  - Shadow: Standard shadow-lg
  - Min-width: 200px
  - Z-index: 10000

- **Menu Item: "Deactivate"**
  - **Display Condition:** Only shown when customer status is ACTIVE (`isInactive = false`)
  - **Text:** "Deactivate"
  - **Styling:**
    - Font: Roboto Regular, 14px
    - Text color: #1A1A1A
    - Height: 36px
    - Padding-left: 16px (4px gap = pl-4)
    - Hover background: #EAEAEA
    - Text alignment: Left
    - White-space: nowrap
  - **Behavior:** Clicking triggers the deactivation modal and closes the popover

---

## Deactivation Modal

### Modal Container
- **Component:** `DeactivateBusinessCustomerModal`
- **Display:** Fixed overlay, centered on screen
- **Z-index:** 10000
- **Overlay:** 
  - Background: rgba(0, 0, 0, 0.5)
  - Full screen (inset-0)
  - Clicking overlay closes modal

### Modal Window
- **Dimensions:**
  - Width: 500px
  - Max-height: 90vh
  - Overflow: auto (scrollable if content exceeds height)
- **Styling:**
  - Background: White
  - Border-radius: 4px
  - Box-shadow: 0px 4px 16px rgba(0,0,0,0.2)

---

## Modal Structure

### 1. HEADER SECTION
**Layout:** Flex row, space between, with border bottom

**Left Side: Title**
- **Text:** "DEACTIVATE BUSINESS CUSTOMER"
- **Font:** 
  - Family: Roboto Bold
  - Size: 16px
  - Line-height: 19px
  - Color: #1a1a1a
  - Transform: UPPERCASE
- **Padding:** 20px horizontal, 16px vertical

**Right Side: Close Button**
- **Icon:** X (lucide-react)
- **Size:** 
  - Button: 24px × 24px
  - Icon: 16px × 16px
- **Icon Color:** #666
- **Background:** 
  - Default: Transparent
  - Hover: #f0f0f0
- **Border-radius:** 2px
- **Behavior:** Closes modal and resets all form state

**Border:** 
- Bottom border: 1px solid #e0e0e0

---

### 2. CONTENT SECTION
**Padding:** 20px all sides

#### Field 1: Deactivation Reason (REQUIRED)

**Label:**
- **Text:** "* Deactivation reason"
- **Font:** Roboto Regular, 14px
- **Line-height:** 17px
- **Color:** #666
- **Margin-bottom:** 4px

**Dropdown Select:**
- **Height:** 32px
- **Background:** White
- **Border:** 1px solid #ccc
- **Border-radius:** Inherited from parent
- **Font:** Roboto Regular, 14px, #1a1a1a
- **Padding:** 8px 29px 7px 10px (top, right, bottom, left)
- **Cursor:** Pointer
- **Appearance:** None (custom dropdown)

**Dropdown Icon:**
- **Position:** Absolute, right 6px, centered vertically
- **Size:** 20px × 20px
- **Icon:** Chevron down (SVG)
- **Color:** #666

**Options:**
1. "Select reason..." (placeholder, value="")
2. "Business closed" (value="business-closed")
3. "Customer request" (value="customer-request")
4. "No longer purchasing" (value="no-longer-purchasing")
5. "Credit issues" (value="credit-issues")
6. "Merged with another" (value="merged-with-another")
7. "Data quality issue" (value="data-quality-issue")
8. "Other" (value="other")

**Validation:**
- Field is required
- Must select a value (not the placeholder)

**Margin-bottom:** 20px

---

#### Field 2: Specify Reason (CONDITIONAL - REQUIRED)

**Display Condition:** Only shown when "Other" is selected from deactivation reason

**Label:**
- **Text:** "* Specify reason"
- **Font:** Roboto Regular, 14px
- **Line-height:** 17px
- **Color:** #666
- **Margin-bottom:** 4px

**Textarea:**
- **Height:** 80px
- **Background:** White
- **Border:** 1px solid #ccc
- **Font:** Roboto Regular, 14px, #1a1a1a
- **Padding:** 8px 10px
- **Placeholder:** "Enter reason..."
- **Resize:** None
- **Outline:** None

**Validation:**
- Required when "Other" is selected
- Must contain text (trimmed)

**Margin-bottom:** 20px

---

#### Section 3: Organization Options (CONDITIONAL)

**Display Condition:** 
- Only shown when `isSoleCustomer = true` AND `organizationName` exists
- This indicates the business customer being deactivated is the ONLY customer linked to their organization

**Container Styling:**
- **Padding:** 16px all sides
- **Background:** #f5f5f5
- **Border-radius:** 4px
- **Margin-bottom:** 20px

**Header Text:**
- **Text:** "This is the only business customer linked to {organizationName}"
- **Font:** Roboto Bold, 14px
- **Line-height:** 17px
- **Color:** #1a1a1a
- **Margin-bottom:** 12px

**Radio Options (vertical stack, 8px gap):**

##### Option 1: Keep Organization Active (DEFAULT)
- **Radio Input:**
  - Name: "orgAction"
  - Value: "keep"
  - Default: CHECKED
  - Size: 16px × 16px
  - Margin-top: 2px (alignment)
  - Cursor: Pointer

- **Label:**
  - Text: "Keep organization active"
  - Font: Roboto Regular, 14px
  - Line-height: 17px
  - Color: #1a1a1a
  - Cursor: Pointer
  
- **Layout:** Flex row, gap 8px, items aligned to start

---

##### Option 2: Deactivate Organization
- **Radio Input:**
  - Name: "orgAction"
  - Value: "deactivate"
  - Size: 16px × 16px
  - Margin-top: 2px
  - Cursor: Pointer

- **Label:**
  - Text: "Deactivate organization"
  - Font: Roboto Regular, 14px
  - Line-height: 17px
  - Color: #1a1a1a
  - Cursor: Pointer

**Conditional Sub-field (when "Deactivate organization" is selected):**

**Container:**
- Margin-left: 24px (indented)
- Margin-top: 8px

**Label:**
- Text: "* Organization deactivation reason"
- Font: Roboto Regular, 14px
- Line-height: 17px
- Color: #666
- Margin-bottom: 4px

**Dropdown Select:**
- Same styling as main deactivation reason dropdown
- Height: 32px
- Background: White
- Border: 1px solid #ccc
- Font: Roboto Regular, 14px, #1a1a1a

**Options:** (Same list as customer deactivation reasons)
1. "Select reason..." (placeholder)
2. "Business closed"
3. "Customer request"
4. "No longer purchasing"
5. "Credit issues"
6. "Merged with another"
7. "Data quality issue"
8. "Other"

**Automatic Behavior:**
- When "Deactivate organization" is selected AND a customer deactivation reason has already been chosen, the organization reason dropdown is automatically pre-filled with the same reason
- User can change this to a different reason if needed

**Validation:**
- Required when "Deactivate organization" is selected
- Must select a value (not placeholder)

---

##### Option 3: Delete Organization
- **Radio Input:**
  - Name: "orgAction"
  - Value: "delete"
  - Size: 16px × 16px
  - Margin-top: 2px
  - Cursor: Pointer

- **Label:**
  - Text: "Delete organization"
  - Font: Roboto Regular, 14px
  - Line-height: 17px
  - Color: #1a1a1a
  - Cursor: Pointer

**Conditional Warning (when "Delete organization" is selected):**

**Container:**
- Margin-left: 24px (indented)
- Margin-top: 4px

**Warning Text:**
- Text: "⚠ The organization will be permanently removed"
- Font: Roboto Regular, 13px
- Line-height: 16px
- Color: #d32f2f (red warning color)

---

### 3. FOOTER SECTION
**Layout:** Flex row, justified to end, gap 8px

**Styling:**
- Padding: 20px horizontal, 16px vertical
- Border-top: 1px solid #e0e0e0

#### Cancel Button
- **Text:** "Cancel"
- **Font:** Roboto Medium, 14px
- **Line-height:** 17px
- **Colors:**
  - Text: #1a1a1a
  - Background: White
  - Border: 1px solid #ccc
  - Hover background: #f5f5f5
- **Dimensions:** 
  - Height: 36px
  - Padding: 20px horizontal
- **Border-radius:** 4px
- **Transition:** colors
- **Behavior:** Closes modal and resets all form state

#### Confirm Button
- **Text:** "Confirm"
- **Font:** Roboto Medium, 14px
- **Line-height:** 17px
- **Colors:**
  - Text: White
  - Background: #262626
  - Hover background: #1a1a1a
  - Disabled background: #ccc
- **Dimensions:** 
  - Height: 36px
  - Padding: 20px horizontal
- **Border-radius:** 4px
- **Transition:** colors
- **Cursor:** 
  - Default: Pointer
  - Disabled: not-allowed

**Disabled State:**
- Button is disabled when form validation fails (see Validation Logic below)
- Visual: Gray background (#ccc), cursor not-allowed

---

## Validation Logic

The "Confirm" button is enabled ONLY when ALL of the following conditions are met:

### Base Requirements (Always Required)
1. **Deactivation reason** must be selected (not empty string)
2. **IF** deactivation reason is "other":
   - **Specify reason** text must be filled (trimmed, not empty)

### Organization Requirements (Only when isSoleCustomer = true)
3. **IF** organization action is "deactivate":
   - **Organization deactivation reason** must be selected (not empty string)

### Formula
```javascript
isValid = reason && 
          (reason !== "other" || reasonText.trim()) && 
          (orgAction !== "deactivate" || orgReason)
```

---

## State Management

### Local State Variables

| State Variable | Type | Default | Purpose |
|---------------|------|---------|---------|
| `reason` | string | "" | Selected deactivation reason |
| `reasonText` | string | "" | Custom reason text (when "other" selected) |
| `orgAction` | "keep" \| "deactivate" \| "delete" | "keep" | Organization handling choice |
| `orgReason` | string | "" | Organization deactivation reason |

### State Reset Behavior
When modal is closed (via Cancel, X button, or overlay click):
- All state variables reset to default values
- Modal visibility set to false

---

## Auto-fill Behavior

**Trigger:** When user selects "Deactivate organization" radio option

**Condition:** If a customer deactivation reason has been selected AND organization reason is still empty

**Action:** Automatically copy the customer deactivation reason to organization reason

**Implementation:**
```javascript
useEffect(() => {
  if (orgAction === "deactivate" && reason && !orgReason) {
    setOrgReason(reason);
  }
}, [orgAction, reason, orgReason]);
```

**User Override:** User can still manually change the organization reason after auto-fill

---

## Confirmation & Data Flow

### On Confirm Click

**1. Validation Check**
- Verify all required fields are filled
- If validation fails, do nothing (button should already be disabled)

**2. Call onConfirm Callback**
```javascript
onConfirm(reason, reasonText, orgAction, orgReason)
```

**Parameters:**
- `reason`: Selected deactivation reason value
- `reasonText`: Custom text (if "other" selected), otherwise undefined
- `orgAction`: "keep" | "deactivate" | "delete"
- `orgReason`: Organization deactivation reason (if "deactivate" selected), otherwise undefined

**3. State Update in Parent Component**
- Set customer status to inactive (`isInactive = true`)
- Store deactivation reason for display
- Process organization action based on `orgAction` value

**4. Close Modal**
- Reset all form state
- Close modal

---

## Post-Deactivation Behavior

### Customer Detail Page Updates

**1. Status Badge Changes**
- Active badge is replaced with "Inactive" badge
- Badge styling:
  - Background: Appropriate color for inactive state
  - Text: "Inactive"

**2. Deactivation Reason Display**
- Shows the reason for deactivation
- Format: Label version of selected reason
  - Example: "business-closed" → "Business closed"
  - Example: "other" → Displays the custom text entered

**3. Footer Menu Changes**
- "Deactivate" option is removed from More menu
- "Activate" option appears in More menu
- "Delete" option may appear (if deletion conditions are met)

### Deletion Availability (Post-Deactivation)

**For Business Customers:**
Delete option appears ONLY if ALL conditions are met:
- Customer is inactive (`isInactive = true`)
- Customer is sole customer (`isSoleCustomer = true`)
- No transactions exist (`hasTransactions = false`)

**Visual Indicator:**
When deletion is available:
- "Delete" menu item appears in the More menu
- Clicking opens the Delete Customer modal

---

## Component Props Interface

```typescript
interface DeactivateBusinessCustomerModalProps {
  isOpen: boolean;                    // Controls modal visibility
  onClose: () => void;                // Callback to close modal
  onConfirm: (                        // Callback when confirmed
    reason: string,                   // Selected deactivation reason
    reasonText?: string,              // Custom text (if "other")
    orgAction?: "keep" | "deactivate" | "delete",  // Org handling
    orgReason?: string                // Org deactivation reason
  ) => void;
  customerName: string;               // Display name of customer
  organizationName?: string;          // Display name of organization (optional)
  isSoleCustomer?: boolean;           // Is this the only customer? (default: false)
}
```

---

## Accessibility Considerations

### Keyboard Navigation
- Modal can be closed with ESC key (standard behavior)
- Tab navigation works through all form elements
- Radio buttons navigable with arrow keys
- Dropdowns accessible via keyboard

### Screen Readers
- Labels properly associated with form controls
- Required fields marked with asterisk (*)
- Warning messages use semantic color and icon

### Focus Management
- When modal opens, focus should trap within modal
- When modal closes, focus returns to trigger button

---

## Edge Cases & Special Scenarios

### Scenario 1: Non-Sole Customer
- Organization section does NOT appear
- Only customer deactivation reason required
- Organization remains unaffected

### Scenario 2: Sole Customer - Keep Organization
- Customer is deactivated
- Organization remains active
- Organization can still be accessed and managed
- New customers can be added to the organization later

### Scenario 3: Sole Customer - Deactivate Organization
- Both customer AND organization are deactivated
- Both require deactivation reasons
- Organization can be reactivated later

### Scenario 4: Sole Customer - Delete Organization
- Customer is deactivated immediately
- Organization is permanently deleted
- Warning message clearly indicates permanent deletion
- This action cannot be undone

### Scenario 5: "Other" Reason Selected
- Additional textarea appears
- Free text input required
- Text is trimmed before validation
- This text is stored and displayed as the deactivation reason

---

## Design Patterns & Standards

### Typography
- **Headers:** Roboto Bold, UPPERCASE
- **Labels:** Roboto Regular, 14px, #666
- **Input Text:** Roboto Regular, 14px, #1a1a1a
- **Buttons:** Roboto Medium, 14px

### Spacing
- **Section gaps:** 20px
- **Radio option gaps:** 8px
- **Label to input:** 4px
- **Modal padding:** 20px
- **Indentation:** 24px (for nested options)

### Colors
- **Primary Text:** #1a1a1a
- **Secondary Text:** #666
- **Borders:** #ccc
- **Light Borders:** #e0e0e0
- **Background (sections):** #f5f5f5
- **Warning:** #d32f2f
- **Overlay:** rgba(0, 0, 0, 0.5)
- **Button Primary:** #262626
- **Button Hover:** #1a1a1a
- **Button Disabled:** #ccc

### Interaction States
- **Hover:** Background color changes
- **Disabled:** Reduced opacity, cursor not-allowed
- **Focus:** Browser default outline (or custom if specified)
- **Active:** Appropriate feedback for clicks

---

## Implementation Files

**Component Location:** `/src/app/components/customer/DeactivateBusinessCustomerModal.tsx`

**Used In:** `/src/app/components/customer/CustomerDetail.tsx`

**Triggered From:** `/src/app/components/Footer.tsx`

---

## Related Flows

- **Activate Business Customer:** Reverse action, simpler flow
- **Delete Business Customer:** Available after deactivation with specific conditions
- **Deactivate Private Customer:** Similar but different conditions and options
- **Organization Management:** Affected when sole customer is deactivated/deleted

---

## Notes for Developers

1. **Window Global Exposure:** The `handleDeactivate` function is exposed globally via `window.deactivateCustomer` to allow the Footer component to trigger it.

2. **Auto-fill Logic:** The organization reason auto-fills when switching to "deactivate" option, but only if not already set by user.

3. **Validation is Reactive:** The Confirm button's disabled state updates immediately as form fields change.

4. **Organization Name Display:** The organization name should be the readable name, not an ID or code.

5. **State Persistence:** Deactivation reason should be persisted to database/state so it can be displayed on the customer detail page after deactivation.

6. **Conditional Rendering:** The organization section uses nested conditionals - test thoroughly with sole/non-sole customers.

7. **Form Reset:** Always reset form state when modal closes to prevent stale data on re-open.

8. **Error Handling:** Consider adding error states if the deactivation API call fails.

---

## Testing Checklist

- [ ] Modal opens when clicking "Deactivate" in footer menu
- [ ] Modal closes on Cancel button click
- [ ] Modal closes on X button click  
- [ ] Modal closes on overlay click
- [ ] All form state resets on close
- [ ] Deactivation reason dropdown works correctly
- [ ] "Other" reason shows textarea conditionally
- [ ] Textarea validation works (required when "other" selected)
- [ ] Organization section shows only for sole customers
- [ ] Radio buttons for organization action work correctly
- [ ] "Keep organization" is default selection
- [ ] Organization reason dropdown appears when "Deactivate organization" selected
- [ ] Organization reason auto-fills from customer reason
- [ ] Delete organization warning appears when "Delete organization" selected
- [ ] Confirm button is disabled when validation fails
- [ ] Confirm button is enabled when all required fields filled
- [ ] Confirm button triggers correct callback with all parameters
- [ ] Customer status updates to inactive after confirmation
- [ ] Deactivation reason displays on customer detail page
- [ ] Footer menu updates after deactivation (shows Activate, not Deactivate)
- [ ] Test with non-sole customer (no organization section)
- [ ] Test with sole customer + keep organization
- [ ] Test with sole customer + deactivate organization
- [ ] Test with sole customer + delete organization
- [ ] Test all 8 deactivation reason options
- [ ] Test "other" reason with empty text (should not allow confirm)
- [ ] Keyboard navigation works correctly
- [ ] Screen reader announces form fields correctly

---

**Document Version:** 1.0  
**Last Updated:** 2026-02-25  
**Author:** Design Team
