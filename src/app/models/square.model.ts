export type SquareStatus = 'empty' | 'pending' | 'approved';

export interface Square {
  id: string;
  row?: number; // for in-memory compatibility
  col?: number; // for in-memory compatibility
  row_idx?: number; // for Supabase compatibility
  col_idx?: number; // for Supabase compatibility
  status: SquareStatus;
  name?: string;
  email?: string;
  user_id?: string; // Optional - for logged in users
  requestedAt?: string; // ISO
  approved_at?: string; // ISO, for Supabase compatibility
}
