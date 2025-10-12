# 🚀 PLAN DE MIGRACIÓN PEKITAS ECOTIENDA V3.0

**Objetivo**: Migrar de React + Vite + Firebase a Next.js 15 + MongoDB + MercadoPago
**Duración**: 3 días intensos (20 horas total)
**Stack Final**: Next.js 15, MongoDB Atlas, Cloudinary, MercadoPago, Vercel

---

## 📊 ESTADO ACTUAL vs. ESTADO FINAL

### **ACTUAL (v2.0.0)**
```
Frontend: React 18 + Vite + React Router
UI: Chakra UI 2.10.6
Backend: Firebase Firestore + Auth
Images: Cloudinary (URLs en productos.json)
Hosting: Firebase Hosting
Payments: ❌ No implementado
```

### **FINAL (v3.0.0)**
```
Frontend: Next.js 15 (App Router) + React 19
UI: Chakra UI 3.x (compatible)
Backend: Next.js API Routes + MongoDB Atlas
Auth: NextAuth.js + MongoDB adapter
Images: Cloudinary API (upload desde admin)
Hosting: Vercel (deploy automático)
Payments: ✅ MercadoPago integrado
Database: MongoDB Atlas (FREE tier)
```

---

## 🎯 OBJETIVOS CLAVE

✅ **Independencia de Firebase** (solo mantener para fallback)
✅ **CRUD completo de productos** con Cloudinary upload
✅ **Sistema de pagos** con MercadoPago
✅ **Migración sin pérdida de datos** (73 productos)
✅ **SEO nativo** con Next.js metadata
✅ **Performance superior** (Lighthouse >95)
✅ **Admin panel completo** protegido

---

## 📅 PLAN DÍA POR DÍA

---

## 🔥 **DÍA 1: FUNDAMENTOS Y BACKEND (7 horas)**

### **SESIÓN MAÑANA (9am - 1pm) - 4 horas**

#### **1. Setup MongoDB Atlas (30 minutos)**
```bash
# 1. Crear cuenta en MongoDB Atlas
https://cloud.mongodb.com/

# 2. Crear cluster FREE (M0)
- Región: AWS / São Paulo (más cerca de Argentina)
- Nombre: pekitas-cluster

# 3. Configurar acceso
- Database Access: Crear usuario admin
- Network Access: Allow 0.0.0.0/0 (temporal)

# 4. Obtener connection string
mongodb+srv://<user>:<password>@pekitas-cluster.xxxxx.mongodb.net/pekitas
```

#### **2. Migrar productos.json a MongoDB (15 minutos)**
```bash
# Preparar datos
# Agregar _id a cada producto (MongoDB format)
node scripts/prepare-migration.js

# Importar a MongoDB
mongoimport --uri "mongodb+srv://..." \
  --collection products \
  --file src/data/productos.json \
  --jsonArray

# Verificar
mongosh "mongodb+srv://..." --eval "db.products.countDocuments()"
# Debe retornar: 73
```

#### **3. Setup Next.js 15 en repo actual (45 minutos)**
```bash
# En la raíz del proyecto actual
cd pekitasr-react-workshop

# Crear branch para migración
git checkout -b feat/nextjs-migration

# Instalar Next.js dependencies
npm install next@latest react@latest react-dom@latest
npm install -D @types/node @types/react @types/react-dom typescript

# Crear archivos de configuración
touch next.config.ts tsconfig.json

# Crear estructura Next.js (en paralelo a src/)
mkdir -p app/{api,admin,auth}
mkdir -p app/(shop)/{products,cart,checkout}
mkdir -p components/{admin,shop,ui}
mkdir -p lib/{mongodb,cloudinary,mercadopago}
```

**next.config.ts**
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'i.ibb.co' }
    ]
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN
  }
};

