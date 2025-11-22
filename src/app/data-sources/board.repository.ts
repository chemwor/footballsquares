import { Square } from '../models/square.model';
import { supabase } from './supabase.client';

export interface BoardRepository {
  initBoard(size: number, gameId: string): Promise<Square[]>;
  updateSquare(square: Square, gameId: string): Promise<void>;
  listSquares(gameId: string): Promise<Square[]>;
}

export class InMemoryBoardRepository implements BoardRepository {
  private squares: Square[] = [];

  async initBoard(size: number, _gameId: string): Promise<Square[]> {
    this.squares = [];
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        this.squares.push({
          id: uid(),
          row,
          col,
          status: 'empty',
        });
      }
    }
    return [...this.squares];
  }

  async updateSquare(square: Square, _gameId: string): Promise<void> {
    const idx = this.squares.findIndex(s => s.id === square.id);
    if (idx !== -1) this.squares[idx] = { ...square };
  }

  async listSquares(_gameId: string): Promise<Square[]> {
    return [...this.squares];
  }
}

export class SupabaseBoardRepository implements BoardRepository {
  async initBoard(size: number, gameId: string): Promise<Square[]> {
    // Not used for Supabase, but could be used to seed squares if needed
    return [];
  }

  async updateSquare(square: Square, gameId: string): Promise<void> {
    console.log('updateSquare called with id:', square.id, 'payload:', {
      status: square.status,
      name: square.name,
      email: square.email,
      user_id: square.user_id,
      requested_at: square.requestedAt,
    });
    const { error, data } = await supabase
      .from('squares')
      .update({
        status: square.status,
        name: square.name,
        email: square.email,
        user_id: square.user_id, // Include user_id in updates
        requested_at: square.requestedAt,
      })
      .eq('id', square.id); // Only filter by id, since id is unique
    if (error) {
      console.error('Supabase updateSquare error:', error, 'Square:', square);
      throw error;
    }
    console.log('Supabase updateSquare result:', data);
  }

  async updateSquareByAdmin(square: Square, gameId: string): Promise<void> {
    // Only update fields an admin is allowed to set
    const { error, data } = await supabase
      .from('squares')
      .update({
        status: square.status,
        approved_at: square.approved_at,
        name: square.name,
        email: square.email,
        user_id: square.user_id, // Include user_id in admin updates
        requested_at: square.requestedAt,
        // admin_id removed, use RLS policy to check game ownership
      })
      .eq('id', square.id); // Only filter by id, since id is unique
    if (error) {
      console.error('Supabase admin update error:', error, 'Square:', square);
      throw error;
    }
    console.log('Supabase admin update result:', data);
  }

  async listSquares(gameId: string): Promise<Square[]> {
    const { data, error } = await supabase
      .from('squares')
      .select('*')
      .eq('game_id', gameId);
    console.log('Fetched squares:', data, 'Error:', error, 'GameId:', gameId);
    if (error) throw error;
    return data || [];
  }

  async seedSquares(gameId: string, boardSize: number): Promise<void> {
    try {
      // Call the Supabase stored procedure to seed squares with correct parameter names
      const { error } = await supabase.rpc('seed_squares', {
        p_game_id: gameId,
        p_size: boardSize
      });

      if (error) {
        console.error('Error seeding squares:', error);
        throw error;
      }

      console.log(`Successfully seeded squares for game ${gameId} with board size ${boardSize}`);
    } catch (err) {
      console.error('Error calling seed_squares function:', err);
      throw err;
    }
  }

  /**
   * Fetch a game by ID from the games_with_owner view, including owner_email and owner_name.
   */
  async getGameById(gameId: string): Promise<any> {
    const { data, error } = await supabase
      .from('games_with_owner')
      .select('*')
      .eq('id', gameId)
      .single();
    if (error) {
      console.error('Error fetching game by ID:', error);
      return null;
    }
    return data;
  }

  async getSquareById(squareId: string): Promise<Square | null> {
    const { data, error } = await supabase
      .from('squares')
      .select('*')
      .eq('id', squareId)
      .single();
    if (error) {
      console.error('Error fetching square by id:', error, 'SquareId:', squareId);
      return null;
    }
    return data || null;
  }

  async enqueueEmail(
    type: string,
    recipient: string,
    recipient_name: string | undefined,
    game_id: string,
    square_id: string,
    payload: any
  ): Promise<void> {
    const { error, data } = await supabase.from('email_queue').insert([
      {
        type,
        recipient,
        recipient_name: recipient_name || 'Player',
        game_id,
        square_id,
        payload,
        event_type: type
      }
    ]);
    if (error) {
      console.error('Failed to enqueue email:', error);
      throw error;
    }
    console.log('Email enqueued successfully:', data);
  }

  async createReferral(referralData: {
    game_id: string;
    square_id: string;
    row_idx: number;
    col_idx: number;
    inviter_user_id: string;
    inviter_email: string;
    inviter_name: string;
    invite_email: string;
    reward_type: string;
  }): Promise<void> {
    const { error, data } = await supabase.from('referrals').insert([
      {
        game_id: referralData.game_id,
        square_id: referralData.square_id,
        row_idx: referralData.row_idx,
        col_idx: referralData.col_idx,
        inviter_user_id: referralData.inviter_user_id,
        inviter_email: referralData.inviter_email,
        inviter_name: referralData.inviter_name,
        invite_email: referralData.invite_email,
        reward_type: referralData.reward_type,
        status: 'pending',
        created_at: new Date().toISOString()
      }
    ]);

    if (error) {
      console.error('Failed to create referral:', error);
      throw error;
    }

    console.log('Referral created successfully:', data);
  }
}

export function uid(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now();
}
