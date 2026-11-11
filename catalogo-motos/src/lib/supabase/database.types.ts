export type BikeStatus = 'disponible' | 'agotada' | 'en_espera' | 'revision' | 'inactiva';
export type ColorStatus = 'disponible' | 'agotada' | 'en_espera';
export type ReviewStatus = 'pendiente' | 'revisada';

export interface Database {
  public: {
    Tables: {
      marcas: {
        Row: { id: string; nombre: string; fecha_creacion: string | null };
        Insert: { id?: string; nombre: string; fecha_creacion?: string };
        Update: { nombre?: string };
      };
      motos: {
        Row: {
          id: string;
          marca_id: string;
          modelo: string;
          anio: number;
          descripcion: string | null;
          precio_sin_papeles: number | null;
          precio_con_papeles: number | null;
          estado: BikeStatus;
          fecha_ultima_revision: string | null;
          fecha_proxima_revision: string | null;
          estado_revision: ReviewStatus | null;
          requiere_revision: boolean | null;
          fecha_creacion: string | null;
          fecha_actualizacion: string | null;
        };
        Insert: {
          id?: string;
          marca_id: string;
          modelo: string;
          anio: number;
          descripcion?: string | null;
          precio_sin_papeles?: number | null;
          precio_con_papeles?: number | null;
          estado?: BikeStatus;
          fecha_ultima_revision?: string | null;
          fecha_proxima_revision?: string | null;
          estado_revision?: ReviewStatus | null;
          requiere_revision?: boolean | null;
        };
        Update: Partial<Database['public']['Tables']['motos']['Insert']>;
      };
      variantes_color: {
        Row: { id: string; moto_id: string; nombre_color: string; codigo_hex: string | null; estado: ColorStatus | null };
        Insert: { id?: string; moto_id: string; nombre_color: string; codigo_hex?: string | null; estado?: ColorStatus | null };
        Update: Partial<Database['public']['Tables']['variantes_color']['Insert']>;
      };
      imagenes_moto: {
        Row: { id: string; moto_id: string; url_imagen: string; es_principal: boolean | null; orden: number | null; fecha_creacion: string | null };
        Insert: { id?: string; moto_id: string; url_imagen: string; es_principal?: boolean | null; orden?: number | null };
        Update: Partial<Database['public']['Tables']['imagenes_moto']['Insert']>;
      };
      categorias_caracteristicas: {
        Row: { id: string; nombre: string; orden: number | null };
        Insert: { id?: string; nombre: string; orden?: number | null };
        Update: Partial<Database['public']['Tables']['categorias_caracteristicas']['Insert']>;
      };
      caracteristicas: {
        Row: { id: string; categoria_id: string | null; nombre: string; unidad: string | null; tipo_dato: string; activa: boolean | null };
        Insert: { id?: string; categoria_id: string; nombre: string; unidad?: string | null; tipo_dato: string; activa?: boolean };
        Update: Partial<Database['public']['Tables']['caracteristicas']['Insert']>;
      };
      moto_caracteristicas: {
        Row: { id: string; moto_id: string; caracteristica_id: string; valor: string };
        Insert: { id?: string; moto_id: string; caracteristica_id: string; valor: string };
        Update: Partial<Database['public']['Tables']['moto_caracteristicas']['Insert']>;
      };
      perfiles: {
        Row: { id: string; nombre: string; rol: string; fecha_creacion: string };
        Insert: { id: string; nombre: string; rol: string };
        Update: { nombre?: string; rol?: string };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: { estado_moto: BikeStatus; estado_variante: ColorStatus; estado_revision: ReviewStatus };
    CompositeTypes: Record<string, never>;
  };
}