export default nextConfig;
```

**package.json - actualizar scripts:**
```json
{
  "scripts": {
    "dev:old": "vite",
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

#### **4. Configurar MongoDB + Mongoose (1 hora)**

**lib/mongodb.ts**
```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
```

**lib/models/Product.ts**
```typescript
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    text: true // Para búsqueda full-text
  },
  precio: {
    type: Number,
    required: true,
    min: 0
  },
  imagen: {
    type: String,
    required: true
  },
  categorias: [String],
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  descripcion: {
    type: String,
    text: true
  },
  imagenes: [String], // Galería adicional
  sku: String,
  activo: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

// Índice para búsqueda full-text
ProductSchema.index({ nombre: 'text', descripcion: 'text' });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
```

#### **5. Crear API Routes básicas (1.5 horas)**

**app/api/products/route.ts**
```typescript
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

// GET /api/products - Listar todos
export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    let query = { activo: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.categorias = category;
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/products - Crear producto (admin)
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const product = await Product.create(body);

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
```

**app/api/products/[id]/route.ts**
```typescript
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

// GET /api/products/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id]
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();

    const product = await Product.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

// DELETE /api/products/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    // Soft delete
    const product = await Product.findByIdAndUpdate(
      params.id,
      { activo: false },
      { new: true }
    );

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

---

### **SESIÓN TARDE (3pm - 6pm) - 3 horas**

#### **6. Configurar Cloudinary (30 minutos)**

```bash
npm install cloudinary next-cloudinary
```

**lib/cloudinary.ts**
```typescript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const dataURI = `data:${file.type};base64,${base64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: 'pekitas-products',
    transformation: [
      { width: 800, height: 800, crop: 'limit' },
      { quality: 'auto', fetch_format: 'auto' }
    ]
  });

  return result.secure_url;
};

export const deleteImage = async (imageUrl: string) => {
  const publicId = imageUrl.split('/').pop()?.split('.')[0];
  if (publicId) {
    await cloudinary.uploader.destroy(`pekitas-products/${publicId}`);
  }
};

export default cloudinary;
```

**app/api/upload/route.ts**
```typescript
import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const imageUrl = await uploadImage(file);

    return NextResponse.json({
      success: true,
      imageUrl
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

#### **7. Crear página de prueba y testing (2.5 horas)**

**app/page.tsx** (Home temporal para testing)
```typescript
import Link from 'next/link';
import Image from 'next/image';

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/products`, {
    cache: 'no-store' // Para testing, después cambiar a 'force-cache'
  });

  if (!res.ok) throw new Error('Failed to fetch products');

  const data = await res.json();
  return data.data;
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Pekitas Ecotienda v3.0 - Testing</h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        {products.map((product: any) => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <Image
              src={product.imagen}
              alt={product.nombre}
              width={200}
              height={200}
              style={{ width: '100%', height: 'auto' }}
            />
            <h3>{product.nombre}</h3>
            <p>${product.precio}</p>
            <p>Stock: {product.stock}</p>
            <Link href={`/products/${product._id}`}>Ver detalle</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Testing básico:**
```bash
# Iniciar servidor Next.js
npm run dev

# Verificar endpoints:
# http://localhost:3000 → Debe mostrar productos
# http://localhost:3000/api/products → JSON de productos
```

---

### **✅ FIN DÍA 1 - CHECKLIST**

```
[✓] MongoDB Atlas configurado y funcionando
[✓] 73 productos importados correctamente
[✓] Next.js 15 funcionando en paralelo a React
[✓] API Routes GET/POST/PUT/DELETE productos
[✓] Cloudinary configurado para uploads
[✓] Página de testing mostrando productos
[✓] .env.local con todas las credenciales

⚠️ NO tocar src/ (React viejo aún)
✅ Next.js en app/ funcionando independiente
```

---

## 💼 **DÍA 2: ADMIN PANEL Y MIGRACIÓN FRONTEND (7 horas)**

### **SESIÓN MAÑANA (9am - 1pm) - 4 horas**

#### **1. NextAuth.js + MongoDB (1 hora)**

```bash
npm install next-auth @auth/mongodb-adapter bcryptjs
npm install -D @types/bcryptjs
```

**lib/models/User.ts**
```typescript
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  image: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  emailVerified: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
```

**app/api/auth/[...nextauth]/route.ts**
```typescript
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import clientPromise from '@/lib/mongodb-client';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('Usuario no encontrado');
        }

        const isValid = await user.comparePassword(credentials.password);

        if (!isValid) {
          throw new Error('Contraseña incorrecta');
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    }
  },
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

**Middleware para proteger rutas admin:**

**middleware.ts** (raíz del proyecto)
```typescript
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // Lógica adicional si es necesario
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith('/admin')) {
          return token?.role === 'admin';
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/checkout/:path*', '/dashboard/:path*']
};
```

#### **2. Admin Panel - CRUD UI completo (3 horas)**

