// Quick test script to verify Supabase connection
// Run with: node test-connection.js

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vkvnissvruhfszovuooz.supabase.co';
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Testing Supabase Connection...\n');
console.log('URL:', SUPABASE_URL);

if (!SUPABASE_KEY) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not set!');
  console.log('\nPlease add to your .env.local:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=https://vkvnissvruhfszovuooz.supabase.co');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here');
  process.exit(1);
}

console.log('✅ Environment variables are set');
console.log('\n📋 Next steps:');
console.log('1. Make sure your .env.local has both variables');
console.log('2. Run: npm run dev');
console.log('3. Visit: http://localhost:3000');
console.log('4. Try signing up a new account');
console.log('5. Check the dashboard to see your profile');




