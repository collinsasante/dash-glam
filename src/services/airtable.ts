// Airtable API integration service
// Single base configuration - simpler setup
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

const AIRTABLE_API_URL = 'https://api.airtable.com/v0';

interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

class AirtableService {
  private async makeRequest(
    baseId: string,
    tableName: string,
    method: string = 'GET',
    body?: any
  ): Promise<any> {
    // Check if Airtable is configured
    if (!AIRTABLE_API_KEY || !baseId) {
      console.warn('Airtable is not configured. Please add environment variables.');
      return { records: [] };
    }

    const url = `${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}`;

    const options: RequestInit = {
      method,
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Airtable API error: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error('Airtable request failed:', error);
      return { records: [] };
    }
  }

  // Employee Management
  async getEmployees(_filterByFormula?: string): Promise<AirtableRecord[]> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Employees').then(res => res.records || []);
  }

  async createEmployee(fields: Record<string, any>): Promise<AirtableRecord> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Employees', 'POST', { fields });
  }

  async updateEmployee(recordId: string, fields: Record<string, any>): Promise<AirtableRecord> {
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/Employees/${recordId}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    }).catch(() => ({ json: () => Promise.resolve({ fields: {} }) }));
    return response.json();
  }

  async deleteEmployee(recordId: string): Promise<void> {
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/Employees/${recordId}`;
    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    }).catch(() => {});
  }

  // Attendance Management
  async getAttendance(_filterByFormula?: string): Promise<AirtableRecord[]> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Attendance').then(res => res.records || []);
  }

  async createAttendance(fields: Record<string, any>): Promise<AirtableRecord> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Attendance', 'POST', { fields });
  }

  // Leave Requests
  async getLeaveRequests(_filterByFormula?: string): Promise<AirtableRecord[]> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Leave Requests').then(res => res.records || []);
  }

  async updateLeaveRequest(recordId: string, fields: Record<string, any>): Promise<AirtableRecord> {
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/Leave Requests/${recordId}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    }).catch(() => ({ json: () => Promise.resolve({ fields: {} }) }));
    return response.json();
  }

  // Production Orders
  async getProductionOrders(_filterByFormula?: string): Promise<AirtableRecord[]> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Production Orders').then(res => res.records || []);
  }

  async createProductionOrder(fields: Record<string, any>): Promise<AirtableRecord> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Production Orders', 'POST', { fields });
  }

  async updateProductionOrder(recordId: string, fields: Record<string, any>): Promise<AirtableRecord> {
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/Production Orders/${recordId}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    }).catch(() => ({ json: () => Promise.resolve({ fields: {} }) }));
    return response.json();
  }

  // Inventory Items
  async getInventoryItems(_filterByFormula?: string): Promise<AirtableRecord[]> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Inventory Items').then(res => res.records || []);
  }

  async updateInventoryItem(recordId: string, fields: Record<string, any>): Promise<AirtableRecord> {
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_ID}/Inventory Items/${recordId}`;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    }).catch(() => ({ json: () => Promise.resolve({ fields: {} }) }));
    return response.json();
  }

  // Deliveries
  async getDeliveries(_filterByFormula?: string): Promise<AirtableRecord[]> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Deliveries').then(res => res.records || []);
  }

  // Customers
  async getCustomers(_filterByFormula?: string): Promise<AirtableRecord[]> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Customers').then(res => res.records || []);
  }

  async createCustomer(fields: Record<string, any>): Promise<AirtableRecord> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Customers', 'POST', { fields });
  }

  // Sales Leads
  async getSalesLeads(_filterByFormula?: string): Promise<AirtableRecord[]> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Sales Leads').then(res => res.records || []);
  }

  // Invoices
  async getInvoices(_filterByFormula?: string): Promise<AirtableRecord[]> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Invoices').then(res => res.records || []);
  }

  // Expenses
  async getExpenses(_filterByFormula?: string): Promise<AirtableRecord[]> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Expenses').then(res => res.records || []);
  }

  // Audit Logs
  async createAuditLog(fields: Record<string, any>): Promise<AirtableRecord> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Audit Logs', 'POST', { fields });
  }

  async getAuditLogs(_filterByFormula?: string): Promise<AirtableRecord[]> {
    return this.makeRequest(AIRTABLE_BASE_ID, 'Audit Logs').then(res => res.records || []);
  }
}

export const airtableService = new AirtableService();
export type { AirtableRecord, AirtableResponse };
