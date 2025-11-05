-- Row Level Security (RLS) Policies for NetworkNode

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE meeting_requests ENABLE ROW LEVEL SECURITY;

-- Profiles policies
-- SELECT: All authenticated users can view all profiles
CREATE POLICY "Profiles are viewable by authenticated users"
  ON profiles FOR SELECT
  USING (auth.role() = 'authenticated');

-- INSERT: Users can only insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- UPDATE: Users can only update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Jobs policies
-- SELECT: All authenticated users can view all jobs
CREATE POLICY "Jobs are viewable by authenticated users"
  ON jobs FOR SELECT
  USING (auth.role() = 'authenticated');

-- INSERT: Authenticated users can create jobs
CREATE POLICY "Authenticated users can create jobs"
  ON jobs FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

-- UPDATE: Users can only update their own jobs
CREATE POLICY "Users can update their own jobs"
  ON jobs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own jobs
CREATE POLICY "Users can delete their own jobs"
  ON jobs FOR DELETE
  USING (auth.uid() = user_id);

-- Startups policies
-- SELECT: All authenticated users can view all startups
CREATE POLICY "Startups are viewable by authenticated users"
  ON startups FOR SELECT
  USING (auth.role() = 'authenticated');

-- INSERT: Authenticated users can create startups
CREATE POLICY "Authenticated users can create startups"
  ON startups FOR INSERT
  WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

-- UPDATE: Users can only update their own startups
CREATE POLICY "Users can update their own startups"
  ON startups FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- DELETE: Users can only delete their own startups
CREATE POLICY "Users can delete their own startups"
  ON startups FOR DELETE
  USING (auth.uid() = user_id);

-- Meeting requests policies
-- SELECT: Users can view requests where they are requester or recipient
CREATE POLICY "Users can view their meeting requests"
  ON meeting_requests FOR SELECT
  USING (
    auth.uid() = requester_id OR 
    auth.uid() = recipient_id
  );

-- INSERT: Authenticated users can create meeting requests
CREATE POLICY "Authenticated users can create meeting requests"
  ON meeting_requests FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated' AND 
    auth.uid() = requester_id
  );

-- UPDATE: Only recipients can update (accept/reject) meeting requests
CREATE POLICY "Recipients can update meeting requests"
  ON meeting_requests FOR UPDATE
  USING (auth.uid() = recipient_id)
  WITH CHECK (auth.uid() = recipient_id);




