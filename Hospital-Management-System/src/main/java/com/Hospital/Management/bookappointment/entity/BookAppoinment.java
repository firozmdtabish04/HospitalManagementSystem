package com.Hospital.Management.System.bookappointment.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "book_appointments")
public class BookAppointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String gender;
    private Integer age;
    private String contact;
    private String speciality;
    private String date;
    private String time;
    private String message;
    private String status = "Confirmed"; // Default value

    // Default constructor
    public BookAppointment() {
    }

    // Parameterized constructor
    public BookAppointment(String fullName, String email, String gender, Integer age,
                           String contact, String speciality, String date,
                           String time, String message) {
        this.fullName = fullName;
        this.email = email;
        this.gender = gender;
        this.age = age;
        this.contact = contact;
        this.speciality = speciality;
        this.date = date;
        this.time = time;
        this.message = message;
        this.status = "Confirmed";
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getSpeciality() { return speciality; }
    public void setSpeciality(String speciality) { this.speciality = speciality; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
