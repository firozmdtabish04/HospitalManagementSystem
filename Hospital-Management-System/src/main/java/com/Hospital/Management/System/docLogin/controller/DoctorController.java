package com.application.controller;

import java.text.SimpleDateFormat;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.application.model.Appointments;
import com.application.model.Doctor;
import com.application.model.Prescription;
import com.application.model.Slots;
import com.application.service.AppointmentBookingService;
import com.application.service.DoctorRegistrationService;
import com.application.service.PrescriptionService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class DoctorController {

    @Autowired
    private DoctorRegistrationService doctorService;

    @Autowired
    private AppointmentBookingService appointmentService;

    @Autowired
    private PrescriptionService prescriptionService;

    @GetMapping("/doctorlist")
    public ResponseEntity<List<Doctor>> getDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/gettotaldoctors")
    public ResponseEntity<Integer> getTotalDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors().size());
    }

    @GetMapping("/gettotalslots")
    public ResponseEntity<Integer> getTotalSlots() {
        return ResponseEntity.ok(appointmentService.getSlotList().size());
    }

    @GetMapping("/acceptstatus/{email}")
    public ResponseEntity<String> acceptDoctor(@PathVariable String email) {
        doctorService.updateStatus(email);
        return ResponseEntity.ok("accepted");
    }

    @GetMapping("/rejectstatus/{email}")
    public ResponseEntity<String> rejectDoctor(@PathVariable String email) {
        doctorService.rejectStatus(email);
        return ResponseEntity.ok("rejected");
    }

    @GetMapping("/acceptpatient/{slot}")
    public ResponseEntity<String> acceptPatient(@PathVariable String slot) {
        doctorService.updatePatientStatus(slot, appointmentService.getDoctorNameBySlot(slot));
        return ResponseEntity.ok("accepted");
    }

    @GetMapping("/rejectpatient/{slot}")
    public ResponseEntity<String> rejectPatient(@PathVariable String slot) {
        doctorService.rejectPatientStatus(slot, appointmentService.getDoctorNameBySlot(slot));
        return ResponseEntity.ok("rejected");
    }

    @PostMapping("/addBookingSlots")
    public ResponseEntity<String> addSlot(@RequestBody Slots slots) {
        appointmentService.saveSlots(slots);
        return ResponseEntity.ok("Slot added successfully");
    }

    @GetMapping("/doctorlistbyemail/{email}")
    public ResponseEntity<List<Doctor>> getDoctorByEmail(@PathVariable String email) {
        return ResponseEntity.ok(doctorService.getDoctorListByEmail(email));
    }

    @GetMapping("/slotDetails/{email}")
    public ResponseEntity<List<Slots>> getSlotDetails(@PathVariable String email) {
        return ResponseEntity.ok(appointmentService.getSlotDetails(email));
    }

    @GetMapping("/slotDetails")
    public ResponseEntity<List<Slots>> getAllSlots() {
        return ResponseEntity.ok(appointmentService.getSlotList());
    }

    @GetMapping("/slotDetailsWithUniqueDoctors")
    public ResponseEntity<Set<String>> getUniqueDoctors() {
        Set<String> doctorNames = new LinkedHashSet<>();
        appointmentService.getSlotDetailsWithUniqueDoctors()
                .forEach(slot -> doctorNames.add(slot.getDoctorname()));
        return ResponseEntity.ok(doctorNames);
    }

    @GetMapping("/slotDetailsWithUniqueSpecializations")
    public ResponseEntity<Set<String>> getUniqueSpecializations() {
        Set<String> specializations = new LinkedHashSet<>();
        appointmentService.getSlotDetailsWithUniqueSpecializations()
                .forEach(slot -> specializations.add(slot.getSpecialization()));
        return ResponseEntity.ok(specializations);
    }

    @GetMapping("/patientlistbydoctoremail/{email}")
    public ResponseEntity<List<Appointments>> getPatientsByDoctorEmail(@PathVariable String email) {
        String doctorName = doctorService.getDoctorNameByEmail(email);
        return ResponseEntity.ok(appointmentService.findPatientByDoctorName(doctorName));
    }

    @PostMapping("/addPrescription")
    public ResponseEntity<Prescription> addPrescription(@RequestBody Prescription prescription) {
        String patientID = appointmentService.getPatientIdByPatientName(prescription.getPatientname());
        prescription.setPatientid(patientID);

        String todayDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        prescription.setDate(todayDate);

        return ResponseEntity.ok(prescriptionService.savePrescriptions(prescription));
    }

    @GetMapping("/doctorProfileDetails/{email}")
    public ResponseEntity<List<Doctor>> getDoctorProfile(@PathVariable String email) {
        return ResponseEntity.ok(doctorService.fetchProfileByEmail(email));
    }

    @PutMapping("/updatedoctor")
    public ResponseEntity<Doctor> updateDoctor(@RequestBody Doctor doctor) {
        return ResponseEntity.ok(doctorService.updateDoctorProfile(doctor));
    }

    @GetMapping("/patientlistbydoctoremailanddate/{email}")
    public ResponseEntity<List<Appointments>> getTodayPatients(@PathVariable String email) {
        String doctorName = doctorService.getDoctorNameByEmail(email);
        String today = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

        List<Appointments> todayAppointments = appointmentService.getAllPatients().stream()
                .filter(p -> p.getDoctorname().equals(doctorName) && p.getDate().equals(today))
                .toList();

        return ResponseEntity.ok(todayAppointments);
    }
}
