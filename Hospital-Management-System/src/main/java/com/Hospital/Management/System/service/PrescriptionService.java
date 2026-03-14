package com.Hospital.Management.System.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Hospital.Management.System.entity.Prescription;
import com.Hospital.Management.System.repository.PrescriptionRepository;

@Service
public class PrescriptionService {
    @Autowired
    private PrescriptionRepository prescriptionRepo;

    public Prescription savePrescriptions(Prescription prescription) {
        return prescriptionRepo.save(prescription);
    }

    public List<Prescription> getPrescriptionByPatientname(String patientname) {
        return (List<Prescription>) prescriptionRepo.findByPatientname(patientname);
    }

    public List<Prescription> getAllPrescriptions() {
        return (List<Prescription>) prescriptionRepo.findAll();
    }
}
