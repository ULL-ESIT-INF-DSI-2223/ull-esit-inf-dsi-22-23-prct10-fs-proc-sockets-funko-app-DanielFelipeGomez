export type TipoRespuesta = {
    type: 'add' | 'update' | 'remove' | 'read' | 'list';
    success: boolean;
}