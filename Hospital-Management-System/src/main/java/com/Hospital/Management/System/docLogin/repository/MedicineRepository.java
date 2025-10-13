package com.Hospital.Management.System.docLogin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Hospital.Management.System.docLogin.entity.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {

}
