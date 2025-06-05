
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/students');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">加载中...</h1>
        </div>
      </div>
    );
  }

  if (user) {
    return null; // Will redirect to /students
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">学生信息管理系统</h1>
        <p className="text-xl text-gray-600 mb-8">管理学生信息的简单高效平台</p>
        <Button onClick={() => navigate('/auth')} size="lg">
          开始使用
        </Button>
      </div>
    </div>
  );
};

export default Index;
