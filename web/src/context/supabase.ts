import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cezgydfbprzqgxkfcepq.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlemd5ZGZicHJ6cWd4a2ZjZXBxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDU0NTA4NTQsImV4cCI6MTk2MTAyNjg1NH0.UDAQvbY_GqEdLLrZG6MFnhDWXonAbcYnrHGHDD6-hYU'
const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }
