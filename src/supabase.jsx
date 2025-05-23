import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bruoxgxrzkuvzwdghjqy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJydW94Z3hyemt1dnp3ZGdoanF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5Njk1MTcsImV4cCI6MjA2MzU0NTUxN30.iSZS08C9j7AsILjIxS4wJQXm8eQ2FoTilHQdIeoxWdw';
export const supabase = createClient(supabaseUrl, supabaseKey);