import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kbywruuwozsgvibmpmcm.supabase.co'
const supabaseAnonKey = 'your-public-anon-key'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

document.getElementById('sign-up-form')?.addEventListener('submit', async (e) => {
    e.preventDefault()

    const email = (document.getElementById('email-input') as HTMLInputElement)?.value
    const password = (document.getElementById('password-input') as HTMLInputElement)?.value

    const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    })

    if (error) {
        console.error('Error signing up:', error.message)
    } else {
        console.log('User signed up:', user)
    }
})
