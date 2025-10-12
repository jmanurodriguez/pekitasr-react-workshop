import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';

// GET /api/products - Listar todos los productos
export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    let query: any = { activo: true };

    // Búsqueda por texto
    if (search) {
      query.$text = { $search: search };
    }

    // Filtro por categoría
    if (category) {
      query.categorias = category;
    }

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al obtener productos',
      },
      { status: 500 }
    );
  }
}

// POST /api/products - Crear producto (admin)
export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const product = await Product.create({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Error al crear producto',
      },
      { status: 400 }
    );
  }
}
