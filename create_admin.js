import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createUser() {
    const { data, error } = await supabase.auth.signUp({
        email: 'admin@admin',
        password: '123456',
    });

    if (error) {
        console.error('Error signing up:', error.message);
        process.exit(1);
    }

    console.log('User created:', data.user.id);
}

createUser();
