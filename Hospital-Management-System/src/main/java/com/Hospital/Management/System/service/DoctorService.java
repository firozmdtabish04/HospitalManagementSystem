package com.Hospital.Management.System.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Hospital.Management.System.entity.Doctor;
import com.Hospital.Management.System.repository.DoctorRegistrationRepository;

@Service
public class DoctorService {

    @Autowired
    private DoctorRegistrationRepository doctorRegistrationRepository;

    public Iterable<Doctor> getAllDoctorsIterable() {
        return doctorRegistrationRepository.findAll();
    }

    public Doctor getDoctorById(Long id) {
        return doctorRegistrationRepository.findById(id).orElse(null);
    }

    public Doctor addDoctor(Doctor doctor) {
        return doctorRegistrationRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor doctorDetails) {
        Doctor doctor = doctorRegistrationRepository.findById(id).orElse(null);
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
            return doctorRegistrationRepository.save(doctor);
        }
        return null;
    }

    public void deleteDoctor(Long id) {
        doctorRegistrationRepository.deleteById(id);
    }
}
