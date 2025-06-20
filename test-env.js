require('dotenv').config();

console.log('Testing Environment Variables:');
console.log('----------------------------');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Set' : '❌ Not Set');
console.log('PORT:', process.env.PORT || '❌ Not Set');
console.log('NODE_ENV:', process.env.NODE_ENV || '❌ Not Set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not Set'); 