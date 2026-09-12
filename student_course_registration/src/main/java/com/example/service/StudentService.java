package com.example.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.model.Student;

@Service
public class StudentService {

    private List<Student> students = new ArrayList<>();

    public Student registerStudent(Student student) {
        students.add(student);
        return student;
    }

    public List<Student> getAllStudents() {
        return students;
    }

    public Student getStudentById(int id) {

        for (Student student : students) {

            if (student.getStudentId() == id) {
                return student;
            }
        }

        return null;
    }

    public String deleteStudent(int id) {

        Student student = getStudentById(id);

        if (student != null) {
            students.remove(student);
            return "Student deleted successfully";
        }

        return "Student not found";
    }
}