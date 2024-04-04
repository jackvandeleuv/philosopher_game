var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { createClient } from '@supabase/supabase-js';
require('dotenv').config();
const supabaseUrl = 'https://kbywruuwozsgvibmpmcm.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
(_a = document.getElementById('sign-up-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    e.preventDefault();
    const email = (_b = document.getElementById('email-input')) === null || _b === void 0 ? void 0 : _b.value;
    const password = (_c = document.getElementById('password-input')) === null || _c === void 0 ? void 0 : _c.value;
    const { data, error } = yield supabase.auth.signUp({
        email: email,
        password: password,
    });
    const user = data === null || data === void 0 ? void 0 : data.user;
    if (error) {
        console.error('Error signing up:', error.message);
    }
    else {
        console.log('User signed up:', user);
    }
}));
