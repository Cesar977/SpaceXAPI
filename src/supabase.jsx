// src/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pvgniskiksfmdihosxul.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2Z25pc2tpa3NmbWRpaG9zeHVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MTcxOTUsImV4cCI6MjA2Mjk5MzE5NX0.zVz7nH0NxRzYxJEAN3hJkoxy6ekzIlRnEWlIS_ilsys';
export const supabase = createClient(supabaseUrl, supabaseKey);