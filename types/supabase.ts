export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ao_management: {
        Row: {
          admin_id: string
          ao_id: number
          archived: boolean
          created_at: string
          organization_id: number
        }
        Insert: {
          admin_id?: string
          ao_id?: number
          archived?: boolean
          created_at?: string
          organization_id: number
        }
        Update: {
          admin_id?: string
          ao_id?: number
          archived?: boolean
          created_at?: string
          organization_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_ao_management_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_ao_management_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "public_ao_management_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "vw_member_organizations"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "public_ao_management_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "vw_organization_attendance"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "public_ao_management_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "vw_organization_info"
            referencedColumns: ["organization_id"]
          }
        ]
      }
      attendance: {
        Row: {
          afternoon_attendance_pm: number
          created_at: string
          id: number
          morning_attendance_am: number
        }
        Insert: {
          afternoon_attendance_pm: number
          created_at?: string
          id?: number
          morning_attendance_am: number
        }
        Update: {
          afternoon_attendance_pm?: number
          created_at?: string
          id?: number
          morning_attendance_am?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_attendance_afternoon_attendance_pm_fkey"
            columns: ["afternoon_attendance_pm"]
            isOneToOne: true
            referencedRelation: "attendance_pm"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_attendance_morning_attendance_am_fkey"
            columns: ["morning_attendance_am"]
            isOneToOne: true
            referencedRelation: "attendance_am"
            referencedColumns: ["id"]
          }
        ]
      }
      attendance_am: {
        Row: {
          created_at: string
          id: number
          time_in: string | null
          time_out: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          time_in?: string | null
          time_out?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          time_in?: string | null
          time_out?: string | null
        }
        Relationships: []
      }
      attendance_pm: {
        Row: {
          created_at: string
          id: number
          time_in: string | null
          time_out: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          time_in?: string | null
          time_out?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          time_in?: string | null
          time_out?: string | null
        }
        Relationships: []
      }
      members: {
        Row: {
          contact: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          registered_date: string
          role: string | null
          username: string
        }
        Insert: {
          contact?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          registered_date?: string
          role?: string | null
          username: string
        }
        Update: {
          contact?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          registered_date?: string
          role?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_members_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      mo_association: {
        Row: {
          created_at: string
          member_id: string
          mo_id: number
          organization_id: number
        }
        Insert: {
          created_at?: string
          member_id?: string
          mo_id?: number
          organization_id: number
        }
        Update: {
          created_at?: string
          member_id?: string
          mo_id?: number
          organization_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_mo_association_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_mo_association_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "public_mo_association_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "vw_member_organizations"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "public_mo_association_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "vw_organization_attendance"
            referencedColumns: ["organization_id"]
          },
          {
            foreignKeyName: "public_mo_association_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "vw_organization_info"
            referencedColumns: ["organization_id"]
          }
        ]
      }
      mo_attendance_audit: {
        Row: {
          attendance_date: string
          attendance_id: number | null
          id: number
          member_organization: number
        }
        Insert: {
          attendance_date?: string
          attendance_id?: number | null
          id?: number
          member_organization: number
        }
        Update: {
          attendance_date?: string
          attendance_id?: number | null
          id?: number
          member_organization?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_mo_attendance_audit_attendance_id_fkey"
            columns: ["attendance_id"]
            isOneToOne: false
            referencedRelation: "attendance"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_mo_attendance_audit_organization_id_fkey"
            columns: ["member_organization"]
            isOneToOne: false
            referencedRelation: "mo_association"
            referencedColumns: ["mo_id"]
          },
          {
            foreignKeyName: "public_mo_attendance_audit_organization_id_fkey"
            columns: ["member_organization"]
            isOneToOne: false
            referencedRelation: "vw_organization_attendance"
            referencedColumns: ["mo_id"]
          }
        ]
      }
      organizations: {
        Row: {
          administrative_division: string
          city: string
          country: string
          industry: string
          organization_contact: string | null
          organization_email: string | null
          organization_id: number
          organization_name: string
          owner_id: string
          postal_code: string
          registered_date: string
          street_address: string
        }
        Insert: {
          administrative_division: string
          city: string
          country: string
          industry: string
          organization_contact?: string | null
          organization_email?: string | null
          organization_id?: number
          organization_name: string
          owner_id?: string
          postal_code: string
          registered_date?: string
          street_address: string
        }
        Update: {
          administrative_division?: string
          city?: string
          country?: string
          industry?: string
          organization_contact?: string | null
          organization_email?: string | null
          organization_id?: number
          organization_name?: string
          owner_id?: string
          postal_code?: string
          registered_date?: string
          street_address?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          registered_date: string
          username: string
        }
        Insert: {
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          registered_date?: string
          username: string
        }
        Update: {
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          registered_date?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      vw_member_organizations: {
        Row: {
          member_id: string | null
          organization_id: number | null
          organization_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_mo_association_member_id_fkey"
            columns: ["member_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      vw_organization_attendance: {
        Row: {
          am_time_in: string | null
          am_time_out: string | null
          attendance_date: string | null
          first_name: string | null
          last_name: string | null
          mo_id: number | null
          organization_id: number | null
          organization_name: string | null
          pm_time_in: string | null
          pm_time_out: string | null
          role: string | null
        }
        Relationships: []
      }
      vw_organization_info: {
        Row: {
          contact: string | null
          email: string | null
          first_name: string | null
          id: string | null
          last_name: string | null
          organization_id: number | null
          organization_name: string | null
          registered_date: string | null
          role: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_members_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
