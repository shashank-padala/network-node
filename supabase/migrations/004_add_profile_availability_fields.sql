-- Add availability/interest fields to profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS open_to_collaborate BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS open_to_jobs BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS hiring_talent BOOLEAN DEFAULT false;

