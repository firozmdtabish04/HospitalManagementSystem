<<<<<<< HEAD
=======
package com.Hospital.Management.System.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Hospital.Management.System.entity.Doctor;
import com.Hospital.Management.System.repository.DoctorRepository;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    public Doctor addDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor doctorDetails) {
        Doctor doctor = doctorRepository.findById(id).orElse(null);
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
            return doctorRepository.save(doctor);
        }
        return null;
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}
>>>>>>> 557c96db17509d24bcdddfa6cc9e866c1366aa62
