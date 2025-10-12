import mongoose from 'mongoose';

export interface IProduct extends mongoose.Document {
  _id: string;
  nombre: string;
  precio: number;
  imagen: string;
  categorias: string[];
  stock: number;
  descripcion: string;
  activo: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

const ProductSchema = new mongoose.Schema<IProduct>({
  _id: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
    min: 0,
  },
  imagen: {
    type: String,
    required: true,
  },
  categorias: [{
    type: String,
  }],
  stock: {
    type: Number,
    default: 0,
    min: 0,
  },
  descripcion: {
    type: String,
  },
  activo: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

// Índices para búsquedas y performance
ProductSchema.index({ nombre: 'text', descripcion: 'text' });
ProductSchema.index({ categorias: 1 });
ProductSchema.index({ precio: 1 });
ProductSchema.index({ activo: 1 });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
