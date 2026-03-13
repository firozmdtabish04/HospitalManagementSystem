package com.Hospital.Management.System.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Hospital.Management.System.entity.Doctor;

@Service
public class DoctorService {

    @Autowired

    }

    public Doctor getDoctorById(Long id) {
    }

    public Doctor addDoctor(Doctor doctor) {
    }

    public Doctor updateDoctor(Long id, Doctor doctorDetails) {
        if (doctor != null) {
            doctor.setFirstName(doctorDetails.getFirstName());
            doctor.setLastName(doctorDetails.getLastName());
            doctor.setGender(doctorDetails.getGender());
            doctor.setSpecialization(doctorDetails.getSpecialization());
            doctor.setPhoneNumber(doctorDetails.getPhoneNumber());
            doctor.setEmail(doctorDetails.getEmail());
            doctor.setExperienceYears(doctorDetails.getExperienceYears());
            doctor.setJoiningDate(doctorDetails.getJoiningDate());
            doctor.setSalary(doctorDetails.getSalary());
            doctor.setDepartment(doctorDetails.getDepartment());
        }
        return null;
    }

    public void deleteDoctor(Long id) {
    }
}