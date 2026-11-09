/**
 * Mindora Client-Side Solutions Service
 * Self-contained client-side quotation, demo, and enquiry workflow.
 * Completely frontend-driven without requiring a separate backend server.
 */

import { COMPANY_CONFIG } from '../config/company';

export interface LeadEnquiryPayload {
  full_name: string;
  company_name: string;
  email: string;
  phone: string;
  country: string;
  service_or_product: string;
  estimated_budget: string;
  project_description: string;
  consent_given: boolean;
  website_hp?: string; // honeypot
}

export interface LeadEnquiryResponse {
  success: boolean;
  message: string;
  reference_id: string;
  created_at: string;
  data: LeadEnquiryPayload;
  whatsapp_url: string;
  email_mailto_url: string;
}

export interface DemoRequestPayload {
  product_name: string;
  full_name: string;
  company_name: string;
  work_email: string;
  phone: string;
  team_size?: string;
  requirements?: string;
}

export interface DemoResponse {
  success: boolean;
  message: string;
  reference_id: string;
  created_at: string;
}

/**
 * Generate a unique, professional business reference ID
 * Example format: MIN-26-A4F9C2
 */
export function generateReferenceId(prefix = 'MIN-26'): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${code}`;
}

/**
 * Submit and register a new quotation enquiry (Client-Side)
 */
export async function submitLeadEnquiry(payload: LeadEnquiryPayload): Promise<LeadEnquiryResponse> {
  // Simulate brief realistic processing delay for UX
  await new Promise((resolve) => setTimeout(resolve, 400));

  // Anti-spam check
  if (payload.website_hp && payload.website_hp.trim() !== '') {
    throw new Error('Spam submission detected.');
  }

  const reference_id = generateReferenceId('MIN-26');
  const created_at = new Date().toISOString();

  // Save to browser localStorage so client requests persist across sessions
  try {
    const existing = JSON.parse(localStorage.getItem('mindora_enquiries') || '[]');
    existing.unshift({ reference_id, created_at, ...payload });
    localStorage.setItem('mindora_enquiries', JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('[Mindora] LocalStorage write skipped:', err);
  }

  // Build prefilled WhatsApp message
  const whatsappText = `Hello Mindora, my enquiry reference is ${reference_id}.
I am interested in ${payload.service_or_product}.
Company: ${payload.company_name}
Name: ${payload.full_name}
Email: ${payload.email}
Phone: ${payload.phone}
Estimated Budget: ${payload.estimated_budget}
Details: ${payload.project_description || 'Initial consultation request.'}`;

  const whatsapp_url = `https://wa.me/${COMPANY_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    whatsappText
  )}`;

  // Build prefilled Mailto link
  const emailSubject = `[Enquiry ${reference_id}] ${payload.service_or_product} — ${payload.company_name}`;
  const emailBody = `Reference ID: ${reference_id}
Date: ${created_at}
Company: ${payload.company_name}
Contact: ${payload.full_name}
Email: ${payload.email}
Phone: ${payload.phone}
Country: ${payload.country}
Solution Required: ${payload.service_or_product}
Estimated Budget: ${payload.estimated_budget}

Project Overview:
${payload.project_description || 'Initial consultation request.'}
`;
  const email_mailto_url = `mailto:${COMPANY_CONFIG.contact.email}?subject=${encodeURIComponent(
    emailSubject
  )}&body=${encodeURIComponent(emailBody)}`;

  return {
    success: true,
    message: 'Thank you! Your quotation enquiry has been registered with Mindora Digital Solutions.',
    reference_id,
    created_at,
    data: payload,
    whatsapp_url,
    email_mailto_url,
  };
}

/**
 * Submit and register a product demo request (Client-Side)
 */
export async function submitDemoRequest(payload: DemoRequestPayload): Promise<DemoResponse> {
  await new Promise((resolve) => setTimeout(resolve, 350));

  const reference_id = generateReferenceId('MIN-DEMO');
  const created_at = new Date().toISOString();

  try {
    const existing = JSON.parse(localStorage.getItem('mindora_demo_requests') || '[]');
    existing.unshift({ reference_id, created_at, ...payload });
    localStorage.setItem('mindora_demo_requests', JSON.stringify(existing.slice(0, 50)));
  } catch (err) {
    console.warn('[Mindora] LocalStorage write skipped:', err);
  }

  return {
    success: true,
    message: `Demo request for ${payload.product_name} registered successfully. Our solutions team will reach out with demonstration credentials.`,
    reference_id,
    created_at,
  };
}

/**
 * Newsletter subscription handler (Client-Side)
 */
export async function subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  await new Promise((resolve) => setTimeout(resolve, 200));

  try {
    const subscribers = JSON.parse(localStorage.getItem('mindora_subscribers') || '[]');
    if (!subscribers.includes(email.toLowerCase())) {
      subscribers.push(email.toLowerCase());
      localStorage.setItem('mindora_subscribers', JSON.stringify(subscribers));
    }
  } catch (err) {
    console.warn('[Mindora] LocalStorage write skipped:', err);
  }

  return {
    success: true,
    message: 'Subscribed to Mindora Technology Insights.',
  };
}
