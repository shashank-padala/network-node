-- Trigger function to automatically create profile when a new user signs up
-- This function is called whenever a new row is inserted into auth.users
--
-- Behavior:
-- - For Google sign-in: Uses full_name/name and avatar_url/picture from metadata
-- - For email/password signup: Uses name from user_metadata (passed during signup)
--   and photo_url will be NULL (only available from Google sign-in)

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    name,
    email,
    photo_url
  )
  VALUES (
    NEW.id,
    -- For Google: use full_name or name from metadata
    -- For email signup: use name from metadata (collected during signup), fallback to email
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      NEW.email
    ),
    -- Email is always available from auth.users
    COALESCE(NEW.email, NEW.raw_user_meta_data->>'email'),
    -- Photo URL only available from Google sign-in (avatar_url or picture)
    -- Will be NULL for email/password signups
    COALESCE(
      NEW.raw_user_meta_data->>'avatar_url',
      NEW.raw_user_meta_data->>'picture'
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger that fires after a new user is inserted into auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

