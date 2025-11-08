-- Add game_mode column to games table
-- This column will store the game mode (e.g., 'standard', 'growth', etc.)

ALTER TABLE public.games
ADD COLUMN game_mode text NOT NULL DEFAULT 'standard'::text;

-- Add a check constraint for valid game modes
ALTER TABLE public.games
ADD CONSTRAINT games_game_mode_check
CHECK (
  game_mode = ANY (
    ARRAY[
      'standard'::text,
      'growth'::text,
      'tournament'::text,
      'premium'::text
    ]
  )
);

-- Add an index for performance when filtering by game mode
CREATE INDEX IF NOT EXISTS idx_games_game_mode
ON public.games USING btree (game_mode) TABLESPACE pg_default;

-- Add a comment to document the new column
COMMENT ON COLUMN public.games.game_mode IS 'Game mode determines special behaviors and features (standard, growth, tournament, premium)';

-- Update existing games to have 'standard' mode (already set by default value)
-- This is just to ensure consistency if there were any existing NULL values
UPDATE public.games SET game_mode = 'standard' WHERE game_mode IS NULL;
