# Airtable Schema for Packaging Glamour Admin System

## Required Airtable Bases and Tables

### Base 1: Employee Management

#### Table 1: Employees
**Purpose:** Store all employee information beyond Firebase Auth

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| Employee ID | Single line text | Unique identifier (auto-generated) | Yes |
| Firebase UID | Single line text | Link to Firebase Auth user | Yes |
| Full Name | Single line text | Employee's full name | Yes |
| Email | Email | Employee email address | Yes |
| Department | Single select | Production, Warehouse, Logistics, Sales, Finance, HR, IT, Management | Yes |
| Position | Single line text | Job title/position | Yes |
| Phone Number | Phone number | Contact number | No |
| Hire Date | Date | Date of employment | Yes |
| Status | Single select | Active, On Leave, Terminated | Yes |
| Manager | Link to another record | Link to manager (same table) | No |
| Profile Picture URL | URL | Link to profile photo | No |
| Address | Long text | Employee address | No |
| Emergency Contact | Long text | Emergency contact information | No |
| Created At | Created time | Auto-generated | Yes |
| Last Modified | Last modified time | Auto-generated | Yes |

#### Table 2: Attendance
**Purpose:** Track employee attendance and work hours

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| Attendance ID | Single line text | Auto-generated unique ID | Yes |
| Employee | Link to another record | Link to Employees table | Yes |
| Date | Date | Attendance date | Yes |
| Clock In | Date | Clock in time | Yes |
| Clock Out | Date | Clock out time | No |
| Status | Single select | Present, Absent, Late, Half Day, Leave | Yes |
| Hours Worked | Number | Calculated hours | No |
| Notes | Long text | Additional notes | No |
| Created At | Created time | Auto-generated | Yes |

#### Table 3: Leave Requests
**Purpose:** Manage employee leave requests

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| Request ID | Single line text | Auto-generated unique ID | Yes |
| Employee | Link to another record | Link to Employees table | Yes |
| Leave Type | Single select | Vacation, Sick, Personal, Emergency | Yes |
| Start Date | Date | Leave start date | Yes |
| End Date | Date | Leave end date | Yes |
| Days Requested | Number | Total days | Yes |
| Reason | Long text | Reason for leave | Yes |
| Status | Single select | Pending, Approved, Rejected | Yes |
| Approved By | Link to another record | Link to manager/approver | No |
| Response Notes | Long text | Approval/rejection notes | No |
| Created At | Created time | Auto-generated | Yes |

### Base 2: Operations Management

#### Table 4: Production Orders
**Purpose:** Track production orders and status

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| Order ID | Single line text | Unique order number | Yes |
| Customer Name | Single line text | Customer/client name | Yes |
| Product Type | Single select | Labels, Packaging, Custom | Yes |
| Quantity | Number | Order quantity | Yes |
| Status | Single select | Pending, In Production, Quality Check, Completed, Shipped | Yes |
| Priority | Single select | Low, Medium, High, Urgent | Yes |
| Order Date | Date | Date order was placed | Yes |
| Due Date | Date | Expected completion date | Yes |
| Assigned To | Link to another record | Link to Employees table | No |
| Notes | Long text | Order notes/specifications | No |
| Created At | Created time | Auto-generated | Yes |

#### Table 5: Inventory Items
**Purpose:** Track warehouse inventory

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| Item ID | Single line text | Unique item identifier | Yes |
| Item Name | Single line text | Product/material name | Yes |
| Category | Single select | Raw Materials, Finished Goods, Supplies | Yes |
| Current Stock | Number | Current quantity in stock | Yes |
| Min Stock Level | Number | Reorder threshold | Yes |
| Unit | Single select | Pieces, Rolls, Sheets, Kg, Liters | Yes |
| Location | Single line text | Warehouse location | No |
| Supplier | Single line text | Supplier name | No |
| Unit Price | Currency | Price per unit | No |
| Last Restocked | Date | Last restock date | No |
| Status | Single select | In Stock, Low Stock, Out of Stock | Yes |
| Notes | Long text | Additional information | No |
| Created At | Created time | Auto-generated | Yes |

#### Table 6: Deliveries
**Purpose:** Track delivery operations

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| Delivery ID | Single line text | Unique delivery number | Yes |
| Order ID | Link to another record | Link to Production Orders | Yes |
| Customer Name | Single line text | Delivery recipient | Yes |
| Delivery Address | Long text | Delivery location | Yes |
| Driver | Link to another record | Link to Employees (Logistics) | No |
| Vehicle Number | Single line text | Delivery vehicle | No |
| Status | Single select | Scheduled, In Transit, Delivered, Failed | Yes |
| Scheduled Date | Date | Planned delivery date | Yes |
| Actual Delivery Date | Date | Actual delivery date | No |
| Signature | Attachment | Delivery proof/signature | No |
| Notes | Long text | Delivery notes | No |
| Created At | Created time | Auto-generated | Yes |

### Base 3: Customer & Sales Management

