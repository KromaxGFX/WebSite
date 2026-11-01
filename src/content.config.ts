import { defineCollection, z } from 'astro:content';

const proyectos = defineCollection({
  type: 'data',
  schema: z.object({
    clave: z.string(),
    nombre: z.string(),
    lema: z.string(),
    rol: z.string(),
    estado: z.enum(['activo', 'mantenimiento', 'archivado']),
    stack: z.array(z.string()),
    repositorio: z.string().url(),
    licencia: z.string(),
    color: z.string().optional(),
    orden: z.number().int().positive().optional(),
    aspectos: z.array(z.string()).optional(),
    descripcion: z.string().optional(),
  }),
});

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string(),
    seccion: z.string(),
    orden: z.number().int().positive(),
    destacado: z.boolean().default(false),
    proyecto: z.string().optional(),
  }),
});

export const collections = { proyectos, docs };