package com.Hospital.Management.System.repository;

import com.Hospital.Management.System.entity.HospitalService;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<HospitalService, Long> {}
