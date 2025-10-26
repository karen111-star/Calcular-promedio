import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://bkfvvwqsoftdnjsixbmy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrZnZ2d3Fzb2Z0ZG5qc2l4Ym15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0MjQxOTgsImV4cCI6MjA3NzAwMDE5OH0.zVpAbbcPeknZlo_2Zbf-TbZRa_KW-aBePseEm2mlH7I";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