**app/admin/products/page.tsx**
```typescript
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import ProductsTable from '@/components/admin/ProductsTable';
import CreateProductButton from '@/components/admin/CreateProductButton';

export default async function AdminProductsPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/login');
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Productos</h1>
        <CreateProductButton />
      </div>

      <ProductsTable />
    </div>
  );
}
```

**components/admin/ProductsTable.tsx** (Client Component)
```typescript
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data.data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Eliminar este producto?')) return;

    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const filteredProducts = products.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full max-w-md"
      />

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Imagen</th>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">Precio</th>
            <th className="p-2 text-left">Stock</th>
            <th className="p-2 text-left">Categorías</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product: any) => (
            <tr key={product._id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <Image
                  src={product.imagen}
                  alt={product.nombre}
                  width={50}
                  height={50}
                  className="rounded"
                />
              </td>
              <td className="p-2">{product.nombre}</td>
              <td className="p-2">${product.precio}</td>
              <td className="p-2">{product.stock}</td>
              <td className="p-2">
                {product.categorias.join(', ')}
              </td>
              <td className="p-2 space-x-2">
                <Link
                  href={`/admin/products/${product._id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

**components/admin/ProductForm.tsx**
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';

export default function ProductForm({ product = null }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: product?.nombre || '',
    precio: product?.precio || 0,
    stock: product?.stock || 0,
    descripcion: product?.descripcion || '',
    categorias: product?.categorias || [],
    imagen: product?.imagen || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = product
      ? `/api/products/${product._id}`
      : '/api/products';

    const method = product ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      router.push('/admin/products');
      router.refresh();
    } else {
      alert('Error al guardar producto');
    }

    setLoading(false);
  };

  const handleImageUploaded = (imageUrl: string) => {
    setFormData({ ...formData, imagen: imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block mb-2 font-medium">Nombre del producto</label>
        <input
          type="text"
          required
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Precio</label>
          <input
            type="number"
            required
            min="0"
            value={formData.precio}
            onChange={(e) => setFormData({ ...formData, precio: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Stock</label>
          <input
            type="number"
            required
            min="0"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">Descripción</label>
        <textarea
          rows={4}
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Categorías (separadas por coma)</label>
        <input
          type="text"
          value={formData.categorias.join(', ')}
          onChange={(e) => setFormData({
            ...formData,
            categorias: e.target.value.split(',').map(c => c.trim())
          })}
          className="w-full p-2 border rounded"
          placeholder="cuidado-personal, jabones"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Imagen principal</label>
        <ImageUploader
          currentImage={formData.imagen}
          onImageUploaded={handleImageUploaded}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : product ? 'Actualizar' : 'Crear'}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
```

**components/admin/ImageUploader.tsx**
```typescript
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageUploader({ currentImage, onImageUploaded }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();

      if (data.success) {
        setPreview(data.imageUrl);
        onImageUploaded(data.imageUrl);
      }
    } catch (error) {
      alert('Error al subir imagen');
    }

    setUploading(false);
  };

  return (
    <div className="space-y-4">
      {preview && (
        <div className="relative w-48 h-48">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded"
          />
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="block"
      />

      {uploading && <p>Subiendo imagen...</p>}
    </div>
  );
}
```

---

### **SESIÓN TARDE (3pm - 6pm) - 3 horas**

#### **3. Migrar componentes principales de React a Next.js (3 horas)**

**Estrategia**: Migrar componentes de `src/components` a `components/` de Next.js

**Componentes a migrar (prioridad):**
1. ✅ Navbar → `components/shop/Navbar.tsx`
2. ✅ Footer → `components/shop/Footer.tsx`
3. ✅ ProductCard → `components/shop/ProductCard.tsx`
4. ✅ Cart → `components/shop/Cart.tsx`
5. ✅ Hero → `components/shop/Hero.tsx`

**Ejemplo de migración: Navbar**

**src/components/Navbar/Navbar.jsx** (React antiguo)
```jsx
// Este archivo se mantiene temporalmente
// NO tocar hasta que Next.js esté 100% funcional
```

**components/shop/Navbar.tsx** (Next.js nuevo)
```typescript
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

export default function Navbar() {
  const { data: session } = useSession();
  const { getTotalItems } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Pekitas" width={40} height={40} />
          <span className="font-bold text-xl">Pekitas Ecotienda</span>
        </Link>

        <div className="flex gap-6 items-center">
          <Link href="/products">Productos</Link>
          <Link href="/about">Nosotros</Link>
          <Link href="/contact">Contacto</Link>

          <Link href="/cart" className="relative">
            <ShoppingCart size={24} />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {getTotalItems()}
              </span>
            )}
          </Link>

          {session ? (
            <div className="flex gap-2 items-center">
              <Link href="/dashboard">
                <User size={24} />
              </Link>
              {session.user.role === 'admin' && (
                <Link href="/admin" className="text-red-600 font-medium">
                  Admin
                </Link>
              )}
              <button onClick={() => signOut()}>Salir</button>
            </div>
          ) : (
            <Link href="/auth/login">Ingresar</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
```

**hooks/useCart.ts** (migrado de Context a Zustand)
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  _id: string;
  nombre: string;
  precio: number;
  imagen: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i._id === item._id);

        if (existingItem) {
          return {
            items: state.items.map(i =>
              i._id === item._id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          };
        }

        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i._id !== id)
      })),

      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(i =>
          i._id === id ? { ...i, quantity } : i
        )
      })),

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) =>
          total + (item.precio * item.quantity), 0
        );
      }
    }),
    {
      name: 'pekitas-cart',
    }
  )
);
```

**Instalar Zustand:**
```bash
npm install zustand
```

---

### **✅ FIN DÍA 2 - CHECKLIST**

```
[✓] NextAuth.js configurado con MongoDB
[✓] Admin panel completo con CRUD UI
[✓] Upload de imágenes a Cloudinary funcionando
[✓] Componentes principales migrados a Next.js
[✓] Cart migrado de Context a Zustand
[✓] Middleware protegiendo rutas admin

⚠️ Aún falta: Frontend completo, MercadoPago
```

---

## 💳 **DÍA 3: MERCADOPAGO, FEATURES Y DEPLOY (6 horas)**

### **SESIÓN MAÑANA (9am - 1pm) - 4 horas**

#### **1. Configurar MercadoPago (1.5 horas)**

**Paso 1: Crear cuenta MercadoPago**
```
1. Ir a https://www.mercadopago.com.ar/developers
2. Crear aplicación "Pekitas Ecotienda"
3. Obtener credenciales:
   - Public Key (para frontend)
   - Access Token (para backend)
```

**Paso 2: Instalar SDK**
```bash
npm install mercadopago @mercadopago/sdk-react
```

**.env.local**
```env
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-xxxxxxxxx-xxxxxx-xxx
```

**lib/mercadopago.ts**
```typescript
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  options: { timeout: 5000, idempotencyKey: 'pekitas' }
});

export const createPreference = async (items: any[], orderData: any) => {
  const preference = new Preference(client);

  const result = await preference.create({
    body: {
      items: items.map(item => ({
        id: item._id,
        title: item.nombre,
        description: item.descripcion?.substring(0, 100),
        quantity: item.quantity,
        unit_price: item.precio,
        currency_id: 'ARS',
        picture_url: item.imagen
      })),
      payer: {
        name: orderData.user.name,
        email: orderData.user.email,
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
        failure: `${process.env.NEXT_PUBLIC_URL}/checkout/failure`,
        pending: `${process.env.NEXT_PUBLIC_URL}/checkout/pending`
      },
      auto_return: 'approved',
      notification_url: `${process.env.NEXT_PUBLIC_URL}/api/webhooks/mercadopago`,
      metadata: {
        order_id: orderData._id.toString(),
      },
      statement_descriptor: 'PEKITAS ECOTIENDA',
      external_reference: orderData._id.toString(),
    }
  });

  return result;
};

export const getPaymentInfo = async (paymentId: string) => {
  const payment = new Payment(client);
  return await payment.get({ id: paymentId });
};
```

**lib/models/Order.ts**
```typescript
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    nombre: String,
    precio: Number,
    quantity: Number,
    imagen: String
  }],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending_payment', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending_payment'
  },
  paymentId: String,
  paymentStatus: String,
  shippingAddress: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    phone: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  paidAt: Date,
  shippedAt: Date,
  deliveredAt: Date
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
```

**app/api/checkout/route.ts**
```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import Product from '@/lib/models/Product';
import { createPreference } from '@/lib/mercadopago';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { items, shippingAddress } = await request.json();

    // Verificar stock
    for (const item of items) {
      const product = await Product.findById(item._id);

      if (!product || product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${product?.nombre || 'producto'}` },
          { status: 400 }
        );
      }
    }

    // Calcular total
    const total = items.reduce((sum, item) =>
      sum + (item.precio * item.quantity), 0
    );

    // Crear orden
    const order = await Order.create({
      user: session.user.id,
      items: items.map(item => ({
        product: item._id,
        nombre: item.nombre,
        precio: item.precio,
        quantity: item.quantity,
        imagen: item.imagen
      })),
      total,
      status: 'pending_payment',
      shippingAddress
    });

    // Crear preferencia de pago en MercadoPago
    const preference = await createPreference(items, {
      _id: order._id,
      user: session.user
    });

    return NextResponse.json({
      success: true,
      orderId: order._id,
      preferenceId: preference.id
    });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

**app/api/webhooks/mercadopago/route.ts**
```typescript
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import Product from '@/lib/models/Product';
import { getPaymentInfo } from '@/lib/mercadopago';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log('MercadoPago webhook:', body);

    // MercadoPago envía notificaciones de tipo "payment"
    if (body.type === 'payment') {
      await dbConnect();

      const paymentId = body.data.id;

      // Obtener info del pago desde MercadoPago
      const payment = await getPaymentInfo(paymentId);

      const orderId = payment.external_reference;

      if (payment.status === 'approved') {
        // Actualizar orden
        const order = await Order.findByIdAndUpdate(
          orderId,
          {
            status: 'paid',
            paymentId: payment.id,
            paymentStatus: payment.status,
            paidAt: new Date()
          },
          { new: true }
        );

        // Reducir stock de productos
        for (const item of order.items) {
          await Product.findByIdAndUpdate(
            item.product,
            { $inc: { stock: -item.quantity } }
          );
        }

        // TODO: Enviar email de confirmación
        console.log(`Orden ${orderId} pagada exitosamente`);
      }

      if (payment.status === 'rejected') {
        await Order.findByIdAndUpdate(orderId, {
          status: 'cancelled',
          paymentStatus: payment.status
        });
      }
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

#### **2. Página de Checkout (1.5 horas)**

**app/checkout/page.tsx**
```typescript
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import Image from 'next/image';

// Inicializar SDK de MercadoPago
initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!);

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();

  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/checkout');
    }
  }, [status, router]);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          shippingAddress
        })
      });

      const data = await response.json();

      if (data.success) {
        setPreferenceId(data.preferenceId);
      } else {
        alert(data.error || 'Error al crear la orden');
      }
    } catch (error) {
      alert('Error al procesar el pago');
    }

    setLoading(false);
  };

  if (status === 'loading') {
    return <div>Cargando...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl mb-4">Tu carrito está vacío</h1>
        <button
          onClick={() => router.push('/products')}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Resumen de productos */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Resumen de tu orden</h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item._id} className="flex gap-4 border-b pb-4">
                <Image
                  src={item.imagen}
                  alt={item.nombre}
                  width={80}
                  height={80}
                  className="rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.nombre}</h3>
                  <p className="text-gray-600">
                    Cantidad: {item.quantity} × ${item.precio}
                  </p>
                  <p className="font-semibold">
                    ${item.precio * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-xl font-bold">
            Total: ${getTotalPrice()}
          </div>
        </div>

        {/* Formulario de envío y pago */}
        <div>
          {!preferenceId ? (
            <>
              <h2 className="text-xl font-semibold mb-4">Datos de envío</h2>

              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                handleCheckout();
              }}>
                <input
                  type="text"
                  placeholder="Dirección"
                  required
                  value={shippingAddress.address}
                  onChange={(e) => setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value
                  })}
                  className="w-full p-2 border rounded"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Ciudad"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value
                    })}
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="text"
                    placeholder="Provincia"
                    required
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      state: e.target.value
                    })}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Código Postal"
                    required
                    value={shippingAddress.zipCode}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      zipCode: e.target.value
                    })}
                    className="w-full p-2 border rounded"
                  />

                  <input
                    type="tel"
                    placeholder="Teléfono"
                    required
                    value={shippingAddress.phone}
                    onChange={(e) => setShippingAddress({
                      ...shippingAddress,
                      phone: e.target.value
                    })}
                    className="w-full p-2 border rounded"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Procesando...' : 'Continuar al pago'}
                </button>
              </form>
            </>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Pagar con MercadoPago</h2>
              <Wallet
                initialization={{ preferenceId }}
                customization={{
                  texts: {
                    valueProp: 'smart_option',
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

**app/checkout/success/page.tsx**
```typescript
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/hooks/useCart';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();

  const paymentId = searchParams.get('payment_id');
  const status = searchParams.get('status');

  useEffect(() => {
    if (status === 'approved') {
      clearCart();
    }
  }, [status, clearCart]);

  return (
    <div className="container mx-auto p-6 text-center">
      <div className="max-w-md mx-auto bg-green-50 p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ¡Pago exitoso!
        </h1>

        <p className="text-gray-700 mb-6">
          Tu compra ha sido procesada correctamente.
        </p>

        <p className="text-sm text-gray-600 mb-6">
          ID de pago: {paymentId}
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/dashboard/orders')}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Ver mis pedidos
          </button>

          <button
            onClick={() => router.push('/products')}
            className="w-full bg-gray-200 py-2 rounded hover:bg-gray-300"
          >
            Seguir comprando
          </button>
        </div>
      </div>
    </div>
  );
}
```

#### **3. Sistema de Reviews y Wishlist (1 hora)**

**lib/models/Review.ts**
```typescript
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: String,
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Índice único: 1 review por usuario por producto
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
```

**app/api/reviews/route.ts**
```typescript
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Review from '@/lib/models/Review';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    await dbConnect();

    const { productId, rating, comment, images } = await request.json();

    const review = await Review.create({
      product: productId,
      user: session.user.id,
      rating,
      comment,
      images: images || []
    });

    return NextResponse.json({ success: true, data: review });

  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Ya has dejado una reseña para este producto' },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

### **SESIÓN TARDE (2pm - 4pm) - 2 horas**

#### **4. SEO y Performance (1 hora)**

**app/layout.tsx**
```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Pekitas Ecotienda - Productos Naturales y Orgánicos',
    template: '%s | Pekitas Ecotienda'
  },
  description: 'Tu tienda ecológica de confianza. Productos naturales, orgánicos y sustentables para el cuidado personal y del hogar.',
  keywords: ['productos naturales', 'ecotienda', 'orgánico', 'sustentable', 'cuidado personal'],
  authors: [{ name: 'Pekitas Team' }],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://pekitas.com',
    title: 'Pekitas Ecotienda',
    description: 'Productos naturales y orgánicos',
    siteName: 'Pekitas Ecotienda',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pekitas Ecotienda'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pekitas Ecotienda',
    description: 'Productos naturales y orgánicos',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
```

**app/sitemap.ts**
```typescript
import { MetadataRoute } from 'next';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();

  const products = await Product.find({ activo: true }, 'slug updatedAt');

  const productUrls = products.map((product) => ({
    url: `https://pekitas.com/products/${product._id}`,
    lastModified: product.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: 'https://pekitas.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://pekitas.com/products',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://pekitas.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://pekitas.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...productUrls,
  ];
}
```

**app/robots.ts**
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/dashboard/'],
      },
    ],
    sitemap: 'https://pekitas.com/sitemap.xml',
  };
}
```

#### **5. Deploy a Vercel (1 hora)**

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy (desde la raíz del proyecto)
vercel

# Seguir wizard:
# - Set up and deploy? Yes
# - Which scope? Tu cuenta
# - Link to existing project? No
# - Project name? pekitas-ecotienda
# - Directory? ./
# - Override settings? No

# 4. Configurar variables de entorno en Vercel dashboard
https://vercel.com/tu-usuario/pekitas-ecotienda/settings/environment-variables

# Agregar:
MONGODB_URI
NEXTAUTH_SECRET
NEXTAUTH_URL
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
MERCADOPAGO_ACCESS_TOKEN
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY
NEXT_PUBLIC_URL

# 5. Deploy a producción
vercel --prod

# 6. Configurar webhook de MercadoPago
# En MercadoPago dashboard: https://www.mercadopago.com.ar/developers
# Webhook URL: https://pekitas-ecotienda.vercel.app/api/webhooks/mercadopago
```

---

### **✅ FIN DÍA 3 - CHECKLIST**

```
[✓] MercadoPago completamente integrado
[✓] Checkout funcional con pago real
[✓] Webhook procesando pagos automáticamente
[✓] Sistema de reviews implementado
[✓] SEO completo (metadata, sitemap, robots)
[✓] Deploy a Vercel en producción
[✓] Variables de entorno configuradas

🎉 PEKITAS ECOTIENDA V3.0 COMPLETO
```

---

## 📊 RESUMEN FINAL DEL STACK

```javascript
// FRONTEND
Next.js 15 (App Router, React Server Components)
React 19
Chakra UI 3.x
Zustand (state management)
next-auth (authentication)
@mercadopago/sdk-react

// BACKEND
Next.js API Routes
MongoDB Atlas (FREE tier)
Mongoose ODM
MercadoPago SDK

// SERVICIOS
Cloudinary (imágenes)
MercadoPago (pagos)
Vercel (hosting)
MongoDB Atlas (database)

// DEVOPS
Git + GitHub
Vercel (CI/CD automático)
```

---

## 💰 COSTOS MENSUALES (GRATIS)

```
✅ Vercel Hobby: $0
✅ MongoDB Atlas M0: $0 (512MB)
✅ Cloudinary Free: $0 (25 credits/mes)
✅ Next Auth: $0 (open source)
✅ MercadoPago: 0% de costo fijo + 3.5% por transacción

Total base: $0/mes + 3.5% de ventas
```

---

## 🎯 FUNCIONALIDADES FINALES

### **Para Clientes:**
- ✅ Catálogo de 73+ productos con búsqueda full-text
- ✅ Carrito persistente (localStorage)
- ✅ Checkout completo con MercadoPago
- ✅ Sistema de reviews con calificaciones
- ✅ Wishlist de favoritos
- ✅ Dashboard con historial de pedidos
- ✅ Auth con Google + Email/Password
- ✅ Responsive mobile-first

### **Para Administradores:**
- ✅ Admin panel completo CRUD productos
- ✅ Upload de imágenes a Cloudinary
- ✅ Gestión de órdenes en tiempo real
- ✅ Dashboard con métricas
- ✅ Actualización de stock automática
- ✅ Protección de rutas por rol

### **SEO y Performance:**
- ✅ Metadata dinámica por página
- ✅ Sitemap automático
- ✅ Image optimization con next/image
- ✅ Server Side Rendering
- ✅ Static Site Generation para productos
- ✅ Lighthouse score >95

---

## 📝 PRÓXIMOS PASOS (POST-LANZAMIENTO)

### **Semana 4 (opcional):**
- Email notifications con Resend
- Analytics con Google Analytics 4
- Error tracking con Sentry
- Chat de soporte (WhatsApp Web)

### **Mes 2:**
- Blog/CMS para contenido
- Programa de fidelidad con puntos
- Cupones de descuento
- Envío automático con Andreani API

### **Mes 3:**
- App móvil con React Native (compartir código)
- Push notifications
- Suscripciones recurrentes
- Marketplace de vendedores

---

## 🚨 IMPORTANTE - ANTES DE EMPEZAR

### **Backups:**
```bash
# Backup del código actual
git checkout -b backup-v2.0.0
git push origin backup-v2.0.0

# Exportar productos.json actual
cp src/data/productos.json BACKUP-productos-$(date +%Y%m%d).json

# Backup Firebase (por si acaso)
# Export desde Firebase Console → Firestore
```

### **Credenciales necesarias:**
```
☐ MongoDB Atlas account + connection string
☐ Cloudinary account + API keys (ya tienes)
☐ MercadoPago developer account + credenciales
☐ Google OAuth credentials (para login social)
☐ Vercel account
☐ Dominio custom (opcional)
```

---

## 🎉 CONCLUSIÓN

Al terminar estos 3 días tendrás:

1. ✅ **Migración completa** de React → Next.js
2. ✅ **Independencia de Firebase** (solo Auth opcional)
3. ✅ **CRUD completo** con admin panel profesional
4. ✅ **Sistema de pagos real** con MercadoPago
5. ✅ **SEO nativo** superior
6. ✅ **Performance mejorada** (Lighthouse >95)
7. ✅ **Código moderno** y escalable
8. ✅ **Deploy automático** con Vercel

**Total de horas: 20 horas** (3 días intensos)

---

*Documento creado por Claude Code + Human collaboration*
*Fecha: Enero 2025*
*Versión: 3.0.0*
