
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StudentForm } from './StudentForm';
import { useStudents, Student } from '@/hooks/useStudents';
import { Edit, Trash2, Plus } from 'lucide-react';

export const StudentList = () => {
  const { students, loading, addStudent, updateStudent, deleteStudent } = useStudents();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>();

  const handleAdd = () => {
    setEditingStudent(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('确定要删除这个学生信息吗？')) {
      await deleteStudent(id);
    }
  };

  const handleFormSubmit = async (data: any) => {
    if (editingStudent) {
      await updateStudent(editingStudent.id, data);
    } else {
      await addStudent(data);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">加载中...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">学生信息管理</h2>
        <Button onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          添加学生
        </Button>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          暂无学生信息，点击"添加学生"开始添加
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>学号</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>邮箱</TableHead>
                <TableHead>电话</TableHead>
                <TableHead>专业</TableHead>
                <TableHead>年级</TableHead>
                <TableHead>班级</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.student_id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone || '-'}</TableCell>
                  <TableCell>{student.major || '-'}</TableCell>
                  <TableCell>{student.grade || '-'}</TableCell>
                  <TableCell>{student.class_name || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(student)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(student.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <StudentForm
        student={editingStudent}
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        title={editingStudent ? '编辑学生信息' : '添加学生信息'}
      />
    </div>
  );
};
