export interface Task {
  id: string;
  title: string;
  date: string;
  priority: 'Alta' | 'Media' | 'Baja';
}
