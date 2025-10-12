/**
 * Script para importar productos.json a MongoDB Atlas
 *
 * Uso: node scripts/import-products-to-mongodb.js
 */

const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Connection string desde .env.local
const MONGODB_URI = 'mongodb+srv://manuxsrodriguez_db_user:QgzwOXLN9KeUa9tc@pekitas-ecotienda.ohfpsyj.mongodb.net/pekitas?retryWrites=true&w=majority';

// Ruta al archivo de productos
const PRODUCTS_FILE = path.join(__dirname, '../src/data/productos.json');

async function importProducts() {
  let client;

  try {
    console.log('🚀 Conectando a MongoDB Atlas...');

    // Conectar a MongoDB
    client = new MongoClient(MONGODB_URI);
    await client.connect();

    console.log('✅ Conectado exitosamente a MongoDB Atlas');

    // Seleccionar base de datos y colección
    const db = client.db('pekitas');
    const collection = db.collection('products');

    // Leer archivo de productos
    console.log('📖 Leyendo productos desde:', PRODUCTS_FILE);
    const productsData = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));

    console.log(`📦 Encontrados ${productsData.length} productos`);

    // Verificar si ya existen productos
    const existingCount = await collection.countDocuments();

    if (existingCount > 0) {
      console.log(`⚠️  Ya existen ${existingCount} productos en la base de datos`);
      console.log('¿Deseas eliminarlos y volver a importar? (Ctrl+C para cancelar)');

      // Esperar 3 segundos antes de continuar
      await new Promise(resolve => setTimeout(resolve, 3000));

      console.log('🗑️  Eliminando productos existentes...');
      await collection.deleteMany({});
      console.log('✅ Productos eliminados');
    }

    // Transformar datos para MongoDB
    const productsToInsert = productsData.map(product => ({
      ...product,
      _id: product.id, // Usar el ID existente como _id de MongoDB
      activo: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insertar productos
    console.log('💾 Insertando productos en MongoDB...');
    const result = await collection.insertMany(productsToInsert, { ordered: false });

    console.log(`✅ ${result.insertedCount} productos insertados exitosamente`);

    // Crear índices
    console.log('📇 Creando índices...');

    await collection.createIndex({ nombre: 'text', descripcion: 'text' }, {
      name: 'search_index',
      default_language: 'spanish'
    });

    await collection.createIndex({ categorias: 1 });
    await collection.createIndex({ precio: 1 });
    await collection.createIndex({ activo: 1 });

    console.log('✅ Índices creados');

    // Mostrar estadísticas
    const stats = await collection.stats();
    console.log('\n📊 Estadísticas:');
    console.log(`   - Total documentos: ${stats.count}`);
    console.log(`   - Tamaño de la colección: ${(stats.size / 1024).toFixed(2)} KB`);
    console.log(`   - Índices: ${stats.nindexes}`);

    // Mostrar algunos productos de ejemplo
    console.log('\n🛍️  Productos importados (primeros 3):');
    const sampleProducts = await collection.find().limit(3).toArray();
    sampleProducts.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.nombre} - $${product.precio}`);
    });

    console.log('\n🎉 ¡Importación completada exitosamente!');
    console.log('🔗 Puedes ver los productos en MongoDB Compass');

  } catch (error) {
    console.error('❌ Error durante la importación:', error.message);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
      console.log('\n👋 Desconectado de MongoDB');
    }
  }
}

// Ejecutar el script
importProducts();
