// Airtable API integration service
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_EMPLOYEES = import.meta.env.VITE_AIRTABLE_BASE_EMPLOYEES;
const AIRTABLE_BASE_OPERATIONS = import.meta.env.VITE_AIRTABLE_BASE_OPERATIONS;
const AIRTABLE_BASE_SALES = import.meta.env.VITE_AIRTABLE_BASE_SALES;
const AIRTABLE_BASE_FINANCIAL = import.meta.env.VITE_AIRTABLE_BASE_FINANCIAL;
const AIRTABLE_BASE_SYSTEM = import.meta.env.VITE_AIRTABLE_BASE_SYSTEM;

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

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Employee Management
  async getEmployees(filterByFormula?: string): Promise<AirtableRecord[]> {
    const params = filterByFormula ? `?filterByFormula=${encodeURIComponent(filterByFormula)}` : '';
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_EMPLOYEES}/Employees${params}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data: AirtableResponse = await response.json();
    return data.records;
  }

  async createEmployee(fields: Record<string, any>): Promise<AirtableRecord> {
    const response = await this.makeRequest(
      AIRTABLE_BASE_EMPLOYEES,
      'Employees',
      'POST',
      { fields }
    );
    return response;
  }

  async updateEmployee(recordId: string, fields: Record<string, any>): Promise<AirtableRecord> {
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_EMPLOYEES}/Employees/${recordId}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    return response.json();
  }

  async deleteEmployee(recordId: string): Promise<void> {
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_EMPLOYEES}/Employees/${recordId}`;

    await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });
  }

  // Attendance Management
  async getAttendance(filterByFormula?: string): Promise<AirtableRecord[]> {
    const params = filterByFormula ? `?filterByFormula=${encodeURIComponent(filterByFormula)}` : '';
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_EMPLOYEES}/Attendance${params}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data: AirtableResponse = await response.json();
    return data.records;
  }

  async createAttendance(fields: Record<string, any>): Promise<AirtableRecord> {
    return this.makeRequest(AIRTABLE_BASE_EMPLOYEES, 'Attendance', 'POST', { fields });
  }

  // Leave Requests
  async getLeaveRequests(filterByFormula?: string): Promise<AirtableRecord[]> {
    const params = filterByFormula ? `?filterByFormula=${encodeURIComponent(filterByFormula)}` : '';
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_EMPLOYEES}/Leave Requests${params}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data: AirtableResponse = await response.json();
    return data.records;
  }

  async updateLeaveRequest(recordId: string, fields: Record<string, any>): Promise<AirtableRecord> {
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_EMPLOYEES}/Leave Requests/${recordId}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    return response.json();
  }

  // Production Orders
  async getProductionOrders(filterByFormula?: string): Promise<AirtableRecord[]> {
    const params = filterByFormula ? `?filterByFormula=${encodeURIComponent(filterByFormula)}` : '';
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_OPERATIONS}/Production Orders${params}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data: AirtableResponse = await response.json();
    return data.records;
  }

  async createProductionOrder(fields: Record<string, any>): Promise<AirtableRecord> {
    return this.makeRequest(AIRTABLE_BASE_OPERATIONS, 'Production Orders', 'POST', { fields });
  }

  async updateProductionOrder(recordId: string, fields: Record<string, any>): Promise<AirtableRecord> {
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_OPERATIONS}/Production Orders/${recordId}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    return response.json();
  }

  // Inventory Items
  async getInventoryItems(filterByFormula?: string): Promise<AirtableRecord[]> {
    const params = filterByFormula ? `?filterByFormula=${encodeURIComponent(filterByFormula)}` : '';
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_OPERATIONS}/Inventory Items${params}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data: AirtableResponse = await response.json();
    return data.records;
  }

  async updateInventoryItem(recordId: string, fields: Record<string, any>): Promise<AirtableRecord> {
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_OPERATIONS}/Inventory Items/${recordId}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fields }),
    });

    return response.json();
  }

  // Deliveries
  async getDeliveries(filterByFormula?: string): Promise<AirtableRecord[]> {
    const params = filterByFormula ? `?filterByFormula=${encodeURIComponent(filterByFormula)}` : '';
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_OPERATIONS}/Deliveries${params}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data: AirtableResponse = await response.json();
    return data.records;
  }

  // Customers
  async getCustomers(filterByFormula?: string): Promise<AirtableRecord[]> {
    const params = filterByFormula ? `?filterByFormula=${encodeURIComponent(filterByFormula)}` : '';
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_SALES}/Customers${params}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data: AirtableResponse = await response.json();
    return data.records;
  }

  async createCustomer(fields: Record<string, any>): Promise<AirtableRecord> {
    return this.makeRequest(AIRTABLE_BASE_SALES, 'Customers', 'POST', { fields });
  }

  // Sales Leads
  async getSalesLeads(filterByFormula?: string): Promise<AirtableRecord[]> {
    const params = filterByFormula ? `?filterByFormula=${encodeURIComponent(filterByFormula)}` : '';
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_SALES}/Sales Leads${params}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data: AirtableResponse = await response.json();
    return data.records;
  }

  // Invoices
  async getInvoices(filterByFormula?: string): Promise<AirtableRecord[]> {
    const params = filterByFormula ? `?filterByFormula=${encodeURIComponent(filterByFormula)}` : '';
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_FINANCIAL}/Invoices${params}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data: AirtableResponse = await response.json();
    return data.records;
  }

  // Expenses
  async getExpenses(filterByFormula?: string): Promise<AirtableRecord[]> {
    const params = filterByFormula ? `?filterByFormula=${encodeURIComponent(filterByFormula)}` : '';
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_FINANCIAL}/Expenses${params}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data: AirtableResponse = await response.json();
    return data.records;
  }

  // Audit Logs
  async createAuditLog(fields: Record<string, any>): Promise<AirtableRecord> {
    return this.makeRequest(AIRTABLE_BASE_SYSTEM, 'Audit Logs', 'POST', { fields });
  }

  async getAuditLogs(filterByFormula?: string): Promise<AirtableRecord[]> {
    const params = filterByFormula ? `?filterByFormula=${encodeURIComponent(filterByFormula)}` : '';
    const url = `${AIRTABLE_API_URL}/${AIRTABLE_BASE_SYSTEM}/Audit Logs${params}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    const data: AirtableResponse = await response.json();
    return data.records;
  }
}

export const airtableService = new AirtableService();
export type { AirtableRecord, AirtableResponse };
