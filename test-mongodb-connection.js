// Test MongoDB Atlas connection
// Reemplaza <PASSWORD> con tu password real

const connectionString = 'mongodb+srv://manuxsrodriguez_db_user:<PASSWORD>@pekitas-ecotienda.ohfpsyj.mongodb.net/pekitas?retryWrites=true&w=majority';

console.log('Connection string template:');
console.log(connectionString);
console.log('\n⚠️ IMPORTANTE: Reemplaza <PASSWORD> con tu password real de MongoDB Atlas');
console.log('\nPara probar en Compass:');
console.log('1. Abre MongoDB Compass');
console.log('2. Click en "Add new connection"');
console.log('3. Pega el connection string (con el password correcto)');
console.log('4. Click "Connect"');
console.log('\nSi conecta exitosamente, deberías ver la base de datos "pekitas"');
