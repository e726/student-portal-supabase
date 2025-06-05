
import { useAuth } from '@/hooks/useAuth';
import { StudentList } from '@/components/StudentList';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Students = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              学生信息管理系统
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                欢迎，{user?.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <StudentList />
        </div>
      </main>
    </div>
  );
};

export default Students;