#### Table 7: Customers
**Purpose:** Store customer information for CRM

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| Customer ID | Single line text | Unique customer identifier | Yes |
| Company Name | Single line text | Business/company name | Yes |
| Contact Person | Single line text | Primary contact name | Yes |
| Email | Email | Contact email | Yes |
| Phone | Phone number | Contact phone | Yes |
| Address | Long text | Business address | No |
| Industry | Single select | Retail, Manufacturing, E-commerce, Other | No |
| Status | Single select | Active, Inactive, VIP | Yes |
| Account Manager | Link to another record | Link to Employees (Sales) | No |
| Credit Limit | Currency | Customer credit limit | No |
| Outstanding Balance | Currency | Current balance | No |
| Notes | Long text | Customer notes | No |
| Created At | Created time | Auto-generated | Yes |

#### Table 8: Sales Leads
**Purpose:** Track sales pipeline and leads

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| Lead ID | Single line text | Unique lead identifier | Yes |
| Company Name | Single line text | Prospect company | Yes |
| Contact Person | Single line text | Lead contact name | Yes |
| Email | Email | Contact email | Yes |
| Phone | Phone number | Contact phone | No |
| Source | Single select | Website, Referral, Cold Call, Trade Show | Yes |
| Status | Single select | New, Contacted, Qualified, Proposal, Negotiation, Won, Lost | Yes |
| Estimated Value | Currency | Potential deal value | No |
| Assigned To | Link to another record | Link to Employees (Sales) | Yes |
| Next Follow Up | Date | Next contact date | No |
| Notes | Long text | Lead notes | No |
| Created At | Created time | Auto-generated | Yes |

### Base 4: Financial Management

#### Table 9: Invoices
**Purpose:** Track customer invoices

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| Invoice Number | Single line text | Unique invoice number | Yes |
| Customer | Link to another record | Link to Customers table | Yes |
| Order ID | Link to another record | Link to Production Orders | No |
| Invoice Date | Date | Date invoice created | Yes |
| Due Date | Date | Payment due date | Yes |
| Total Amount | Currency | Total invoice amount | Yes |
| Tax Amount | Currency | Tax/VAT amount | No |
| Status | Single select | Draft, Sent, Paid, Overdue, Cancelled | Yes |
| Payment Date | Date | Date payment received | No |
| Payment Method | Single select | Cash, Bank Transfer, Check, Mobile Money | No |
| Notes | Long text | Invoice notes | No |
| Created At | Created time | Auto-generated | Yes |

#### Table 10: Expenses
**Purpose:** Track business expenses

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| Expense ID | Single line text | Unique expense identifier | Yes |
| Category | Single select | Materials, Utilities, Salaries, Transport, Maintenance, Other | Yes |
| Description | Long text | Expense description | Yes |
| Amount | Currency | Expense amount | Yes |
| Date | Date | Expense date | Yes |
| Employee | Link to another record | Link to Employees (who incurred) | No |
| Approved By | Link to another record | Link to Employees (Finance/Management) | No |
| Status | Single select | Pending, Approved, Paid, Rejected | Yes |
| Receipt | Attachment | Receipt/proof of expense | No |
| Notes | Long text | Additional notes | No |
| Created At | Created time | Auto-generated | Yes |

### Base 5: System Administration

#### Table 11: User Permissions
**Purpose:** Fine-grained access control beyond department level

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| Permission ID | Single line text | Unique identifier | Yes |
| Employee | Link to another record | Link to Employees table | Yes |
| Module | Single select | Production, Inventory, Delivery, CRM, Accounting, HR, IT, Analytics | Yes |
| Access Level | Single select | View Only, Edit, Full Access, Admin | Yes |
| Custom Permissions | Long text | JSON of specific permissions | No |
| Valid From | Date | Permission start date | Yes |
| Valid Until | Date | Permission end date (optional) | No |
| Created By | Link to another record | Who granted permission | Yes |
| Notes | Long text | Permission notes | No |
| Created At | Created time | Auto-generated | Yes |

#### Table 12: Audit Logs
**Purpose:** Track all system activities for compliance

| Field Name | Type | Description | Required |
|------------|------|-------------|----------|
| Log ID | Single line text | Unique log identifier | Yes |
| User | Link to another record | Link to Employees table | Yes |
| Action | Single select | Create, Update, Delete, View, Export, Login, Logout | Yes |
| Module | Single select | All module types | Yes |
| Record ID | Single line text | Affected record identifier | No |
| Details | Long text | JSON of action details | No |
| IP Address | Single line text | User IP address | No |
| Timestamp | Created time | Auto-generated | Yes |

## Setup Instructions

1. Create 5 Airtable bases as specified above
2. For each base, create the tables with exact field configurations
3. Generate API keys for each base
4. Configure webhook integrations for real-time sync
5. Set up views and filters for common queries
6. Enable attachments for signature and receipt fields
7. Configure automations for status notifications

## Environment Variables Needed

```env
VITE_AIRTABLE_API_KEY=your_api_key_here
VITE_AIRTABLE_BASE_EMPLOYEES=base_id_here
VITE_AIRTABLE_BASE_OPERATIONS=base_id_here
VITE_AIRTABLE_BASE_SALES=base_id_here
VITE_AIRTABLE_BASE_FINANCIAL=base_id_here
VITE_AIRTABLE_BASE_SYSTEM=base_id_here
```
