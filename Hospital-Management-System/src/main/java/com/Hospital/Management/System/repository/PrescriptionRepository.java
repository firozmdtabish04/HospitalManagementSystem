package com.Hospital.Management.System.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.Hospital.Management.System.entity.Prescription;

public interface PrescriptionRepository extends CrudRepository<Prescription, Integer> {

    List<Prescription> findByPatientname(String patientname);

}