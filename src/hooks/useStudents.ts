
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Student {
  id: string;
  user_id: string;
  student_id: string;
  name: string;
  email: string;
  phone?: string;
  major?: string;
  grade?: string;
  class_name?: string;
  address?: string;
  birth_date?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchStudents = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "错误",
        description: "获取学生信息失败",
        variant: "destructive",
      });
    } else {
      setStudents(data || []);
    }
    setLoading(false);
  };

  const addStudent = async (studentData: Omit<Student, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return { error: '用户未登录' };

    const { data, error } = await supabase
      .from('students')
      .insert([{ ...studentData, user_id: user.id }])
      .select()
      .single();

    if (error) {
      toast({
        title: "错误",
        description: "添加学生信息失败",
        variant: "destructive",
      });
      return { error };
    } else {
      toast({
        title: "成功",
        description: "学生信息添加成功",
      });
      setStudents(prev => [data, ...prev]);
      return { data };
    }
  };

  const updateStudent = async (id: string, studentData: Partial<Student>) => {
    const { data, error } = await supabase
      .from('students')
      .update(studentData)
      .eq('id', id)
      .eq('user_id', user?.id)
      .select()
      .single();

    if (error) {
      toast({
        title: "错误",
        description: "更新学生信息失败",
        variant: "destructive",
      });
      return { error };
    } else {
      toast({
        title: "成功",
        description: "学生信息更新成功",
      });
      setStudents(prev => prev.map(s => s.id === id ? data : s));
      return { data };
    }
  };

  const deleteStudent = async (id: string) => {
    const { error } = await supabase
      .from('students')
      .delete()
      .eq('id', id)
      .eq('user_id', user?.id);

    if (error) {
      toast({
        title: "错误",
        description: "删除学生信息失败",
        variant: "destructive",
      });
      return { error };
    } else {
      toast({
        title: "成功",
        description: "学生信息删除成功",
      });
      setStudents(prev => prev.filter(s => s.id !== id));
      return { success: true };
    }
  };

  useEffect(() => {
    if (user) {
      fetchStudents();
    }
  }, [user]);

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    refetch: fetchStudents,
  };
};
