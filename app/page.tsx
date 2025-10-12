import Image from 'next/image';
import Link from 'next/link';

// Función para obtener productos (Server Component)
async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

  try {
    const res = await fetch(`${baseUrl}/api/products`, {
      cache: 'no-store', // Siempre datos frescos para testing
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '2px solid #38a169', paddingBottom: '1rem' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#38a169', marginBottom: '0.5rem' }}>
          🌱 Pekitas Ecotienda v3.0
        </h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>
          Migración a Next.js 15 + MongoDB Atlas - Testing Page
        </p>
      </header>

      {products.length === 0 ? (
        <div style={{
          padding: '3rem',
          textAlign: 'center',
          background: '#fff3cd',
          borderRadius: '8px',
          border: '1px solid #ffc107'
        }}>
          <h2 style={{ color: '#856404' }}>⚠️ No se encontraron productos</h2>
          <p style={{ marginTop: '1rem', color: '#856404' }}>
            Verifica que los productos fueron importados a MongoDB.
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#856404' }}>
            Ejecuta: <code style={{ background: '#fff', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
              node scripts/import-products-to-mongodb.cjs
            </code>
          </p>
        </div>
      ) : (
        <>
          <div style={{
            background: '#d4edda',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '2rem',
            border: '1px solid #c3e6cb'
          }}>
            <p style={{ color: '#155724', margin: 0 }}>
              ✅ <strong>{products.length} productos</strong> cargados exitosamente desde MongoDB Atlas
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}>
            {products.map((product: any) => (
              <div
                key={product._id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1rem',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  background: '#fff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '1rem' }}>
                  <Image
                    src={product.imagen}
                    alt={product.nombre}
                    fill
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: '#2d3748',
                  minHeight: '2.5rem'
                }}>
                  {product.nombre}
                </h3>

                <p style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bold',
                  color: '#38a169',
                  marginBottom: '0.5rem'
                }}>
                  ${product.precio}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                  <span style={{
                    fontSize: '0.85rem',
                    padding: '0.25rem 0.5rem',
                    background: product.stock > 0 ? '#d4edda' : '#f8d7da',
                    color: product.stock > 0 ? '#155724' : '#721c24',
                    borderRadius: '4px'
                  }}>
                    Stock: {product.stock}
                  </span>

                  {product.categorias && product.categorias[0] && (
                    <span style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.5rem',
                      background: '#e2e8f0',
                      color: '#4a5568',
                      borderRadius: '4px'
                    }}>
                      {product.categorias[0]}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <footer style={{
        marginTop: '3rem',
        paddingTop: '2rem',
        borderTop: '1px solid #e2e8f0',
        textAlign: 'center',
        color: '#718096'
      }}>
        <p>🚀 Next.js 15 + MongoDB Atlas + Mongoose</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Servidor: {process.env.NODE_ENV === 'production' ? 'Production' : 'Development'}
        </p>
      </footer>
    </div>
  );
}
