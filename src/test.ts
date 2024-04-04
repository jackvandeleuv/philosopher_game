import { createClient } from '@supabase/supabase-js'

require('dotenv').config()

const supabaseUrl = 'https://kbywruuwozsgvibmpmcm.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

document.getElementById('sign-up-form')?.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = (document.getElementById('email-input') as HTMLInputElement)?.value
    const password = (document.getElementById('password-input') as HTMLInputElement)?.value

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })
    
    const user = data?.user;

    if (error) {
        console.error('Error signing up:', error.message)
    } else {
        console.log('User signed up:', user)
    }
})
