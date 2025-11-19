-- Add website_url field to startups table
ALTER TABLE startups 
ADD COLUMN IF NOT EXISTS website_url TEXT;

-- Add hiring status field (can be null, 'not_hiring', 'hiring', 'actively_hiring')
ALTER TABLE startups 
ADD COLUMN IF NOT EXISTS hiring_status TEXT CHECK (hiring_status IN ('not_hiring', 'hiring', 'actively_hiring')) DEFAULT 'not_hiring';

-- Add raising funds field
ALTER TABLE startups 
ADD COLUMN IF NOT EXISTS raising_funds BOOLEAN DEFAULT false;

-- Add pitch deck URL field
ALTER TABLE startups 
ADD COLUMN IF NOT EXISTS pitch_deck_url TEXT;

