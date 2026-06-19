import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://enyzjoiqzqcvvwxolzfv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVueXpqb2lxenFjdnZ3eG9semZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4Nzk0NzgsImV4cCI6MjA5NzQ1NTQ3OH0.yC8WKnSA2VMCcaSSYbZoRKe6ke17xhUlmr94cFwAVu8";

export const supabase = createClient(supabaseUrl, supabaseKey);
