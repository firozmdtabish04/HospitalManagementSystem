package com.Hospital.Management.System.docLogin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Hospital.Management.System.docLogin.entity.Appointment;

public interface AppointmentsRepository extends JpaRepository<Appointment, Long>{

}
