package com.Hospital.Management.System.bookappointment.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.Hospital.Management.System.bookappointment.entity.BookAppointment;

@Repository
public interface BookAppointmentRepository extends JpaRepository<BookAppointment, Long> {
}
