export type AoManagement = {
    ao_id: number;
    admin_id: string;
    organization_id: number;
    created_at: Date;
    organizations: Organizations;
    users: Users;
  }
  
  export type Organizations = {
    city: string;
    country: string;
    industry: string;
    postal_code: string;
    street_address: string;
    organization_id: number;
    registered_date: Date;
    organization_name: string;
    organization_email: string;
    organization_contact: string;
    administrative_division: string;
  }
  
  export type Users = {
    id: string;
    email: string;
    username: string;
    last_name: string;
    first_name: string;
    registered_date: Date;
  }