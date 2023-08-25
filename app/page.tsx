import Login from './components/login'
import { SchemaProvider } from '@/app/contexts/schema-context';

export default function Home() {
  
  return (
    <SchemaProvider>
    <Login></Login>
    </SchemaProvider>
  );
}
