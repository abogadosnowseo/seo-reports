import { Client } from './types'

export const CLIENTS: Client[] = [
  {
    id: 'magendzo-law',
    name: 'Magendzo Law',
    domain: 'magendzolaw.com',
    ga4PropertyId: '123456789',
    ahrefsTarget: 'magendzolaw.com',
    callrailAccountId: 'ACC001',
    practiceArea: 'Personal Injury',
    location: 'Los Angeles, CA',
  },
  {
    id: 'torres-associates',
    name: 'Torres & Associates',
    domain: 'torreslaw.com',
    ga4PropertyId: '987654321',
    ahrefsTarget: 'torreslaw.com',
    callrailAccountId: 'ACC002',
    practiceArea: 'Immigration',
    location: 'Miami, FL',
  },
  {
    id: 'rivera-law-group',
    name: 'Rivera Law Group',
    domain: 'riveralawgroup.com',
    ga4PropertyId: '456789123',
    ahrefsTarget: 'riveralawgroup.com',
    callrailAccountId: 'ACC003',
    practiceArea: 'Workers Compensation',
    location: 'Houston, TX',
  },
]

export function getClientById(id: string): Client | undefined {
  return CLIENTS.find((c) => c.id === id)
}
